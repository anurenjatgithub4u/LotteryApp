import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { Card } from 'react-native-paper';
const RedeemPage = () => {
  return (
    <View>
      


      <View   style={{ flexDirection: 'column', alignItems: 'flex-start'}}>


      <View style={{ flexDirection: 'row', alignItems: 'center'}}>

      <MaterialIcons name="keyboard-arrow-left" size={35}   color="black" style={styles.arrowStyle}/>

      <Text  style={styles.textRedeem}>Redeeming options</Text>


      </View>

      <Card  style={styles.card}>
   <Text>Kiosk</Text>
      </Card>

      
      <Card  style={styles.cardTwo}>
   <Text>Kiosk</Text>
      </Card>

      </View>

      
    </View>
  )
}
const styles = StyleSheet.create({

    arrowStyle: {
       
        
        top: 69,
        left: 29,
       
        // Add the desired border color here
      },

      textRedeem:{
       fontSize:17,
       
       marginLeft:60,
       top:69
      },
      card: {
        margin: 10,
        padding: 15,
        alignSelf:'center',
        marginTop:100,
        borderRadius: 20,
        backgroundColor: '#f0f0f0',
        elevation: 3,
        width:350,
        alignSelf:'center',
        height:73
       
      },

      cardTwo: {
        margin: 10,
        padding: 15,
        alignSelf:'center',
       
        borderRadius: 20,
        backgroundColor: '#f0f0f0',
        elevation: 3,
        width:350,
        alignSelf:'center',
        height:111
       
      },
      
})
export default RedeemPage

