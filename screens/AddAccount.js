import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View,Text,StyleSheet,Image } from 'react-native';
import { TextInput } from 'react-native-paper';
import { Appbar, Button } from 'react-native-paper';

const AddAccount = () => {
  const [accountHolderName, setAccountHolderName] = useState('');
  const navigation = useNavigation();
  
  const handleChooseAccount = () => {
    // Navigate to the "Home" screen or any other screen you want
    navigation.navigate('ChooseAccount');
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
                value={accountHolderName}
                onChangeText={text => setAccountHolderName(text)}
                placeholder="Account Number"
                style={{
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
                value={accountHolderName}
                onChangeText={text => setAccountHolderName(text)}
                placeholder="BIC Code "
                style={{
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
                value={accountHolderName}
                onChangeText={text => setAccountHolderName(text)}
                placeholder="Branch "
                style={{
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
                value={accountHolderName}
                onChangeText={text => setAccountHolderName(text)}
                placeholder="Bank Name"
                style={{
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



      <Button mode="contained" onPress={()=>navigation.navigate('Redeem')}  contentStyle={{
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

