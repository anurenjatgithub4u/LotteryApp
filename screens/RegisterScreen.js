

import React, { useState,useEffect } from 'react';
import { View, Text, StyleSheet,TouchableOpacity,Modal,ActivityIndicator } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import {CountryPicker} from "react-native-country-codes-picker";
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { TextInput as PaperTextInput } from 'react-native-paper';
import { Alert } from 'react-native';
import { responsiveFontSize, responsiveHeight } from "react-native-responsive-dimensions";

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
        {data.map((country, index) => (
  <TouchableOpacity
    key={`${country.countryCode}_${index}`}
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
const RegisterScreen = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [show, setShow] = useState(false);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    try {
      // Validate inp
      setLoading(true);
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
        name:name
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
        Alert.alert(
          '',
          'Register Failed',
          [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
        );
        // Handle registration error (e.g., display an error message to the user)
      }
    } catch (error) {
      console.error('Error during registration:', error.message);
      // Handle unexpected errors during registration
    }finally {
      // Set loading to false regardless of whether login was successful or not
      setLoading(false);
    }
  };
  


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
  
      const countriesData = response.data.message.filter(country => country.country !== 'Continent');
      setCountries(countriesData);
    } catch (error) {
      console.error('Error fetching countries:', error.message);
    }
  };
  
  return (
    <View style={{ flex:1,alignItems: 'center',justifyContent:'flex-start' , padding: 16 ,paddingTop:'25%'}}>

    <Text  style={styles.createaccountText}>Create an Account</Text>
    <Text  style={styles.createaccountTextTwo}>Play the game and get lucky</Text>

 
    <View
   style={{
    backgroundColor: '#B6B6B4',
    borderRadius: 20,
    padding: .8,
    marginBottom: 7,
    marginTop:2,
    shadowColor: '#363636',
 
    
    borderLeftWidth:0,
        borderRightWidth:0,
    width:'100%',
    borderColor:'#363636'
}}
>
    <TextInput
        label="Name"
        value={name}
        onChangeText={setName}
        style={{
          color: 'white',
          width: '100%',
          height: 60.5,
          borderBottomColor: 'white',
          borderBottomWidth: 0,
          borderLeftWidth:.2,
          borderRightWidth:.2,
          borderTopWidth:.2,
          backgroundColor:'white',
          borderRadius: 20,
          overflow:'hidden',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
      }}
    />
</View>



<View
    style={{
        backgroundColor: '#B6B6B4',
        borderRadius: 20,
        padding: .8,
        marginBottom: 7,
        marginTop:2,
        shadowColor: '#363636',
     
        
        borderLeftWidth:0,
            borderRightWidth:0,
        width:'100%',
        borderColor:'#363636'
    }}
>

    <TextInput
      label="Email"
     

      style={{
        color: 'white',
          width: '100%',
          height: 60.5,
          borderBottomColor: 'white',
          borderBottomWidth: 0,
          borderLeftWidth:.2,
          borderRightWidth:.2,
          borderTopWidth:.2,
          backgroundColor:'white',
          borderRadius: 20,
          overflow:'hidden',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
    }}
      keyboardType="email-address"
      autoCapitalize="none"
      value={email}
      onChangeText={setEmail}
    />

    </View>


<View style={{ flexDirection: 'row', alignItems: 'center',  }}>

<View style={{ borderColor: '#B6B6B4',
      backgroundColor: 'white',
      width: '20%',
      borderWidth:  0.7,
            borderStyle: 'solid',
      fontSize: 15,
      height:60.5,
      borderRadius: 25,
      marginRight:15,
     marginBottom:5,
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


<View
    style={{
        backgroundColor: '#B6B6B4',
        borderRadius: 20,
        padding: .8,
        marginBottom: 7,
        marginTop:4,
        shadowColor: '#363636',
     
        
        borderLeftWidth:0,
            borderRightWidth:0,
        width:'75%',
        borderColor:'#363636'
    }}
>

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
        width: '100%',
        height: 60.5,
        borderBottomColor: 'white',
        borderBottomWidth: 0,
        borderLeftWidth:.2,
        borderRightWidth:.2,
        borderTopWidth:.2,
        backgroundColor:'white',
        borderRadius: 20,
        overflow:'hidden',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    }}
    />

</View>

 
</View>
      

<View
    style={{
        backgroundColor: '#B6B6B4',
        borderRadius: 20,
        padding: .8,
        marginBottom: 10,
        shadowColor: '#363636',
     
        
        borderLeftWidth:0,
            borderRightWidth:0,
        width:'100%',
        borderColor:'#363636'
    }}
>

    <TextInput
      label="Password"
      
      style={{
        color: 'white',
        width: '100%',
        height: 60.5,
        borderBottomColor: 'white',
        borderBottomWidth: 0,
        borderLeftWidth:.2,
        borderRightWidth:.2,
        borderTopWidth:.2,
        backgroundColor:'white',
        borderRadius: 20,
        overflow:'hidden',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    }}
      secureTextEntry
      value={password}
      onChangeText={setPassword}
    />

</View>
 {loading ? (
    <ActivityIndicator style={{ marginTop: 15 }} color="#31A062" size="large" />
  ) : (
    <Button
      mode="contained"
      onPress={handleRegister}
      contentStyle={{
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
      Create Account
    </Button>
  )}

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
    
    left: 30,
    
    fontSize: 34, // Adjust the font size as needed
    fontWeight: 'bold',
   
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
    marginBottom: 40,
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



