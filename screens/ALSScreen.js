import { useNavigation } from '@react-navigation/native';
import   React  , {useEffect,useState} from 'react';
import { View } from 'react-native';
import { Card, Title, Text, Button } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const MyCardComponent = () => {
  const navigation = useNavigation();
  const [userCredits, setUserCredits] = useState(0);

  const handleButtonPress = () => {
    navigation.navigate('ChooseLevel');
  };
  const handleMainScreen = () => {
    navigation.navigate('ChooseLevel');
  };

  const checkUserCredits = async (navigateToPayment, navigateToMainScreen) => {
    try {
      // Retrieve userId from AsyncStorage
      const storedUserDetails = await AsyncStorage.getItem('userDetails');
      const accessToken = await AsyncStorage.getItem('accessToken');
      // Parse the stored JSON string to get the user details object
      const userDetails = JSON.parse(storedUserDetails);
  
      // Check if userDetails exists and has _id property
      if (!userDetails || !userDetails._id) {
        console.log('User details not found in AsyncStorage');
        return;
      }
  
      // Extract userId
      const userId = userDetails._id;
  
      // Make API request to check user credits
      const response = await fetch(`https://lottery-backend-tau.vercel.app/api/v1/user/get-credits/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
          // Include any additional headers or tokens if needed
        },
      });
  
      if (response.ok) {
        const result = await response.json();
        console.log('User credits:', result.credits);
        const userCredits = result.credits;

        // Store the user credits in AsyncStorage
        await AsyncStorage.setItem('userCredits', userCredits.toString());
  
        console.log('new credits:', userCredits);
        
        // If credits are zero, navigate to the payment gateway
        if (result.credits === 0) {
          navigation.navigate('PaymentMethodPage');
        } else {
          navigation.navigate('MainScreen');
        }
      } else {
        console.error('Failed to fetch user credits');
      }
    } catch (error) {
      console.error('Error checking user credits:', error.message);
    }
  };
 

  const checkCreditsAndNavigate = async () => {
    try {
      // Retrieve userCredits from AsyncStorage
      const storedUserCredits = await AsyncStorage.getItem('userCredits');

      // Parse the string back to a number
      const userCredits = storedUserCredits 

      // Check if userCredits is equal to 0
      if (storedUserCredits === 0) {
        // If credits are 0, navigate to the PaymentMethodPage
        navigation.navigate('PaymentMethodPage');
      } else {
        // If credits are greater than 0, navigate to the MainScreen
        navigation.navigate('MainScreen');
      }
    } catch (error) {
      console.error('Error checking credits:', error);
      // Handle errors, e.g., show an error message or redirect to an error screen
    }
  };
  
  const fetchAndConsoleStoredCredits = async () => {
    try {
      // Retrieve userCredits from AsyncStorage
      const storedCredits = await AsyncStorage.getItem('credits');

  
      // Log the stored user credits
      console.log('Stored User credits checked succefull:', storedCredits);
  
      // If needed, you can parse it back to a number
      const userCredits = storedCredits ? parseInt(storedCredits) : 0;
      console.log('Parsed User credits (as number):', userCredits);
  
      // Conditionally navigate based on userCredits
      if (userCredits === 0) {
        // If userCredits is 0, navigate to MainScreen
        navigation.navigate('PaymentMethodPage');
      } else {
        // If userCredits is not 0, navigate to PaymentMethodPage
        navigation.navigate('MainScreen');
      }
    } catch (error) {
      console.error('Error fetching stored user credits:', error.message);
    }
  };
  

  const isWorking = async() => {
    console.log()
  }
  
  // Example usage:
  // Call the check function when you want to check and navigate based on user credits
  // For example, you can call it after the user logs in or when the component mounts
  // check();
  


  const checkUserIdAndReference = async () => {
    try {
      // Retrieve userId and accessToken from AsyncStorage
      const storedUserDetails = await AsyncStorage.getItem('userDetails');
      const accessToken = await AsyncStorage.getItem('accessToken');
  
      // Parse the stored JSON string to get the user details object
      const userDetails = JSON.parse(storedUserDetails);
  
      // Check if userDetails exists and has _id property
      if (!userDetails || !userDetails._id) {
        console.log('User details not found in AsyncStorage');
        return;
      }
  
      // Extract userId
      const userId = userDetails._id;
       console.log("id",userId)
       console.log("token",accessToken)
      // Make API request to check user details
   
  
     
    } catch (error) {
      console.error('Error checking user details:', error.message);
    }
  };
  
  // Example usage:
  // Call the checkUserIdAndReference function when needed, for example, on a button press
  <Button
    mode="contained"
    onPress={checkUserIdAndReference}
    style={{ width: '80%', marginVertical: 10, alignSelf: 'center' }}
  >
    Check User ID and Reference
  </Button>
  


  return (

    <View>

      <View   style={{marginLeft:10, marginRight:10, marginTop:150}} >


      <Card style={{marginBottom:20}}>
      <Title style={{ fontWeight: 'bold',marginBottom:10,marginStart:10 }}>Games</Title>
      </Card>


        <Text style={{marginTop:5,marginBottom:5}}> ALS is a six-digit lucky draw game</Text>

        <Text style={{marginTop:5,marginBottom:5}}> You are asked to select 6 random digits from 1 - 60 </Text>

        <Text style={{marginTop:5,marginBottom:5}}> During the lucky draw if the 6 digits you choose  
          </Text>

          <Text style={{marginTop:5,marginBottom:5}}> come you win the whole price</Text>
          <Text style={{marginTop:5,marginBottom:5}}> There are prizes for 5,4,3 consecutive digits too</Text>
          <Text style={{marginTop:5,marginBottom:5}}> Als is available as National Level or Continental Level</Text>

          <Text style={{marginTop:5,marginBottom:5}}> You can choose to play how many times you want</Text>

          <Text style={{marginTop:5,marginBottom:5}}> but you will need to pay for each game </Text>
   
          </View>

          <Button
  mode="contained"
  onPress={handleButtonPress}
  style={{ width: '80%', marginVertical: 10, alignSelf: 'center' }}
>
  ALS Continental
</Button>

  
      <Button mode="contained" onPress={fetchAndConsoleStoredCredits} style={{ width: '80%', marginVertical: 10, alignSelf: 'center' }}>
          ALS National
      </Button>
    </View>
   
  );
};

export default MyCardComponent;


