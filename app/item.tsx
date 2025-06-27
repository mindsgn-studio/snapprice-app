import { View, StyleSheet, Image, ImageBackground } from 'react-native';
import { useLocalSearchParams  } from "expo-router";
import { width } from '@/@src/constants/dimensions';
import Button from '@/@src/components/button';
import Details from '@/@src/components/details';

interface Item {
  title: string,
  image: string,
  price: string
}

export default function ItemScreen() {
  const data = useLocalSearchParams<any | Item>();
  const {
    id,
    title,
    image,
    price
  } = data

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.image}
        source={{
          uri: `${image}`,
        }}
      />
      <Details />
      <Button title={"TRACK ITEM"} onPress={() => {}}/>
    </View>
  );
}

const styles = StyleSheet.create({
    container:{
    },
    image: {
      width,
      height: 350
    }
});
