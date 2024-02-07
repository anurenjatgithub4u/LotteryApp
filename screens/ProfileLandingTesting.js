import { StyleSheet, Text, View ,Image} from "react-native";
import React, { TouchableOpacity } from "react";
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native-paper";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";


const ProfileLandingTesting = () => {
  const navigation = useNavigation();

  const imageUrl = 'https://th.bing.com/th/id/R.dba7c2e0beae32f5dcc9bb7a11bcfc9a?rik=iVMsLRscBKLqYw&riu=http%3a%2f%2fclipart-library.com%2fimages_k%2fdollar-signs-transparent%2fdollar-signs-transparent-19.png&ehk=MnJi%2b9rQhoH1dgkMOR3qurQN7XV7SzLe9IvHncEFfeM%3d&risl=&pid=ImgRaw&r=0';

  return (
    <View
      style={{
        flex: 1,
        padding: 16,
        alignItems: "center",
        justifyContent: "center",
      }}
    >

<Image source={{ uri: imageUrl }} style={{ width: '50%', height: responsiveHeight(40),marginTop:responsiveHeight(5) }} />

      <Text style={{ fontSize: responsiveFontSize(3.5), fontWeight: "bold" }}>
        Win big With{" "}
      </Text>

      <Text style={{ fontSize: responsiveFontSize(3.5), fontWeight: "bold" }}>
        Afro lottery system
      </Text>

      <Text
        style={{
          fontSize: responsiveFontSize(1.6),
          marginTop: responsiveHeight(4),
        }}
      >
        Six Numbers Can Change Your Life
      </Text>

      <Text style={{ fontSize: responsiveFontSize(1.6) }}>
        Get started today and try your luck with us{" "}
      </Text>

      <Button
        style={{ backgroundColor: "#31A062", marginTop: responsiveHeight(6) ,width:'80%',height:responsiveHeight(7),alignItems:'center',justifyContent:'center'}}
        onPress={() => navigation.navigate("Register")}
      >
        <Text style={{ color: "white" }}>Create Account</Text>
      </Button>

      <Text
        onPress={() => navigation.navigate("Login")}
        style={{ color: "#31A062", fontSize: responsiveFontSize(2), marginTop: responsiveHeight(1)  }}
      >
        Login{" "}
      </Text>
    </View>
  );
};

export default ProfileLandingTesting;

const styles = StyleSheet.create({});
