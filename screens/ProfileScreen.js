import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card, Title, Paragraph } from 'react-native-paper'; 
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from './auth/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';


const ProfileScreen = () => {

  const { accessToken, setAccessToken } = useAuth();
  const navigation = useNavigation();
  const logout = async () => {
    try {
      // Replace 'YOUR_BACKEND_URL' with the actual URL of your backend server.
      const backendURL = 'https://lottery-backend-tau.vercel.app/api/v1/auth';
      
      const refreshToken = await AsyncStorage.getItem('refreshToken');
      const accessToken = await AsyncStorage.getItem('accessToken');
      // Assuming you have the refreshToken stored in a variable.
  
      // Make a POST request to the logout endpoint with the refreshToken in the request body.
      const response = await axios.post(
        `${backendURL}/logout`,
        { refreshToken },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
  
      // Check if the logout was successful.
      if (response.status === 200) {
        console.log('Logged out successfully');
        navigation.navigate('Login');
        // Redirect or perform any other action after successful logout.
      } else {
        console.error('Logout failed');
        // Handle logout failure, e.g., display an error message.
      }
    } catch (error) {
      console.error('Error during logout', error);
      // Handle the error, e.g., display an error message.
    }
  };
  

  const handleLogout = async () => {
    // Your logout logic

    // Print the access token to the console
    console.log('User Token on Logout:', accessToken);

    // Now you can use the accessToken globally for any further operations if needed

    setAccessToken(null);
    navigation.navigate('Login');
  };
return(
  
  <View style={styles.container}>
    {/* Profile Picture */}
    <View style={styles.profilePictureContainer}>
      <Image
        source={{ uri: 'https://th.bing.com/th/id/R.fa0ca630a6a3de8e33e03a009e406acd?rik=MMtJ1mm73JsM6w&riu=http%3a%2f%2fclipart-library.com%2fimg%2f1905734.png&ehk=iv2%2fLMRQKA2W8JFWCwwq6BdYfKr2FmBAlFys22RmPI8%3d&risl=&pid=ImgRaw&r=0' }}
        style={styles.profilePicture}
      />
    </View>

    {/* User Name */}
    <Text style={styles.userName}>John Doe</Text>

    {/* Member Since */}
    <Text style={styles.memberSince}>Member since January 2022</Text>


    <TouchableOpacity onPress={logout}>
        <Text style={styles.logOut}>Logout</Text>
      </TouchableOpacity>
    

    <Card style={styles.card}>
    <Card.Content>
      
     

      <View style={styles.personalInfoContainer}>
        <Ionicons name="person" size={24} color="#555" />
        <Paragraph style={styles.personalInfoText}>Personal Information</Paragraph>
      </View>
    </Card.Content>
  </Card>
  <Card style={styles.cardTwo}>
    <Card.Content>
      
     

      <View style={styles.personalInfoContainer}>
      <Entypo name="credit" size={24} color="black" />
        <Paragraph style={styles.personalInfoText}>Game Details</Paragraph>
      </View>
    </Card.Content>
  </Card>
  <Card style={styles.cardTwo}>
    <Card.Content>
      
     

    <TouchableOpacity onPress={() => navigation.navigate('AddAccount')}>
    <View style={styles.personalInfoContainer}>
      <FontAwesome name="bank" size={24} color="black" />

        <Paragraph style={styles.personalInfoText}>Bank Details</Paragraph>
      </View>

    </TouchableOpacity>
    </Card.Content>
  </Card>
  </View>
)

}
  
  
;

const styles = StyleSheet.create({

  card: {
    width: '95%', // Set width to full
    margin: 0,     // Remove default margin
    marginTop: 70,
  },
  cardTwo: {
    width: '95%', // Set width to full
    margin: 0,     // Remove default margin
    marginTop: 10,
  },
  cardThree: {
    width: '95%', // Set width to full
    margin: 0,     // Remove default margin
    marginTop: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start', // Align items at the top
    alignItems: 'center',
    paddingTop: 50, // Adjust as needed to create space from the top
  },
  profilePictureContainer: {
    marginBottom: 10,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  memberSince: {
    fontSize: 16,
    color: '#555',
  },
  logOut: {
    fontSize: 16,
    color: '#555',
    marginTop: 7,
  },
  personalInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  personalInfoText: {
    fontSize: 16,
    color: '#555',
    marginLeft: 5,
  },
});


export default ProfileScreen;
