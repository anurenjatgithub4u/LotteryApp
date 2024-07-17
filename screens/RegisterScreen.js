

import React, { useState,useEffect } from 'react';
import { View, Text, StyleSheet,TouchableOpacity,Modal,ActivityIndicator ,Dimensions} from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import {CountryPicker} from "react-native-country-codes-picker";
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { TextInput as PaperTextInput } from 'react-native-paper';
import { Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { responsiveFontSize, responsiveHeight, responsiveScreenWidth, responsiveWidth } from "react-native-responsive-dimensions";
import { KeyboardAwareScrollView } from '@codler/react-native-keyboard-aware-scroll-view';
import { CheckBox } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from "expo-linear-gradient";
import Constants from 'expo-constants';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";


const { width, height } = Dimensions.get("window");
const SCREEN_WIDTH = width < height ? width : height;
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
  const [checked, setChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);



  const handleCheckBoxPress = () => {
   
    navigation.navigate('TermsAndConditions'); // Replace 'TermsPage' with the actual name of your terms page screen

   // Alert.alert('Alert', 'Please accept the terms and conditions');
  
};


  
  const handleRegister = async () => {
    try {
      // Validate inp
      setLoading(true);
      await AsyncStorage.setItem('registeredEmail', email);
      if (!name || !email || !password || !mobileNumber || !selectedCountry || !checked) {
        Alert.alert(
          '',
          'Please fill in all fields and accept the terms and conditions',
          [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
        );
        return;
      }
  
      const mobileWithCountry = `${selectedCountry}${mobileNumber}`;
  
      console.log('Selected Country:', mobileWithCountry);
  
      // Make API request to register user using Axios

      const prod ='https://lottery-backend-tau.vercel.app/api/v1/user/register'

      const dev = 'https://lottery-backend-dev.vercel.app/api/v1/auth/register'

      const isStandaloneApp = Constants.appOwnership === 'expo';


      const baseURL = isStandaloneApp ? dev : prod

      const response = await axios.post(baseURL, {
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
      } else if (response.data.statusCode === 400 ) {
        console.log('Registration failed:', response.data.message);
        Alert.alert(
          '',
          'Email is already registered. Please use a different email.',
          [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
        );
      } else {
        console.log('Registration failed:', response.data.message);
        // Alert.alert(
        //   '',
        //   'Registration Failed',
        //   [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
        // );
        alert(error.response.data.message)
      }
    }catch (error) {
      console.log('Registration failed:', error.response ? error.response.data.message : error.message);
    Alert.alert(
      '',
      error.response ? error.response.data.message : error.message,
      [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
    );
    }finally {
      // Set loading to false regardless of whether login was successful or not
      setLoading(false);
    }
  };



  
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


<KeyboardAwareScrollView style={{backgroundColor:'white'}} >

    <View style={{ flex:1,alignItems: 'center',justifyContent:'flex-start' , paddingTop: '24%' ,paddingLeft:'6%',paddingRight:'6%',paddingBottom:16,backgroundColor:'white',height:'100%'}}>



    <MaterialIcons name="keyboard-arrow-left" size={35} onPress={()=>navigation.navigate('ProfileLandingTesting')} color="black" style={{
     
     alignSelf:'flex-start',right:'5%',bottom:'5%'
   }}/>
    <Text  style={styles.createaccountText}>Create an Account</Text>
    <Text  style={styles.createaccountTextTwo}>Play the game and get lucky</Text>

    <View
      style={styles.inputContainer}
      accessible={true}
      accessibilityLabel="Name Input"
    >
      <TextInput
        label="Name"
        value={name}
        onChangeText={setName}
        style={styles.textInput}
        activeUnderlineColor="gray"
      />
    </View>


    <View
      style={styles.inputContainer}
      accessible={true}
      accessibilityLabel="Email Input"
    >
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.textInput}
        activeUnderlineColor="gray"
      />
    </View>





<View style={{ flexDirection: 'row', alignItems: 'center', }}>

<View style={{ borderColor: 'black',
    backgroundColor: 'white',
    marginTop:15,
    width: '20%',
    marginBottom: 10,
    marginRight:15,
    height:responsiveHeight(7),
    borderWidth: 1,
    borderStyle: 'solid',
    fontSize: 15,
    borderRadius: 20,
    
    color: 'white',  
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
   style={{ borderColor: 'black',
   backgroundColor: 'white',
   marginTop:15,
   width: '75%',
   marginBottom: 10,
   height:responsiveHeight(7),
   borderWidth: 1,
   borderStyle: 'solid',
   fontSize: wp(3),
   borderRadius: 20,
   
   color: 'white',  
   overflow: "hidden",}}

>

    <TextInput
      label="Mobile Number"
      
      
      keyboardType="phone-pad"
      value={mobileNumber}
      onChangeText={(text) => {
        // Limit the input to a maximum of 10 characters
        if (text.length <= 10) {
          setMobileNumber(text);
        }
      }}
      maxLength={10} 
      right={
        <TextInput.Icon
          name={() => <Text onPress={() => setShow(true)}>{countryCode || 'Ext'}</Text>}
        />
      }

      style={{
        color: 'white',
        backgroundColor: 'white',
        height:responsiveHeight(7),
        fontSize:wp(3)
       }}
    activeUnderlineColor="gray"
    />

</View>

 
</View>
      




<View
      style={styles.passwordinputContainer}
      accessible={true}
      accessibilityLabel="Password Input"
      
    >
      <TextInput
       label="Password"
        activeUnderlineColor="gray"
        secureTextEntry={!showPassword}
        value={password}
        onChangeText={setPassword}
        style={styles.textInput}
        
      />

<TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          style={{ padding: responsiveWidth(3.7), position: 'absolute', right: 0, }}
        >
          <FontAwesome
            name={showPassword ? 'eye-slash' : 'eye'}
            size={wp(5)}
            color="black"
          />
        </TouchableOpacity>
    </View>
   




    <View style={{ flexDirection: 'row', alignSelf: 'flex-start', marginTop:responsiveHeight(1), marginBottom:responsiveHeight(1) }}>


  <CheckBox
        
        checked={checked}
        onPress={() => setChecked(!checked)}
        containerStyle={styles.checkboxContainer}
        textStyle={styles.checkboxText}
      />

      <Text style={{  alignSelf: 'center', }} >I accept the  </Text>

      <Text style={{ alignSelf: 'center', color: '#668BE9' }} onPress={handleCheckBoxPress}>
        terms and conditions
      </Text>
      
    </View>




    



   <TouchableOpacity onPress={handleRegister} style={{
        backgroundColor: '#31A062',
        width: '100%',
        height:responsiveHeight(7),
        marginVertical: 10,
        marginTop: 15,
        borderRadius:20,
        alignItems:'center',
        justifyContent:'center'
      }}>


   <LinearGradient colors={["#31A062", "#31A062"]}   style={{
        backgroundColor: '#31A062',
        width: '100%',
        height:responsiveHeight(7),
        marginVertical: 10,
        marginTop: 15,
        borderRadius:20,
        alignItems:'center',
        justifyContent:'center'
      }}>
        <TouchableOpacity onPress={handleRegister}>
        {loading ? (
    <ActivityIndicator color="#FFFFFF" size="small" />
  ) : (
    <Text style={styles.doneButtonText}>Create Account</Text>
  )}
        </TouchableOpacity>
      </LinearGradient>
   </TouchableOpacity>
 


<View style={{ flex:1  }}>
  <Text style={{ marginVertical: 10 ,textAlign:'center'  ,color: '#31A062'}}>
    Already registered?{' '}
    <Text style={{ color: 'blue' ,color: '#31A062' }} onPress={() => navigation.navigate('Login')}>
      Login
    </Text>
  </Text>
</View>



  </View>
  </KeyboardAwareScrollView>

  );
};

const styles = StyleSheet.create({
  selectedCountryText: {
    fontSize: wp(3),
    paddingVertical: 10,
    paddingHorizontal: 10,
    
    borderColor: 'gray',
   
    backgroundColor: 'white',
    height: 51,
    marginTop: 7,
    marginRight: 10,
   
  },
  doneButtonText: {
    color: "#fff",
    fontSize: SCREEN_WIDTH * 0.04,
    alignSelf: "center",
  },
  doneButton: {
    backgroundColor: "#F0C735",
    paddingVertical: SCREEN_WIDTH * 0.015,
    paddingHorizontal: SCREEN_WIDTH * 0.05,
    borderRadius: SCREEN_WIDTH * 0.01,
   
    width: "85%",
    marginTop: SCREEN_WIDTH * 0.05,
  },
  createaccountText: {
    
   
    // Add this line to align text to the left
    width: 354,
    height: 41,
    bottom:'6%',
    left: 30,
  
    fontSize: responsiveFontSize(3.5), // Adjust the font size as needed
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
  checkboxContainer: {
    padding: 0, // Adjust the padding as needed
    margin: 0, // Adjust the margin as needed
    backgroundColor: 'transparent', // Set background color to transparent if needed
    borderWidth: 0,
    // Remove border if needed
  },
  

  createaccountTextTwo: {
    
    fontSize: 17,
    width: 354,
    height: 22,
   
    left: 38,
    bottom:'6%',
    fontSize: 13,
   
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

  inputContainer: {
    borderColor: 'black',
    backgroundColor: 'white',
    marginTop: hp(2),
    width: '100%',
    marginBottom: hp(1.5),
    height: hp(7),
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: wp(5),
    overflow: "hidden",
  },
  textInput: {
    color: 'black',
    backgroundColor: 'white',
    height: hp(7),
    fontSize: wp(3),
  },

  passwordinputContainer: {
    borderColor: 'black',
    backgroundColor: 'white',
    marginTop: hp(2),
    width: '100%',
    marginBottom: hp(1.5),
    height: hp(7),
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: wp(5),
    overflow: "hidden",
  },
});

export default RegisterScreen;



