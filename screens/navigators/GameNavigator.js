import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import MyCardComponent from '../ALSScreen';
import GameScreen from '../GameScreen';
import GameDetailsPage from '../GameDetailsPage';

const Stack = createStackNavigator();

function GameNavigator() {
  console.log(Stack);
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Login">
      <Stack.Screen name="Gam" component={GameScreen} />
      <Stack.Screen name="GameDetailsPage" component={GameDetailsPage} />
    </Stack.Navigator>
  );
}

export default GameNavigator;