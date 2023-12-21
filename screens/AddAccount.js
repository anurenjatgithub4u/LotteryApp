import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View,Text, TextInput } from 'react-native';
import { Appbar, Button } from 'react-native-paper';

const AddAccount = () => {
  const [accountHolderName, setAccountHolderName] = useState('');
  const navigation = useNavigation();
  
  const handleChooseAccount = () => {
    // Navigate to the "Home" screen or any other screen you want
    navigation.navigate('ChooseAccount');
  };
  return (
    <View>
      <Appbar.Header>
        <Appbar.BackAction />
        <Appbar.Content title="Add Account" />
      </Appbar.Header>


      <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 10, marginTop: 10 }}>
          Add Account
        </Text>

      <View style={{ padding: 16 }}>
        <Text>Account Holder Name</Text>
        <TextInput
          value={accountHolderName}
          onChangeText={text => setAccountHolderName(text)}
          placeholder="Enter account holder name"
          style={{
            height: 40,
            borderColor: 'gray',
            borderWidth: 1,
            marginTop: 8,
            paddingLeft: 8,
          }}
        />
      </View>

      <View style={{ padding: 16 }}>
        <Text>Bic Code</Text>
        <TextInput
          value={accountHolderName}
          onChangeText={text => setAccountHolderName(text)}
          placeholder="Bic Code"
          style={{
            height: 40,
            borderColor: 'gray',
            borderWidth: 1,
            marginTop: 8,
            paddingLeft: 8,
          }}
        />
      </View>

      <View style={{ padding: 16 }}>
        <Text>Account Number</Text>
        <TextInput
          value={accountHolderName}
          onChangeText={text => setAccountHolderName(text)}
          placeholder="Account Number"
          style={{
            height: 40,
            borderColor: 'gray',
            borderWidth: 1,
            marginTop: 8,
            paddingLeft: 8,
          }}
        />
      </View>

      <Button onPress={handleChooseAccount}> Submit </Button>
    </View>
  );
};

export default AddAccount;

