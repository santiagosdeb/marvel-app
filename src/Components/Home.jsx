import {
  View,
  StyleSheet,
  ImageBackground,
  Text
} from "react-native";
import { useFonts } from "expo-font";

const image = {uri: 'https://i.pinimg.com/originals/e3/43/55/e343555041f0d4b4eff0279af5346a63.jpg'}  

const Home = () => {
    const [fontsLoaded] = useFonts({
    heroesassembleital2: require('../../assets/fonts/heroesassembleital2.ttf'),
    robotolight: require("../../assets/fonts/Roboto-Light.ttf"),
    robotoregular: require("../../assets/fonts/Roboto-Regular.ttf"),
  });

  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.background}></ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default Home;
