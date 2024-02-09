import { StyleSheet, Text, View , Image,ScrollView ,TouchableOpacity,ActivityIndicator} from 'react-native'
import React, {useState,useEffect} from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from "expo-status-bar";

const PurchaseScreen = () => {

  const [loading, setLoading] = useState(true);
 
  const navigation = useNavigation();
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    const fetchPurchases = async () => {
      const storedAccessToken = await AsyncStorage.getItem('accessToken');
      const userId = await AsyncStorage.getItem('userId');
      // const userId = "65939884a0aa91a1529e275c";
      const apiUrl = `https://lottery-backend-tau.vercel.app/api/v1/user/get-purchases/${userId}`;

      try {
        const token = storedAccessToken; // Replace with your actual authorization token

        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${storedAccessToken}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Error fetching purchases: ${response.status}`);
        }

        const data = await response.json();
        console.log("Purchases:", data);
        setPurchases(data.message); // Set the purchases data in the state
        setLoading(false);
      } catch (error) {
        console.error("Error fetching purchases:", error.message);
        setLoading(false);
      }
    };

    fetchPurchases();
  }, []);



  const getTimeAgoText = (purchaseDate) => {
    const purchaseDateObj = new Date(purchaseDate);
    const currentDate = new Date();
    const timeDifference = currentDate - purchaseDateObj;
    const minutesAgo = Math.floor(timeDifference / (1000 * 60));

    if (minutesAgo < 1) {
      return 'Just now';
    } else if (minutesAgo === 1) {
      return '1 min ago';
    } else if (minutesAgo < 60) {
      return `${minutesAgo} min ago`;
    } else if (minutesAgo < 120) {
      return '1 hr ago';
    } else if (minutesAgo < 1440) {
      return `${Math.floor(minutesAgo / 60)} hr's ago`;
    } else {
      return 'a day ago';
    }
  };


  return (
    <View style={{ flex:1, paddingLeft: 16 , paddingRight:16 }}>
    <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
      <MaterialIcons
        name="keyboard-arrow-left"
        size={35}
        color="black"
        style={{  paddingTop: '12%' }}
      />
    </TouchableOpacity>


    <Text style={styles.myPurchase}>My Purchases</Text>

    {loading ? (
      <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />
    ) : (
      <ScrollView style={{ marginBottom: 150 }}>
        {purchases.map((purchase) => (
          <View key={purchase._id}>
            <View style={{ flexDirection: 'row', alignItems: 'center' ,justifyContent:'space-between'}}>
              <Image
                source={{
                  uri: 'https://www.europeanbusinessreview.com/wp-content/uploads/2020/01/ThinkstockPhotos-172587244-1.jpg',
                }}
                style={styles.profilePicture}
              />

              <View style={{ flexDirection: 'column', alignItems: 'center', marginTop: 10 }}>
                <Text style={styles.detailsText}>You Purchased {purchase.creditsPurchased}</Text>
                <Text style={styles.detailsText}>Via {purchase.modeOfTransaction}</Text>
              </View>
              <Text style={styles.timeText}>{getTimeAgoText(purchase.date)}</Text>
            </View>


            <View style={styles.underline} />
          </View>
        ))}
      </ScrollView>
    )}
  </View>
  
  );
}


const styles = StyleSheet.create({

    container: {
        flexDirection: 'row', // Make sure the children are laid out in a row
        alignItems: 'center', // Align children vertically in the center
        
      },


      myPurchase: {
        fontSize: 34,
        fontWeight: '700',
        
        
      },
      
      profilePicture: {
        width: 70,
        height: 70,
        borderRadius: 20,
        
        paddingTop:80,
        marginTop:40,
        paddingLeft:32,
        paddingStart:32,
        
      },

      detailsText:{
        marginStart:10,
        fontSize:17,
        fontWeight:'400',
        alignSelf:'flex-start'
        
      },
      underline: {
        borderBottomColor: 'black',
        borderBottomWidth: 0.5,
        width:'90%',
        alignSelf:'center',
        marginTop:10
      },
  timeText:{
    fontSize:13,
    fontWeight:'300',
    marginBottom:30,
    paddingLeft:10,
    marginLeft:10
  }

})
export default PurchaseScreen

