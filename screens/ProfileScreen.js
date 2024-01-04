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
import { MaterialIcons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

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

<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
  <MaterialIcons
    name="keyboard-arrow-left"
    size={35}
    color="black"
    style={{
      marginLeft: 10,
      alignSelf: 'flex-start', // Add this line,
      
    }}
  />
   
  <EvilIcons name="bell" size={30} style={styles.bell} color="black" />
  <AntDesign name="logout" size={19} style={styles.logout} color="black" />
</View>
<Text  style={{fontSize:31,fontWeight:'700',marginLeft:30}}>Profile</Text>

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
  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
    <Paragraph style={{...styles.personalInfoText,flex:.9}}  >Personal Info</Paragraph>
    <TouchableOpacity  onPress={() => navigation.navigate('ContactInfo')}>
    <MaterialIcons name="arrow-forward-ios" size={24} color="black" />
    </TouchableOpacity>
  </View>
</View>


    </Card.Content>
  </Card>





  <Card style={styles.card}>
    <Card.Content>
      
     

    <View style={styles.personalInfoContainer}>
    <FontAwesome name="bank" size={24} color="black" />
  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
    <Paragraph style={{...styles.personalInfoText,flex:.9}}  >Bank Account </Paragraph>
    <TouchableOpacity  onPress={() => navigation.navigate('AddAccount')}>
    <MaterialIcons name="arrow-forward-ios" size={24} color="black" />
    </TouchableOpacity>
  </View>
</View>


    </Card.Content>
  </Card>


  <Card style={styles.card}>
    <Card.Content>
      
     

    <View style={styles.personalInfoContainer}>
    <FontAwesome name="credit-card-alt" size={24} color="black" />
  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
    <Paragraph style={{...styles.personalInfoText,flex:.9}}  >My Purchases</Paragraph>
    <TouchableOpacity  onPress={() => navigation.navigate('PurchaseScreen')}>
    <MaterialIcons name="arrow-forward-ios" size={24} color="black" />
    </TouchableOpacity>
  </View>
</View>


    </Card.Content>
  </Card>


  <Card style={styles.card}>
    <Card.Content>
      
     

    <View style={styles.personalInfoContainer}>
    <Ionicons name="settings" size={24} color="black" />
  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
    <Paragraph style={{...styles.personalInfoText,flex:.9}}  >Password</Paragraph>
    <MaterialIcons name="arrow-forward-ios" size={24} color="black" />
  </View>
</View>


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
    marginTop: 10,
    alignSelf:'center'
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
   
    paddingTop: 50, // Adjust as needed to create space from the top
  },
  profilePictureContainer: {
    marginBottom: 10,
    alignSelf:'center'
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
    alignSelf:'center'
  },
  memberSince: {
    fontSize: 16,
    color: '#555',
    alignSelf:'center'
  },
  logOut: {
    fontSize: 16,
    color: '#555',
    marginTop: 7,
    alignSelf:'center'
  },
  personalInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    alignSelf:'center'
  },
  personalInfoText: {
    fontSize: 16,
    color: '#555',
    marginLeft: 5,
    alignSelf:'flex-end'
  },
  bell: {
    width: 24,
    height: 24,
    top: 1,
    left: 130,
    marginTop:5,
    padding: '2px 3.5px 2px 3.5px',
   
  },
  logout: {
    marginTop:6,
    width: 24,
    height: 24,
    top: 1,
    marginRight:20
   
   
  },
});


export default ProfileScreen;
