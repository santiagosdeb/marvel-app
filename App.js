import "react-native-gesture-handler"
import { StyleSheet, Text, View, Button, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as Font from "expo-font";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useEffect, useState } from "react";
import Detail from "./src/Components/Detail";
import TabNavigator from "./src/Components/TabNavigator";
import { useFonts } from "expo-font";

export default function App() {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  const [fontsLoaded] = useFonts({
    heroesassembleital2: require("./assets/fonts/heroesassembleital2.ttf"),
    robotolight: require("./assets/fonts/Roboto-Light.ttf"),
    robotoregular: require("./assets/fonts/Roboto-Regular.ttf"),
  });

  
  if (!fontsLoaded) return null

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="TabNavigator"
      >
        <Stack.Screen name="TabNavigator" options={{headerShown: false}}>
          {(props) => <TabNavigator {...props} />}
        </Stack.Screen>

        <Stack.Screen name="Detail" options={{
          tabBarActiveTintColor: "#a50000",
          headerStyle: {
            backgroundColor: "#a50000",
          },
          headerTitleStyle: {
            fontFamily: 'heroesassembleital2',
            fontSize: 40,
            color: "#fff",
          },
          headerTitleAlign: 'center',
        }}>
          {(props) => <Detail {...props} />}
        </Stack.Screen>
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
