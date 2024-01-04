

// import { StyleSheet, Image,Text, View,TouchableOpacity} from 'react-native'
// import React ,{useState}from 'react'
// import { TextInput ,Button } from 'react-native-paper';
// import { useNavigation } from '@react-navigation/native';
// import { MaterialIcons } from '@expo/vector-icons';

// const ContactinfoScreen = () => {
//   const [accountHolderName, setAccountHolderName] = useState(' Anurenj Sudheer');
//   const [accountHolderEmail, setAccountHolderEmail] = useState(' anurenjatwork@gmail.com');
//   const [accountHolderPhone, setAccountHolderPhone] = useState(' 7356380659');
//   const navigation = useNavigation();
  

//   const [mode, setMode] = useState('done');
//   const [modeEmail, setModeEmail] = useState('done');
//   const [modePhone, setModePhone] = useState('done');

//   const handleModeChange = () => {
//     if (mode === 'done') {
//       // Perform any actions needed when clicking "Done"
//       // For example, you might want to save the updated value
//       // You can add your logic here
//       setMode('edit');
//     } else {
//       setMode('done');
//     }
//   };

//   const handleModeChangeEmail = () => {
//     if (modeEmail === 'done') {
//       setModeEmail('edit');
//     } else {
//       // Perform any actions needed when clicking "Done"
//       // For example, you might want to save the updated value
//       // You can add your logic here
//       setModeEmail('done');
//     }
//   };

//   const handleModeChangePhone = () => {
//     if (modePhone=== 'done') {
//       setModePhone('edit');
//     } else {
//       // Perform any actions needed when clicking "Done"
//       // For example, you might want to save the updated value
//       // You can add your logic here
//       setModePhone('done');
//     }
//   };
//   return (
//     <View  style={{backgroundColor: 'white',color:'white',height:900}}>
     


//      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
//      <MaterialIcons name="keyboard-arrow-left" size={35} color="black" style={{
     
//      marginLeft: 10,marginTop:50 // Add marginLeft to push the icon to the left
//    }}
   
//    />

//    <Text  style={{fontSize:17, marginTop:50,marginLeft:80}}>Contact info</Text>

//    </View>

      

//       <View style={{ padding: 16 , marginTop:70 ,backgroundColor: 'white' }}>

   
        
//       <Image
//         source={{ uri: 'https://th.bing.com/th/id/R.fa0ca630a6a3de8e33e03a009e406acd?rik=MMtJ1mm73JsM6w&riu=http%3a%2f%2fclipart-library.com%2fimg%2f1905734.png&ehk=iv2%2fLMRQKA2W8JFWCwwq6BdYfKr2FmBAlFys22RmPI8%3d&risl=&pid=ImgRaw&r=0' }}
//         style={styles.profilePicture}
//       />
//         <View style={{ flexDirection: 'row', alignItems: 'center',  justifyContent:'space-between',marginTop:20 }}>
              
//         <TextInput
//         value={accountHolderName}
//         onChangeText={(text) => setAccountHolderName(text)}
//         placeholder="Name"
//         style={{
//           height: 40,
//           color: 'white',
//           marginTop: 8,
         
//           backgroundColor: 'white',
//         }}
//         editable={mode === 'edit'} // Allow editing only in "edit" mode
//       />
//       <TouchableOpacity onPress={handleModeChange}>
//       <Text style={{ color: '#31A062' }}>{mode === 'edit' ? 'Done' : 'Change'}</Text>
//       </TouchableOpacity>
//         </View>
//          <View style={styles.underline} />

//          <View style={{ flexDirection: 'row', alignItems: 'center',  justifyContent:'space-between', marginTop:25 }}>
              
//               <TextInput
//                 value={accountHolderEmail}
//                 onChangeText={text => setAccountHolderEmail(text)}
//                 placeholder="Email"
//                 style={{
//                   height: 40,
//                   backgroundColor: 'white',
//                   marginTop: 8,
//                   paddingLeft: 8,
//                 }}
//                 editable={modeEmail === 'edit'}
//               />
//                 <TouchableOpacity onPress={handleModeChangeEmail}>
//         <Text style={{ color: '#31A062' }}>{modeEmail === 'edit' ? 'Done' : 'Change'}</Text>
//       </TouchableOpacity>
//               </View>
//                <View style={styles.underline} />


//                <View style={{ flexDirection: 'row', alignItems: 'center',  justifyContent:'space-between', marginTop:25 }}>
              
//               <TextInput
//                 value={accountHolderPhone}
//                 onChangeText={text => setAccountHolderPhone(text)}
//                 placeholder="Phone"
//                 style={{
//                   height: 40,
//                   backgroundColor: 'white',
//                   marginTop: 8,
//                   paddingLeft: 8,
//                 }}
//                 editable={modePhone === 'edit'}
//               />
//                 <TouchableOpacity onPress={handleModeChangePhone}>
//         <Text style={{ color: '#31A062' }}>{modePhone === 'edit' ? 'Done' : 'Change'}</Text>
//       </TouchableOpacity>
//               </View>
//                <View style={styles.underline} />




//       </View>




//     </View>
//   );
// };


// const styles =  StyleSheet.create({
//   container: {
//     marginTop: 8,
//   },
//   textInput: {
//     height: 40,
//     paddingLeft: 8,
//   },
//   underline: {
//     borderBottomColor: 'black',
//     borderBottomWidth: 1,
//   },
  
//   profilePicture: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     alignSelf:'center'
//   },
// });

// export default ContactinfoScreen




import { StyleSheet, Image,Text, View,TouchableOpacity} from 'react-native'
import React ,{useState}from 'react'
import { TextInput ,Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

const ContactinfoScreen = () => {
  const [accountHolderName, setAccountHolderName] = useState('Anurenj ');
  const [accountHolderEmail, setAccountHolderEmail] = useState('anurenjatwork@gmail.com');
  const [accountHolderPhone, setAccountHolderPhone] = useState('7356380659');
  const navigation = useNavigation();
  

  const [mode, setMode] = useState('done');
  const [modeEmail, setModeEmail] = useState('done');
  const [modePhone, setModePhone] = useState('done');

  const handleModeChange = () => {
    if (mode === 'done') {
      // Perform any actions needed when clicking "Done"
      // For example, you might want to save the updated value
      // You can add your logic here
      setMode('edit');
    } else {
      setMode('done');
    }
  };

  const handleModeChangeEmail = () => {
    if (modeEmail === 'done') {
      setModeEmail('edit');
    } else {
      // Perform any actions needed when clicking "Done"
      // For example, you might want to save the updated value
      // You can add your logic here
      setModeEmail('done');
    }
  };

  const handleModeChangePhone = () => {
    if (modePhone=== 'done') {
      setModePhone('edit');
    } else {
      // Perform any actions needed when clicking "Done"
      // For example, you might want to save the updated value
      // You can add your logic here
      setModePhone('done');
    }
  };
  return (
    <View  style={{backgroundColor: 'white',color:'white',height:900}}>
     


     <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
     <MaterialIcons name="keyboard-arrow-left" size={35} color="black" style={{
     
     marginLeft: 10,marginTop:50 // Add marginLeft to push the icon to the left
   }}
   
   />

   <Text  style={{fontSize:17, marginTop:50,marginLeft:80}}>Contact info</Text>

   </View>

      

      <View style={{ padding: 16 , marginTop:70 ,backgroundColor: 'white' }}>

   
        
      <Image
        source={{ uri: 'https://th.bing.com/th/id/R.fa0ca630a6a3de8e33e03a009e406acd?rik=MMtJ1mm73JsM6w&riu=http%3a%2f%2fclipart-library.com%2fimg%2f1905734.png&ehk=iv2%2fLMRQKA2W8JFWCwwq6BdYfKr2FmBAlFys22RmPI8%3d&risl=&pid=ImgRaw&r=0' }}
        style={styles.profilePicture}
      />
        <View style={{ flexDirection: 'row', alignItems: 'center',  justifyContent:'space-between',marginTop:25 }}>
              
        <TextInput
        value={accountHolderName}
        onChangeText={text => setAccountHolderName(text)}
        placeholder="Name"
        style={{
          height: 40,
          width:'85%',
          color: 'white',
          marginTop: 8,
          paddingLeft: 8,
          backgroundColor: 'white',
          fontSize: 16, // Adjust the font size to your preference
          lineHeight: 20, 
          borderBottomColor: '#31A062', // Set the desired border color
          borderBottomWidth: .1, // Set the desired border width
          borderRadius: 8,// Adjust the line height to match the font size
        }}
        editable={mode === 'edit'} // Allow editing only in "edit" mode
      />
      <TouchableOpacity onPress={handleModeChange}>
      <Text style={{ color: '#31A062' }}>{mode === 'edit' ? 'Done' : 'Change'}</Text>
      </TouchableOpacity>
        </View>
         <View style={styles.underline} />

         <View style={{ flexDirection: 'row', alignItems: 'center',  justifyContent:'space-between', marginTop:25 }}>
              
              <TextInput
                value={accountHolderEmail}
                onChangeText={text => setAccountHolderEmail(text)}
                placeholder="Email"
                style={{
                  height: 40,
                  width:'85%',
                  color: 'white',
                  marginTop: 8,
                  paddingLeft: 8,
                  backgroundColor: 'white',
                  fontSize: 16, // Adjust the font size to your preference
                  lineHeight: 20, // Adjust the line height to match the font size
                }}
                editable={modeEmail === 'edit'}
              />
                <TouchableOpacity onPress={handleModeChangeEmail}>
        <Text style={{ color: '#31A062' }}>{modeEmail === 'edit' ? 'Done' : 'Change'}</Text>
      </TouchableOpacity>
              </View>
               <View style={styles.underline} />


               <View style={{ flexDirection: 'row', alignItems: 'center',  justifyContent:'space-between', marginTop:25 }}>
              
              <TextInput
                value={accountHolderPhone}
                onChangeText={text => setAccountHolderPhone(text)}
                placeholder="Phone"
                style={{
                  height: 40,
                  width:'85%',
                  color: 'white',
                  marginTop: 8,
                  paddingLeft: 8,
                  backgroundColor: 'white',
                  fontSize: 16, // Adjust the font size to your preference
                  lineHeight: 20, // Adjust the line height to match the font size
                }}
                editable={modePhone === 'edit'}
              />
                <TouchableOpacity onPress={handleModeChangePhone}>
        <Text style={{ color: '#31A062' }}>{modePhone === 'edit' ? 'Done' : 'Change'}</Text>
      </TouchableOpacity>
              </View>
               <View style={styles.underline} />




      </View>




    </View>
  );
};


const styles =  StyleSheet.create({
  container: {
    marginTop: 8,
  },
  textInput: {
    height: 40,
    paddingLeft: 8,
  },
  underline: {
    borderBottomColor: 'black',
    borderBottomWidth: .5,
  },
  
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf:'center'
  },
});

export default ContactinfoScreen