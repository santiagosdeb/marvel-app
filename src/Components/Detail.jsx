import React from 'react'
import { ScrollView,View, Text, StyleSheet, Image, SectionList, FlatList, TouchableOpacity } from 'react-native'
import * as Linking from 'expo-linking';


const Detail = ({ route }) => {
    const item = route.params.item
    
    const image = `${item.thumbnail.path}.${item.thumbnail.extension}`

    if(!image){
    return(
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#a50000"/>
        </View>
        )
    } else 
        return (
        <View contentContainerStyle={styles.container}>
            <Text style={styles.name}>{item.name ? item.name : item.title}</Text>
            <Image source={image} style={styles.image}/>
            <Text style={styles.description}>{item.description ? item.description : "This item doesn't have description"}</Text>
            {item.name ? (
                <View style={{width: '100%'}}>
                    <SectionList 
                    style={styles.flat}
                    sections={[{title:'Related Series', data: item.series.items}, {title: 'Related Comics', data: item.comics.items}]}
                    renderItem={({ item }) => {            
                          return (
                            <View style={styles.item}>
                              <Text style={styles.description}>{item.name}</Text>
                            </View>
                          );
                        }}
                    renderSectionHeader={({ section }) => <Text style={styles.section}>{section.title}</Text>}
                    />
                    
                    <Text style={styles.section}>More info</Text>
                    <FlatList 
                    style={styles.flat}
                    data={item.urls}
                    renderItem={({ item }) => {
                        return (
                        <TouchableOpacity onPress={() => Linking.openURL(item.url)}>
                        <View style={styles.item}>
                          <Text style={styles.name}>{item.type}</Text>
                        </View>
                        </TouchableOpacity>
                        )}}
                    />
                </View>
            ) : (
                <View style={{width: '100%'}}>
                    <Text style={styles.section}>Related Characters ({item.characters.available})</Text>
                    <FlatList 
                    style={styles.flat}
                    data={item.characters.items}
                    renderItem={({ item }) => {
                        return (
                        <View style={styles.item}>
                            <Text style={styles.description}>{item.name}</Text>
                        </View>
                        )}
                    }
                    />
                    <Text style={styles.section}>More info</Text>
                    <FlatList 
                    style={styles.flat}
                    data={item.urls}
                    renderItem={({ item }) => {
                        return (
                        <TouchableOpacity onPress={() => Linking.openURL(item.url)}>
                        <View style={styles.item}>
                          <Text style={styles.name}>{item.type}</Text>
                        </View>
                        </TouchableOpacity>
                        )}}
                    />
                </View>
            )}
        </View>
        )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        marginTop: 20
    },
    flat: {
        width: '100%'
    },
    item: {
        alignItems: "center",
        marginVertical: 10,
        borderBottomColor: "#ccc",
        borderBottomWidth: 1,
    },
    name: {
        fontSize: 32,
        fontFamily: 'heroesassembleital2',
        color: 'black',
        textAlign: 'center',
        marginVertical: 10
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 5,
        resizeMode: 'contain',
        marginVertical: 10,
    },
    description: {
        fontFamily: 'robotoregular',
        fontSize: 20,
        textAlign: 'center',
        marginVertical: 10,
        paddingHorizontal: 20,
        marginHorizontal: 20,
        fontWeight: 'bold',
        width: '100%'
    },
    section: {
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        fontSize: 22,
        textAlign: 'center',
        marginVertical: 15,
        textDecorationLine: 'underline',
        fontFamily: 'heroesassembleital2',
    }
})

export default Detail