

import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Dimensions,
  Pressable,
  Platform,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Card, TextInput, Button, Chip, Modal } from "react-native-paper";
import { FontAwesome5 } from "@expo/vector-icons";
import CalendarPicker from "react-native-calendar-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { EvilIcons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import DatePicker from "react-native-modern-datepicker";
import { RadioButton } from 'react-native-paper';
import axios from "axios";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const { width, height } = Dimensions.get("window");

const GameScreen = () => {
  const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
  const [startedDate, setStartedDate] = useState(null);
  const [date, setDate] = useState(new Date());
  const [filteredGames, setFilteredGames] = useState([]);
  const [showWinners, setShowWinners] = useState(true);
  const [selectedDate, setSelectedDate] = useState();
  const [showPicker, setShowPicker] = useState(false);
  const [checked, setChecked] = useState('all'); 
  const handleOnPressStartDate = () => {
    setOpenStartDatePicker(!openStartDatePicker);
  };
  const toggleDatePicker = () => {
    setShowPicker(!showPicker);
    console.log("date1...",date)
  };

  const onChange = ({ type }, selectedDate) => {
    if (type == "set") {
      const currentDate = selectedDate;
      setDate(currentDate);
      if (Platform.OS === "android") {
        toggleDatePicker();
        setSelectedDate(currentDate.toLocaleDateString())
      }
    } else {
      toggleDatePicker();
    }
  };
  


  const handleChangeStartDate = (date) => {
    setStartedDate(date);
    console.log("Selected Start Date:", date);
    // Close the modal after selecting a date
  };



  ///end date picker

  const [openEndDatePicker, setOpenEndDatePicker] = useState(false);
  const [endDate, setEndDate] = useState(null);
  const [endSetDate,setEndSetDate] = useState(new Date());
  const [endSelecteddate,setEndSelecetedDate] = useState()
  const [endshowPicker, setEndShowPicker] = useState(false);

  const toggleEndDatePicker = () => {
    setEndShowPicker(!endshowPicker);
    console.log("dateee.." , endSetDate)
  };


  const onEndChange = ({ type }, endSelecteddate) => {
    if (type == "set") {
      const currentDateEnd = endSelecteddate;
      setEndSetDate(currentDateEnd);
      if (Platform.OS === "android") {
        toggleEndDatePicker();
        setEndSelecetedDate(currentDateEnd.toLocaleDateString())
      }
    } else {
      toggleEndDatePicker();
    }
  };
  const handleChangeEndDate = (date) => {
    setEndDate(date);
    console.log("Selected Start Date:", date);
    // Close the modal after selecting a date
  };
  const handleOnPressEndDate = () => {
    setOpenEndDatePicker(!openEndDatePicker);
  };
  // Reset startedDate to null when modal is closed

  const navigation = useNavigation();
  const [userGames, setUserGames] = useState([]);

  const [loading, setLoading] = useState(true);




  const goToGameDetails = (game) => {
    navigation.navigate("GameDetailsPage", { game });
  };

  const filterGamesByDateRange = (game) => {
    const createdAtDate = new Date(game.createdAt);
    console.log("CreatedAtDate:", createdAtDate);
  
    // Convert date to the format YYYY-MM-DD for accurate comparison
    const startDateDate =
      date !== "DD/MM/YYYY"  ? new Date(date) : null;
    const endDateDate =
      endSetDate !== "DD/MM/YYYY" ? new Date(endSetDate) : null;
  
    if (startDateDate && endDateDate) {
      // If both start and end dates are selected, filter games within the date range
      return (
        createdAtDate >= startDateDate &&
        createdAtDate <= endDateDate
      );
    } else if (startDateDate) {
      // If only start date is selected, filter games on or after the start date
      return createdAtDate >= startDateDate;
    } else if (endDateDate) {
      // If only end date is selected, filter games on or before the end date
      return createdAtDate <= endDateDate;
    } else {
      // If no date range is selected, show all games
      return true;
    }
  };
  

  
  const logout = async () => {
    try {
      // Replace 'YOUR_BACKEND_URL' with the actual URL of your backend server.
      const backendURL = "https://lottery-backend-tau.vercel.app/api/v1/auth";

      const refreshToken = await AsyncStorage.getItem("refreshToken");
      const accessToken = await AsyncStorage.getItem("accessToken");
      // Assuming you have the refreshToken stored in a variable.

      // Make a POST request to the logout endpoint with the refreshToken in the request body.
      const response = await axios.post(
        `${backendURL}/logout`,
        { refreshToken },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Check if the logout was successful.
      if (response.status === 200) {
        console.log("Logged out successfully");
        navigation.navigate("ProfileLanding");
        // Redirect or perform any other action after successful logout.
      } else {
        console.error("Logout failed");
        // Handle logout failure, e.g., display an error message.
      }
    } catch (error) {
      console.error("Error during logout", error);
      // Handle the error, e.g., display an error message.
    }
  };
  const handleLogout = () => {
    logout(navigation);
  };

  const getUserGames = async () => {
    const storedAccessToken = await AsyncStorage.getItem("accessToken");
    const userId = await AsyncStorage.getItem("userId");

    const url = `https://lottery-backend-tau.vercel.app/api/v1/user/game/get-game/${userId}`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedAccessToken}`,
        },
      });

      if (!response.ok) {
        const userGames = await getUserGames(userId, authToken);
        const errorData = await response.json();
        console.log("User games:", errorData);
        const responseData = await response.json();
        console.log("User games data:", responseData);

        // Update the state with user games data
        setUserGames(responseData.message);
        throw new Error(`Failed to fetch user games: ${errorData.message}`);
      }

      const responseData = await response.json();
      console.log("User games data:", responseData);
      const filteredGames = responseData.message.filter(game => !game.isWinner);

      // Set the filtered games to state
      setFilteredGames(filteredGames);
      responseData.message.forEach((game) => {
        // Log the selectedNumbers array for each game
        console.log("Selected numbers for game:", game.selectedNumbers);
      });
      // Log the successful response data
      return responseData;
    } catch (error) {
      console.error("Error while fetching user games:", error.message);
      throw error;
    }
  };

  useEffect(() => {
    // Fetch user games data when the component mounts
    const fetchData = async () => {
      try {
        const responseData = await getUserGames();
        setUserGames(responseData.message);
      } catch (error) {
        console.error("Error fetching user games:", error.message);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Fetch user games when the component mounts or when the radio button is pressed
    getUserGames();
  }, [checked]);

 

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          setLoading(true); // Set loading to true before making the API call
          const responseData = await getUserGames();
          setUserGames(responseData.message);
        } catch (error) {
          console.error("Error fetching user games:", error.message);
        } finally {
          setLoading(false); // Set loading to false after the API call is complete
        }
      };

      fetchData();
    }, [])
  );

  // Example usage:
  const userId = "yourUserId"; // Replace with the actual user ID
  const authToken = "yourAuthToken"; // Replace with the actual authorization token

  try {
  } catch (error) {
    console.error("Failed to fetch user games:", error.message);
  }
  const filterGamesByWinner = (game) => {
    if (showWinners) {
      return true; // Show only winning games
    } else {
      return game.isWinner === true; // Show all games
    }
  };

  // Function to handle radio button press
  const handleRadioButtonPress = () => {
    setShowWinners((prev) => !prev); // Toggle between true and false
  };
  useEffect(() => {
    setOpenStartDatePicker(false); // Ensure initial state
  }, []);

  return (
    <View style={{ marginLeft: "2%", marginTop: 60 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <MaterialIcons
            name="keyboard-arrow-left"
            size={35}
            color="black"
            style={{
              alignSelf: "flex-start", // Add this line,
            }}
          />
        </TouchableOpacity>
        <EvilIcons name="bell" size={30} style={styles.bell} color="black" />

        <TouchableOpacity onPress={handleLogout}>
          <AntDesign
            name="logout"
            size={19}
            style={styles.logout}
            color="black"
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.MainheaderText}>Your Games</Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom:20
        }}
      >
        {/* <Card style={styles.card}>
        <Pressable onPress={toggleDatePicker}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <AntDesign name="calendar" size={24} color="black"  style={{  marginRight:10}} />
          <Text>Start Date</Text>
         
          </View>

  

        
        </Pressable>
      </Card> */}
  
      <Pressable   onPress={toggleDatePicker}>


<View style={{ borderColor: 'black',
      backgroundColor: '#F8F8FF',
      width: '100%',
      marginLeft:'8%',
      borderWidth: 1,
      height:58.5,
      borderWidth: 0,
      borderStyle: 'solid',
      fontSize: 15,
      borderRadius: 15,
      color: '#F8F8FF',  // Text color
      overflow: "hidden",}}>

<View style={{ flexDirection: "row", alignItems: "center" }}>
              <AntDesign
                name="calendar"
                size={24}
                color="black"
                style={{ marginRight: 1,marginLeft:8 }}
              />
      <TextInput

        placeholder="Start Date"
        value={selectedDate}
        onChangeText={setSelectedDate}
        placeholderTextColor="#11182744"
        editable={false}
        style={{
          color: '#F8F8FF',
          backgroundColor: '#F8F8FF',
          height:60.5,
         
         }}

      ></TextInput>
      </View>
      </View>
      </Pressable>
  
        {showPicker && (
          <DateTimePicker
            mode="date"
            display="spinner"
            value={date}
            onChange={onChange}
          />
        )}
      <Pressable   onPress={toggleEndDatePicker}>


<View style={{ borderColor: 'black',
      backgroundColor: '#F8F8FF',
      width: '90%',
      marginRight:'15%',
      borderWidth: 1,
      height:58.5,
      borderWidth: 0,
      borderStyle: 'solid',
      fontSize: 15,
      borderRadius: 15,
      color: '#F8F8FF',  // Text color
      overflow: "hidden",}}>

<View style={{ flexDirection: "row", alignItems: "center" }}>
              <AntDesign
                name="calendar"
                size={24}
                color="black"
                style={{ marginRight: 1,marginLeft:8 }}
              />
      <TextInput

        placeholder="End Date"
        value={endSelecteddate}
        onChangeText={setEndSelecetedDate}
        placeholderTextColor="#11182744"
        editable={false}
        style={{
          color: '#F8F8FF',
          backgroundColor: '#F8F8FF',
          height:60.5,
         
         }}

      ></TextInput>
      </View>
      </View>
      </Pressable>
  
        {endshowPicker && (
          <DateTimePicker
            mode="date"
            display="spinner"
            value={endSetDate}
            onChange={onEndChange}
          />
        )}
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' ,marginLeft:'2%'}}>
      <RadioButton
        value="all"
        status={showWinners ? 'unchecked' : 'checked'}
        onPress={handleRadioButtonPress}
      />
     
        <Text>Show Only Wins</Text>
      </View>

      {/* Your existing code */}

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <ScrollView style={{ marginBottom: 200 }}>
          {userGames.filter(filterGamesByDateRange).filter(filterGamesByWinner).map((game, index) => (
            <LinearGradient
              key={index}
              colors={["#F0C735", "#D98F39"]} // Example colors, replace with your desired gradient colors
              style={styles.mainCard}
            >
              <TouchableOpacity
                key={index}
                onPress={() => goToGameDetails(game)}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={styles.createdAtText}>
                    {new Date(game.createdAt).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </Text>

                  <Text style={styles.viewGame}>View Game</Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 10,
                  }}
                >
                  <View style={styles.container}>
                    {game.selectedNumbers.map((number, index) => (
                      <View key={index} style={styles.numberBox}>
                        <Text style={styles.numberText}>{number}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              </TouchableOpacity>
            </LinearGradient>
          ))}



{userGames
    .filter(filterGamesByDateRange)
    .filter(filterGamesByWinner)
    .length === 0 && (
      <Text style={styles.noWinnersText}>No winners found</Text>
  )}
        </ScrollView>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={openStartDatePicker}
      >
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <View style={{ width: "80%", padding: 20 }}>
            <DatePicker
              mode="calendar"
              selected={startedDate}
              onSelectedChange={(date) => handleChangeStartDate(date)}
              options={{
                backgroundColor: "white",
                textHeaderColor: "black",
                textDefaultColor: "black",
                selectedTextColor: "#FFF",
                mainColor: "#469ab6",
                textSecondaryColor: "black",
                borderColor: "rgba(122,146,165)",
              }}
            />

            <TouchableOpacity
              onPress={handleOnPressStartDate}
              style={{ marginTop: 20 }}
            >
              <Text style={{ color: "black" }}>Close</Text>
            </TouchableOpacity>

            {/* Add another button for closing the modal */}
            <TouchableOpacity
              onPress={() => setOpenStartDatePicker(false)}
              style={{ marginTop: 20 }}
            >
              <Text style={{ color: "black" }}>Close Modal</Text>
            </TouchableOpacity>
          </View>


          <View style={{ width: "80%", padding: 20 }}>
            <DatePicker
              mode="calendar"
              selected={endDate}
              onSelectedChange={(date) => handleChangeEndDate(date)}
              options={{
                backgroundColor: "white",
                textHeaderColor: "black",
                textDefaultColor: "black",
                selectedTextColor: "#FFF",
                mainColor: "#469ab6",
                textSecondaryColor: "black",
                borderColor: "rgba(122,146,165)",
              }}
            />

            <TouchableOpacity
              onPress={handleOnPressEndDate}
              style={{ marginTop: 20 }}
            >
              <Text style={{ color: "black" }}>Close</Text>
            </TouchableOpacity>

            {/* Add another button for closing the modal */}
            <TouchableOpacity
              onPress={() => setOpenEndDatePicker(false)}
              style={{ marginTop: 20 }}
            >
              <Text style={{ color: "black" }}>Close Modal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
    marginLeft: "4%",
    marginRight: "7%",

    padding: 15,
    borderRadius: 15,
    backgroundColor: "#f0f0f0",
    elevation: 3,
    width: 150,
    alignSelf: "flex-start",
  },

  mainCard: {
    width: wp("90%"),
    margin: wp("2%"), // Responsive margin
    padding: wp("4%"), // Responsive padding
    borderRadius: wp("5%"), // Responsive borderRadius

    elevation: 3,
    height: hp("16%"), // Responsive height using heightPercentageToDP
    marginLeft: wp("2.5%"),
    backgroundColor: "#F0C735",
  },
  createdAtText: {
    fontWeight: "bold",
    fontSize: 15,
    marginLeft: 10,
    marginBottom: 10,
    color: "white", // Add margin left for spacing
  },
  viewGame: {
    fontSize: 15,
    marginLeft: 150,
    marginBottom: 10,

    fontWeight: "bold",
    color: "white", // Add margin left for spacing
  },
  MainheaderText: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
    marginStart: 10,
    marginLeft: "6%", // Add margin bottom for spacing,
  },
  headerText: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 10,
    marginStart: 5, // Add margin bottom for spacing
  },
  headerTextTwo: {
    fontSize: 15,
    fontWeight: "bold",

    marginStart: 10, // Add margin bottom for spacing
  },
  headerTextYourNumber: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 10,
    marginStart: 5,
    marginEnd: 23, // Add margin bottom for spacing
  },
  cardTwo: {
    margin: 10,
    padding: 15,
    borderRadius: 15,
    backgroundColor: "#f0f0f0",
    elevation: 3,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  noWinnersText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: 'red', // You can customize the color
  },
  bell: {
    width: 24,
    height: 24,
    top: 1,
    left: 130,
    marginTop: 5,
    padding: "2px 3.5px 2px 3.5px",
  },
  logout: {
    marginTop: 6,
    width: 24,
    height: 24,
    top: 1,
    marginRight: 20,
  },
  numberBox: {
    width: 43,
    height: 37,
    borderRadius: 10, // Make it half of the width and height for a circular box
    borderWidth: 1,
    borderColor: "white",
    margin: 4.5,
    alignItems: "center",
    justifyContent: "center",
  },
  numberText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "white",
  },
});

export default GameScreen;





