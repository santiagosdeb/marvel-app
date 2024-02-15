import React, { useEffect, useState } from "react";
import data from './data.js'
import {  View,  Text,  TouchableOpacity,  StyleSheet,  Image, SectionList, ActivityIndicator} from "react-native";
import axios from "axios";
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {urlOriginals, urlOthers} from './data.js'

const CardsAvengers = ({ navigation }) => {
  const [avengers, setAvengers] = useState([]);
  const [otherAvengers, setOtherAvengers] = useState([])
  const Stack = createNativeStackNavigator();


  useEffect(() => {
    const getOriginalsAvengers = () => {
        const promises = data.urlOriginals.map(async(url) => await axios.get(url));
        Promise.all(promises)
        .then(responses => {
            const newCharacters = responses.map(response => {
                const characterData = response.data.data.results[0];
                return characterData
            })

            setAvengers(newCharacters)
        })
        .catch(error => {
            console.log(error);
        });
    };

    const getOtherAvengers = () => {
        const promises = data.urlOthers.map(async(url) => await axios.get(url));
        Promise.all(promises)
        .then(responses => {
            const otherAvengers = responses.map(response => {
                const others = response.data.data.results[0];
                return others      
            });
            setOtherAvengers(otherAvengers)
        })
        .catch(error => {
            console.log(error);
        });
    }

    getOriginalsAvengers();
    getOtherAvengers();
  }, []);

  if (!avengers.length || !otherAvengers.length) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#a50000" />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <SectionList 
        style={styles.flat}
        sections={[{title:'Originals Avengers', data: avengers}, {title: 'Others Avengers Members', data: otherAvengers}]}
        renderItem={({ item }) => {   
          const image = `${item.thumbnail.path}.${item.thumbnail.extension}`         
            return (
              <TouchableOpacity onPress={() => navigation.navigate('Detail', {item})}>
              <View style={styles.item}>
                <Image source={{ uri: image }} style={styles.image} />
                <Text style={styles.name}>{item.name}</Text>
              </View>
              </TouchableOpacity>
            );
          }}
        renderSectionHeader={({ section }) => <Text style={styles.section}>{section.title}</Text>}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  flat: {
    width: "100%",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  image: {
    width: 60,
    height: 60,
    marginRight: 10,
    borderRadius: 9999999,
    marginLeft: 12,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: 'robotoregular',
  },
  section: {
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 10,
    textDecorationLine: 'underline',
    fontFamily: 'heroesassembleital2',
  }
});

export default CardsAvengers;