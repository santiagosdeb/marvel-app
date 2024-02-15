
import React, { useEffect, useState } from "react";
import data from "./data.js";
import { View, Text,ActivityIndicator, FlatList, StyleSheet, Image, TouchableOpacity } from "react-native";
import axios from "axios";
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const CardsCharacters = ({ navigation }) => {
  const [characters, setCharacters] = useState([]);
  const Stack = createNativeStackNavigator();

  useEffect(() => {
    const getCharacters = async () => {
      const ax = await axios.get(data.APICHARAC);
      const response = ax.data.data;
      setCharacters(response.results);
    };
    getCharacters();
  }, []);

  if (!characters.length) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" color="#a50000" />
      </View>
    )
  } else {
    return (
        <View style={styles.container}>
            <FlatList
                style={styles.flat}
                data={characters}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => {
                  // const image = item.thumbnail.path + '.' + item.thumbnail.extension
                  const image = `${item.thumbnail.path}.${item.thumbnail.extension}`
                  return (
                  <TouchableOpacity onPress={() => navigation.navigate('Detail', {item})}>
                  <View style={styles.item}>
                    <Image source={{uri: image}} style={styles.image}/>
                    <Text style={styles.name}>{item.name}</Text>
                  </View>
                  </TouchableOpacity>
                  )}}
            />
        </View>
    );
  }
};

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flat: {
    width: '100%'
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  image: {
    width: 60,
    height: 60,
    marginRight: 10,
    borderRadius: 9999999,
    marginLeft: 12,
    marginBottom: 10
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'robotoregular',

  },
})

export default CardsCharacters;
