// PlayedGame.js

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

const PlayedGame = ({ route }) => {
  const { gameNumber } = route.params;


  const navigateToPlayScreen = () => {
    navigation.navigate('Play'); // 'Play' is the name of your 'PlayScreen' route
  };
  
  const navigateToGameScreen = () => {
    navigation.navigate('Game'); // 'Play' is the name of your 'PlayScreen' route
  };


  return (
    <View>
      <Text style={styles.Heading}>Your Numbers</Text>
      
      {/* Display the game data in your UI */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
        <Text style={styles.headerTextYourNumber}>Your Numbers:</Text>
        <NumberRow numbers={gameNumber} />
      </View>

     <Text  style={{marginLeft:20}}>  Date of Draw : 17 Dec 2023 </Text>

      <Button
        mode="contained"
        onPress={() => {navigateToGameScreen}}
        style={{ width: '80%', marginVertical: 10, marginTop: 50, alignSelf: 'center' }}
      >
        Play Again
      </Button>


      
      <Button
        mode="contained"
        onPress={() => {navigateToPlayScreen}}
        style={{ width: '80%', marginVertical: 10,  alignSelf: 'center' }}
      >
        View Previous
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
    borderRadius: 15,
    backgroundColor: '#f0f0f0',
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
    marginTop: 150,
    marginStart: 10,
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
});

export default PlayedGame;
