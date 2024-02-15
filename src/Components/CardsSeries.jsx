import React, { useEffect, useState } from 'react'
import axios from 'axios'
import data from './data'
import { Text, View, FlatList, Image, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native'

const CardsSeries = ({ navigation }) => {
    const [series, setSeries] = useState([])

    useEffect( () => {
        const getSeries = async () => {
            const ax = await axios.get(data.APISERIES)
            const series = ax.data.data.results
            setSeries(series);
        }
        getSeries();
    },[])

    if (!series.length) {
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
              <ActivityIndicator size="large" color="#a50000" />
            </View>
          )
      } else {
        return (
            <View style={styles.container}>
                <FlatList
                    data={series}
                    keyExtractor={(item) => item.id.toString()}
                    style={{width: '100%'}}
                    renderItem={({ item }) => {
                        const image = `${item.thumbnail.path}.${item.thumbnail.extension}`
                        return (
                            <TouchableOpacity onPress={() => navigation.navigate('Detail', {item})}>
                            <View style={styles.item}>
                                <Image source={{uri: image}} style={styles.image}/>
                                <View style={styles.nameContainer}>
                                <Text numberOfLines={2} style={styles.name} >{item.title}</Text>
                                </View>
                            </View>
                            </TouchableOpacity>
                        )
                    } 
                }
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
        maxWidth: '70%'
    }
})

export default CardsSeries