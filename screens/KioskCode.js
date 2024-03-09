import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Alert } from 'react-native';

const KioskCode = () => {
  const [couponCodee, setCouponCode] = useState('');
  const navigation = useNavigation();
  const addCreditsUsingCoupon = async (userId, couponCode, authToken) => {

    const storedAccessToken = await AsyncStorage.getItem('accessToken');
      const userIds = await AsyncStorage.getItem('userId');
    const apiUrl = "https://lottery-backend-tau.vercel.app/api/v1/user/add-credits-using-coupon"; // Replace with your actual API endpoint URL
    const codee ="53QC0B15"
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${storedAccessToken}`,
      },
      body: JSON.stringify({ userId:userIds, couponCode:couponCodee }),
    };
  
    try {
      const response = await fetch(apiUrl, requestOptions);
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
  
      const responseData = await response.json();
      console.log("Success")
      Alert.alert(
        '',
        'Credits Added Successfully',
        [{ text: 'OK', onPress: () => navigation.navigate("Hom") }]
      );
      
      return responseData;
    } catch (error) {
      

      Alert.alert(
        'Failed',
        error.message,
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
      );
      
    }
  };
  
  // Example usage
  
  
  return (
    <View style={styles.container}>

<View style={styles.backButtonContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("PaymentMethodPage")}>
          <MaterialIcons
            name="keyboard-arrow-left"
            size={35}
            color="black"
           
          />
        </TouchableOpacity>
      </View>

      <Text>KioskCode</Text>

      <TextInput
        style={styles.inputField}
        placeholder="Enter Coupon Code"
        value={couponCodee}
        onChangeText={(text) => setCouponCode(text)}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={addCreditsUsingCoupon}
      >
        <Text style={styles.buttonText}>Add Credits</Text>
      </TouchableOpacity>
    </View>
  );
};

export default KioskCode;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputField: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    margin: 10,
    width: 200,
    borderRadius:20
  },
  addButton: {
    backgroundColor: '#31A062',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    borderRadius:16
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  backButtonContainer: {
    position: 'absolute',
    top: 10, // Adjust this value to change the distance from the top
    left: 10,
    zIndex: 1,
    marginTop:'10%'
  },
});
