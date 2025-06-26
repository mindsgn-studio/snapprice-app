import { StyleSheet, View, ScrollView } from 'react-native';
import ItemCard from '@/@src/components/card';
import { FlashList } from "@shopify/flash-list";
import { useSearch } from '../store/search';

interface Search {
    title: string
}

export default function Main() {
    const { search } = useSearch();
    console.log(search);
    
    return (
        <View style={styles.view}>
            <FlashList
                data={search}
                renderItem={({ item }: any) => <ItemCard 
                    id={item.id} 
                    title={item.title} />
                }
                estimatedItemSize={100}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        marginTop: 10,
        flex: 1,
        width: "90%",
        alignSelf: "center"
    },
});