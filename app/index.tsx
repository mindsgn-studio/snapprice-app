import { View, StyleSheet } from 'react-native';
import { width, height } from '@/@src/constants/dimensions';
import SearchInput from '@/@src/components/search';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <SearchInput />
    </View>
  );
}

const styles = StyleSheet.create({
    container:{
      backgroundColor: "blue",
      width,
      height
    }
});
