import { StyleSheet, View } from 'react-native';
import ItemCard from '@/components/card';
import { FlashList } from "@shopify/flash-list";
import { useSearch } from '../store/search';
import { height, width } from '@/constants/dimensions';
import { EmptyState } from './empty';

interface Price {
  ItemID: string,
  Price: number,
  Date: Date
}

interface Item {
  ID: string,
  Title: string,
  Brand: string
  Images: [string],
  Link: string,
  Price: [Price]
}

interface ItemCardInterface {
    item: Item
}

export default function Main() {
    const { search } = useSearch();

    return (
        <View style={styles.view}>
            <FlashList
                style={{
                    paddingBottom: 200
                }}
                data={search}
                keyExtractor={(item) => item.ID}
                renderItem={({ item }: ItemCardInterface) => 
                    <ItemCard
                        key={item.ID}
                        id={item.ID}
                        title={item.Title}
                        images={item.Images}
                        price={item.Price}
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
        height: height,
        width,
        alignSelf: "center",
    },
});