import React, { useState,useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
const ResetPassword = ({route}) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const userData = route.params;
  console.log(userData)

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
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <Text style={styles.circleText}>LOCO</Text>
      <Text>Reset Password</Text>

      {/* Enter New Password */}
      <TextInput
        label="Enter New Password"
        mode="outlined"
        style={{ width: '100%', marginVertical: 10 }}
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
      />

      {/* Re-enter New Password */}
      <TextInput
        label="Re-enter New Password"
        mode="outlined"
        style={{ width: '100%', marginVertical: 10 }}
        secureTextEntry
        value={confirmNewPassword}
        onChangeText={setConfirmNewPassword}
      />

      {/* Submit Button */}
      <Button mode="contained" onPress={handleResetPassword} style={{ width: '100%', marginVertical: 10 }}>
        Submit
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
});

export default ResetPassword;
