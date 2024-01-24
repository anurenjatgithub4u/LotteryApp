import { StyleSheet, Text, View ,TouchableOpacity,Image} from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Notification = () => {

    const navigation = useNavigation();

  return (
  
    <View style={styles.container}>

    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',marginTop:'10%' }}>
    
    <TouchableOpacity  onPress={()=> navigation.navigate('Home')}>
      <MaterialIcons
        name="keyboard-arrow-left"
        size={35}
        color="black"
        style={{
          marginLeft: 10,
          alignSelf: 'flex-start', // Add this line,
          
        }}
      />
       </TouchableOpacity>

      
       </View>
       <Text  style={{fontSize:31,fontWeight:'700',marginLeft:30}}>Notification</Text>


       <View style={{ flexDirection: 'row', alignItems: 'center' }}>

       <Image
                source={{
                  uri: 'https://www.europeanbusinessreview.com/wp-content/uploads/2020/01/ThinkstockPhotos-172587244-1.jpg',
                }}
                style={styles.profilePicture}
              />

              
<View style={{ flexDirection: 'column', alignItems: 'center', marginTop: 10 }}>
                <Text style={styles.detailsText}>You have not Played in  </Text>
                <Text style={styles.detailsText}>2 weeks </Text>
              </View>
              <Text style={styles.timeText}>10 min ago</Text>
            </View>

            <View style={styles.underline} />

       </View>
      


  )
}

export default Notification

const styles = StyleSheet.create({


  profilePicture: {
    width: 70,
    height: 70,
    borderRadius: 20,
    
    paddingTop:80,
    marginTop:40,
    paddingLeft:32,
    paddingStart:32,
    marginLeft:32
  },
  detailsText:{
    marginStart:10,
    fontSize:17,
    fontWeight:'400'
  },
  timeText:{
    fontSize:13,
    fontWeight:'300',
    marginBottom:30,
    paddingLeft:10,
    marginLeft:10
  }
  ,
  underline: {
    borderBottomColor: 'black',
    borderBottomWidth: 0.5,
    width:'90%',
    alignSelf:'center',
    marginTop:10
  },
})