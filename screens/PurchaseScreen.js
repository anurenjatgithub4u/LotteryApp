import { StyleSheet, Text, View , Image,ScrollView } from 'react-native'
import React, {useState,useEffect} from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';

const PurchaseScreen = () => {


  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    const fetchPurchases = async () => {
      const userId = "65939884a0aa91a1529e275c";
      const apiUrl = `https://lottery-backend-tau.vercel.app/api/v1/user/get-purchases/${userId}`;

      try {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTkzOTg4NGEwYWE5MWExNTI5ZTI3NWMiLCJlbWFpbCI6ImZhY3RzODk5OEBnbWFpbC5jb20iLCJpYXQiOjE3MDQyOTk1NzgsImV4cCI6MTcwNDM4NTk3OH0.M3VXrhltySs_wNBZoSHyisWxnHmQ1U-KObwx6DDkzcI"; // Replace with your actual authorization token

        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Error fetching purchases: ${response.status}`);
        }

        const data = await response.json();
        console.log("Purchases:", data);
        setPurchases(data.message); // Set the purchases data in the state
      } catch (error) {
        console.error("Error fetching purchases:", error.message);
      }
    };

    fetchPurchases();
  }, []); // Empty dependency array to ensure the effect runs only once on mount
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
      return 'More than a day ago';
    }
  };


  return (
    <View>
      <MaterialIcons
        name="keyboard-arrow-left"
        size={35}
        color="black"
        style={{ marginLeft: 10, paddingTop: 69 }}
      />
      <Text style={styles.myPurchase}>My Purchases</Text>
      <ScrollView  style={{marginBottom:150}}>
      {purchases.map((purchase) => (
      
        <View>
        <View key={purchase._id} style={{ flexDirection: 'row', alignItems: 'center' }}>
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
        marginStart:'5%'
        
      },
      
      profilePicture: {
        width: 70,
        height: 70,
        borderRadius: 20,
        
        paddingTop:80,
        marginTop:40,
        paddingLeft:32,
        paddingStart:32,
        marginLeft:32
      },

      detailsText:{
        marginStart:10,
        fontSize:17,
        fontWeight:'400'
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

