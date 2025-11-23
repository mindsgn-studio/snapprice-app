import { View, ScrollView, StyleSheet, ImageBackground } from 'react-native';
import { useLocalSearchParams  } from "expo-router";
import { width } from '@/constants/dimensions';
import Details from '@/components/details';

interface Sources {
  ID: string,
  Source: String
}

interface Item {
  id: string,
  title: string,
  brand: string,
  image: string,
  price: string,
  source: string
  link: string
}

export default function ItemScreen() {
  const data = useLocalSearchParams<any | Item>();
  const {
    uuid,
    title,
    image,
    brand,
    source,
    link,
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
        title={title}
        image={image}
        brand={brand}
        uuid={uuid}
        source={source}
        link={link}
        price={price}
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
