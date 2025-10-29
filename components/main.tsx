import { StyleSheet, View, ScrollView } from 'react-native';
import ItemCard from '@/components/card';
import { FlashList } from "@shopify/flash-list";
import { useSearch } from '../store/search';
import { width } from '@/constants/dimensions';
import { EmptyState } from './empty';

interface Item {
    id: string,
    title: string,
    images: [string],
    price: string
}

interface ItemCardInterface {
    item: Item
}

export default function Main() {
    const { search } = useSearch();
    
    return (
        <View style={styles.view}>
            <FlashList
                data={search}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }: ItemCardInterface) => 
                    <ItemCard
                        key={item.id}
                        id={item.id}
                        title={item.title}
                        price={item.price}
                    />
                    }
                ListEmptyComponent={
                    <EmptyState />
                }
                 contentContainerStyle={{ paddingBottom: 40 }}
                onEndReachedThreshold={0.5}
                onEndReached={() => {
                }}
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