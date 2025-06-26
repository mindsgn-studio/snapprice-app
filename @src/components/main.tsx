import { StyleSheet, View, ScrollView } from 'react-native';
import ItemCard from '@/@src/components/card';
import { FlashList } from "@shopify/flash-list";
import { useSearch } from '../store/search';
import { width } from '../constants/dimensions';

interface Item {
    id: string,
    title: string,
    image: string,
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
                renderItem={({ item }: ItemCardInterface) => 
                    <ItemCard
                        key={item.id}
                        title={item.title}
                        image={item.image}
                        price={item.price}
                    />
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