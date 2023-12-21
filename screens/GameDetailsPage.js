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
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

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
      <Text  style={styles.Heading}>Week</Text>
      
      {/* Display the game data in your UI */}
      

      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
        <Text style={styles.headerTextYourNumber}>Your Numbers:</Text>
        <NumberRow numbers={game.selectedNumbers} />
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={styles.headerTextWinNumber}>Winning Numbers:</Text>
        <NumberRow numbers={game.selectedNumbers} />
      </View>
      <Text style={styles.headerTextYourNumber}>Matching Numbers:</Text>
      <Text style={styles.YouWon}>You Have Won:</Text>

      <Button
  mode="contained"
  onPress={navigateToPlayScreen}
  style={{ width: '80%', marginVertical: 10, marginTop:50,alignSelf: 'center' }}
>
  Redeem
</Button>
      {/* Add more details as needed */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  numberBox: {
    width: 30,
    height: 30,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#333',
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
  },
  Heading: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#333',
    marginTop:150,
    marginStart:10
  },
  headerTextYourNumber: {
    fontSize: 15,
    fontWeight: 'bold',
    marginStart: 10,
    marginTop:10,
    marginRight:33,

    marginEnd: 32,
  },
  headerTextWinNumber: {
    fontSize: 15,
    fontWeight: 'bold',
    marginStart: 10,
    marginStart: 10,
    marginRight:10,

    marginEnd: 23,
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

