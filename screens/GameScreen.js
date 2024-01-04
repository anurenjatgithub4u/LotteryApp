


// import { useNavigation } from '@react-navigation/native';
// import React, { useState,useEffect } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet ,ScrollView} from 'react-native';
// import DateTimePickerModal from 'react-native-modal-datetime-picker';
// import { Card, TextInput, Button , Chip} from 'react-native-paper';
// import { FontAwesome5 } from '@expo/vector-icons';
// import CalendarPicker from 'react-native-calendar-picker'
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { AntDesign } from '@expo/vector-icons';


// const GameScreen = () => {
//   const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [searchText, setSearchText] = useState('');
//   const navigation = useNavigation();
//   const [userGames, setUserGames] = useState([]);
//    const [selectedStartDate, setSelectedStartDate] = useState('DD/MM/YYYY')
//    const [selectedEndDate, setSelectedEndDate] = useState('DD/MM/YYYY')
//    const [showCalendarPicker, setShowCalendarPicker] = useState(false);

//   const onDateChange=(date,type) => {
//    console.log(JSON.stringify(date))
//    const newDate = JSON.stringify(date)
//    const newDate1 = newDate.substring(1,newDate.length - 1)
//    const dates = newDate1.split("T")
//    const date1 = dates[0].split("-")
//    const day = date1[2]
//    const month = date1[1]
//    const year = date1[0]
//    console.log(day+ "-" + month +"-" + year)

   
//    if(type=='END_DATE'){
//     if(day == undefined){
//        setSelectedEndDate('DD/MM/YYYY')
//     }else{
//       setSelectedEndDate(day+"/"+month+"/"+year)
//     }
//    }else{
//     setSelectedStartDate(day+"/"+month+"/"+year)
//     setSelectedEndDate('DD/MM/YYYY')
//    }


//   }
// const minDate = new Date(2015, 6, 3); // Today
//     const maxDate = new Date(2026, 6, 3);
//   const handleCardPress = (game) => {
//     // Navigate to the GameDetails screen with the game data
//     navigation.navigate('GameDetails', { game });
//   };
//   const showDatePicker =async () => {
//     setDatePickerVisibility(true);
//   };

//   const hideDatePicker = () => {
//     setDatePickerVisibility(false);
//   };
//   const toggleCalendarPicker = () => {
//     setShowCalendarPicker(!showCalendarPicker);
//   };
//   const handleConfirmDate = (date) => {
//     setSelectedDate(date);
//     hideDatePicker();
//   };
//   const getUserGames = async ( ) => {
//     const storedAccessToken = await AsyncStorage.getItem('accessToken');
//     const userId = await AsyncStorage.getItem('userId');

//     const url = `https://lottery-backend-tau.vercel.app/api/v1/user/game/get-game/${userId}`;
  
//     try {
//       const response = await fetch(url, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${storedAccessToken}`,
//         },
//       });
  
//       if (!response.ok) {
//         const userGames = await getUserGames(userId, authToken);
//         const errorData = await response.json();
//         console.log('User games:', errorData);
//         const responseData = await response.json();
//         console.log('User games data:', responseData);
  
//         // Update the state with user games data
//         setUserGames(responseData.message);
//         throw new Error(`Failed to fetch user games: ${errorData.message}`);
        
  
//       }
  
//       const responseData = await response.json();
//       console.log('User games data:', responseData);
//       responseData.message.forEach(game => {
//         // Log the selectedNumbers array for each game
//         console.log('Selected numbers for game:', game.selectedNumbers);
//       });
//       // Log the successful response data
//       return responseData;
//     } catch (error) {
//       console.error('Error while fetching user games:', error.message);
//       throw error;
//     }
//   };

//   useEffect(() => {
//     // Fetch user games data when the component mounts
//     const fetchData = async () => {
//       try {
//         const responseData = await getUserGames();
//         setUserGames(responseData.message);
//       } catch (error) {
//         console.error('Error fetching user games:', error.message);
//       }
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     getUserGames();
//   }, []);
  
//   // Example usage:
//   const userId = 'yourUserId'; // Replace with the actual user ID
//   const authToken = 'yourAuthToken'; // Replace with the actual authorization token
  
//   try {
    
   
//   } catch (error) {
//     console.error('Failed to fetch user games:', error.message);
//   }
  
//   return (
//     <View  >


        
//          <Text style={styles.MainheaderText}>Your Games</Text>
//          <Card style={styles.card}>
//         <TouchableOpacity onPress={toggleCalendarPicker}>
//           <Text>Search</Text>
//         </TouchableOpacity>
//       </Card>


//       {showCalendarPicker && (
//       <CalendarPicker
//       startFromMonday={true}
//       allowRangeSelection={true}
//       minDate={minDate}
//       maxDate={maxDate}
//       todayBackgroundColor="#f2e6ff"
//       selectedDayColor="#7300e6"
//       selectedDayTextColor="#FFFFFF"
//       onDateChange={onDateChange}
//     />
//       )}



      
//       {/* Your existing code */}

//       {/* Display selected numbers for each game */}
//       <ScrollView  style={{marginBottom:150}}>
//       {userGames.map((game, index) => (
//         <TouchableOpacity key={index} onPress={() => handleCardPress(game)}>
//           <Card style={styles.card}>
//             <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//               <AntDesign name="calendar" size={24} color="black" />
//               <Text style={styles.headerText}>Week</Text>
//               <Text style={styles.createdAtText}>
//                   {new Date(game.createdAt).toLocaleDateString()}
//                 </Text>
//             </View>

//             <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
//               <Text style={styles.headerTextYourNumber}>Your Numbers:</Text>
//               <View style={styles.container}>
//                 {game.selectedNumbers.map((number, index) => (
//                   <View key={index} style={styles.numberBox}>
//                     <Text style={styles.numberText}>{number}</Text>
//                   </View>
//                 ))}
//               </View>
//             </View>

//             <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 16 }}>
//               <Text style={styles.headerText}>Winning Numbers:</Text>
//               <View style={styles.container}>
//                 {game.selectedNumbers.map((number, index) => (
//                   <View key={index} style={styles.numberBox}>
//                     <Text style={styles.numberText}>{number}</Text>
//                   </View>
//                 ))}
//               </View>
//             </View>
//           </Card>
//         </TouchableOpacity>
//       ))}
//       </ScrollView>
//     </View>
//   );
// };


// const styles = StyleSheet.create({
//   card: {
//     margin: 10,
//     padding: 15,
//     borderRadius: 15,
//     backgroundColor: '#f0f0f0',
//     elevation: 3,
//   },
//   createdAtText: {
//     fontSize: 15,
//     marginLeft: 10,
//     marginBottom:10 // Add margin left for spacing
//   },
//   MainheaderText: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 10, 
//     marginStart:10// Add margin bottom for spacing
//   },
//   headerText: {
//     fontSize: 15,
//     fontWeight: 'bold',
//     marginBottom: 10, 
//     marginStart:5// Add margin bottom for spacing
//   },
//   headerTextTwo: {
//     fontSize: 15,
//     fontWeight: 'bold',
    
//     marginStart:10// Add margin bottom for spacing
//   },
//   headerTextYourNumber: {
//     fontSize: 15,
//     fontWeight: 'bold',
//     marginBottom: 10, 
//     marginStart:5,
//     marginEnd:23// Add margin bottom for spacing
//   },
//   cardTwo: {
//     margin: 10,
//     padding: 15,
//     borderRadius: 15,
//     backgroundColor: '#f0f0f0',
//     elevation: 3,
//   },
//   container: {
//     flexDirection: 'row',
//     alignItems: 'center',
    
//   },
//   numberBox: {
//     width: 30,
//     height: 30,
//     borderRadius: 20, // Make it half of the width and height for a circular box
//     borderWidth: .5,
//     borderColor: '#333',
//     margin: 2.5,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   numberText: {
//     fontSize: 12,
//     fontWeight: 'bold',
//     color: '#333',
//   },
// });

// export default GameScreen;




import { useNavigation } from '@react-navigation/native';
import React, { useState,useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet ,ScrollView} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Card, TextInput, Button , Chip} from 'react-native-paper';
import { FontAwesome5 } from '@expo/vector-icons';
import CalendarPicker from 'react-native-calendar-picker'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';


const GameScreen = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [searchText, setSearchText] = useState('');
  const navigation = useNavigation();
  const [userGames, setUserGames] = useState([]);
   const [selectedStartDate, setSelectedStartDate] = useState('DD/MM/YYYY')
   const [selectedEndDate, setSelectedEndDate] = useState('DD/MM/YYYY')
   const [showCalendarPicker, setShowCalendarPicker] = useState(false);

  const onDateChange=(date,type) => {
   console.log(JSON.stringify(date))
   const newDate = JSON.stringify(date)
   const newDate1 = newDate.substring(1,newDate.length - 1)
   const dates = newDate1.split("T")
   const date1 = dates[0].split("-")
   const day = date1[2]
   const month = date1[1]
   const year = date1[0]
   console.log(day+ "-" + month +"-" + year)

   
   if(type=='END_DATE'){
    if(day == undefined){
       setSelectedEndDate('DD/MM/YYYY')
    }else{
      setSelectedEndDate(day+"/"+month+"/"+year)
    }
   }else{
    setSelectedStartDate(day+"/"+month+"/"+year)
    setSelectedEndDate('DD/MM/YYYY')
   }


  }
const minDate = new Date(2015, 6, 3); // Today
    const maxDate = new Date(2026, 6, 3);
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
  const toggleCalendarPicker = () => {
    setShowCalendarPicker(!showCalendarPicker);
  };
  

  const filterGamesByDateRange = (game) => {
    const createdAtDate = new Date(game.createdAt);
    console.log('CreatedAtDate:', createdAtDate);
  
    // Convert selectedStartDate to the format YYYY-MM-DD for accurate comparison
    const selectedStartDateDate = selectedStartDate !== 'DD/MM/YYYY' ? new Date(selectedStartDate.split('/').reverse().join('-')) : null;
    const selectedEndDateDate = selectedEndDate !== 'DD/MM/YYYY' ? new Date(selectedEndDate.split('/').reverse().join('-')) : null;
  
    if (selectedStartDateDate && selectedEndDateDate) {
      // If both start and end dates are selected, filter games within the date range
      return createdAtDate >= selectedStartDateDate && createdAtDate <= selectedEndDateDate;
    } else if (selectedStartDateDate) {
      // If only start date is selected, filter games on or after the start date
      return createdAtDate >= selectedStartDateDate;
    } else if (selectedEndDateDate) {
      // If only end date is selected, filter games on or before the end date
      return createdAtDate <= selectedEndDateDate;
    } else {
      // If no date range is selected, show all games
      return true;
    }
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
    <View  style={{marginTop:50}}  >

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
        
         <Text style={styles.MainheaderText}>Your Games</Text>
         <Card style={styles.card}>
        <TouchableOpacity onPress={toggleCalendarPicker}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <AntDesign name="calendar" size={24} color="black"  style={{  marginRight:10}} />
          <Text>Search</Text>
         
          </View>
        </TouchableOpacity>
      </Card>


      {showCalendarPicker && (
      <CalendarPicker
      startFromMonday={true}
      allowRangeSelection={true}
      minDate={minDate}
      maxDate={maxDate}
      todayBackgroundColor="#f2e6ff"
      selectedDayColor="#7300e6"
      selectedDayTextColor="#FFFFFF"
      onDateChange={onDateChange}
    />
      )}



      
      {/* Your existing code */}

      {/* Display selected numbers for each game */}
      <ScrollView  style={{marginBottom:150}}>
      {userGames
      .filter(filterGamesByDateRange)
      .map((game, index) => (

        <LinearGradient
        colors={['#F0C735', '#D98F39']} // Example colors, replace with your desired gradient colors
        style={styles.mainCard}
      >
        <TouchableOpacity key={index} onPress={() => handleCardPress(game)}>
         
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              
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
  );
};


const styles = StyleSheet.create({
  card: {
    margin: 10,
    padding: 15,
    borderRadius: 15,
    backgroundColor: '#f0f0f0',
    elevation: 3,
    width:350,
    alignSelf:'center'
   
  },

  mainCard: {
    margin:10,
    marginStart:10,
    
    borderRadius: 15,
    height:130,
    elevation: 3,
    backgroundColor: '#F0C735',
    width:354,
    padding:15,
    alignSelf:'center'
  },
  createdAtText: {
    fontWeight:'bold',
    fontSize: 15,
    marginLeft: 10,
    marginBottom:10 ,
    color:'white'// Add margin left for spacing
  },
  viewGame: {
    fontSize: 15,
    marginLeft: 150,
    marginBottom:10 ,
    
    fontWeight:'bold',
    color:'white'// Add margin left for spacing
  },
  MainheaderText: {
    fontSize: 30,
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
  numberBox: {
    width: 43,
    height: 37,
    borderRadius: 10, // Make it half of the width and height for a circular box
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
});


export default GameScreen;