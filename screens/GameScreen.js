import { useNavigation } from '@react-navigation/native';
import React, { useState,useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet ,ScrollView} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Card, TextInput, Button , Chip} from 'react-native-paper';
import { FontAwesome5 } from '@expo/vector-icons';
import CalendarPicker from 'react-native-calendar-picker'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons';

const GameScreen = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [searchText, setSearchText] = useState('');
  const navigation = useNavigation();
  const [userGames, setUserGames] = useState([]);

  const handleCardPress = (game) => {
    // Navigate to the GameDetails screen with the game data
    navigation.navigate('GameDetails', { game });
  };
  const showDatePicker =async () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirmDate = (date) => {
    setSelectedDate(date);
    hideDatePicker();
  };
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
  
  // Example usage:
  const userId = 'yourUserId'; // Replace with the actual user ID
  const authToken = 'yourAuthToken'; // Replace with the actual authorization token
  
  try {
    
   
  } catch (error) {
    console.error('Failed to fetch user games:', error.message);
  }
  
  return (
    <View  >
         <Text style={styles.MainheaderText}>Your Games</Text>
      <Card style={styles.card}>

        <Text>Search</Text>
      </Card>
      {/* Your existing code */}

      {/* Display selected numbers for each game */}
      <ScrollView  style={{marginBottom:150}}>
      {userGames.map((game, index) => (
        <TouchableOpacity key={index} onPress={() => handleCardPress(game)}>
          <Card style={styles.card}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <AntDesign name="calendar" size={24} color="black" />
              <Text style={styles.headerText}>Week</Text>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
              <Text style={styles.headerTextYourNumber}>Your Numbers:</Text>
              <View style={styles.container}>
                {game.selectedNumbers.map((number, index) => (
                  <View key={index} style={styles.numberBox}>
                    <Text style={styles.numberText}>{number}</Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 16 }}>
              <Text style={styles.headerText}>Winning Numbers:</Text>
              <View style={styles.container}>
                {game.selectedNumbers.map((number, index) => (
                  <View key={index} style={styles.numberBox}>
                    <Text style={styles.numberText}>{number}</Text>
                  </View>
                ))}
              </View>
            </View>
          </Card>
        </TouchableOpacity>
      ))}
      </ScrollView>
    </View>
  );
};


const styles = StyleSheet.create({
  card: {
    margin: 10,
    padding: 15,
    borderRadius: 15,
    backgroundColor: '#f0f0f0',
    elevation: 3,
  },
  MainheaderText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10, 
    marginStart:10// Add margin bottom for spacing
  },
  headerText: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10, 
    marginStart:5// Add margin bottom for spacing
  },
  headerTextTwo: {
    fontSize: 15,
    fontWeight: 'bold',
    
    marginStart:10// Add margin bottom for spacing
  },
  headerTextYourNumber: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10, 
    marginStart:5,
    marginEnd:23// Add margin bottom for spacing
  },
  cardTwo: {
    margin: 10,
    padding: 15,
    borderRadius: 15,
    backgroundColor: '#f0f0f0',
    elevation: 3,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    
  },
  numberBox: {
    width: 30,
    height: 30,
    borderRadius: 20, // Make it half of the width and height for a circular box
    borderWidth: .5,
    borderColor: '#333',
    margin: 2.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default GameScreen;


