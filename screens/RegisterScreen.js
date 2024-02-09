import { StyleSheet, Text, View, SafeAreaView, Image, KeyboardAvoidingView, TextInput, Pressable, Alert } from 'react-native'
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
//import { useNavigation } from '@react-navigation/core';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from "react-native-vector-icons/FontAwesome";

const RegisterScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [image, setImage] = useState("");

    const navigation = useNavigation();
    const handleRegister = () => {
        const user = {
            name: name,
            email: email,
            password: password,
            image: image
        }
        axios.post("http://192.168.0.104:4000/register", user).then((response) => {
            console.log(response)
            Alert.alert("Registration successful", "you have been registered successfully");
            setName("");
            setEmail("");
            setPassword("");
            setImage("");
        }).catch((error) => {
            Alert.alert("Registeration failed", "an error occured during registration")
            console.log("error", error)
        })

    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#313742", alignItems: "center" }}>
            <View style={{ marginTop: 70 }}>
            <FontAwesome name="balance-scale" size={100} color="#cfb536" />
            </View> 
            <KeyboardAvoidingView>
                <View style={{ alignItems: "center", justifyContent: "center" }}>
                    <View style={{ alignItems: "center", justifyContent: "center" }}>
                        <Text style={{ fontSize: 17, fontWeight: "bold", marginTop: 25, color:"white" }}>Register your account</Text>
                    </View>
                    <View style={{ marginTop: 40 }}>
                        <View style={{ flexDirection: "row", alignItems: "center", gap: 20, borderColor: "white", borderWidth: 1, paddingVertical: 5, borderRadius: 5 }}>
                            <Ionicons name="person" size={24} color="white" style={{ marginLeft: 20 }} />
                            <TextInput value={name} onChangeText={(text) => setName(text)} placeholderTextColor={"white"} style={{ color: "white", marginVertical: 10, width: 300, fontSize: password ? 16 : 16 }} placeholder='Enter your Name' />
                        </View>
                    </View>
                    <View style={{ marginTop: 30 }}>
                        <View style={{ flexDirection: "row", alignItems: "center", gap: 20, borderColor: "white", borderWidth: 1, paddingVertical: 5, borderRadius: 5 }}>
                            <MaterialIcons name="email" size={24} color="white" style={{ marginLeft: 20 }} />
                            <TextInput value={email} onChangeText={(text) => setEmail(text)} placeholderTextColor={"white"} style={{ color: "white", marginVertical: 10, width: 300, fontSize: email ? 16 : 16 }} placeholder='Enter your email' />
                        </View>
                    </View>
                    <View style={{ marginTop: 30 }}>
                        <View style={{ flexDirection: "row", alignItems: "center", gap: 20, borderColor: "white", borderWidth: 1, paddingVertical: 5, borderRadius: 5 }}>
                            <AntDesign name="lock" size={24} color="white" style={{ marginLeft: 20 }} />
                            <TextInput secureTextEntry={true} value={password} onChangeText={(text) => setPassword(text)} placeholderTextColor={"white"} style={{ color: "white", marginVertical: 10, width: 300, fontSize: password ? 16 : 16 }} placeholder='Enter your Password' />
                        </View>
                    </View>

                    <View style={{ marginTop: 30 }}>
                        <View style={{ flexDirection: "row", alignItems: "center", gap: 20, borderColor: "white", borderWidth: 1, paddingVertical: 5, borderRadius: 5 }}>
                            <AntDesign name="lock" size={24} color="white" style={{ marginLeft: 20 }} />
                            <TextInput value={image} onChangeText={(text) => setImage(text)} placeholderTextColor={"white"} style={{ color: "white", marginVertical: 10, width: 300, fontSize: password ? 16 : 16 }} placeholder='Upload your image' />
                        </View>
                    </View>

                </View>
                <View style={{ marginTop: 20 }}>
                    <Pressable
                     onPress={handleRegister} 
                     style={{ width: 200, backgroundColor: "#107021", padding: 15, marginTop: 30, marginLeft: "auto", marginRight: "auto", borderRadius: 6 }}>
                        <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 16, color: "white" }}>Register</Text>
                    </Pressable>
                    <Pressable style={{ marginTop: 10 }} onPress={() => navigation.goBack()}>
                        <Text style={{ textAlign: "center", fontSize: 16, color:"white" }}>Already have an account ? Sign In </Text>
                    </Pressable>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({})