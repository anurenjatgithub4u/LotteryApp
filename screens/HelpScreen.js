// import React  ,{useEffect,useState} from 'react';
// import { View, Text, TextInput,StyleSheet ,TouchableOpacity } from 'react-native';
// import { Card, Title, Paragraph } from 'react-native-paper'; 
// import { FontAwesome5 } from '@expo/vector-icons'; // Make sure to import FontAwesome5 from the correct package
// import { useNavigation } from '@react-navigation/native';
// import { AntDesign } from '@expo/vector-icons';
// import { MaterialIcons } from '@expo/vector-icons';
// import { Foundation } from '@expo/vector-icons';
// import { EvilIcons } from '@expo/vector-icons';

//  // Make sure to import FontAwesome5 from the correct package

//  const HelpScreen = () => {

//   const [faqs, setFaqs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigation = useNavigation();
//   const handleCardPress = () => {
//     // Navigate to the FAQ screen
//     navigation.navigate('Faq');
//   };
//   useEffect(() => {
//     const fetchFaqs = async () => {
//       try {
//         const response = await fetch('https://lottery-backend-tau.vercel.app/api/v1/admin/get-faqs');
//         const data = await response.json();
  
//         console.log('API Response:', data); // Log the response to the console
  
//         if (!response.ok) {
//           throw new Error(`Failed to fetch FAQs: ${data.message}`);
//         }
  
//         setFaqs(data.message || []);
//         setLoading(false);
//       } catch (error) {
//         setError(error.message);
//         setLoading(false);
//       }
//     };
  
//     fetchFaqs();
//   }, []);


//   return(
 


// <View style={{ justifyContent: 'flex-start', paddingHorizontal: 16, paddingTop: 50 }}>

// <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
//   <MaterialIcons
//     name="keyboard-arrow-left"
//     size={35}
//     color="black"
//     style={{
//       marginLeft: 5,
//       alignSelf: 'flex-start', // Add this line,
      
//     }}
//   />
   
//   <EvilIcons name="bell" size={30} style={styles.bell} color="black" />
//   <AntDesign name="logout" size={19} style={styles.logout} color="black" />
// </View>

// <Text style={{ fontSize: 31, fontWeight: '700', marginLeft: '5%' }}>Help & FAQs</Text>

// <View style={styles.searchContainer}>
//   <TextInput
//     style={styles.searchInput}
//     placeholder="Search..."
//   />
// </View>

// <View style={{flexDirection:'column',marginLeft:5}}>

// {faqs.map((faq) => (
//         <TouchableOpacity key={faq._id} onPress={() => navigation.navigate('HelpDetail',{ faqDetails: faq })}>
//           <View style={{ flexDirection: 'column' }}>
//             <Text style={styles.textStyle}>{faq.heading}</Text>
//             <Text style={styles.textStyleTwo}>{faq.paragraph}</Text>
//             <View style={styles.underline} />
//           </View>
//         </TouchableOpacity>
//       ))}





// </View>


// </View>

//   )
 
//  };

// const styles = StyleSheet.create({
//   cardContainer: {
//     borderWidth: 1,
//     borderColor: 'black',
//     borderRadius: 5,
//     padding: 40, // Adjust padding as needed
//     width: '100%',
//     marginTop: 50,
//     height:140
//   },
//   cardContainer: {
//     height: 150,
//     backgroundColor: 'white',
//     padding: 16,
//     margin: 10,
//     borderRadius: 10,
//     elevation: 3, // Add elevation for a shadow effect (Android)
//     shadowColor: '#000', // Add shadow properties for iOS
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//   },
//   underline: {
//     borderBottomColor: 'black',
//     borderBottomWidth: 0.5,
//     width:'90%',
//     alignSelf:'center',
//     marginTop:10
//   },
//   cardHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   cardHeaderText: {
//     marginLeft: 10,
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   iconText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginLeft: 8,
//   },
//   cardHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   cardHeaderText: {
//     marginLeft: 10,
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   topContainer: {
//     flexDirection: 'row',
 
//     justifyContent: 'flex-start',
//     marginBottom: 20, // Adjust margin as needed
//   },
//   card: {
//     width: '100%', // Set the width to 100%
//     backgroundColor: 'white',
//     elevation: 3, // Add elevation for a shadow effect (Android)
//     shadowColor: '#000', // Add shadow properties for iOS
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     height:150,
//     marginTop: 50
//   },
//   heading: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginStart:10
//   },
//   bell: {
//     width: 24,
//     height: 24,
//     top: 1,
//     left: 130,
//     marginTop:5,
//     padding: '2px 3.5px 2px 3.5px',
   
//   },
//   logout: {
//     marginTop:6,
//     width: 24,
//     height: 24,
//     top: 1,
//     marginRight:20,
//     marginLeft:20
   
   
//   },

//   searchContainer: {
//     width: 343,
//     height: 41,
//     marginBottom:'5%',
//     marginTop:'10%',
//     borderRadius: 20,
//     borderWidth: 0.5,
//     marginLeft: '5%', 
//     zIndex: 1, // Ensures the search field is above other elements
//     backgroundColor: 'white', // Optional background color
//   },
//   searchInput: {
//     flex: 1,
//     padding: 10,
//   },
//   textContainer: {
//     width: 261,
//     height: 28,
//     top: 10,
//     left: 30,
//     position: 'absolute',
//     zIndex: 1, // Ensure the text is above other elements
//   },
//   textStyle: {
//     color:'black',
//     fontSize: 18,
//     fontWeight: '700',
//     lineHeight: 28,
//     letterSpacing: 0.8,
//     textAlign: 'left',
//     marginLeft: '5%', 
//     marginTop: '5%'
//   },
//   textStyleTwo: {
    
//     color:'black',
//     fontSize: 14,
//     fontWeight: '400',
//     lineHeight: 28,
//     letterSpacing: 0.8,
//     textAlign: 'left',
//     marginLeft:'5%'
   
//   },
  
// });
// export default HelpScreen;


import React  ,{useEffect,useState} from 'react';
import { View, Text, TextInput,StyleSheet ,TouchableOpacity ,ScrollView,ActivityIndicator} from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper'; 
import { FontAwesome5 } from '@expo/vector-icons'; // Make sure to import FontAwesome5 from the correct package
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


 // Make sure to import FontAwesome5 from the correct package

 const HelpScreen = () => {

  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();
  const handleCardPress = () => {
    // Navigate to the FAQ screen
    navigation.navigate('Faq');
  };

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
        navigation.navigate('ProfileLanding');
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
  const handleLogout = () => {
    logout(navigation);
  };

  useFocusEffect(
    React.useCallback(() => {
      const fetchFaqs = async () => {
        try {
          const response = await fetch('https://lottery-backend-tau.vercel.app/api/v1/admin/get-faqs');
          const data = await response.json();
  
          console.log('API Response:', data);
  
          if (!response.ok) {
            throw new Error(`Failed to fetch FAQs: ${data.message}`);
          }
  
          setFaqs(data.message || []);
          setLoading(false);
        } catch (error) {
          setError(error.message);
          setLoading(false);
        }
      };
  
      fetchFaqs();
  
      return () => {
        // Cleanup if needed
      };
    }, [])
  );

  return (
    <View style={{ justifyContent: 'flex-start', paddingHorizontal: 16, paddingTop: 50 }}>
  
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>

      <TouchableOpacity  onPress={()=> navigation.navigate('Home')}>
        <MaterialIcons
          name="keyboard-arrow-left"
          size={35}
          color="black"
          style={{
            marginLeft: 5,
            alignSelf: 'flex-start',
          }}
        />
  </TouchableOpacity>
        <EvilIcons name="bell" size={30} style={styles.bell} color="black" />

        <TouchableOpacity  onPress={handleLogout}>
        <AntDesign name="logout" size={19} style={styles.logout} color="black" />
        </TouchableOpacity>
      </View>
  
      <Text style={{ fontSize: 31, fontWeight: '700', marginLeft: '5%' }}>Help & FAQs</Text>
  
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
        />
      </View>
  
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (

        <ScrollView  style={{marginBottom:200,marginLeft:10}}>
        {faqs.map((faq) => (
          <TouchableOpacity key={faq._id} onPress={() => navigation.navigate('HelpDetail', { faqDetails: faq })}>
            <View style={{ flexDirection: 'column' }}>
              <Text style={styles.textStyle}>{faq.heading}</Text>
              <Text style={styles.textStyleTwo}>{faq.paragraph}</Text>
              <View style={styles.underline} />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
  )}
    </View>
  );
  
 
 };

const styles = StyleSheet.create({
 
  cardContainer: {
    height: 150,
    backgroundColor: 'white',
    padding: 16,
    margin: 10,
    borderRadius: 10,
    elevation: 3, // Add elevation for a shadow effect (Android)
    shadowColor: '#000', // Add shadow properties for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  underline: {
    borderBottomColor: 'black',
    borderBottomWidth: 0.5,
    width:'90%',
    alignSelf:'center',
    marginTop:10
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardHeaderText: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  iconText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardHeaderText: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  topContainer: {
    flexDirection: 'row',
 
    justifyContent: 'flex-start',
    marginBottom: 20, // Adjust margin as needed
  },
  card: {
    width: '100%', // Set the width to 100%
    backgroundColor: 'white',
    elevation: 3, // Add elevation for a shadow effect (Android)
    shadowColor: '#000', // Add shadow properties for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    height:150,
    marginTop: 50
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginStart:10
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
    marginRight:20,
    marginLeft:20
   
   
  },

  searchContainer: {
    width: '90%', // Use a percentage for responsive width
    height: 41, // Use a percentage for responsive height
    marginBottom: '5%',
    marginTop: '10%',
    borderRadius: 20,
    borderWidth: 0.5,
    marginLeft: '5%',
   
    backgroundColor: 'white',
  },
  searchInput: {
    flex: 1,
    padding: 10,
  },
  textContainer: {
    width: 261,
    height: 28,
    top: 10,
    left: 30,
    position: 'absolute',
    zIndex: 1, // Ensure the text is above other elements
  },
  textStyle: {
    color:'black',
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 28,
    letterSpacing: 0.8,
    textAlign: 'left',
    marginLeft: '5%', 
    marginTop: '5%'
  },
  textStyleTwo: {
    
    color:'black',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 28,
    letterSpacing: 0.8,
    textAlign: 'left',
    marginLeft:'5%'
   
  },
  
});
export default HelpScreen;
