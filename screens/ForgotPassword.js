// import { useNavigation } from '@react-navigation/native';
// import React, { useState } from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import { TextInput, Button } from 'react-native-paper';
// import axios from 'axios';
// const ForgotPassword = () => {
//   const [emailFor, setEmailFor] = useState('');
//   const [otp, setOtp] = useState(['', '', '', '', '', '']);
//     const navigation = useNavigation();
//   const [userData, setUserData] = useState('');

//   const handleResetLink = async () => {

//      console.log("hello")
//     try {
//       // Validate email
//       if (!emailFor) {
//         console.log('Please provide an email');
//         return;
//       }
 
//       // Make API request to the server to send OTP
//       const response = await axios.post('https://lottery-backend-tau.vercel.app/api/v1/user/recover-password/forget-password', {
//         email: emailFor,
//       });

//       if (response.status === 200) {
//         console.log('OTP sent successfully hello');
//         console.log(response)
//         const userId = response.data.message;
//         console.log(emailFor)
//         // Set the user data to be used in the OTPVerificationScreen
//         setUserData(userId );
//         console.log("hello",userId)
//         // Handle success, you may want to navigate to the OTP screen here
//         // and pass necessary data like email and user ID
//         // For example:
//         // navigation.navigate('OTP', { email: emailFor, userId: response.data.userId });
//       } else {
//         console.log('Failed to send OTP');
//         // Handle failure, you may want to show an error message
//       }
//     } catch (error) {
//       console.error('Error sending OTP:', error.message);
//       // Handle unexpected errors during OTP sending
//     }
//   };




//   const handleVerifyOtp = async () => {
//     console.log("verify otp")
//     try {
//       // Validate OTP
//       // You may want to add validation for each digit in the OTP array
//       if (!userData) {
//         console.error('User data is null or missing userId');
//         // Handle the case where user data is not available
//         return;
//       }
  
//       // Make API request to the server to verify OTP
//       console.log(userData)
//       const response = await axios.post('https://lottery-backend-tau.vercel.app/api/v1/user/recover-password/verify-otp-reset', {
//         email: emailFor,
//         otp: otp, // Convert the array of digits to a string
//         userId: userData, // Assuming you have userId stored in userData
//       });
  
//       console.log(otp); // Log the OTP for debugging purposes
  
//       if (response.status === 200) {
//         console.log('OTP verified successfully');
//         // Extract email and userId from the response data
//         const { email, userId } = response.data;
//         // Set the user data to be used in the OTPVerificationScreen
//         // setUserData({ email, userId });
//         // Navigate to the ResetPassword screen
//         navigation.navigate('ResetPassword',userData);
//       } else {
//         console.log('Failed to verify OTP');
//         // Handle failure, you may want to show an error message
//       }
//     } catch (error) {
//       console.error('Error verifying OTP:', error.message);
//       // Handle unexpected errors during OTP verification
//       console.log(response.data);
//     }
//   };
  


  

 

//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16 }}>
//       <Text style={styles.circleText}>LOCO</Text>
//       <Text>Forgot Password </Text>
//       <TextInput
//         label="Email"
//         mode="outlined"
//         style={{ width: '100%', marginVertical: 10 }}
//         keyboardType="email-address"
//         autoCapitalize="none"
//         value={emailFor}
//         onChangeText={setEmailFor}
//       />

//       <Button mode="contained" onPress={handleResetLink} style={{ width: '100%', marginVertical: 10 }}>
//         Reset Link
//       </Button>

//       <Text style={{ marginVertical: 10 }}>OTP</Text>

//       {/* OTP Input Box */}
//       <View style={styles.otpContainer}>
//         {[1, 2, 3, 4, 5, 6].map((digit) => (
//           <TextInput
//             key={digit}
//             style={styles.otpInput}
//             mode="outlined"
//             keyboardType="numeric"
//             maxLength={1}
//             value={otp[digit - 1]}
//             onChangeText={(text) => {
//               const newOtp = [...otp];
//               newOtp[digit - 1] = text;
//               setOtp(newOtp.join(''));
//             }}
//           />
//         ))}
//       </View>

//       {/* Verify Button */}
//       <Button mode="contained" onPress={handleVerifyOtp} style={{ width: '100%', marginVertical: 10 }}>
//         Verify
//       </Button>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   circleText: {
//     backgroundColor: 'white',
//     borderRadius: 50,
//     width: 100,
//     height: 100,
//     textAlign: 'center',
//     lineHeight: 100,
//     fontSize: 20,
//     marginTop: -20,
//   },
//   otpContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   otpInput: {
//     width: '12%',
//     margin: 5,
//   },
// });

// export default ForgotPassword;


import { useNavigation } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import axios from 'axios';
const ForgotPassword = () => {
  const [emailFor, setEmailFor] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const navigation = useNavigation();
  const [userData, setUserData] = useState('');
  const otpInputsRef = useRef(Array(6).fill(null));
  const handleResetLink = async () => {

     console.log("hello")
    try {
      // Validate email
      if (!emailFor) {
        console.log('Please provide an email');
        return;
      }
 
      // Make API request to the server to send OTP
      const response = await axios.post('https://lottery-backend-tau.vercel.app/api/v1/user/recover-password/forget-password', {
        email: emailFor,
      });

      if (response.status === 200) {
        console.log('OTP sent successfully hello');
        console.log(response)
        const userId = response.data.message;
        console.log(emailFor)
        // Set the user data to be used in the OTPVerificationScreen
        setUserData(userId );
        console.log("hello",userId)
        // Handle success, you may want to navigate to the OTP screen here
        // and pass necessary data like email and user ID
        // For example:
        // navigation.navigate('OTP', { email: emailFor, userId: response.data.userId });
      } else {
        console.log('Failed to send OTP');
        // Handle failure, you may want to show an error message
      }
    } catch (error) {
      console.error('Error sending OTP:', error.message);
      // Handle unexpected errors during OTP sending
    }
  };




  const handleVerifyOtp = async () => {
    console.log("verify otp")
    try {
      // Validate OTP
      // You may want to add validation for each digit in the OTP array
      if (!userData) {
        console.error('User data is null or missing userId');
        // Handle the case where user data is not available
        return;
      }
  
      // Make API request to the server to verify OTP
      console.log(userData)
      const response = await axios.post('https://lottery-backend-tau.vercel.app/api/v1/user/recover-password/verify-otp-reset', {
        email: emailFor,
        otp: otp, // Convert the array of digits to a string
        userId: userData, // Assuming you have userId stored in userData
      });
  
      console.log(otp); // Log the OTP for debugging purposes
  
      if (response.status === 200) {
        console.log('OTP verified successfully');
        // Extract email and userId from the response data
        const { email, userId } = response.data;
        // Set the user data to be used in the OTPVerificationScreen
        // setUserData({ email, userId });
        // Navigate to the ResetPassword screen
        navigation.navigate('ResetPassword',userData);
      } else {
        console.log('Failed to verify OTP');
        // Handle failure, you may want to show an error message
      }
    } catch (error) {
      console.error('Error verifying OTP:', error.message);
      // Handle unexpected errors during OTP verification
      console.log(response.data);
    }
  };
  


  

 

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <Text style={styles.circleText}>LOGO</Text>
      <Text style={{ marginVertical: 30, fontSize: 18,}}>Forgot Password </Text>
      <TextInput
        label="Email"
        mode="outlined"
        style={{ width: '100%', marginVertical: 10 }}
        keyboardType="email-address"
        autoCapitalize="none"
        value={emailFor}
        onChangeText={setEmailFor}
      />

      <Button mode="contained" onPress={handleResetLink} style={{ width: '100%', marginVertical: 10 }}>
        Reset Link
      </Button>

      <Text style={{ marginVertical: 30, fontSize: 18,}}>ENTER OTP</Text>

      {/* OTP Input Box */}
      <View style={styles.otpContainer}>
  {[1, 2, 3, 4, 5, 6].map((digit, index) => (
    <TextInput
      key={digit}
      style={styles.otpInput}
      mode="outlined"
      keyboardType="numeric"
      maxLength={1}
      value={otp[index]}
      onChangeText={(text) => {
        const newOtp = [...otp];
        newOtp[index] = text;
        setOtp(newOtp.join(''));

        // Move cursor to the next OTP box
        if (text !== '' && index < 5) {
          // Use the ref to focus on the next TextInput
          otpInputsRef[index + 1].focus();
        }
      }}
      ref={(input) => (otpInputsRef[index] = input)}
    />
  ))}
</View>

      {/* Verify Button */}
      <Button mode="contained" onPress={handleVerifyOtp} style={{ width: '100%', marginVertical: 10 }}>
        Verify
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
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  otpInput: {
    width: '12%',
    margin: 5,
  },
});

export default ForgotPassword;
