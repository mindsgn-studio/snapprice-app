import { View, StyleSheet } from 'react-native';
import { width, height } from '@/@src/constants/dimensions';
import SearchInput from '@/@src/components/search';
import Main from '@/@src/components/main';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <SearchInput />
      <Main />
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
