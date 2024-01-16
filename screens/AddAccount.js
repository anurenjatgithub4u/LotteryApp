import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View,Text,StyleSheet,Image } from 'react-native';
import { TextInput } from 'react-native-paper';
import { Appbar, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
const AddAccount = () => {
  const [accountHolderName, setAccountHolderName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [BIC, setBicCode] = useState('');
  const [branch, setBranch] = useState('');
  const [branchName, setBranchName] = useState('');

  const navigation = useNavigation();
  const [errorMessage, setErrorMessage] = useState('');

  const handleAddBankAccount = async () => {

    if (!accountHolderName || !accountNumber || !BIC || !branch || !branchName ) {
      // If any of the fields are empty, show an error message or handle it accordingly
      console.error('All fields are required');
      return;
    }
    const userId = await AsyncStorage.getItem('userId');
    const storedAccessToken = await AsyncStorage.getItem('accessToken');
    console.log('Request Body:', JSON.stringify({
      userId,
      accountHolderName,
      accountNumber,
      BIC,
      storedAccessToken
    }));
   
    try {
      const apiUrl = 'https://lottery-backend-tau.vercel.app/api/v1/user/add-bank-account';
      const authToken = 'your-auth-token'; // Replace with your actual authorization token
  
      const storedAccessToken = await AsyncStorage.getItem('accessToken');
      const userId = await AsyncStorage.getItem('userId');
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${storedAccessToken}`, // Include the authorization token here
        },
        body: JSON.stringify({
          userId,
          accountHolderName,
          accountNumber,
          BIC,
          branch,
          branchName
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`${response.status} - ${errorData.error}`);
      }
  
      const data = await response.json();
      console.log('Success:', data.message);
      navigation.navigate('Redeem');
  
    } catch (error) {
      console.error('Error:', error.message);
      setErrorMessage(error.message);
    }
  };
  
  return (
    <View  style={{backgroundColor: 'white',height:900}}>
      <Appbar.Header>
        <Appbar.BackAction />
        <Appbar.Content title="Add Account" />
      </Appbar.Header>


      

      <View style={{ padding: 16 }}>
      <Image
        source={{ uri: 'https://th.bing.com/th/id/OIP.DCKkGl_css_ZFeb-8wvb4gHaHa?rs=1&pid=ImgDetMain' }}
        style={styles.profilePicture}
      />   

        <View style={{ flexDirection: 'row', alignItems: 'center',  justifyContent:'space-between',marginTop:20 }}>

      
        
        <TextInput
        
          value={accountHolderName}
          onChangeText={text => setAccountHolderName(text)}
          placeholder="Enter account holder name"
          style={{
            width:'80%',
            height: 40,
            color:'white',
            marginTop: 8,
            paddingLeft: 8,
            backgroundColor: 'white',
          }}
        />
        <Text  style={{color:'#31A062'}}>Change</Text>
        </View>
         <View style={styles.underline} />

         <View style={{ flexDirection: 'row', alignItems: 'center',  justifyContent:'space-between', marginTop:25 }}>
              
              <TextInput
                value={accountNumber}
                onChangeText={text => setAccountNumber(text)}
                placeholder="Account Number"
                style={{
                  width:'80%',
                  height: 40,
                  backgroundColor: 'white',
                  marginTop: 8,
                  paddingLeft: 8,
                }}
              />
              <Text  style={{color:'#31A062'}}>Change</Text>
              </View>
               <View style={styles.underline} />


               <View style={{ flexDirection: 'row', alignItems: 'center',  justifyContent:'space-between', marginTop:25 }}>
              
              <TextInput
                value={BIC}
                onChangeText={text => setBicCode(text)}
                placeholder="BIC Code "
                style={{
                  width:'80%',
                  height: 40,
                  backgroundColor: 'white',
                  marginTop: 8,
                  paddingLeft: 8,
                }}
              />
              <Text  style={{color:'#31A062'}}>Change</Text>
              </View>
               <View style={styles.underline} />


               <View style={{ flexDirection: 'row', alignItems: 'center',  justifyContent:'space-between', marginTop:25 }}>
              
              <TextInput
                value={branchName}
                onChangeText={text => setBranchName(text)}
                placeholder="Branch Name "
                style={{
                  width:'80%',
                  height: 40,
                  backgroundColor: 'white',
                  marginTop: 8,
                  paddingLeft: 8,
                }}
              />
              <Text  style={{color:'#31A062'}}>Change</Text>
              </View>
               <View style={styles.underline} />

               
               <View style={{ flexDirection: 'row', alignItems: 'center',  justifyContent:'space-between', marginTop:25 }}>
              
              <TextInput
                value={branch}
                onChangeText={text => setBranch(text)}
                placeholder="Branch "
                style={{
                  width:'80%',
                  height: 40,
                  backgroundColor: 'white',
                  marginTop: 8,
                  paddingLeft: 8,
                }}
              />
              <Text  style={{color:'#31A062'}}>Change</Text>
              </View>
               <View style={styles.underline} />


      </View>



      <Button mode="contained" onPress={handleAddBankAccount}  contentStyle={{
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  }}
  style={{
    backgroundColor: '#31A062',
    width: 352,
    marginVertical: 10,
    marginTop: 15,
    alignSelf:'center'
  }}>
        Submit
      </Button>
    </View>
  );
};

const styles =  StyleSheet.create({
  container: {
    marginTop: 8,
  },
  textInput: {
    height: 40,
    paddingLeft: 8,
  },
  underline: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf:'center'
  },
});

export default AddAccount;

