import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from './screens/HomeScreen';
import FriendsScreen from './screens/FriendsScreen';
import ChatsScreen from './screens/ChatsScreen';
import ChatMessageScreen from './screens/ChatBot';
import MainScreen from './screens/MainScreen';
import MainScreen2 from './screens/MainScreen2';
import FindLawyers from './screens/FindLawyers';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LawyerProfile from './screens/LawyerProfile';
import ChatBot from './screens/ChatBot';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ExploreGroupChats from './screens/ExploreGroupChats';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Blogs from './screens/Blogs';

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  function BottomTabs() {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="FindLawyers"
          component={ FindLawyers }
          options={{
            tabBarLabel: "Home",
            tabBarLabelStyle: { color: "black" },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Entypo name="home" size={24} color="black" />
              ) : (
                <AntDesign name="home" size={24} color="black" />
              )
          }} />
          <Tab.Screen
          name="Chatbot"
          component={ChatBot}
          options={{
            tabBarLabel:"Ask Chatbot",
            tabBarLabelStyle:{color:"black"},
            headerShown: false,
            tabBarIcon:({focused}) => 
            focused ? (
              <MaterialCommunityIcons name="robot" size={24} color="black"/>
            ) : (
              <MaterialCommunityIcons name="robot-outline" size={24} color="black"/>
            )
          }}
          />
           <Tab.Screen
          name="GroupChats"
          component={ExploreGroupChats}
          options={{
            tabBarLabel:"Group Chats",
            tabBarLabelStyle:{color:"black"},
            headerShown: false,
            tabBarIcon:({focused}) => 
            focused ? (
              <Ionicons name="chatbubbles-sharp" size={24} color="black"/>
            ) : (
              <Ionicons name="chatbubbles-outline" size={24} color="black"/>
            )
          }}
          />
           <Tab.Screen
          name="Blogs"
          component={Blogs}
          options={{
            tabBarLabel:"Blogs & Articles",
            tabBarLabelStyle:{color:"black"},
            headerShown: false,
            tabBarIcon:({focused}) => 
            focused ? (
              <Ionicons name="reader" size={24} color="black"/>
            ) : (
              <Ionicons name="reader-outline" size={24} color="black"/>
            )
          }}
          />
        
      </Tab.Navigator>
    );
  }
 
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Main' component={MainScreen} options={{headerShown: false}}/>
        <Stack.Screen name='Main2' component={MainScreen2} options={{headerShown: false}}/>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name='LawyerProfile' component={LawyerProfile} options={{headerShown: false}}/>
        <Stack.Screen name='BottomTabs' component={BottomTabs} options={{headerShown: false}}/>
        {/* <Stack.Screen name='FindLawyers' component={FindLawyers} options={{headerShown: false}}/>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Friends" component={FriendsScreen} />
        <Stack.Screen name="Chats" component={ChatsScreen} />
        <Stack.Screen name="Messages" component={ChatMessageScreen} /> */}

      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default StackNavigator

const styles = StyleSheet.create({})