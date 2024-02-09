import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import Svg, { Line } from 'react-native-svg'
import AntDesign from "react-native-vector-icons/AntDesign";
import { useNavigation } from '@react-navigation/native'

const LawyerProfile = () => {
  const navigation = useNavigation();
  const goBack=()=>{
    navigation.replace("BottomTabs");
  }
  return (
    <SafeAreaView style={{backgroundColor:"#d9dbdb"}}>
      <View style={{ marginHorizontal: 10, flexDirection: "row", marginTop:7 }}>
        <TouchableOpacity onPress={goBack}>
        <MaterialIcons style={{ marginRight: 5, padding: 5 }} name="keyboard-backspace" size={35} color="black" />
        </TouchableOpacity>
        <Text style={{ flex: 1, fontSize: 20, fontWeight: "500", color: "black", marginLeft: 15, padding: 10 }}>Booking Details</Text>
      </View>
      <View>
        {/* LawyerProfiledabba */}
        <View style={styles.ProfileContainer}>
          <Image style={styles.ImageContainer} source={{ uri: 'https://img.freepik.com/free-photo/checking-statistics-successful-confident-businessman-stands-checks-online-news-tablet-inside-business-center-young-business-formal-suit_1258-80198.jpg?t=st=1707067198~exp=1707067798~hmac=d48bf6743c613674937285ae2b7ce4a01d458b1c7360f67d24bc0cf98f1c334d' }} />
          <View style={styles.TextConatiner}>
            <Text style={styles.NameContainer}>Advocate Mujahid Khan</Text>
            <Text style={styles.TypeContainer}>Family Lawyer</Text>
            <View style={{ flexDirection: "row" }}>
              <View style={{ paddingHorizontal: 10, flexDirection: "row" }}>
                <Entypo style={{ marginRight: 2, paddingVertical: 5 }} name="star" size={20} color="#cfb536" />
                <Text style={{ color: "black", fontSize: 15, paddingVertical: 6, fontWeight: "400" }}>4.4</Text>
              </View>
              <View style={{ paddingHorizontal: 10, flexDirection: "row" }}>
                <Entypo style={{ marginRight: 2, paddingVertical: 7 }} name="location-pin" size={20} color="#294c85" />
                <Text style={{ color: "black", fontSize: 15, paddingVertical: 6, fontWeight: "400" }}>Karachi, Pak</Text>
              </View>
              <View style={{ paddingHorizontal: 10, flexDirection: "row" }}>
                <MaterialIcons style={{ marginRight: 1, paddingVertical: 7 }} name="attach-money" size={20} color="#107021" />
                <Text style={{ color: "black", fontSize: 15, paddingVertical: 7, fontWeight: "400" }}>16/hr</Text>
              </View>

            </View>
          </View>

        </View>
        {/* LawyerExperinceDabba */}
        <View style={styles.ExperienceContainer}>
          <Text style={{ paddingHorizontal: 10, color: "black", fontSize: 20, fontWeight: "800" }}>Experience & Expertise</Text>
          <Text style={{ padding: 10, color: "black", fontSize: 17, textAlign: "justify" }}>As a seasoned family lawyer, I bring a wealth of experience and compassion to each case I handle.
          </Text>
        </View>

        {/* OnlineConsutation Dabba */}
        <View style={styles.Container}>
          <Text style={{ fontSize: 20, color: "black", fontWeight: "600", paddingHorizontal: 10, paddingVertical: 7 }}>Online Consultation</Text>
          <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 10, paddingVertical: 5 }}>
            <Text style={{ fontWeight: "500", fontSize: 18 }}>Date</Text>
            <Text style={{ fontWeight: "500", fontSize: 18 }}>19.07.2023</Text>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 10, paddingVertical: 5 }}>
            <Text style={{ fontWeight: "500", fontSize: 18 }}>Time Slot</Text>
            <Text style={{ fontWeight: "500", fontSize: 18 }}>10am - 11am</Text>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 10, paddingVertical: 5 }}>
            <Text style={{ fontWeight: "500", fontSize: 18 }}>Amount</Text>
            <Text style={{ fontWeight: "500", fontSize: 18 }}>$15</Text>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 10, paddingVertical: 5 }}>
            <Text style={{ fontWeight: "500", fontSize: 18 }}>GST$0.15</Text>
            <Text style={{ fontWeight: "500", fontSize: 18 }}>$15</Text>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 10, paddingVertical: 5 }}>
            <Text style={{ fontWeight: "500", fontSize: 18 }}>Total</Text>
            <Text style={{ fontWeight: "500", fontSize: 18 }}>$15.15</Text>
          </View>
          <View style={styles.LineContainer}>
            <Svg height="1" width="100%">
              <Line x1="0" y1="0" x2="100%" y2="0" stroke="black" strokeWidth="1" />
            </Svg>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 10, paddingVertical: 5 }}>
            <Text style={{ fontWeight: "500", fontSize: 18 }}>Status</Text>
            <View style={{flexDirection:"row"}}>
            <AntDesign style={{ marginRight: 2, paddingVertical: 5 }} name="checkcircle" size={20} color="#294c85" />
            <Text style={{ fontWeight: "500", fontSize: 18, marginLeft:7, marginTop:2}}>Paid</Text>
            </View>
           
          </View>
        </View>

        {/* Buttonsdabba */}
        <View style={{marginHorizontal:15, marginTop:10, flexDirection: "row", justifyContent:"space-between"}}>
          <TouchableOpacity style={{borderRadius:5, paddingHorizontal:50, paddingVertical:10, backgroundColor:"#107021"}}>
            <Text style={{color:"white", fontSize:20}}>Schedule</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{borderRadius:5, paddingHorizontal:50, paddingVertical:10, backgroundColor:"#107021"}}>
            <Text style={{color:"white", fontSize:20}}>message</Text>
          </TouchableOpacity>
        </View>

      </View>

    </SafeAreaView>
  )
}

export default LawyerProfile

const styles = StyleSheet.create({
  ProfileContainer: {
    backgroundColor: "#c3dec6",
    height: "auto",
    paddingVertical: 16,
    marginTop: 20,
    marginBottom:10,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginHorizontal: 10,
    borderRadius: 5,
  },
  ImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginHorizontal: 10,
    borderWidth: 3,
    borderColor: "#b8b9ba"
  },
  TextConatiner: {
    flex: 1,
    flexDirection: "column",
  },
  NameContainer: {
    color: "black",
    fontSize: 20,
    paddingHorizontal: 10,
    fontWeight: "600"
  },
  TypeContainer: {
    fontSize: 15,
    fontWeight: "500",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  ExperienceContainer: {
    margin: 10,
    flexDirection: "column"
  },
  Container: {
    backgroundColor: '#c3dec6',
    margin: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginHorizontal: 10,
    flexDirection: "column",
    padding: 10,
    borderRadius: 5,
  },
  LineContainer: {
    marginVertical: 10, // Adjust margin as needed
  },

})