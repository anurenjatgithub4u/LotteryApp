import React from 'react';
import { View, Text, TextInput,StyleSheet ,TouchableOpacity } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper'; 
import { FontAwesome5 } from '@expo/vector-icons'; // Make sure to import FontAwesome5 from the correct package
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
 // Make sure to import FontAwesome5 from the correct package

 const HelpScreen = () => {


  const navigation = useNavigation();
  const handleCardPress = () => {
    // Navigate to the FAQ screen
    navigation.navigate('Faq');
  };
  return(
    <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', paddingHorizontal: 16, paddingTop: 24 }}>
    <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Help & FAQs</Text>

    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 16 }}>
      <View style={{ backgroundColor: 'white', padding: 8, borderRadius: 8 }}>
        <FontAwesome5 name="search" size={24} color="black" />
      </View>
      <TextInput
        style={{ borderWidth: 1, borderColor: 'gray', padding: 8, flex: 1, marginLeft: 8 }}
        placeholder="Game Play"
      />
    </View>

    <Card style={styles.card}>
      <Card.Content>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <AntDesign name="questioncircle" size={24} color="black" />
        <Title style={styles.heading}>How to play</Title>

        </View>

        <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Text>
        {/* Other content within the card goes here */}
      </Card.Content>
    </Card>

    
  
   
    
    
  </View>
  )
 
 };

const styles = StyleSheet.create({
  cardContainer: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    padding: 40, // Adjust padding as needed
    width: '100%',
    marginTop: 50,
    height:140
  },
  cardContainer: {
    height: 150,
    backgroundColor: 'white',
    padding: 16,
    margin: 10,
    borderRadius: 10,
    elevation: 3, // Add elevation for a shadow effect (Android)
    shadowColor: '#000', // Add shadow properties for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardHeaderText: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  iconText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardHeaderText: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  topContainer: {
    flexDirection: 'row',
 
    justifyContent: 'flex-start',
    marginBottom: 20, // Adjust margin as needed
  },
  card: {
    width: '100%', // Set the width to 100%
    backgroundColor: 'white',
    elevation: 3, // Add elevation for a shadow effect (Android)
    shadowColor: '#000', // Add shadow properties for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    height:150,
    marginTop: 50
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginStart:10
  },
});
export default HelpScreen;


