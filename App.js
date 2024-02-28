import axios from "axios";
import { StatusBar } from "expo-status-bar";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import image from "./assets/soleil.jpg";

export default function App() {
  const defaultCity = "Reims";
  const [input, setInput] = useState(defaultCity);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const api = {
    key: "805f7aa12c69b50e156658e19c830224",
    baseUrl: "https://api.openweathermap.org/data/2.5/",
  };

  useEffect(() => {
    fetchDataHandler();
  }, []);

  const fetchDataHandler = useCallback(() => {
    setLoading(true);
    setInput("");
    axios({
      method: "GET",
      url: `https://api.openweathermap.org/data/2.5/weather?q=${input}&units=metric&lang=fr&appid=${api.key}`,
    })
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((e) => console.dir(e))
      .finally(() => setLoading(false));
  }, [api.key, input]);

  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View>
          <TextInput
            placeholder="Entrer le nom d'une ville "
            onChangeText={(text) => setInput(text)}
            value={input}
            placeholderTextColor={"#000"}
            style={styles.textInput}
            onSubmitEditing={fetchDataHandler}
          ></TextInput>
        </View>
        {loading && (
          <View>
            <ActivityIndicator size={"large"} color="#000"></ActivityIndicator>
          </View>
        )}

        {data && (
          <View style={styles.infoView}>
            <Text style={styles.dateText}>{new Date().toLocaleString()}</Text>
            <Text style={styles.cityCountryText}>
              {`${data?.name}, ${data?.sys?.country}`}
            </Text>
            <Text style={styles.description}>
              {data.weather && data.weather[0] && data.weather[0].description}
            </Text>
            <Text style={styles.tempText}>{`${Math.round(
              data?.main?.temp
            )} °C`}</Text>
            <Text style={styles.minMaxText}>{`Min ${Math.round(
              data?.main?.temp_min
              //  le ? evite des erreur et affichera undefined
            )} °C / Max ${Math.round(data?.main?.temp_max)} °C`}</Text>
            <Text style={styles.wind}>
              Vent : {`${Math.round(data?.wind?.speed)} KM/H`}
            </Text>
          </View>
        )}
      </ImageBackground>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    flex: 1,
    flexDirection: "column",
    width: "100%",
    height: "auto",
    opacity: 0.9,
  },
  textInput: {
    borderBottomWidth: 3,
    padding: 5,
    paddingVertical: 20,
    marginVertical: 100,
    marginHorizontal: 10,
    backgroundColor: "#ffff",
    fontSize: 19,
    borderRadius: 16,
    borderBottomColor: "#df8e00",
  },
  infoView: {
    alignItems: "center",
  },
  cityCountryText: {
    color: "#ffff",
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 10,
  },
  dateText: {
    color: "#00000",
    fontSize: 22,
    marginVertical: 10,
    marginTop: 30,
  },
  tempText: {
    fontSize: 45,
    color: "#00000",
    marginVertical: 10,
    marginBottom: 20,
  },
  minMaxText: {
    fontSize: 25,
    color: "#ffff",
    marginVertical: 10,
    fontWeight: "500",
    marginTop: 30,
    marginBottom: 20,
  },
  description: {
    fontSize: 45,
    fontWeight: "800",
    textAlign: "center",
    color: "#00000",
  },
  wind: {
    fontSize: 25,
    color: "#ffff",
    marginTop: 30,
    fontWeight: "500",
  },
});
