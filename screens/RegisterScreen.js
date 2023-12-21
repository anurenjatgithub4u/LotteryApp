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


import React, { useState } from 'react';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import {CountryPicker} from "react-native-country-codes-picker";
import { useNavigation } from '@react-navigation/native';

const africanCountryNames = ['Algeria', 'Angola', /* Add more African country names */];

const ListHeaderComponent = ({ countries, lang, onPress }) => (
  <View
    style={{
      paddingBottom: 20,
    }}
  >
    <Text>
      Popular African countries
    </Text>
    {countries
      ?.filter(country => africanCountryNames.includes(country?.name?.[lang || 'en']))
      .map((country, index) => (
        <CountryButton key={index} item={country} name={country?.name?.[lang || 'en']} onPress={() => onPress(country)} />
      ))}
  </View>
);


const CountryButton = ({ item, name, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.countryButton}>
    <Text>{name}</Text>
  </TouchableOpacity>
);
const RegisterScreen = () => {
  // State for input fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [show, setShow] = useState(false);



  const handleRegister = async () => {
    try {
      // Validate input fields
      if (!name || !email || !password || !mobileNumber) {
        console.log('Please fill in all fields');
        return;
      }

      // Make API request to register user using Axios
      const response = await axios.post('https://lottery-backend-tau.vercel.app/api/v1/user/register', {
        email,
        password,
        name,
        mobileNumber: `${countryCode}${mobileNumber}`, // Combine country code and mobile number
      });

      if (response.status === 200) {
        console.log('Registration successful:', response.data.message);
        // Navigate to another screen or perform authentication logic here
      } else {
        console.log('Registration failed:', response.data.message);
        // Handle registration error
      }
    } catch (error) {
      console.error('Error during registration:', error.message);
      // Handle unexpected errors during registration
    }
  };
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16 }}>
    <Text style={styles.circleText}>LOGO</Text>
    <Text>Sign Up</Text>
    <TextInput
      label="Name"
      mode="outlined"
      style={{ width: '100%', marginVertical: 10 }}
      value={name}
      onChangeText={setName}
    />
    <TextInput
      label="Email"
      mode="outlined"
      style={{ width: '100%', marginVertical: 10 }}
      keyboardType="email-address"
      autoCapitalize="none"
      value={email}
      onChangeText={setEmail}
    />

<View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
<TouchableOpacity
        onPress={() => setShow(true)}
        style={{
            width: '15%',
            height: 50,
            backgroundColor: 'white',
            padding: 10,
            marginRight:10,
            marginTop:2
        }}
      >
        <Text style={{
            color: 'black',
            fontSize: 20
        }}>
            {countryCode}
        </Text>
      </TouchableOpacity>


    <TextInput
      label="Mobile Number"
      mode="outlined"
      style={{ width: '80%', marginVertical: 10 }}
      keyboardType="phone-pad"
      value={mobileNumber}
      onChangeText={setMobileNumber}
      right={
        <TextInput.Icon
          name={() => <Text onPress={() => setShow(true)}>{countryCode || 'Select'}</Text>}
        />
      }
    />
 
</View>
      
<CountryPicker
        show={show}
        pickerButtonOnPress={(item) => {
          setCountryCode(item.dial_code);
          setShow(false);
        }}
        ListHeaderComponent={() => (
          <ListHeaderComponent
            lang={'en'} // or specify your desired language
            onPress={(selectedCountry) => {
              setCountryCode(selectedCountry.code);
              setShow(false);
            }}
          />
        )}
        popularCountries={['en', 'ua', 'pl']}
      />


    <TextInput
      label="Password"
      mode="outlined"
      style={{ width: '100%', marginVertical: 10 }}
      secureTextEntry
      value={password}
      onChangeText={setPassword}
    />
    <Button mode="contained" onPress={handleRegister} style={{ width: '100%', marginVertical: 10 }}>
      Register
    </Button>
    <Text style={{ marginVertical: 10 }}>
      Already registered?{' '}
      <Text style={{ color: 'blue' }} onPress={() => navigation.navigate('Login')}>
        Login
      </Text>
    </Text>
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
    marginTop: -20, // Adjust the negative margin top to move the circle upward
  },
});

export default RegisterScreen;
