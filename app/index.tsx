import { View, StyleSheet } from 'react-native';
import { width, height } from '@/@src/constants/dimensions';
import SearchInput from '@/@src/components/search';
import Main from '@/@src/components/main';
import { useEffect } from 'react';
import { useRealm as Realm } from '@realm/react';
import { useRealm } from '@/@src/store/realm';

export default function HomeScreen() {
  const realm = Realm();
  const { setRealm } = useRealm();

  const init = () => {
    setRealm(realm);
  };

  useEffect(() => {
    init();
  },[]);

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
