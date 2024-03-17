import { StyleSheet, Text, View, ScrollView,TouchableOpacity ,ActivityIndicator } from "react-native";
import React, { useState, useEffect,useCallback  } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Card, Button } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";
import { responsiveFontSize, responsiveHeight ,responsiveWidth} from "react-native-responsive-dimensions";


const RedeemPage = () => {
  const navigation = useNavigation();
  const [bankAccounts, setBankAccounts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBankAccounts = async () => {
    const user = await AsyncStorage.getItem('userId');
    const apiUrl = `https://lottery-backend-tau.vercel.app/api/v1/user/get-bank-account/${user}`;
    const storedAccessToken = await AsyncStorage.getItem('accessToken');

    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${storedAccessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Request failed');
      }

      const responseData = await response.json();
      console.log('data....', responseData);
      setBankAccounts(responseData.bankAccount);
    } catch (error) {
      console.error('Error fetching bank accounts:', error.message);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      fetchBankAccounts();
    }, [])
  );

  return (
    <View  style={{padding:responsiveHeight(4)}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
         
        }}
      >
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <MaterialIcons
            name="keyboard-arrow-left"
            size={35}
            color="black"
            style={{
               // Add marginLeft to push the icon to the left
            }}
          />
        </TouchableOpacity>
        <Text style={{ marginTop: 6, marginLeft: 90 }}> Bank Accounts </Text>
      </View>

      <Card  style={styles.cardThree}>
              <View style={{ flexDirection: 'row' }}>
                <FontAwesome name="credit-card-alt" size={24} color="black" />
                <View
                  style={{
                    flexDirection: 'column',
                  }}
                >
                   <Text style={{ marginLeft: 20 }}>Redeem</Text>
                 
                 
                  
                </View>
              </View>
            </Card>

      <ScrollView style={{ marginTop: 20, marginBottom: 100 }}>
        {loading ? (
          <ActivityIndicator size="large" color="#31A062" style={{ marginTop: 20 }} />
        ) : (
          bankAccounts.map((account, index) => (
            <Card key={index} style={styles.card}>
              <View style={{ flexDirection: 'row' }}>
                <FontAwesome name="credit-card-alt" size={24} color="black" />
                <View
                  style={{
                    flexDirection: 'column',
                  }}
                >
                   <Text style={{ marginLeft: 20 }}>{account.accountHolderName}</Text>
                  <Text style={{ marginLeft: 20 }}>{account.accountNumber}</Text>
                 
                  <Text style={{ marginLeft: 20 }}>{account.BIC}</Text>
                  <Text style={{ marginLeft: 20 }}>{account.branch}</Text>
                  <Text style={{ marginLeft: 20 }}>{account.branchName}</Text>
                </View>
              </View>
            </Card>
          ))
        )}

        <Button
          mode="contained"
          onPress={() => navigation.navigate('AddAccount')}
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
            alignSelf: 'center',
          }}
        >
          Add Account
        </Button>
      </ScrollView>
    </View>
  );
};


const styles = StyleSheet.create({
  arrowStyle: {
    top: 69,
    left: 29,

    // Add the desired border color here
  },

  textRedeem: {
    fontSize: 17,

    marginLeft: 60,
    top: 69,
  },
  card: {
    margin: 10,
    padding: 15,
    alignSelf: "center",
    marginTop: 1,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    elevation: 3,
    width: 350,
    alignSelf: "center",
    height: 121,
  },
  cardThree: {
   margin:10,
   padding:15,
    alignSelf: "center",
    marginTop: 1,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    elevation: 3,
    width: 350,
    alignSelf: "center",
    height: 50,
  },

  cardTwo: {
    margin: 10,
    padding: 15,
    alignSelf: "center",

    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    elevation: 3,
    width: 350,
    alignSelf: "center",
    height: 111,
  },
});
export default RedeemPage;
