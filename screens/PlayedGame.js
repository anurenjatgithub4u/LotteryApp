// PlayedGame.js

// import { useNavigation } from '@react-navigation/native';
// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import { Button } from 'react-native-paper';
// import { LinearGradient } from 'expo-linear-gradient';

// const NumberRow = ({ numbers }) => {



//   return (
//     <View style={styles.container}>
//       {numbers.map((number, index) => (
//         <View key={index} style={styles.numberBox}>
//           <Text style={styles.numberText}>{number}</Text>
//         </View>
//       ))}
//     </View>
//   );
// };

// const PlayedGame = ({ route }) => {
//   const { gameNumber,currentDate } = route.params;
//   const navigation = useNavigation();

//   const navigateToPlayScreen = () => {
//     navigation.navigate('Play'); // 'Play' is the name of your 'PlayScreen' route
//   };
  
//   const navigateToGameScreen = () => {
//     navigation.navigate('Game'); // 'Play' is the name of your 'PlayScreen' route
//   };


//   return (
//     <View>
//       <Text style={styles.Heading}>Your  Previous Game</Text>
      
//       <Text style={styles.dateText}>{currentDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</Text>

//       <Text style={styles.winText}>Your  Previous Game</Text>


      
//       <LinearGradient
//         colors={['#BA8DF3', '#615EE2']} // Example colors, replace with your desired gradient colors
//         style={styles.mainCard}
//       >
//        <Text style={styles.yourNumbers}>Your Numbers</Text>
//         <NumberRow numbers={gameNumber} />
//       </LinearGradient>


// <Text  style={{fontSize:16 , fontWeight:400,marginStart:25,marginTop:20}}>  Winners will be announced on </Text>


// <Text style={styles.dateText}>{currentDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</Text>

// <LinearGradient  colors={['#F0C735', '#D98F39']}  style={styles.doneButton}>

//    <Text  style={{alignSelf:'center', marginTop:12}}>Play again</Text>
// </LinearGradient>


//       {/* Add more details as needed */}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: 10,
//   },
//   numberBox: {
//     width: 45,
//     height: 35,
//     borderRadius: 10,
//     borderWidth: 2,
//     borderColor: 'white',
//     margin: 5,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   numberText: {
//     fontSize: 12,
//     fontWeight: 'bold',
//     color: 'white',
//   },
//   Heading: {
//     fontSize: 34,
//     fontWeight: 'bold',
//     color: '#333',
  
//     marginStart: 25,
//     marginTop:90,
    
   
//   },

//   winText: {
//     fontSize: 17,
//     fontWeight: '400',
//     color: '#333',
   
//     marginStart: 25,
    
   
//   },

//   winnersAnn:{fontSize:16 , 
    
//     fontWeight:400},
//   yourNumbers: {
//     fontSize: 16,
//     fontWeight: '500',
//     color: 'white',
    
//     marginStart: 5,
    
    
   
//   },
//   headerTextYourNumber: {
//     fontSize: 15,
//     fontWeight: 'bold',
//     marginStart: 10,
//     marginTop: 10,
//     marginRight: 33,
//     marginEnd: 32,
//   },

//   headerTextWinNumber: {
//     fontSize: 15,
//     fontWeight: 'bold',
//     marginStart: 10,
//     marginStart: 10,
//     marginRight: 10,
//     marginEnd: 23,
//   },
//   NumberMatching: {
//     fontSize: 15,
//     fontWeight: 'bold',
//     marginBottom: 10, 
//     marginStart: 10,
//     marginEnd: 23,
//   },
//   YouWon: {
//     fontSize: 25,
//     marginTop: 40,
//     fontWeight: 'bold',
//     marginBottom: 10, 
//     marginStart: 10,
//     marginEnd: 23,
//   },
//   mainCard: {
//     margin: 10,
//     padding: 15,
//     borderRadius: 15,
//     height:134,
//     width:354,
//     elevation: 3,
//     backgroundColor: '#F0C735',
//     marginTop:50,
//     alignSelf:'center'
//   },
//   dateText: {
//     fontSize: 32,
//     fontWeight: '400',
//     marginStart: 29,
//     marginTop:5,
//     marginRight:33,
//     color:'black',

//     marginEnd: 32,
//   },
//   doneButton: {
   
//     height:50,
//     borderRadius: 10,
//     marginBottom:2,
//     width:348,
//     alignSelf:'center',
//     marginTop:30
//   },
// });

// export default PlayedGame;




import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
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

const PlayedGame = ({ route }) => {
  const { gameNumber,currentDate } = route.params;
  const navigation = useNavigation();

  const navigateToPlayScreen = () => {
    navigation.navigate('Play'); // 'Play' is the name of your 'PlayScreen' route
  };
  
  const navigateToGameScreen = () => {
    navigation.navigate('Game'); // 'Play' is the name of your 'PlayScreen' route
  };


  return (
    <View>
      <Text style={styles.Heading}>Your  Previous Game</Text>
      
      <Text style={styles.dateText}>{currentDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</Text>

      <Text style={styles.winText}>Your  Previous Game</Text>


      
      <LinearGradient
        colors={['#BA8DF3', '#615EE2']} // Example colors, replace with your desired gradient colors
        style={styles.mainCard}
      >
       <Text style={styles.yourNumbers}>Your Numbers</Text>
        <NumberRow numbers={gameNumber} />
      </LinearGradient>


<Text  style={{fontSize:16 , fontWeight:400,marginStart:25,marginTop:20}}>  Winners will be announced on </Text>


<Text style={styles.dateText}>{currentDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</Text>

<LinearGradient  colors={['#F0C735', '#D98F39']}  style={styles.doneButton}>

   <Text  style={{alignSelf:'center', marginTop:12, color:'white'}}>Play again</Text>
</LinearGradient>


      {/* Add more details as needed */}
    </View>
  );
};
const commonPaddingStart = '7%';
const styles = StyleSheet.create({
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
    fontSize: 34,
    fontWeight: '700',
    color: '#333',
    lineHeight:44.2,
    marginStart: commonPaddingStart,
    marginTop:90,
    
   
  },

  winText: {
    fontSize: 17,
    fontWeight: '400',
    color: '#333',
   
    marginStart: '7%',
    
   
  },

  winnersAnn:{fontSize:16 , 
    
    fontWeight:400},
  yourNumbers: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
    
    marginStart: 5,
    marginTop:10
    
    
   
  },
  headerTextYourNumber: {
    fontSize: 15,
    fontWeight: 'bold',
    marginStart: 10,
    marginTop: 10,
    marginRight: 33,
    marginEnd: 32,
  },

  headerTextWinNumber: {
    fontSize: 15,
    fontWeight: 'bold',
    marginStart: 10,
    marginStart: 10,
    marginRight: 10,
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
    marginTop: 40,
    fontWeight: 'bold',
    marginBottom: 10, 
    marginStart: 10,
    marginEnd: 23,
  },
  mainCard: {
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
  dateText: {
    fontSize: 32,
    fontWeight: '400',
    marginStart: '7%',
    marginTop:5,
    marginRight:33,
    color:'black',

    marginEnd: 32,
  },
  doneButton: {
   
    height:50,
    borderRadius: 10,
    marginBottom:2,
    width:348,
    alignSelf:'center',
    marginTop:30
  },
});

export default PlayedGame;