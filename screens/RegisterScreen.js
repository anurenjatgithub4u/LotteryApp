// import React, { useState, useEffect, useCallback,createRef } from 'react';
// import { View, Text,StyleSheet } from 'react-native';
// import * as Font from 'expo-font';
// import { Entypo } from '@expo/vector-icons';
// import * as SplashScreen from 'expo-splash-screen';
// import { Ionicons } from '@expo/vector-icons';
// import { createStackNavigator } from '@react-navigation/stack';
// import { TextInput, Button } from 'react-native-paper';
// import { NavigationContainer, useNavigation } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


// import { MaterialIcons } from '@expo/vector-icons';
// import axios from 'axios';

// const RegisterScreen = () => {
//   const navigation = useNavigation();


//   // State for input fields
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [mobileNumber, setMobileNumber] = useState('');
//   // Function to handle registration


// const handleRegister = async () => {
//   try {
//     // Validate input fields (you may want to add more validation)
//     if (!name || !email || !password || !mobileNumber) {
//       console.log('Please fill in all fields');
//       return;
//     }

//     // Make API request to register user using Axios
//     const response = await axios.post('https://lottery-backend-tau.vercel.app/api/v1/user/register', { email, password ,name});

//     if (response.status === 200) {
//       console.log('Registration successful:', response.data.message);
//       navigation.navigate('OTP',{
//         email,
//         name,
//         mobileNumber
//       });
//       // You may want to navigate to another screen or perform authentication logic here

//     } else {
//       console.log('Registration failed:', response.data.message);
//       // Handle registration error (e.g., display an error message to the user)
//     }
//   } catch (error) {
//     console.error('Error during registration:', error.message);
//     // Handle unexpected errors during registration
//   }
// };


//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16 }}>
//       <Text style={styles.circleText}>LOGO</Text>
//     <Text>Sign Up</Text>
//     <TextInput
//       label="Name"
//       mode="outlined"
//       style={{ width: '100%', marginVertical: 10 }}
//       value={name}
//       onChangeText={setName}
//     />
//     <TextInput
//       label="Email"
//       mode="outlined"
//       style={{ width: '100%', marginVertical: 10 }}
//       keyboardType="email-address"
//       autoCapitalize="none"
//       value={email}
//       onChangeText={setEmail}
//     />
//     <TextInput
//       label="Mobile Number"
//       mode="outlined"
//       style={{ width: '100%', marginVertical: 10 }}
//       keyboardType="phone-pad" // Use 'phone-pad' keyboard type for mobile numbers
//       value={mobileNumber}
//       onChangeText={setMobileNumber}
//     />
//     <TextInput
//       label="Password"
//       mode="outlined"
//       style={{ width: '100%', marginVertical: 10 }}
//       secureTextEntry
//       value={password}
//       onChangeText={setPassword}
//     />
//     <Button mode="contained" onPress={handleRegister} style={{ width: '100%', marginVertical: 10 }}>
//       Register
//     </Button>
//     <Text style={{ marginVertical: 10 }}>
//       Already registered?{' '} </Text>
//       <Text style={{ color: 'blue' }} onPress={() => navigation.navigate('Login')}>
//         Login
//       </Text>
   
//   </View>
  
//   );
// };
// const styles = StyleSheet.create({
  // circleText: {
  //   backgroundColor: 'white',
  //   borderRadius: 50,
  //   width: 100,
  //   height: 100,
  //   textAlign: 'center',
  //   lineHeight: 100,
  //   fontSize: 20,
  //   marginTop: -20, // Adjust the negative margin top to move the circle upward
  // },
// });
// export default RegisterScreen;


import React, { useState,useEffect } from 'react';
import { View, Text, StyleSheet,TouchableOpacity,Modal } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import {CountryPicker} from "react-native-country-codes-picker";
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { TextInput as PaperTextInput } from 'react-native-paper';


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
              <Text>{`${country.country} - ${country.countryCode}`}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Modal>
  );
};
const RegisterScreen = () => {
  // State for input fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [show, setShow] = useState(false);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
 

  const handleRegister = async () => {
    try {
      // Validate input fields
      if (!name || !email || !password || !mobileNumber || !selectedCountry) {
        console.log('Please fill in all fields');
        return;
      }
  
      const mobileWithCountry = `${selectedCountry}${mobileNumber}`;
  
      console.log('Selected Country:', mobileWithCountry);
  
      // Make API request to register user using Axios
      const response = await axios.post('https://lottery-backend-tau.vercel.app/api/v1/user/register', {
        email,
        mobileNumber: mobileWithCountry,
      });
  
      if (response.data.statusCode === 200) {
        console.log('Registration successful:', response.data.message);
  
        // Navigate to OTP screen with additional information
        navigation.navigate('OTP', {
          email,
          name,
          password,
          mobileNumber: mobileWithCountry,
          selectedCountry
        });
  
        // Additional logic if needed
      } else {
        console.log('Registration failed:', response.data.message);
        console.log('Registration:', response);
        // Handle registration error (e.g., display an error message to the user)
      }
    } catch (error) {
      console.error('Error during registration:', error.message);
      // Handle unexpected errors during registration
    }
  };
  

  // const handleRegister = async () => {
  //   try {
  //     // Validate input fields (you may want to add more validation)
  //     if (!name || !email || !password || !mobileNumber || !selectedCountry) {
  //       console.log('Please fill in all fields');
  //       return;
  //     }
  //     const mobileWithCountry = `${selectedCountry}${mobileNumber}`;
  //     console.log('Selected Country :', mobileWithCountry);
  //     // Make API request to register user using Axios
  //     const response = await axios.post('https://lottery-backend-tau.vercel.app/api/v1/user/register', {  email,
  //     mobileNumber: mobileWithCountry });
  //     console.log('Registration successful:', response.data.message);
  //     if (response.status === 200) {
  //       console.log('Registration successful:', response.data.message);
  
  //       // Additional data for navigation
        
  
  //       // Navigate to OTP screen with additional information
  //       navigation.navigate('OTP', {
  //         email,
  //         name,
  //         password,
  //         mobileNumber: mobileWithCountry,
  //         selectedCountry
  //       });
  //       console.log('checking :', selectedCountry,mobileNumber);
  //       // You may want to perform additional logic here
  //     } else {
  //       console.log('Registration failed:', response.data.message);
  //       // Handle registration error (e.g., display an error message to the user)
  //     }
  //   } catch (error) {
  //     console.error('Error during registration:', error.message);
  //     // Handle unexpected errors during registration
  //   }
  // };
  
  const navigation = useNavigation();
  useEffect(() => {
    fetchCountries();
  }, []);
  const logSelectedCountryCode = () => {
    console.log('Selected Country Code:', selectedCountry,mobileNumber);
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
  return (
    <View style={{ flex:1,alignItems: 'center',justifyContent:'center' , padding: 16 }}>

    <Text  style={styles.createaccountText}>Create an Account</Text>
    <Text  style={styles.createaccountTextTwo}>Play the game and get lucky</Text>

    <View style={{ borderColor: 'black',
      backgroundColor: 'white',
      width: '100%',
      borderWidth: 0,
      borderStyle: 'solid',
      fontSize: 15,
      height:58.5,
      borderRadius: 25,
      color: 'white',  // Text color
      overflow: "hidden",}}>
  <TextInput
    label="Name"
    
    value={name}
    onChangeText={setName}
     style={{
      color: 'white',
     
      backgroundColor: 'white',
      height:60.5,
     }}
  />
</View>



<View style={{ borderColor: 'black',
marginTop:15,
      backgroundColor: 'white',
      width: '100%',
      borderWidth: 0,
      borderStyle: 'solid',
      fontSize: 15,
      borderRadius: 25,
      height:58.5,
      color: 'white',  // Text color
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
      value={email}
      onChangeText={setEmail}
    />
    </View>

<View style={{ flexDirection: 'row', alignItems: 'center', marginTop:15, }}>

<View style={{ borderColor: 'black',
      backgroundColor: 'white',
      width: '20%',
      borderWidth: 0,
            borderStyle: 'solid',
      fontSize: 15,
      borderRadius: 25,
      marginRight:15,
      color: 'white',  // Text color
      overflow: "hidden",}}>
<TouchableOpacity onPress={() => {setModalVisible(true);  logSelectedCountryCode()}}>
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
      borderWidth: 0,
      borderStyle: 'solid',
      fontSize: 15,
      borderRadius: 25,
      color: 'white',  // Text color
      overflow: "hidden",}}>
    <TextInput
      label="Mobile Number"
      
      
      keyboardType="phone-pad"
      value={mobileNumber}
      onChangeText={setMobileNumber}
      right={
        <TextInput.Icon
          name={() => <Text onPress={() => setShow(true)}>{countryCode || 'Ext'}</Text>}
        />
      }

      style={{
        color: 'white',
        backgroundColor: 'white',
        height:60.5,
       
       }}
    />

</View>

 
</View>
      


<View style={{ borderColor: 'black',
      backgroundColor: 'white',
      marginTop:15,
      width: '100%',
      height:58.5,
      borderWidth: 0,
      borderStyle: 'solid',
      fontSize: 15,
      borderRadius: 25,
      color: 'white',  
      overflow: "hidden",}}>
    <TextInput
      label="Password"
      
      style={{
        color: 'white',
        backgroundColor: 'white',
        height:60,
      
       }}
      secureTextEntry
      value={password}
      onChangeText={setPassword}
    />
 </View>
 <Button
  mode="contained"
  onPress={handleRegister}
  contentStyle={{
    height: 60.5,
    justifyContent: 'center',
    alignItems: 'center',
  }}
  style={{
    backgroundColor: '#31A062',
    width: '100%',
    marginVertical: 10,
    marginTop: 15,
  }}
>
  Create Account
</Button>

<View style={{ flex:1  }}>
  <Text style={{ marginVertical: 10 ,textAlign:'center'  ,color: '#31A062'}}>
    Already registered?{' '}
    <Text style={{ color: 'blue' ,color: '#31A062' }} onPress={() => navigation.navigate('Login')}>
      Login
    </Text>
  </Text>
</View>



  </View>
  );
};

const styles = StyleSheet.create({
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

  textInput: {
    borderColor: 'black',
    backgroundColor: 'white',
    width: '100%',
    borderWidth: 1,
    borderStyle: 'solid',
    fontSize: 15,
    borderRadius: 25,
    color: 'white', // Add this line to set the text color to white
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
  
  

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    selectedCountryText: {
      fontSize: 16,
      paddingVertical: 10,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 4,
      backgroundColor: 'white',
    },
   
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 10,
      elevation: 5,
    },
    countryItem: {
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: 'gray',
    },
    elevation: 5,
  },
  countryItem: {
    paddingVertical: 10,
    
    borderBottomColor: 'gray',
  },
  circleText: {
    backgroundColor: 'white',
    borderRadius: 50,
    width: 100,
    height: 100,
    textAlign: 'center',
    lineHeight: 100,
    fontSize: 20,
    marginTop: -20, // Adjust the negative margin top to move the circle upward
  },
});

export default RegisterScreen;



