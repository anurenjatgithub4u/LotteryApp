import { StyleSheet, Text, View } from 'react-native';
import React, { useRef } from 'react';
import LottieView from 'lottie-react-native';
import AnimatedLottieView from 'lottie-react-native';


const SplashScreenTesting = () => {

  const Lottie = useRef(null)
  return (
    <View style={styles.container}>
      <Text>Hello</Text>
      
      <LottieView
      ref={Lottie}
        source={require('../assets/data.json')}
        autoPlay
        loop
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SplashScreenTesting;
