import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import { SelectList } from 'react-native-dropdown-select-list'
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';


const FindLawyers = () => {
    const navigation = useNavigation();
    const onPress=()=>{
        navigation.replace("LawyerProfile")
    }
    const [selected, setSelected] = useState("");
    const data = [
        { key: '1', value: 'Prosecutor' },
        { key: '2', value: 'Family Lawyer' },
        { key: '3', value: 'Corporate lawyer' },
        { key: '4', value: 'Personal injury lawyer' },
        { key: '5', value: 'Maritime lawyers' },
        { key: '6', value: 'Counsel' },
        { key: '7', value: 'Workers compensation lawyer' },
    ]
    const [statusLawyers, setStatusLawyers] = useState([
        { id: 1, name: 'Advocate Mujahid', avatarUrl: 'https://img.freepik.com/free-photo/checking-statistics-successful-confident-businessman-stands-checks-online-news-tablet-inside-business-center-young-business-formal-suit_1258-80198.jpg?t=st=1707067198~exp=1707067798~hmac=d48bf6743c613674937285ae2b7ce4a01d458b1c7360f67d24bc0cf98f1c334d', based: 'Based in Karaci', type: 'Family Lawyer' },
        { id: 2, name: 'Ms. Alayna Khalid', avatarUrl: 'https://img.freepik.com/free-photo/brunette-business-woman-with-wavy-long-hair-blue-eyes-stands-holding-notebook-hands_197531-343.jpg?w=360&t=st=1707067287~exp=1707067887~hmac=c69a0764e643828aaf0d277c5bd993f55cb12f37e7798eaee06a4c36a892f07f', based: 'Based in Karaci', type: 'Criminal Lawyer' },
        { id: 3, name: 'Advocate Muhammad Haris', avatarUrl: 'https://img.freepik.com/free-photo/handsome-young-businessman-portrait_144627-21887.jpg?size=626&ext=jpg&ga=GA1.1.1587154722.1695882835&semt=ais', based: 'Based in Karaci', type: 'Property Lawyer' },
        { id: 4, name: 'Ms. Sana Hayat', avatarUrl: 'https://img.freepik.com/free-photo/young-smiling-businesswoman_329181-11700.jpg?w=360&t=st=1707067316~exp=1707067916~hmac=4383895faccd6275a247a511acec179ed8d96101db4cb67a98a6b2100f8818db', based: 'Based in Karaci', type: 'Family Lawyer' },
    ])

    const [statusUsers, setStatusUsers] = useState([
        { id: 1, name: 'Abdullah Khanzada', avatarUrl: 'https://bootdey.com/img/Content/avatar/avatar1.png' },
        { id: 2, name: 'Zainab Salahuddin', avatarUrl: 'https://bootdey.com/img/Content/avatar/avatar2.png' },
        { id: 3, name: 'Zainab Kashif', avatarUrl: 'https://bootdey.com/img/Content/avatar/avatar3.png' },
        { id: 4, name: 'Alayna Khalid', avatarUrl: 'https://bootdey.com/img/Content/avatar/avatar4.png' },
        { id: 5, name: 'Abdullah Khanzada', avatarUrl: 'https://bootdey.com/img/Content/avatar/avatar5.png' },
        { id: 6, name: 'Fazal Baksh', avatarUrl: 'https://bootdey.com/img/Content/avatar/avatar6.png' },
        { id: 7, name: 'Hashim Kardar', avatarUrl: 'https://bootdey.com/img/Content/avatar/avatar7.png' },
        { id: 8, name: 'Zumar Yousuf', avatarUrl: 'https://bootdey.com/img/Content/avatar/avatar8.png' },
        { id: 9, name: 'Jihan Sikandar', avatarUrl: 'https://bootdey.com/img/Content/avatar/avatar1.png' },
        { id: 10, name: 'Ayesha Gul', avatarUrl: 'https://bootdey.com/img/Content/avatar/avatar2.png' },
    ])

    const [posts, setPosts] = useState([
        {
            id: 1,
            userId: 1,
            username: 'User 1',
            avatarUrl: 'https://bootdey.com/img/Content/avatar/avatar2.png',
            date: 'May 18, 2023',
            description: 'This is a post description',
            imageUrl: 'https://www.bootdey.com/image/580x520/FF00FF/000000',
        },
        {
            id: 2,
            userId: 2,
            username: 'User 2',
            avatarUrl: 'https://bootdey.com/img/Content/avatar/avatar6.png',
            date: 'May 17, 2023',
            description: 'Another post',
            imageUrl: null,
        },

        {
            id: 3,
            userId: 1,
            username: 'User 1',
            avatarUrl: 'https://bootdey.com/img/Content/avatar/avatar3.png',
            date: 'May 18, 2023',
            description: 'This is a post description',
            imageUrl: 'https://www.bootdey.com/image/580x520/32CD32/000000',
        },
        {
            id: 4,
            userId: 3,
            username: 'User 4',
            avatarUrl: 'https://bootdey.com/img/Content/avatar/avatar6.png',
            date: 'May 17, 2023',
            description: 'Another post',
            imageUrl: null,
        },
        {
            id: 5,
            userId: 3,
            username: 'User 4',
            avatarUrl: 'https://bootdey.com/img/Content/avatar/avatar6.png',
            date: 'May 17, 2023',
            description: 'Another post',
            imageUrl: null,
        },
        {
            id: 6,
            userId: 1,
            username: 'User 1',
            avatarUrl: 'https://bootdey.com/img/Content/avatar/avatar3.png',
            date: 'May 18, 2023',
            description: 'This is a post description',
            imageUrl: 'https://www.bootdey.com/image/580x520/32CD32/000000',
        },
    ])

    

    const LawyerListNearby = ({ user }) => {
        return (
            <View style={styles.card}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>{user.type}</Text>
                    <Text style={styles.headerSubtitle}>
                        {user.based}
                    </Text>
                </View>

                <View style={styles.body}>
                    <Image source={{ uri: user.avatarUrl }} style={styles.avatar} />
                    <View style={styles.userInfo}>
                        <TouchableOpacity onPress={onPress}>
                        <Text style={styles.userName}>{user.name}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    };


    const PostCard = ({ post }) => (
        <View style={styles.postCard}>
            <View style={styles.postHeader}>
                <Image source={{ uri: post.avatarUrl }} style={styles.postAvatar} />
                <Text style={styles.postUsername}>{post.username}</Text>
                <Text style={styles.postDate}>{post.date}</Text>
            </View>
            <Text style={styles.postDescription}>{post.description}</Text>
            {post.imageUrl && (
                <Image source={{ uri: post.imageUrl }} style={styles.postImage} />
            )}
            <View style={styles.postFooter}>
                <TouchableOpacity style={styles.postButton}>
                    <Text style={styles.postButtonText}>Like</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.postButton}>
                    <Text style={styles.postButtonText}>Comment</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.postButtonText}>Share</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    const UserListItem = ({ user }) => (
        <View style={styles.userItem}>
            <Image source={{ uri: user.avatarUrl }} style={styles.avatar} />
            <Text style={styles.statusUserName} ellipsizeMode='tail' numberOfLines={1}>{user.name}</Text>
        </View>
    );


    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flexDirection: "row", padding: 15, justifyContent: 'space-between' }}>
                <FontAwesome name="balance-scale" size={30} color="#294c85" />
                <View style={{ flexDirection: "row" }}>
                    <Feather name="search" size={30} color="#294c85" style={{ marginRight: 10 }} />
                    <Feather name="menu" size={30} color="#294c85" />
                </View>
            </View>
            <View style={{ paddingHorizontal: 15 }}>
                <Text style={{ color: "#294c85", fontSize: 20, fontWeight: "900" }}>Filter Results</Text>
            </View>
            <View style={{ flexDirection: "row", padding: 0 }}>
                <SelectList
                    setSelected={(val) => setSelected(val)}
                    data={data}
                    save="value"
                    boxStyles={{ borderWidth: 0, borderColor: "transparent" }}
                    inputStyles={{ fontSize: 15, padding: 0, color: "#294c85" }}
                    placeholder='Lawyers by Categories'
                    dropdownTextStyles={{ margin: 0, color: "#294c85" }}
                    dropdownStyles={{ borderWidth: 0, borderColor: "transparent", margin: 0 }}
                />
                <SelectList
                    setSelected={(val) => setSelected(val)}
                    data={data}
                    save="value"
                    boxStyles={{ borderWidth: 0, borderColor: "transparent" }}
                    inputStyles={{ fontSize: 15, padding: 0, color: "#294c85" }}
                    placeholder='Lawyers by Pricing'
                    dropdownTextStyles={{ margin: 0, color: "#294c85" }}
                    dropdownStyles={{ borderWidth: 0, borderColor: "transparent", margin: 0 }}
                />
            </View>
            <View style={{ paddingHorizontal: 15 }}>
                <Text style={{ color: "#294c85", fontSize: 20, fontWeight: "900" }}>Nearby Lawyers</Text>
            </View>
            <ScrollView horizontal>
                <View style={styles.userContainer}>
                    {statusLawyers.map(user => <LawyerListNearby key={user.id} user={user} />)}
                </View>
            </ScrollView>

            {/* <FlatList
                data={posts}
                contentContainerStyle={styles.postListContainer}
                keyExtractor={post => post.id.toString()}
                renderItem={({ item }) => <PostCard post={item} />}

            /> */}

            <View style={{ paddingHorizontal: 15 }}>
                <Text style={{ color: "#294c85", fontSize: 20, fontWeight: "900" }}>People with similar interests</Text>
            </View>

            <ScrollView horizontal>
                <View style={styles.userContainer}>
                    {statusUsers.map(user => <UserListItem key={user.id} user={user} />)}
                </View>
            </ScrollView>



            <View style={{ paddingHorizontal: 15 }}>
                <Text style={{ color: "#294c85", fontSize: 20, fontWeight: "900" }}>Famous Lawyers</Text>
            </View>
            <ScrollView horizontal>
                <View style={styles.userContainer}>
                    {statusLawyers.map(user => <LawyerListNearby key={user.id} user={user} />)}
                </View>
            </ScrollView>


        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        paddingBottom: 120,
        backgroundColor: "white",
    },
    userContainer: {
        flexDirection: 'row',
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: '#fff',
        height: "auto",
    },
    postListContainer: {
        paddingTop: 20,
        paddingHorizontal: 15,
    },
    postCard: {
        marginBottom: 10,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
    },
    postHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    postAvatar: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginRight: 10,
    },
    postUsername: {
        flex: 1,
    },
    postDate: {
        fontSize: 12,
        color: '#A9A9A9',
    },
    postDescription: {
        fontSize: 16,
        color: '#00008B'
    },
    postImage: {
        marginTop: 0,
        width: '100%',
        height: 200,
    },
    postFooter: {
        flexDirection: 'row',
        marginTop: 0,
    },
    postButton: {
        marginRight: 10,
    },
    postButtonText: {
        color: '#808080'
    },
    card: {
        flex: 1,
        backgroundColor: '#313742',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
        marginBottom: 16,
        padding: 16,
        marginHorizontal: 10,
    },
    header: {
        marginBottom: 8,
    },
    headerTitle: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    headerSubtitle: {
        fontSize: 12,
        color: '#ffffff',
    },
    body: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginRight: 8,
    },
    userInfo: {
        flex: 1,
    },
    userName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#ffffff',
        paddingLeft: 10,
    },
    userRole: {
        fontSize: 12,
        color: '#ffffff',
    },
    userItem: {
        marginRight: 10,
        alignItems: 'center',
        marginLeft: 10,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
    },
    statusUserName: {
        marginTop: 5,
        fontSize: 12,
        color: '#483D8B',
        width: 60,
        textAlign: 'center'
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
});


export default FindLawyers

