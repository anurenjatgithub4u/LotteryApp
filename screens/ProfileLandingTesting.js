import { StyleSheet, Text, View ,Image,Platform} from "react-native";
import React, { useState,useEffect,TouchableOpacity } from "react";
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native-paper";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";

import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

const ProfileLandingTesting = () => {
  const navigation = useNavigation();


  


  const [expoPushToken, setExpoPushToken] = useState("");

  useEffect(() => {
    console.log("Registering for push notifications...");
    registerForPushNotificationsAsync()
      .then((token) => {
        console.log("token: ", token);
        setExpoPushToken(token);
      })
      .catch((err) => console.log(err));
  }, []);

  async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      // Learn more about projectId:
      // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
      token = (
        await Notifications.getExpoPushTokenAsync({
          projectId: "0bb3470e-2599-49f1-be08-9b6def18edc2",
        })
      ).data;
      console.log(token);
    } else {
      console.log("Must use physical device for Push Notifications");
    }




    return token;
  }

  const sendNotification = async () => {
    console.log("Sending push notification...");

    // notification message
    const message = {
      to: expoPushToken,
      sound: "default",
      title: "My first push notification!",
      body: "This is my first push notification made with expo rn app",
    };

    try {
      const response = await fetch("https://exp.host/--/api/v2/push/send", {
        method: "POST",
        headers: {
          host: "exp.host",
          accept: "application/json",
          "accept-encoding": "gzip, deflate",
          "content-type": "application/json",
        },
        body: JSON.stringify(message),
      });
  
      const result = await response.json();
      console.log("Push notification sent successfully:", result);
    } catch (error) {
      console.error("Error sending push notification:", error.message);
    }
  };


  


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
