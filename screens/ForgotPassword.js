




import { useNavigation } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet  ,TouchableOpacity,Modal,ActivityIndicator } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import axios from 'axios';
import { KeyboardAwareScrollView } from '@codler/react-native-keyboard-aware-scroll-view';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { MaterialIcons } from '@expo/vector-icons';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";


const ForgotPassword = () => {
  const [emailFor, setEmailFor] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const navigation = useNavigation();
  const [userData, setUserData] = useState('');
  const otpInputsRef = useRef(Array(6).fill(null));
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [mobileNumberLogin, setMobileNumberLogin] = useState('');
  const [loading, setLoading] = useState(false);

  const [buttonPressed, setButtonPressed] = useState(false);
  
const CustomPicker = ({ visible, onClose, onSelect, data }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => onClose()}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {data.map((country) => (
            <TouchableOpacity
              key={country.countryCode}
              style={styles.countryItem}
              onPress={() => {
                onSelect(country.countryCode);
                onClose();
              }}
            >
              <Text>{`${country.countryCode} - ${country.country}`}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Modal>
  );
};
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
        setButtonPressed(true); 
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

  const fetchCountries = async () => {
    try {
      const response = await axios.get(
        'https://lottery-backend-tau.vercel.app//api/v1/admin/get-country'
      );
      const countriesData = response.data.message;
      setCountries(countriesData);
    } catch (error) {
      console.error('Error fetching countries:', error.message);
    }
  };


  const handleVerifyOtp = async () => {
    console.log("verify otp")
    try {
      setLoading(true);
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


    <KeyboardAwareScrollView  >






<View style={{ flex:1,alignItems: 'center',justifyContent:'flex-start' , paddingLeft: 16 ,paddingTop:"12%",paddingRight:16 }}>


    <View
  style={{

    
   
    marginBottom: hp("1%"),
    justifyContent: "flex-start",
    alignItems: "flex-start",
   alignSelf:'flex-start'
    
   
  }}
>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <MaterialIcons
            name="keyboard-arrow-left"
            size={35}
            color="black"
            style={{
              alignSelf: "flex-start", // Add this line,
            }}
          />
        </TouchableOpacity>


       
        </View>



        <Text style={styles.forgotpasswordText}>Forgot Password</Text>
      <Text style={styles.forgotPasswordTwo}>Reset using your email and phone </Text>

      <View style={{ borderColor: 'black',
      backgroundColor: 'white',
      marginTop:15,
      width: '100%',
      height:58.5,
      borderWidth: .5,
      borderStyle: 'solid',
      fontSize: 15,
      borderRadius: 25,
      
      color: 'white',  
      overflow: "hidden",}}>
      <TextInput
        label="Email"
        
        style={{
          color: 'white',
          backgroundColor: 'white',
          height:60.5,
        
         }}
        keyboardType="email-address"
        autoCapitalize="none"
        value={emailFor}
        onChangeText={setEmailFor}
      />
      </View>

      <Text style={{ marginVertical: 10, color: '#31A062' }}>OR</Text>


      
<View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>



<View style={{ borderColor: 'black',
      backgroundColor: 'white',
      width: '20%',
      borderWidth: 0.5,
            borderStyle: 'solid',
      fontSize: 15,
      borderRadius: 25,
      marginRight:15,
      color: 'white',  // Text color
      overflow: "hidden",}}>
<TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text style={styles.selectedCountryText}>
          {selectedCountry || 'Est'}
        </Text>
      </TouchableOpacity>
      <CustomPicker
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSelect={(value) => setSelectedCountry(value)}
        data={countries}
      />
</View>



<View style={{ borderColor: 'black',
      backgroundColor: 'white',
      width: '75%',
      borderWidth: 1,
      height:58.5,
      borderWidth: 0.5,
      borderStyle: 'solid',
      fontSize: 15,
      borderRadius: 25,
      color: 'white',  // Text color
      overflow: "hidden",}}>
<TextInput
      label="Mobile Number"
      
      style={{
        color: 'white',
        backgroundColor: 'white',
        height:60.5,
       
       }}
      keyboardType="phone-pad" // Use 'phone-pad' keyboard type for mobile numbers
      value={mobileNumberLogin}
      onChangeText={setMobileNumberLogin}
      onSubmitEditing={() => Keyboard.dismiss()}
    />
 </View>

 
</View>



<Button
        mode="contained"
        onPress={handleResetLink}
        disabled={buttonPressed} // Disable the button when it's pressed
        contentStyle={{
          height: 60,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        style={{
          backgroundColor: buttonPressed ? 'rgba(49, 160, 98, 0.33)' : '#31A062', // Change color when pressed
          width: '100%',
          marginVertical: 10,
          marginTop: 15,
        }}
      >
        Reset Link
      </Button>

      <Text style={{ marginVertical: 30, fontSize: 18,}}>ENTER OTP</Text>

      {/* OTP Input Box */}

      

      <View style={styles.otpContainer}>

   
  {[1, 2, 3, 4, 5, 6].map((digit, index) => (
    <View  key={index}
    style={{ borderColor: 'black',
   
    backgroundColor: 'white',
    width: 50,
    borderWidth: 0.5,
    alignItems:'center',
    borderStyle: 'solid',
    fontSize: 15,
    height:58.5,
    borderRadius: 15,
   margin: responsiveHeight(.4),
    marginTop:15,
    color: 'white',  // Text color
    overflow: "hidden",}}>
    <TextInput
      key={digit}
      style={styles.otpInput}
      
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
    </View>
  ))}

</View>


      {/* Verify Button */}


      {loading ? (
    <ActivityIndicator style={{ marginTop: 15 }} color="#31A062" size="large" />
  ) : (
      <Button mode="contained" onPress={handleVerifyOtp} contentStyle={{
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  }}
  style={{
    backgroundColor: '#31A062',
    width: '100%',
    marginVertical: 10,
    marginTop: 15,
  }}
  disabled={loading}
  >
    
        Reset Password
      </Button>

  )}

    </View>
    </KeyboardAwareScrollView>
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
    borderRadius: 25,
  },
  forgotpasswordText: {
    
   
    // Add this line to align text to the left
    width: 354,
    minHeight: hp("7%"),
  
 marginLeft:'10%',

    fontSize: 34, // Adjust the font size as needed
    fontWeight: 'bold',
    
  },
  forgotPasswordTwo: {
    marginStart:'10%',
    fontSize: 17,
    width: 354,
    height: 22,
    marginBottom:20,

    
  
    fontSize: 13,
   
    textAlign: 'left', // Add this line to align text to the left
  },
  otpInput: {
    textAlign: 'center',
              backgroundColor:'white',
              height:60.5,
  },
  selectedCountryText: {
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 10,
    
    borderColor: 'gray',
    
    backgroundColor: 'white',
    height: 51,
    marginTop: 7,
    marginRight: 10,
   
  },
});

export default ForgotPassword;