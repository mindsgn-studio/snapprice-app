import { View, ScrollView, StyleSheet, ImageBackground } from 'react-native';
import { useLocalSearchParams  } from "expo-router";
import { width } from '@/constants/dimensions';
import Details from '@/components/details';

interface Item {
  id: string,
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
    <ScrollView style={styles.container}>
      <ImageBackground
        style={styles.image}
        source={{
          uri: `${image}`,
        }}
      />
      <Details 
        price={price}
        title={title}
        id={id}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor:"#FFF"
    },
    image: {
      width,
      height: 350
    },
    bottom: {
      display: "flex",
      paddingBottom: 60,
    }
});
