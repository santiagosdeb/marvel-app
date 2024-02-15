import React, { useState, useEffect } from 'react'
import data from './data'
import axios from 'axios'
import { Text, View, FlatList, ActivityIndicator, Image, StyleSheet, TouchableOpacity } from 'react-native'

const CardsComics = ({ navigation }) => {
    const [comics, setComics] = useState([])
    
    useEffect(() => {
        const getComics = async () => {
            const ax = await axios.get(data.APICOMICS)
            const comics = ax.data.data.results;
            setComics(comics)
        };
        getComics();
    }, [])

        if (!comics.length) {
            return (
                <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                  <ActivityIndicator size="large" color="#a50000" />
                </View>
              )
          } else {
            return (
                <View style={styles.container}>
                    <FlatList
                        data={comics}
                        style={{width: '100%'}}
                        renderItem={({ item }) => {
                            const image = `${item.thumbnail.path}.${item.thumbnail.extension}`
                            return (
                            <TouchableOpacity onPress={() => navigation.navigate('Detail', {item})}>
                                <View style={styles.item}>
                                    <Image source={{uri: image}} style={styles.image}/>
                                    <View style={styles.nameContainer}>
                                    <Text numberOfLines={2} style={styles.name}>{item.title}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>

                            ) 
                     }}
                    />
                </View>
            );
          }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
    },
    image: {
        resizeMode: 'contain',
        width: 80,
        height: 110,
        marginRight: 10,
        borderRadius: 3,
        marginLeft: 12,
        marginBottom: 10,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'robotoregular',
        overflow: 'hidden'
    },
    nameContainer: {
        flex: 1,
        maxWidth: '70%',
    }
})

export default CardsComics;