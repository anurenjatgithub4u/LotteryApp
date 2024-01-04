import { View, Text ,StyleSheet ,TouchableOpacity} from 'react-native'
import React ,{ useState,useEffect } from 'react'
import { Card, TextInput, Button , Chip} from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { EvilIcons } from '@expo/vector-icons';


const NumberRow = ({ numbers }) => {



  return (
    <View style={styles.container}>
      {numbers.map((number, index) => (
        <View key={index} style={styles.numberBox}>
          <Text style={styles.numberText}>{number}</Text>
        </View>
      ))}
    </View>
  );
};
const HomeScreen =() => {


  const navigation = useNavigation();
  const [userGames, setUserGames] = useState([]);
  const [userName, setUserName] = useState(null);
  

  const getUserGames = async ( ) => {
    const storedAccessToken = await AsyncStorage.getItem('accessToken');
    const userId = await AsyncStorage.getItem('userId');

    const url = `https://lottery-backend-tau.vercel.app/api/v1/user/game/get-game/${userId}`;
  
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${storedAccessToken}`,
        },
      });
  
      if (!response.ok) {
        const userGames = await getUserGames(userId, authToken);
        const errorData = await response.json();
        console.log('User games:', errorData);
        const responseData = await response.json();
        console.log('User games data:', responseData);
  
        // Update the state with user games data
        setUserGames(responseData.message);
        throw new Error(`Failed to fetch user games: ${errorData.message}`);
        
  
      }
  
      const responseData = await response.json();
      console.log('User games data:', responseData);
      responseData.message.forEach(game => {
        // Log the selectedNumbers array for each game
        console.log('Selected numbers for game:', game.selectedNumbers);
      });
      // Log the successful response data
      return responseData;
    } catch (error) {
      console.error('Error while fetching user games:', error.message);
      throw error;
    }
  };


  useEffect(() => {
    // Function to retrieve userName from AsyncStorage
    const getUserNameFromStorage = async () => {
      try {
        const storedUserName = await AsyncStorage.getItem('userName');
        if (storedUserName !== null) {
          setUserName(storedUserName);
        }
      } catch (error) {
        console.error('Error retrieving userName from AsyncStorage:', error);
      }
    };

    // Call the function to get userName when the component mounts
    getUserNameFromStorage();
  }, []);

  useEffect(() => {
    // Fetch user games data when the component mounts
    const fetchData = async () => {
      try {
        const responseData = await getUserGames();
        setUserGames(responseData.message);
      } catch (error) {
        console.error('Error fetching user games:', error.message);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    getUserGames();
  }, []);
  return (
    <View style={{ flex:1,alignItems: 'center',justifyContent:'flex-start' , marginTop:65}}>

<View style={{ flexDirection: 'row', alignItems: 'center'}}>


<EvilIcons name="bell" size={30}  style={styles.bell}  color="black" />
    <AntDesign name="logout" size={19} style={styles.logout}color="black" />
</View>

<Text style={styles.welcomeText}>{`Welcome , ${userName || 'Guest'}`}</Text>

     
    
        <LinearGradient
          colors={['#31A078', '#31A05F']} // Example colors, replace with your desired gradient colors
          style={styles.card}
        >

<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
  <Text style={styles.createdAtText}>
    Date 
  </Text>

  <Text style={styles.viewGame}>View Game</Text>
</View>
         <NumberRow numbers={[1, 2, 3, 4, 5, 6]} />
        </LinearGradient>
    

      <View>

      <Text  style={styles.yohaveText} > You have</Text>

      <Text  style={styles.creditsText} > 20 Credits</Text>

      </View>


      <View style={{ flexDirection: 'row', alignItems: 'flex-start' ,justifyContent:'space-between'}}>
              
      <LinearGradient
  colors={['#31A078', '#31A05F']} // Example colors, replace with your desired gradient colors
  style={styles.playNowcard}
>
  <TouchableOpacity onPress={() => navigation.navigate('PaymentMethodPage')}>
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color: 'white' }}>Buy Credits</Text>
    </View>
  </TouchableOpacity>
</LinearGradient>
<LinearGradient
  colors={['#F0C735', '#D98F39']} // Example colors, replace with your desired gradient colors
  style={styles.playNowcard}
>
  <TouchableOpacity onPress={() => navigation.navigate('Play')}>
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color: 'white' }}>Play Now</Text>
    </View>
  </TouchableOpacity>
</LinearGradient>

</View>

      <View style={{ flexDirection: 'row',marginBottom:15, justifyContent: 'flex-start',alignItems:'flex-start',marginTop:20 }}>

        <Text  style={styles.previousgames}>Previous Games</Text>

        <Text  style={styles.seeAll}>See all</Text>
        <AntDesign name="arrowright"  style={{marginTop:7,marginRight:10}} size={24} color="#FE555D" />

        </View>



  
        <ScrollView  style={{marginBottom:10}}>
      {userGames
      
      .map((game, index) => (

        <LinearGradient
        colors={['#F0C735', '#D98F39']} // Example colors, replace with your desired gradient colors
        style={styles.mainCard}
      >
        <TouchableOpacity key={index} onPress={() => handleCardPress(game)}>
         
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
  <Text style={styles.createdAtText}>
    {new Date(game.createdAt).toLocaleDateString()}
  </Text>

  <Text style={styles.viewGame}>View Game</Text>
</View>


            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
              
              <View style={styles.container}>
                {game.selectedNumbers.map((number, index) => (
                  <View key={index} style={styles.numberBox}>
                    <Text style={styles.numberText}>{number}</Text>

                    
                  </View>
                ))}
              </View>
            </View>

         
       
        </TouchableOpacity>
</LinearGradient>


      ))}
      </ScrollView>

      
    </View>
  )
}



const styles = StyleSheet.create({
  welcomeText: {
    width: 354,
    height: 41,
    top: 33,
    left: 10,

    fontSize: 30, // Adjust the font size as needed
    fontWeight: 'bold',
    marginBottom:50
   
  },
  numberBox: {
    width: 43,
    height: 37,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'white',
    margin: 4.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
  },
  createdAtText: {
    fontWeight: 'bold',
    fontSize: 15,
    marginLeft: 10,
    marginBottom: 10,
    color: 'white',
    flex: 1, // Use flex to allow the text to take available space
  },
  mainCard: {
    width: '100%',
     marginBottom:10,
    
    borderRadius: 15,
    padding: 15,
    height:130,
    elevation: 3,
    backgroundColor: '#F0C735'
  },
  mainCardTwo: {
    margin: 10,
    padding: 15,
    borderRadius: 15,
    height:134,
    width:354,
    elevation: 3,
    backgroundColor: '#F0C735',
    marginTop:50,
    alignSelf:'center'
  },
  yohaveText: {
    width: 354,
    height: 41,
    top: 10,
    left: 10,

    fontSize: 16, // Adjust the font size as needed
    
  
   
  },

  container: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap', // Allow items to wrap to the next line
    justifyContent: 'center', // Center items horizontally
  },
  previousgames: {
   
    fontSize: 22, // Adjust the font size as needed
    fontWeight: 'bold',
    textAlign: 'left', // Add this line to explicitly set text alignment to left
    marginRight:105,
    marginLeft:17
  },
  seeAll: {
     marginTop:8,
    fontSize: 16, // Adjust the font size as needed
    marginRight:5,
    textAlign: 'left',
    color:'#FE555D' // Add this line to explicitly set text alignment to left
   
  },
  creditsText: {
    width: 354,
    height: 41,
    top: 1,
    left: 1,

    fontSize: 30, // Adjust the font size as needed
    marginBottom:5
    
   
   
  },
  viewGame: {
    fontSize: 15,
    marginLeft: 10, // Adjust this margin based on your design
    marginBottom: 10,
    fontWeight: 'bold',
    color: 'white',
    // No need for marginLeft here, as we're using justifyContent: 'space-between'
  },

  card: {
    width: 354,
    margin: 10,
    padding: 15,
    borderRadius: 15,
    backgroundColor: '#31A078', // Set to the desired color
    elevation: 3,
    height: 125,
    paddingLeft:20
  },
  playNowcard: {
    width: 147,
    margin: 1,
    padding: 15,
    borderRadius: 15,
    backgroundColor: '#F0C735', // Set to the desired color
    elevation: 3,
    height: 50,
    paddingLeft:20,
    marginRight:20,
    marginLeft:20,
    alignSelf:'flex-start'
  },
  
  createaccountText: {
    
   
    // Add this line to align text to the left
    width: 354,
    height: 41,
    top: 103,
    left: 30,

    fontSize: 30, // Adjust the font size as needed
    fontWeight: 'bold',
    marginBottom:100
  },

  textInput: {
    borderColor: 'black',
    backgroundColor: 'white',
    width: '100%',
    borderWidth: 1,
    borderStyle: 'solid',
    fontSize: 15,
    borderRadius: 25,
    color: 'white', // Add this line to set the text color to white
  },
  

  createaccountTextTwo: {
    
    fontSize: 17,
    width: 354,
    height: 22,
    top: 10,
    left: 38,
  
    fontSize: 13,
    marginBottom: 80,
    textAlign: 'left', // Add this line to align text to the left
  },
  

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    selectedCountryText: {
      fontSize: 16,
      paddingVertical: 10,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 4,
      backgroundColor: 'white',
    },
   
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 10,
      elevation: 5,
    },
    countryItem: {
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: 'gray',
    },
    elevation: 5,
  },
  countryItem: {
    paddingVertical: 10,
    
    borderBottomColor: 'gray',
  },
  circleText: {
    backgroundColor: 'white',
    borderRadius: 50,
    width: 100,
    height: 100,
    textAlign: 'center',
    lineHeight: 100,
    fontSize: 20,
    marginTop: -20, // Adjust the negative margin top to move the circle upward
  },
  numberBoxTwo: {
    width: 45,
    height: 35,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'white',
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
  },
  bell: {
    width: 24,
    height: 24,
    top: 1,
    left: 150,
    padding: '2px 3.5px 2px 3.5px',
   
  },
  logout: {
    marginTop:5,
    width: 24,
    height: 24,
    top: 1,
    left: 165,
    padding: '2px 3.5px 2px 3.5px',
   
  },
});



export default HomeScreen;