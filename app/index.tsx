import { StyleSheet, View, Text } from 'react-native';
import { SearchInput, Main } from '@/components';

export default function App() {
  return (
    <View style={styles.View}>
      <SearchInput />
      <Main />
    </View>
  );
}

const styles = StyleSheet.create({
  View:{
    flex: 1,
    alignItems: "center",
    backgroundColor: "#2B4EF5",
    paddingVertical: 10,
  },
});
