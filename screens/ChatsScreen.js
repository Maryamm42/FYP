import { StyleSheet, Text, View, ScrollView, Pressable} from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios';
import { UserType } from '../UserContext';
import { useNavigation } from '@react-navigation/native';
import UserChat from '../components/UserChat';

const ChatsScreen = () => {
  const [acceptedFriends, setAcceptedFriends] = useState([]);
  const { userId, setUserId } = useContext(UserType);
  const navigation = useNavigation();
  useEffect(() => {
    const acceptedFriendsList = async () => {
      try {
        const response = await fetch(`http://192.168.0.104:4000/accepted-friends/${userId}`);
        const data = await response.json();

        if (response.ok) {
          setAcceptedFriends(data)
        }
      } catch (error) {
        console.log("error showing accpeted friends", error);
      }
    };
    acceptedFriendsList();
  }, []);
  console.log("friends", acceptedFriends)
  return (
    <ScrollView showsHorizontalScrollIndicator={false}> 
    <Pressable>
      {acceptedFriends.map((item, index)=>(
        <UserChat key={index} item={item}/>
      ))}
    </Pressable>
    </ScrollView>
  )
}

export default ChatsScreen

const styles = StyleSheet.create({})