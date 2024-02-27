import React, { useState,useEffect } from 'react';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { responsiveFontSize, responsiveHeight, responsiveScreenWidth, responsiveWidth } from "react-native-responsive-dimensions";
import { FontAwesome } from '@expo/vector-icons';

const ResetPassword = ({route}) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const userData = route.params;
  console.log(userData)
  const [showPassword, setShowPassword] = useState(false);
  const [newshowPassword, setNewShowPassword] = useState(false);
  const navigation = useNavigation();
  const userId = userData;
  // useEffect(() => {
  //   console.log('userData:', userData);
  // }, [userData]);
console.log(userId);

  const handleResetPassword = async () => {
    try {
      // Check if passwords match
      if (newPassword !== confirmNewPassword) {
        console.log('Passwords do not match');
        // You may want to show an error message to the user
        return;
      }
      
      // Make API request to update the password
      const response = await axios.post('https://lottery-backend-tau.vercel.app/api/v1/user/recover-password/reset-password', {
        userId: userId, // replace with the actual user ID
        password: newPassword,
        
      });

      if (response.status === 200) {
        console.log('Password updated successfully');
        navigation.navigate('Login');
        // Handle success, you may want to navigate to the login screen or display a success message
      } else {
        console.log('Failed to update password');
        
        // Handle failure, you may want to show an error message to the user
      }
    } catch (error) {
      console.error('Error updating password:', error.message);
      // Handle unexpected errors during password update
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', padding: 16 , backgroundColor:'white' }}>
       <Text  style={styles.createaccountText}>Reset Password</Text>
    <Text  style={styles.createaccountTextTwo}>Enter Your Password and Confirm</Text>

      {/* Enter New Password */}
{/* 
      <View style={{ borderColor: 'black',
marginTop:15,
      backgroundColor: 'white',
      width: '100%',
      borderWidth: 0.5,
      borderStyle: 'solid',
      fontSize: 15,
      borderRadius: 25,
      height:60,
      color: 'white',  // Text color
      overflow: "hidden",}}>
      <TextInput
        label="Enter New Password"
       
        style={{
          color: 'white',
          backgroundColor: 'white',
          height:60,
          borderWidth: 0.5,
         }}
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
      />
      </View> */}


<View
     style={{ borderColor: 'black',
     backgroundColor: 'white',
     marginTop:15,
     width: '100%',
     marginBottom: 10,
     height:59.5,
     borderWidth: .5,
     borderStyle: 'solid',
     fontSize: 15,
     borderRadius: 25,
     
     color: 'white',  
     overflow: "hidden",}}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TextInput
          label="New Password"
          style={{
            color: 'white',
            width: '90%', // Adjust the width as needed
            height: 60.5,
            borderBottomColor: 'white',
            borderBottomWidth: 0,
            borderLeftWidth: 0,
            borderRightWidth: 0,
            borderTopWidth: 0,
            backgroundColor: 'white',
            borderRadius: 20,
            marginTop: 0.2,
            overflow: 'hidden',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
          }}
          activeUnderlineColor="gray"
          secureTextEntry={!showPassword}
          value={newPassword}
          onChangeText={setNewPassword}
        />
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          style={{ padding: responsiveWidth(3), position: 'absolute', right: 0, zIndex: 1 }}
        >
          <FontAwesome
            name={showPassword ? 'eye-slash' : 'eye'}
            size={24}
            color="black"
          />
        </TouchableOpacity>
      </View>
    </View>




      {/* Re-enter New Password */}
      {/* <View style={{ borderColor: 'black',
marginTop:15,
      backgroundColor: 'white',
      width: '100%',
      borderWidth: 0.5,
      borderStyle: 'solid',
      fontSize: 15,
      borderRadius: 25,
      height:60,
      color: 'white',  // Text color
      overflow: "hidden",}}>
      <TextInput
        label="Re-enter New Password"
        
        style={{
          color: 'white',
          backgroundColor: 'white',
          height:60,
          borderWidth: 0.5,
         }}
        secureTextEntry
        value={confirmNewPassword}
        onChangeText={setConfirmNewPassword}
      />
      </View> */}


<View
      style={{ borderColor: 'black',
      backgroundColor: 'white',
      marginTop:15,
      width: '100%',
      marginBottom: 10,
      height:60,
      borderWidth: .5,
      borderStyle: 'solid',
      fontSize: 15,
      borderRadius: 25,
      
      color: 'white',  
      overflow: "hidden",}}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TextInput
          label="Reset New Password"
          style={{
            color: 'white',
            width: '90%', // Adjust the width as needed
            height: 60.5,
            borderBottomColor: 'white',
            borderBottomWidth: 0,
            borderLeftWidth: 0,
            borderRightWidth: 0,
            borderTopWidth: 0,
            backgroundColor: 'white',
            borderRadius: 20,
            marginTop: 0.2,
            overflow: 'hidden',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
          }}
          activeUnderlineColor="gray"
          secureTextEntry={!newshowPassword}
          value={confirmNewPassword}
          onChangeText={setConfirmNewPassword}
        />
        <TouchableOpacity
          onPress={() => setNewShowPassword(!newshowPassword)}
          style={{ padding: responsiveWidth(3), position: 'absolute', right: 0, zIndex: 1 }}
        >
          <FontAwesome
            name={newshowPassword ? 'eye-slash' : 'eye'}
            size={24}
            color="black"
          />
        </TouchableOpacity>
      </View>
    </View>

      {/* Submit Button */}
      <Button mode="contained" onPress={handleResetPassword} contentStyle={{
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  }}
  style={{
    backgroundColor: '#31A062',
    width: '100%',
    marginVertical: 10,
    marginTop: 15,
  }}>
        Reset
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  circleText: {
    backgroundColor: 'white',
    borderRadius: 50,
    width: 100,
    height: 100,
    textAlign: 'center',
    lineHeight: 100,
    fontSize: 20,
    marginTop: -20,
  },
  createaccountText: {
    
   
    // Add this line to align text to the left
    width: 354,
    height: 41,
    top: 103,
    left: 30,

    fontSize: 34, // Adjust the font size as needed
    fontWeight: 'bold',
    marginBottom:100
  },
  createaccountTextTwo: {
    
    fontSize: 17,
    width: 354,
    height: 22,
    top: 10,
    left: 38,
  
    fontSize: 13,
    marginBottom: 80,
    textAlign: 'left', // Add this line to align text to the left
  },
});

export default ResetPassword;
