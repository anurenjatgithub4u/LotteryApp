// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'

// const GameDetailsPage = () => {
//   return (
//     <View>
//        <Text style={styles.weekText}>Week</Text>


       
//        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
//               <Text style={styles.headerTextYourNumber}>Your Numbers:</Text>
//               <View style={styles.container}>
               
//                   <View key={1} style={styles.numberBox}>
//                     <Text style={styles.numberText}>2</Text>
//                   </View>
           
//               </View>
//             </View>
//     </View>
//   )
// }
// const styles = StyleSheet.create({
//   // ... (previous styles)

//   weekText: {
//     fontSize: 24, // Adjust the font size as needed
//     fontWeight: 'bold',
//     marginLeft: 5,
//     marginTop:100
//   },
//   card: {
//     margin: 10,
//     padding: 15,
//     borderRadius: 15,
//     backgroundColor: '#f0f0f0',
//     elevation: 3,
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
//     marginStart:10// Add margin bottom for spacing
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
//     marginStart:10,
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
//     justifyContent: 'center',
//   },
//   numberBox: {
//     width: 30,
//     height: 30,
//     borderRadius: 20, // Make it half of the width and height for a circular box
//     borderWidth: 1,
//     borderColor: '#333',
//     margin: 5,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   numberText: {
//     fontSize: 12,
//     fontWeight: 'bold',
//     color: '#333',
//   },

//   // ... (rest of the styles)
// });
// export default GameDetailsPage

import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

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

const GameDetailsPage = ({ route }) => {
  const { game } = route.params;
  const navigation = useNavigation(); 
  const navigateToPlayScreen = () => {
    navigation.navigate('Play'); // 'Play' is the name of your 'PlayScreen' route
  };
  return (
    <View>
 <MaterialIcons name="keyboard-arrow-left" size={35} color="black" style={{
     
     marginLeft: 10, marginTop:50// Add marginLeft to push the icon to the left
   }}/>

      <Text  style={styles.yourGameText}>Your Game</Text>

      <Text  style={styles.dateText}> {new Date(game.createdAt).toLocaleDateString()}</Text>
      
      {/* Display the game data in your UI */}
      



      <LinearGradient
        colors={['#BA8DF3', '#615EE2']} // Example colors, replace with your desired gradient colors
        style={styles.mainCard}
      >
      
        <Text style={styles.YourNumber}>Your Numbers:</Text>
        <NumberRow numbers={game.selectedNumbers} />
      

     
        <Text style={styles.WinNumber}>Winning Numbers:</Text>
        <NumberRow numbers={game.selectedNumbers} />
     

   </LinearGradient>



   <Text    style={styles.matchedNumberText}>  You have matched 2 Numbers </Text>

   <Text    style={styles.matchedNumberText}>  You have Won  </Text>


   <View style={{ flexDirection: 'row', alignItems: 'center',justifyContent: 'space-between' }}>

   <Text    style={styles.priceText}>  200$  </Text>
    
   <LinearGradient  colors={['#F0C735', '#D98F39']}  style={styles.doneButton}>
        <TouchableOpacity  onPress={""} >
          <Text style={styles.doneButtonText}>Done</Text>
        </TouchableOpacity>
        </LinearGradient>

        </View>

        <Text  style={{padding:10,fontWeight:'700',fontSize:22}}>  Winners of this game </Text>
      
    </View>
  );
};

const styles = StyleSheet.create({

  yourGameText: {
    marginLeft: 70,       // Add marginLeft
    fontSize: 34,
    fontWeight: '700',
    lineHeight: 44,
    letterSpacing: 0,
    textAlign: 'left',
    // Add any other styles for yourGameText if needed
  },

  matchedNumberText: {
   fontWeight:'400',
   fontSize:16,
   marginLeft:10,
   marginTop:10
  },
  doneButton: {
    backgroundColor: '#F0C735',
   marginRight:10,
    alignSelf:'flex-end',
   marginBottom:2,
    width:'20%',
    height:36,
    borderRadius:10
  },
  doneButtonText: {
    color: '#fff',
    marginTop:5,
    alignSelf:'center'
  },
  priceText: {
    fontWeight:'400',
    fontSize:32,
    marginLeft:5,
    marginTop:10
   },
  mainCard: {
    margin: 10,
    padding: 15,
    borderRadius: 15,
    height:235,
    elevation: 3,
    backgroundColor: '#F0C735'
  },
  dateText: {
    marginLeft: 70,       // Add marginLeft
    fontSize: 30,
    fontWeight: '400',
    lineHeight: 44,
    letterSpacing: 0,
    textAlign: 'left',
    // Add any other styles for yourGameText if needed
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  numberBox: {
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
  Heading: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#333',
    
    marginStart:10
  },
  YourNumber: {
    fontSize: 16,
    fontWeight: '500',
    marginStart: 20,
    marginTop:10,
    marginRight:33,
    color:'white',

    marginEnd: 32,
  },
  WinNumber: {
    fontSize: 16,
    fontWeight: '500',
    marginStart: 10,
    marginStart: 20,
    marginRight:10,
    color:'white',
    marginEnd: 23,
    marginTop:30
  },

  NumberMatching: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10, 
    marginStart: 10,
    marginEnd: 23,
  },
  
  YouWon: {
    fontSize: 25,
    marginTop:40,
    fontWeight: 'bold',
    marginBottom: 10, 
    marginStart: 10,
    marginEnd: 23,
  },
});

export default GameDetailsPage;

