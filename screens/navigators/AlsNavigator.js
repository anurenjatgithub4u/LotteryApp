import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../HomeScreen';
import MyCardComponent from '../ALSScreen';
import PlayedGame from '../PlayedGame';


const Stack = createStackNavigator();

function ALSNaviagator() {
  console.log(Stack);
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Login">
      <Stack.Screen name="Hom" component={HomeScreen} />
      <Stack.Screen name="ALScreen" component={MyCardComponent} />
      <Stack.Screen name="PlayedGame" component={PlayedGame} />
    </Stack.Navigator>
  );
}

export default ALSNaviagator;