


// import { StyleSheet, Image,Text, View,TouchableOpacity} from 'react-native'
// import React ,{useState,useEffect}from 'react'
// import { TextInput ,Button } from 'react-native-paper';
// import { useNavigation } from '@react-navigation/native';
// import { MaterialIcons } from '@expo/vector-icons';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const ContactinfoScreen = () => {
//   const [accountHolderName, setAccountHolderName] = useState(' ');
//   const [accountHolderEmail, setAccountHolderEmail] = useState('');
//   const [accountHolderPhone, setAccountHolderPhone] = useState('');
//   const navigation = useNavigation();
  

//   const [mode, setMode] = useState('done');
//   const [modeEmail, setModeEmail] = useState('done');
//   const [modePhone, setModePhone] = useState('done');
//   const [personalDetails, setPersonalDetails] = useState(null);
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


// //   const fetchPersonalDetails = async () => {
// //     const apiUrl = `https://lottery-backend-tau.vercel.app/api/v1/user/personal-details/65939884a0aa91a1529e275c`;
    
// //     try {
// //       const response = await fetch(apiUrl, {
// //         method: 'GET',
// //         headers: {
// //           'Content-Type': 'application/json',
// //           'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTkzOTg4NGEwYWE5MWExNTI5ZTI3NWMiLCJlbWFpbCI6ImZhY3RzODk5OEBnbWFpbC5jb20iLCJpYXQiOjE3MDQzODcxMDAsImV4cCI6MTcwNDQ3MzUwMH0.Un1-D6Mc0Pa3qks6RKwje4gteMZz2lu5pnacuTdkT8k`,
// //         },
// //       });
  
// //       if (!response.ok) {
// //         const errorData = await response.json();
// //         throw new Error(`${response.status} - ${errorData.message}`);
// //       }
  
// //       const data = await response.json();
// //       console.log('Success! Personal Details:', data);
// //       return data;
// //     } catch (error) {
// //       console.error('Error fetching personal details:', error.message);
// //       throw error;
// //     }
// // };
// // fetchPersonalDetails();

// useEffect(() => {
//   const fetchPersonalDetails = async () => {
//     const userId = await AsyncStorage.getItem('userId');
//     const apiUrl = `https://lottery-backend-tau.vercel.app/api/v1/user/personal-details/${userId}`;
//     const storedAccessToken = await AsyncStorage.getItem('accessToken');
    
//     try {
//       const response = await fetch(apiUrl, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${storedAccessToken}`,
//         },
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(`${response.status} - ${errorData.message}`);
//       }

//       const data = await response.json();
//       setAccountHolderName(data.message.name);
//       setAccountHolderEmail(data.message.email);
//       setAccountHolderPhone(data.message.mobileNumber);
//       // Additional fields can be set here based on your API response
//     } catch (error) {
//       console.error('Error fetching personal details:', error.message);
//     }
//   };

//   fetchPersonalDetails();
// }, []); 

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
//         <View style={{ flexDirection: 'row', alignItems: 'center',  justifyContent:'space-between',marginTop:25 }}>
              
//         <TextInput
//         value={accountHolderName}
//         onChangeText={text => setAccountHolderName(text)}
//         placeholder="Name"
//         style={{
//           height: 40,
//           width:'85%',
//           color: 'white',
//           marginTop: 8,
//           paddingLeft: 8,
//           backgroundColor: 'white',
//           fontSize: 16, // Adjust the font size to your preference
//           lineHeight: 20, 
//           borderBottomColor: '#31A062', // Set the desired border color
//           borderBottomWidth: .1, // Set the desired border width
//           borderRadius: 8,// Adjust the line height to match the font size
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
//                   width:'85%',
//                   color: 'white',
//                   marginTop: 8,
//                   paddingLeft: 8,
//                   backgroundColor: 'white',
//                   fontSize: 16, // Adjust the font size to your preference
//                   lineHeight: 20, // Adjust the line height to match the font size
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
//                   width:'85%',
//                   color: 'white',
//                   marginTop: 8,
//                   paddingLeft: 8,
//                   backgroundColor: 'white',
//                   fontSize: 16, // Adjust the font size to your preference
//                   lineHeight: 20, // Adjust the line height to match the font size
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
//     borderBottomWidth: .5,
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
import React ,{useState,useEffect}from 'react'
import { TextInput ,Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ContactinfoScreen = () => {
  const [accountHolderName, setAccountHolderName] = useState(' ');
  const [accountHolderEmail, setAccountHolderEmail] = useState('');
  const [accountHolderPhone, setAccountHolderPhone] = useState('');
  const navigation = useNavigation();
  

  const [mode, setMode] = useState('done');
  const [modeEmail, setModeEmail] = useState('done');
  const [modePhone, setModePhone] = useState('done');
  const [personalDetails, setPersonalDetails] = useState(null);
  const handleModeChange = () => {
    if (mode === 'done') {
      // Perform any actions needed when clicking "Done"
      // For example, you might want to save the updated value
      // You can add your logic here
    
      setMode('edit');
    } else {
      setMode('done');
      updateEmail();
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
      updateDetails();
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
      updateDetails();
    }
  };


//   const fetchPersonalDetails = async () => {
//     const apiUrl = `https://lottery-backend-tau.vercel.app/api/v1/user/personal-details/65939884a0aa91a1529e275c`;
    
//     try {
//       const response = await fetch(apiUrl, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTkzOTg4NGEwYWE5MWExNTI5ZTI3NWMiLCJlbWFpbCI6ImZhY3RzODk5OEBnbWFpbC5jb20iLCJpYXQiOjE3MDQzODcxMDAsImV4cCI6MTcwNDQ3MzUwMH0.Un1-D6Mc0Pa3qks6RKwje4gteMZz2lu5pnacuTdkT8k`,
//         },
//       });
  
//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(`${response.status} - ${errorData.message}`);
//       }
  
//       const data = await response.json();
//       console.log('Success! Personal Details:', data);
//       return data;
//     } catch (error) {
//       console.error('Error fetching personal details:', error.message);
//       throw error;
//     }
// };
// fetchPersonalDetails();



const updateDetails = async () => {
  try {
    const userId = await AsyncStorage.getItem('userId');
    const apiUrl = `https://lottery-backend-tau.vercel.app/api/v1/user/personal-details/${userId}`; // Replace with your actual API endpoint
    const storedAccessToken = await AsyncStorage.getItem('accessToken');

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${storedAccessToken}`,
      },
      body: JSON.stringify({ email:accountHolderEmail, mobileNumber:accountHolderPhone, name:accountHolderName }),
    });

    const responseData = await response.json();
    const countryCode = "+917356380659"
    if (response.ok) {
      // Check the response data to determine success or OTP sent
      if (responseData.message === 'Name updated') {
        console.log('Success', 'Name updated successfully');
      } else {
        console.log('Success', 'OTP sent to new email and/or mobile number');
        console.log("updated", responseData.message)
       
        navigation.navigate('PersonalInfoOtp', {
          email : accountHolderEmail,
          name : accountHolderName,
          
          mobileNumber: countryCode
        });
      }
    } else {
      console.log('Error', `Error: ${responseData.message}`);
    }
  } catch (error) {
    console.error('Error updating details:', error);
    console.log('Error', 'An error occurred while updating details');
  }
};

const updateTestDetail = async () => {
  const countryCode = "+91"
  navigation.navigate('PersonalInfoOtp', {
    email : accountHolderEmail,
    name : accountHolderName,
    
    mobileNumber: {countryCode} + accountHolderPhone
  });

}
const updateEmail = async () => {
  try {
    const userId = await AsyncStorage.getItem('userId');
    const apiUrl = `https://lottery-backend-tau.vercel.app/api/v1/user/personal-details/${userId}`; // Replace with your actual API endpoint
    const storedAccessToken = await AsyncStorage.getItem('accessToken');

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${storedAccessToken}`,
      },
      body: JSON.stringify({ email:accountHolderEmail, mobileNumber:accountHolderPhone, name:accountHolderName }),
    });

    const responseData = await response.json();

    if (response.ok) {
      // Check the response data to determine success or OTP sent
      if (responseData.data.message === 'Name updated') {
        console.log('Success', 'Name updated successfully');
      } else {
        console.log('Success', 'OTP sent to new email and/or mobile number');
      }
    } else {
      console.log('Error', `Error: ${responseData.message}`);
    }
  } catch (error) {
    console.error('Error updating details:', error);
    console.log('Error', 'An error occurred while updating details');
  }
};

useEffect(() => {
  const fetchPersonalDetails = async () => {
    const userId = await AsyncStorage.getItem('userId');
    const apiUrl = `https://lottery-backend-tau.vercel.app/api/v1/user/personal-details/${userId}`;
    const storedAccessToken = await AsyncStorage.getItem('accessToken');
    
    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${storedAccessToken}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`${response.status} - ${errorData.message}`);
      }

      const data = await response.json();
      setAccountHolderName(data.message.name);
      setAccountHolderEmail(data.message.email);
      setAccountHolderPhone(data.message.mobileNumber);
      console.log("credits",data.message.credits);
      // Additional fields can be set here based on your API response
    } catch (error) {
      console.error('Error fetching personal details:', error.message);
    }
  };

  fetchPersonalDetails();
}, []); 

  return (
    <View  style={{backgroundColor: 'white',color:'white',height:900}}>
     


     <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
     <TouchableOpacity  onPress={()=> navigation.navigate('Profile')}>
     <MaterialIcons name="keyboard-arrow-left" size={35} color="black" style={{
     
     marginLeft: 10,marginTop:50 // Add marginLeft to push the icon to the left
   }}
   
   />
</TouchableOpacity>
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