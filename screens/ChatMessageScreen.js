import { StyleSheet, Text, View, ScrollView, KeyboardAvoidingView, TextInput, Pressable, Image } from 'react-native'
import React, { useState, useContext, useLayoutEffect, useEffect } from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Entypo';
import Ionicons from "react-native-vector-icons/AntDesign";
import EmojiSelector from "react-native-emoji-selector";
import { UserType } from '../UserContext';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from "react-native-image-picker";

const ChatMessageScreen = () => {
    const navigation = useNavigation();
    const [showEmojiSelector, setShowEmojiSelector] = useState(false);
    const [message, setMessage] = useState("");
    const { userId, setUserId } = useContext(UserType);
    const [selectedImage, setSelectedImage] = useState("");
    const [receipentData, setReceipentData] = useState();
    const [messages, setMessages] = useState([]);
    const route = useRoute();
    const { receipentId } = route.params
    const handleEmojiPress = () => {
        setShowEmojiSelector(!showEmojiSelector);
    }
    const fetchMessages = async () => {
        try {
            const response = await fetch(`http://192.168.0.104:4000/messages/${userId}/${receipentId}`);
            const data = await response.json();
            if (response.ok) {
                setMessages(data);
            } else {
                console.log("error showing messages", response.status.message)
            }
        } catch (error) {
            console.log("error fetching messages", error)
        }
    }
    useEffect(() => {
        fetchMessages();
    }, []);
    useEffect(() => {
        const fetchReceipentData = async () => {
            try {
                const response = await fetch(`http://192.168.0.104:4000/user/${receipentId}`);
                const data = await response.json();
                setReceipentData(data);
            } catch (error) {
                console.log("error retreiving details", error);
            }
        }
        fetchReceipentData();
    }, [])
    const handleSend = async (messageType, imageUri) => {
        try {
            const formData = new FormData();
            formData.append("senderId", userId);
            formData.append("receipentId", receipentId);

            //if the message is a image or a normal text
            if (messageType === "image") {
                formData.append("messageType", "image");
                formData.append("imageFile", {
                    uri: imageUri,
                    name: "image.jpg",
                    type: "image/jpeg"
                })
            } else {
                formData.append("messageType", "text");
                formData.append("messageText", message);
            }
            const response = await fetch("http://192.168.0.104:4000/messages", {
                method: "POST",
                body: formData
            })
            if (response.ok) {
                setMessage("");
                setSelectedImage("");
                fetchMessages();
            }
        } catch (error) {
            console.log("error in sending the message", error);
        }
    }
    console.log("messages", messages);
    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: "",
            headerLeft: () => (
                <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
                    <Ionicons onPress={() => navigation.goBack()} name="arrowleft" size={24} color="black" />
                    {receipentData ? (
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Image style={{ width: 30, height: 30, borderRadius: 15, resizeMode: "cover" }} source={{ uri: receipentData.image }} />
                            <Text style={{ marginLeft: 5, fontSize: 15, fontWeight: "bold" }}>{receipentData.name}</Text>
                        </View>
                    ) : (
                        <Text>Loading...</Text>
                    )}
                </View>
            ),
        });
    }, [navigation, receipentData]);
    const formatTime = (time) => {
        const options = { hour: "numeric", minute: "numeric" };
        return new Date(time).toLocaleString("en-US", options);
    }

    const pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibrary({
                mediaType: 'photo',
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
    
            console.log("ImagePicker Result: ", result);
            handleSend("image", result.assets[0].uri);
    
            // if (!result.cancelled) {
            //     handleSend("image", result.uri);
            // }
        } catch (error) {
            console.error("Error picking image: ", error);
        }
    };
    

    return (
        <KeyboardAvoidingView style={{ flex: 1, backgroundColor: "#F0F0F0" }}>
            <ScrollView>
                {messages.map((item, index) => {
                    if (item.messageType === "text") {
                        return (
                            <Pressable key={index} style={[
                                item?.senderId?._id === userId ? { alignSelf: "flex-end", backgroundColor: "#DCF8C6", padding: 8, maxWidth: "60%", borderRadius: 7, margin: 10 } : { alignSelf: "flex-start", backgroundColor: "white", padding: 8, margin: 10, borderRadius: 7, maxWidth: "60%" }
                            ]}>
                                <Text style={{ fontSize: 13, textAlign: 'left' }}>{item?.message}</Text>
                                <Text style={{ textAlign: "right", fontSize: 9, color: "gray", marginTop: 5 }}>{formatTime(item.timeStamp)}</Text>
                            </Pressable>
                        )
                    }
                    if(item.messageType === "image"){
                        const baseUrl = "D:/AwesomeProject/api/files/";
                        const imageUrl = item.imageUrl;
                        const filename = imageUrl.split("\\").pop();
                        const source = {uri: baseUrl + filename};
                        console.log(source);
                        return (
                            <Pressable key={index} style={[
                                item?.senderId?._id === userId ? { alignSelf: "flex-end", backgroundColor: "#DCF8C6", padding: 8, maxWidth: "60%", borderRadius: 7, margin: 10 } : { alignSelf: "flex-start", backgroundColor: "white", padding: 8, margin: 10, borderRadius: 7, maxWidth: "60%" }
                            ]}>
                               <View>
                                <Image source={source} style={{width: 200, height: 200, borderRadius: 7}}/>
                                <Text style={{ textAlign: "right", bottom: 7, fontSize: 9, color: "gray", position:"absolute", right: 10, marginTop:5}}>{formatTime(item.timeStamp)}</Text>
                               </View>
                            </Pressable>
                        )
                    }
                })}
            </ScrollView>
            <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 10, paddingVertical: 10, borderTopWidth: 1, borderTopColor: "#dddddd", marginBottom: showEmojiSelector ? 0 : 25 }}>
                <Entypo onPress={handleEmojiPress} style={{ marginRight: 5 }} name="emoji-happy" size={24} color="gray" />
                <TextInput value={message} onChangeText={(text) => setMessage(text)} style={{ flex: 1, height: 40, borderWidth: 1, borderColor: "#dddddd", borderRadius: 20, paddingHorizontal: 10 }} placeholder="Type your message" />
                <View style={{ flexDirection: "row", alignItems: "center", gap: 7, marginHorizontal: 8 }}>
                    <Entypo onPress={pickImage} name="camera" size={24} color="gray" />
                    <Feather name="mic" size={24} color="gray" />
                </View>
                <Pressable onPress={() => handleSend("text")} style={{ backgroundColor: "#007bff", paddingVertical: 8, paddingHorizontal: 12, borderRadius: 20 }}>
                    <Text style={{ color: "white", fontWeight: "bold" }}>Send</Text>
                </Pressable>
            </View>
            {showEmojiSelector && (
                <EmojiSelector onEmojiSelected={(emoji) => {
                    setMessage((prevMessage) => prevMessage + emoji)
                }} style={{ height: 250 }} />
            )}
        </KeyboardAvoidingView>
    )
}

export default ChatMessageScreen

const styles = StyleSheet.create({})