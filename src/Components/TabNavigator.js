import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, View, Button , Image} from "react-native";
import CardsAvengers from "./CardsAvengers";
import CardsCharacters from "./CardsCharacters";
import CardsComics from "./CardsComics";
import CardsSeries from "./CardsSeries";
import Home from "./Home";
import MaterialCommunityIcons from "react-native-vector-icons/Ionicons";


function AvengersIcon(props) {
    return (
      <Image
        source={{uri: 'https://www.pngmart.com/files/3/Avengers-PNG-Transparent-Image.png'}}
        style={{ width: 24, height: 24, tintColor: props.color }}
      />
    );
}

const TabNavigator = () => {

    const Tab = createBottomTabNavigator();

    return (
    <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
            tabBarActiveTintColor: "#a50000",
            headerStyle: {
            backgroundColor: "#a50000",
          },
          headerTitleStyle: {
            fontWeight: "bold",
            color: "#fff",
          },
        }}
    >

        <Tab.Screen
          name="Avengers "
          options={{
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'heroesassembleital2',
              fontSize: 40,
              color: '#fff'
            },
            tabBarIcon: ({ color, size }) => (
              <AvengersIcon color={color} size={size} />
            ),
          }}
        >
          {props => <CardsAvengers {...props} />}
        </Tab.Screen>

        <Tab.Screen
          name="Characters "
          options={{
            tabBarLabel: "Characters",
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'heroesassembleital2',
              fontSize: 40,
              color: '#fff'
            },
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="person"
                color={color}
                size={size}
              />
            ),
          }}
        >
          {props => <CardsCharacters {...props}/>} 
        </Tab.Screen>

        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            headerTitle: "©",
            headerTitleStyle: {
              fontFamily: 'heroesassembleital2',
              color: '#fff',
              fontSize: 40
            },
            headerTitleAlign: 'center',
            tabBarLabel: "Home",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
        />

        <Tab.Screen
          name="Comics "
          options={{
            tabBarLabel: "Comics",
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'heroesassembleital2',
              fontSize: 40,
              color: '#fff'
            },
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
              name="book"
                color={color}
                size={size}
                />
            ),
          }}
        >
          {props => <CardsComics {...props} />}
        </Tab.Screen>

        <Tab.Screen
          name="Series "
          options={{
            tabBarLabel: "Series",
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'heroesassembleital2',
              fontSize: 40,
              color: '#fff'
            },
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="tv"
                color={color}
                size={size}
              />
            ),
          }}
        >
          {props => <CardsSeries {...props} />}
        </Tab.Screen>

      </Tab.Navigator>
    )
}

export default TabNavigator;