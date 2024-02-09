import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Button } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";

const { width, height } = Dimensions.get("window");

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

const GameDetailsPage = ({ route }) => {
  const { game } = route.params;
  const navigation = useNavigation();

  const [areaText, setAreaText] = useState("");
  const [levelText, setLevelText] = useState("");

  const [previousWinningNumbers, setPreviousWinningNumbers] = useState([]);
  const [countryName, setcountryName] = useState([]);
  const [ContinentWinningAmount, setContinentWinningAmount] = useState([]);
  const [CountryWinningAmount, setCountryWinningAmount] = useState([]);
  const [CountrySymbol, setCountrySymbol] = useState([]);
  const [ContinentSymbol, setContinentSymbol] = useState([]);

  const [previousWinningContinentNumbers, setPreviousWinningContinentNumbers] =
    useState([]);
  const [previousWinningCountryNumbers, setPreviousWinningCountryNumbers] =
    useState([]);
  const [matchNumbers, setmatchNumbers] = useState();
  const [isDrawPerformed, setisDrawPerformed] = useState();

  const navigateToPlayScreen = () => {
    navigation.navigate("Play"); // 'Play' is the name of your 'PlayScreen' route
  };
  const formattedDate = new Date(game.createdAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formattedAnnouncementDate = new Date(game.announcementDate).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const fetchPreviousGameWinningNumbers = async () => {
    const storedAccessToken = await AsyncStorage.getItem("accessToken");
    const userId = await AsyncStorage.getItem("userId");

    const url = `https://lottery-backend-tau.vercel.app/api/v1/user/game/get-previous-game-winning-numbers/${userId}`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedAccessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(
        "Error fetching previous game winning numbers:",
        error.message
      );
      throw new Error(
        "Something went wrong while fetching previous game winning numbers"
      );
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchPreviousGameWinningNumbers();


        if(game.gameType === "Continent"){
          if(game.isDrawPerformed === true){
            setPreviousWinningNumbers(data.message.continent || []);
          }
        }else{
          if(game.isDrawPerformed === true){
            setPreviousWinningNumbers(data.message.country || []);
          }
        }


       

        setContinentSymbol(data.message.ContinentCurrencySymbol);
        setPreviousWinningContinentNumbers(data.message.continent || []);
        setPreviousWinningCountryNumbers(data.message.country || []);
        setcountryName(data.message.countryName);
        setContinentWinningAmount(data.message.ContinentWinningAmount);
        setCountryWinningAmount(data.message.CountryWinningAmount);
        setCountrySymbol(data.message.countrySymbol);
        console.log(
          "country winning numbers country winning numbers country winning numbers country winning numbers",
          data.message
        );
      } catch (error) {
        console.error(error.message);
        // Handle the error
      }
    };

    fetchData(); // Invoke the fetchData function when the component mounts
  }, [game.gameType]);

  useEffect(() => {
    // Assuming game.selectedNumbers and previousWinningNumbers are arrays
    const matchingNumbers = game.selectedNumbers.filter(
      (number, index) => previousWinningNumbers[index] === number
    );

    console.log(
      `You have matched ${
        matchingNumbers.length
      } numbers at the same positions: ${matchingNumbers.join(", ")}`
    );
    setmatchNumbers(matchingNumbers.length);
  }, [game.selectedNumbers, previousWinningNumbers]);

  return (
    <View style={{ flex: 1, padding: responsiveWidth(4),paddingTop:"12%" }}>
      <StatusBar backgroundColor={"transparent"} translucent />

      <TouchableOpacity onPress={() => navigation.navigate("Hom")}>
        <MaterialIcons
          name="keyboard-arrow-left"
          size={35}
          color="black"
          style={{}}
        />
      </TouchableOpacity>
      <Text style={styles.yourGameText}>Your Game</Text>

      <Text style={styles.dateText}> {formattedDate}</Text>

      {/* Display the game data in your UI */}

      <LinearGradient
        colors={["#BA8DF3", "#615EE2"]} // Example colors, replace with your desired gradient colors
        style={styles.mainCard}
      >
        <Text style={styles.YourNumber}>Your Numbers:</Text>
        <NumberRow numbers={game.selectedNumbers} />

   {game.isDrawPerformed ?(
   <>
   <Text style={styles.WinNumber}>Winning Numbers:</Text>
<NumberRow numbers={previousWinningNumbers} />
  </>
   ):(

    <>
     <Text style={{ fontSize: 16, fontWeight: 400, marginTop: 20, color:'white' }}>
          Winners will be announced on
        </Text>
        <Text style={styles.dateTextTwo}>{formattedAnnouncementDate}</Text>
    
    </>
   )

 

   }

       


      </LinearGradient>




      {game.isDrawPerformed ?(
   <>
 <Text style={styles.matchedNumberText}>
        {" "}
        You have matched {matchNumbers} Numbers{" "}
      </Text>

      <Text style={styles.matchedNumberText}> You have Won </Text>

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.priceText}>
          {game.gameType === "Continent" ? ContinentSymbol : CountrySymbol}
          {game.prizeMoney}
        </Text>
      </View>

  </>
   ):(

    <>
     
    </>
   )

 

   }



      

     
    
    </View>
  );
};

const styles = StyleSheet.create({
  yourGameText: {
    // Add marginLeft
    fontSize: 34,
    fontWeight: "bold",
    lineHeight: 44,
    marginLeft: "1%",

    // Add any other styles for yourGameText if needed
  },
  dateTextTwo: {
    fontSize: 32,
    marginLeft:responsiveWidth(1),
    
    marginTop:5,
   
    color:'white',

    
  },
  matchedNumberText: {
    fontWeight: "400",
    fontSize: 16,

    marginTop: 10,
  },
  doneButton: {
    backgroundColor: "#F0C735",
    marginRight: 30,
    alignSelf: "flex-end",
    marginBottom: 2,
    width: "20%",
    height: 36,
    borderRadius: 10,
  },
  doneButtonText: {
    color: "#fff",
    marginTop: 5,
    alignSelf: "center",
  },
  priceText: {
    fontWeight: "400",
    fontSize: 32,
    marginTop: 10,
  },
  mainCard: {
    margin: 10,
    padding: 15,
    borderRadius: 15,
    height: 235,
    elevation: 3,
    backgroundColor: "#F0C735",
    width: responsiveWidth(90),
    alignSelf: "center",
    marginTop: hp("3%"),
  },
  dateText: {
    // Add marginLeft
    fontSize: 30,
    fontWeight: "400",
    lineHeight: 44,
    letterSpacing: 0,
    textAlign: "left",
    // Add any other styles for yourGameText if needed
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  numberBox: {
    width: 45,
    height: 35,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "white",
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  numberText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "white",
  },
  Heading: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#333",

    marginStart: 10,
  },
  YourNumber: {
    fontSize: 16,
    fontWeight: "500",

    marginTop: 10,
    marginRight: 33,
    color: "white",

    marginEnd: 32,
  },
  WinNumber: {
    fontSize: 16,
    fontWeight: "500",

    marginRight: 10,
    color: "white",
    marginEnd: 23,
    marginTop: 30,
  },

  NumberMatching: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 10,
    marginStart: 10,
    marginEnd: 23,
  },

  YouWon: {
    fontSize: 25,
    marginTop: 40,
    fontWeight: "bold",
    marginBottom: 10,
    marginStart: 10,
    marginEnd: 23,
  },
});

export default GameDetailsPage;
