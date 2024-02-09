const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;



const app = express();
const port = 4000;
const cors = require("cors");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
const jwt = require("jsonwebtoken");

mongoose.connect(
    "mongodb+srv://maryaamkhanzada:maryaamkhanzada@cluster0.l5jpujl.mongodb.net/",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
).then(() => {
    console.log("Connected to mongodb");
}).catch((error) => {
    console.log("error connecting to mongodb", error);
});



app.listen(port, () => {
    console.log("Server running on port 4000");
});

const User = require("./models/user");
const Message = require("./models/message");



//endpoint to register a user
app.post("/register", (req, res) => {
    const { name, email, password, image } = req.body;

    //create a new User object
    const newUser = new User({ name, email, password, image });

    //save the new User to the database
    newUser.save().then(() => {
        res.status(200).json({ message: "User registered succesfully!" });

    })
        .catch((error) => {
            console.log("Error in registering the user", error);
            res.status(500).json({ message: "Error registering the user" });
        });
});


//function  to create a token for the user
const createToken = (userId) => {
    //set the token payload
    const payload = {
        userId: userId,
    };
    //Generate a token with a secret key and expiration time
    const token = jwt.sign(payload, "Q$r2K6W8n!jCW%Zk", { expiresIn: "1h" });
    return token;
}

//endpoint for login of that user
app.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(404).json({ message: "Email and passwords are required" })
    }
    //check for the user in the database
    User.findOne({ email }).then((user) => {
        if (!user) {
            //user not found
            return res.status(404).json({ message: "User not found" })
        }

        //comapre the provided password with the database's password
        if (user.password !== password) {
            return res.status(404).json({ message: "Inavlid password" })
        }
        const token = createToken(user._id);
        res.status(200).json({ token })
    }).catch((error) => {
        console.log("ERROR IN FINDING THE USER", error);
        res.status(500).json({ message: "Internal server error!" })
    })
})

//endpoint to access all the users except the logged in user
app.get("/users/:userId", (req, res) => {
    try {
        const loggedInUserId = req.params.userId;
        console.log("loggedInUserId:", loggedInUserId);
        User.find({ _id: { $ne: loggedInUserId } }).then((users) => {
            res.status(200).json(users);
        }).catch((error) => {
            console.log("Error", error);
            res.status(500).json("error");
        })
    } catch (error) {
        res.status(500).json({ message: "error getting the users" })
    }
})

//endpoint to send friend request
app.post("/friend-request", async (req, res) => {
    const { currentUserId, selectedUserId } = req.body;
    try {
        //update the receipent's friend request array
        await User.findByIdAndUpdate(selectedUserId, {
            $push: {
                friendRequests: currentUserId
            },
        })
        //update the sender's sentFriend req array
        await User.findByIdAndUpdate(currentUserId, {
            $push: { sentFriendRequets: selectedUserId },
        });
        res.sendStatus(200);
    } catch (error) {
        res.sendStatus(500);
    }
});

//endpoint to show all the friend-requests of a particular user
app.get("/friend-request/:userId", async (req, res) => {
    try {
        const { userId } = req.params;

        //fetch the user document based on userId
        const user = await User.findById(userId).populate("friendRequests", "name email image").lean();
        const friendRequests = user.friendRequests;
        res.send(friendRequests);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" })
    }
})

//endpoint to accept the friend request of a particular person
app.post("/friend-request/accept", async (req, res) => {
    try {
        const { senderId, receipentId } = req.body;

        //retrieve the documents of sender and the receipent 
        const sender = await User.findById(senderId);
        const receipent = await User.findById(receipentId);
        sender.friends.push(receipentId);
        receipent.friends.push(senderId);

        receipent.friendRequests = receipent.friendRequests.filter((request) => request.toString() !== senderId.toString());

        sender.sentFriendRequets = sender.sentFriendRequets.filter((request) => request.toString() !== receipentId.toString());

        await sender.save();
        await receipent.save();

        res.status(200).json({ message: "Friend Request Accepted" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" })
    }
})


//endpoint to access all the friends of the logged in user
app.get("/accepted-friends/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId).populate(
            "friends",
            "name email image"
        )
        const acceptedFriends = user.friends;
        res.json(acceptedFriends)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" })
    }
})

const multer = require('multer');

//Configure multer for handing file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, 'files/'); //Specify the desired destination folder
    },
    filename: function (req, file, cb){
        //Generate a unique file for the uploaded files
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    },
})

const upload = multer({storage: storage});

//endpoint to post messages and store it in the backend
app.post("/messages", upload.single("imageFile"), async (req, res) => {
    try {
        const { senderId, receipentId, messageType, messageText } = req.body;
        let imageUrl = null;
        if (messageType === "image" && req.file) {
            // If it's an image and there's a file, set imageUrl to the file path
            imageUrl = req.file.path;
        }
        const newMessage = new Message({
            senderId,
            receipentId,
            messageType,
            message:messageText,
            timeStamp: new Date(),
            imageUrl: imageUrl,
        });
        await newMessage.save();
        res.status(200).json({message:"message send successfully!"})
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

//endpoint to get the user details to design the chat Room header
app.get("/user/:userId", async(req, res)=>{
    try{
        const {userId} = req.params;

        //fetch the user data from the user Id
        const receipentId = await User.findById(userId);
        
        res.json(receipentId);
    } catch (error){
        console.log(error);
        res.status(500).json({error: "Internal server Error"});
    }
})

//endpoint to fetch the message between two users in the chatRoom
app.get("/messages/:senderId/:receipentId", async(req, res)=>{
    try{
        const {senderId, receipentId} = req.params;

        const messages = await Message.find({
            $or:[
                {senderId:senderId, receipentId:receipentId},
                {senderId:receipentId, receipentId:senderId},
            ],
        }).populate("senderId", "_id name");
        res.json(messages);
    } catch(error){
        console.log(error);
        res.status(500).json({error: "Internal server Error"});
    }
})


//endpoint 
app.get("/friend-requests/sent/:userId", async(req,res)=>{
    try{
        const {userId} = req.params;
        const user = await User.findbyId(userId).populate("sentFriendRequets", "name email image").lean();
        const sentFriendRequets = user.sentFriendRequets;
        res.json(sentFriendRequets);
    } catch(error){
        console.log("error", error);
        res.status(500).json({error: "Internal Server"});
    }
})

app.get("/friends/:userId", (req, res)=>{
    try{
        const {userId} = req.params;
        User.findById(userId).populate("friends").then((user)=>{
            if(!user){
                return res.status(404).json({message: "User not found"})
            }
            const friendIds = user.friends.map((friend)=>friend._id);
            res.status(200).json(friendIds);
        })
    } catch(error){
        console.log("error", error)
        res.status(500).json({message:"Iternal server error"})
    }
})