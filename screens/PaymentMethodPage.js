import { useNavigation } from '@react-navigation/native';
import React ,{useState,useRef}from 'react';
import axios from 'axios';
import { Button } from 'react-native-paper';
import { PayWithFlutterwaveV2 } from 'flutterwave-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


import  { Paystack , paystackProps}  from 'react-native-paystack-webview';
import { View, TouchableOpacity,Text } from 'react-native';


const PaymentMethodPage = () => {

  

  const addCredits = async (userId, accessToken, transactionReference) => {
    try {
      const response = await axios.post(
        'https://lottery-backend-tau.vercel.app/api/v1/user/add-credits', // Replace with your API endpoint
        {
          userId,
          transactionReference,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
  
      if (response.status === 200) {
        console.log('Credits added successfully', response.data);
        // You can handle the success response here
      } else {
        console.error('Failed to add credits', response.data);
        // Handle error response
      }
    } catch (error) {
      console.error('Error adding credits', error);
      // Handle network errors or other exceptions
    }
  };


  const [showPayWithFlutterwave, setShowPayWithFlutterwave] = useState(false);
    const navigation = useNavigation();
    const handleOnRedirect = async (data) => {
      console.log(data);
  
      // Check if the status is successful
      if (data.status === 'successful') {
        // Navigate to PlayScreen
        navigation.navigate('MainScreen');
      }
    };
   
   const generateRef = (length) => {
      var a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
      var b = [];  
      for (var i = 0; i < length; i++) {
          var j = (Math.random() * (a.length - 1)).toFixed(0);
          b[i] = a[j];
      }
      return b.join("");
  }


  const handlePaystackSuccess = async (res) => {
    try {
      // Retrieve userId and accessToken from AsyncStorage
      const storedUserDetails = await AsyncStorage.getItem('userDetails');
  
      // Parse the stored JSON string to get the user details object
      const userDetails = JSON.parse(storedUserDetails);
      const accessToken = await AsyncStorage.getItem('accessToken');
      
      const userId = await AsyncStorage.getItem('userId');
      // Extract other required information
      const transactionReference = res.transactionRef.reference; // Replace with the actual key in the response
  
      // Call the addCredits endpoint
      try {
        const response = await fetch('https://lottery-backend-tau.vercel.app/api/v1/user/add-credits', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`, // Include the access token in the headers
          },
          body: JSON.stringify({
            userId,
            transactionReference,
          }),
        });
        const responseData = response.json();
        if (response.ok) {
          // Credits added successfully
          console.log(responseData);
          console.log(res)
          navigation.navigate('MainScreen')
        } else {
          // Handle error
          console.error(responseData);

  
        }
      } catch (error) {
        console.error(error);
      }
  
      
       
    
    } catch (error) {
      
      console.error('Error adding credits:', error.message);
      
    }
  };
  



  const handleCardButtonPress = () => {
    // Show the PayWithFlutterwave component when the button is pressed
    setShowPayWithFlutterwave(true);
  };
    const handleCardButtonPressBank = () => {
      // Navigate to the "Home" screen or any other screen you want
      navigation.navigate('FlutterWave');
    };
    const paystackWebViewRef = useRef(paystackProps.PayStackRef); 
  return (
    <View style={styles.container}>

<Paystack
        paystackKey="pk_test_e7ac28433b9441b06eadb58383119e23cbb98d6d"
        billingEmail="paystackwebview@something.com"
        amount={'25000.00'}
      
        onCancel={(e) => {
          // handle response here
        }}
        onSuccess={handlePaystackSuccess}
        ref={paystackWebViewRef}
      />

      <Text style={styles.title}>Select Payment Method</Text>

 

      <Button
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
        mode="contained"
        onPress={()=> paystackWebViewRef.current.startTransaction()}
      >
        card
      </Button>

      <Button
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
        mode="contained"
        onPress={handleCardButtonPressBank}
      >
        Bank Transfer
      </Button>

      <Button
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
        mode="contained"
        onPress={handleCardButtonPress}
      >
        Ussd
      </Button>

      <Button
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
        mode="contained"
        onPress={handleCardButtonPress}
      >
        Kiosk Code
      </Button>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    marginTop:90,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  buttonBusyOvelay: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
  },
  buttonBusy: {
    
  },
  buttonAlignLeft: {
    justifyContent: 'flex-start',
  },
  button: {
    paddingHorizontal: 16,
    minWidth: 100,
    height: 52,
    
    borderWidth: 1,
    borderRadius: 6,
   
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    overflow: 'hidden',
  },
  buttonContent: {
    resizeMode: 'contain',
    width: 187.3,
    height: 187.3 
  },
};

export default PaymentMethodPage;
