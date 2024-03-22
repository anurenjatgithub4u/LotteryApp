

import { StyleSheet, Text, View ,TouchableOpacity,Image,ScrollView,ActivityIndicator} from 'react-native'
import React, { useState, useEffect } from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { responsiveFontSize, responsiveHeight, responsiveScreenWidth, responsiveWidth } from "react-native-responsive-dimensions";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
    const navigation = useNavigation();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const fetchNotifications = async () => {
        try {
          const storedAccessToken = await AsyncStorage.getItem('accessToken');
          const userIds = await AsyncStorage.getItem('userId');
          const url = `https://lottery-backend-tau.vercel.app/api/v1/user/get-notifications/${userIds}`;
          
          const response = await fetch(url, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${storedAccessToken}`,
            },
          });
  
          if (!response.ok) {
            throw new Error(`Request failed with status: ${response.status}`);
          }
  
          const data = await response.json();
          setNotifications(data.message || []);
          console.log("dataaaa", data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching notifications:', error.message);
          setLoading(false);
        }
      };
  
      // Call fetchNotifications when the component mounts
      fetchNotifications();
    }, []);


    const truncateText = (text, wordsPerLine) => {
      const words = text.split(' ');
      let lines = [];
    
      for (let i = 0, j = 0; i < words.length && j < wordsPerLine.length; j++) {
        const line = words.slice(i, i + wordsPerLine[j]).join(' ');
        lines.push(line);
        i += wordsPerLine[j];
      }
    
      return lines.join('\n');
    };


    
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
    // Example usage:

    return (
      <View  style={{padding:5,paddingRight:'5%'}}>
      <TouchableOpacity onPress={() => navigation.navigate('Hom')}>
        <MaterialIcons
          name="keyboard-arrow-left"
          size={35}
          color="black"
          style={{ marginLeft: 10, paddingTop: '12%' }}
        />
      </TouchableOpacity>
  
  
      <Text style={styles.myPurchase}>Notification</Text>
  
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />
      ) : (
        <ScrollView style={{ marginBottom: 150 }}>
          {notifications.map((notification, index) => (
     <View key={index}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',marginTop:responsiveHeight(1),marginBottom:responsiveHeight(1) }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            source={{
              uri: 'https://www.europeanbusinessreview.com/wp-content/uploads/2020/01/ThinkstockPhotos-172587244-1.jpg',
            }}
            style={styles.profilePicture}
          />

          <View style={{ flexDirection: 'column', alignItems: 'center', marginTop: 10 }}>
          <Text style={styles.detailsText}>
  {truncateText(notification.content, [4, 3, 3])}
</Text>
          </View>
        </View>

        <Text style={styles.timeText}>{getTimeAgoText(notification.createdAt)}</Text>
      </View>
      
      <View style={styles.underline} />
  
  
              
            </View>
          ))}
        </ScrollView>
      )}
    </View>
    
    );
}

export default Notification

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
      height: 50,
      borderRadius: 20,
      alignSelf:'center',
      justifyContent:"center",
      alignItems:'center',
      paddingTop:80,
      marginTop:responsiveHeight(2),
      paddingLeft:32,
      paddingStart:32,
      marginLeft:'5%'
    },

    detailsText:{
      marginStart:10,
      fontSize:17,
      fontWeight:'400',
      alignSelf:'flex-start'
    },
    underline: {
      borderBottomColor: 'black',
      borderBottomWidth: 0.3,
      width:'90%',
      alignSelf:'center',
      marginTop:10
    },
timeText:{
  fontSize:13,
  fontWeight:'300',
  marginBottom:responsiveWidth(3),
  marginRight:'4%'
  
 
}

})