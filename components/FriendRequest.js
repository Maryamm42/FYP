import { StyleSheet, Text, View, Pressable, Image } from 'react-native'
import React, {useContext} from 'react';
import axios from 'axios';
import {UserType } from '../UserContext';
import { useNavigation } from '@react-navigation/native';

const FriendRequest = ({ item, friendRequests, setFriendRequests }) => {
    const {userId, setUserId} = useContext(UserType);
    const navigation = useNavigation();
    const acceptRequest = async (friendRequestId)=>{
        try{
            const response = await fetch("http://192.168.0.104:4000/friend-request/accept", {
                method: "POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body:JSON.stringify({
                    senderId:friendRequestId,
                    receipentId:userId,
                })
            })
            if (response.ok){
                setFriendRequests(friendRequests.filter((request) => request._id !== friendRequestId));
                navigation.navigate("Chats")
            }
        }catch(error){
            console.log("error accepting the friend request", error)
        }
    }
    return (
        <Pressable style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginVertical: 10 }}>
            <Image style={{ width: 50, height: 50, borderRadius: 25 }} source={{ uri: item?.image }} />
            <Text style={{ fontSize:15, fontWeight: "bold", marginLeft: 10, flex: 1 }}>{item?.name} sent you a friend request</Text>
            <Pressable style={{ backgroundColor: "#0066b2", padding: 10, borderRadius: 6 }}>
                <Text onPress={()=> acceptRequest(item._id)} style={{ textAlign: "center", color: "white" }}>Accept</Text>
            </Pressable>
        </Pressable>
    )
}

export default FriendRequest

const styles = StyleSheet.create({})