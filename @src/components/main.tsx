import { StyleSheet, View, ScrollView } from 'react-native';
import ItemCard from '@/@src/components/card';
import { FlashList } from "@shopify/flash-list";
import { useSearch } from '../store/search';
import { width } from '../constants/dimensions';

interface Search {
    id: string,
    title: string
}

export default function Main() {
    const { search } = useSearch();
    
    return (
        <View style={styles.view}>
            <FlashList
                data={search}
                renderItem={({ item }: any) => 
                    <ItemCard
                        key={item.id}
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
        width,
        alignSelf: "center",
    },
});