import { StyleSheet, View } from 'react-native';
import ItemCard from '@/components/card';
import { FlashList } from "@shopify/flash-list";
import { useSearch } from '../store/search';
import { height, width } from '@/constants/dimensions';
import { EmptyState } from './empty';
import * as Haptics from "expo-haptics";

interface Price {
  item_id: string,
  price: number,
  date: Date
}

interface Item {
  uuid: string,
  title: string,
  brand: string,
  image: string,
  price: [Price],
  source_name: string,
  link: string,
}

interface ItemCardInterface {
    item: Item
}

export default function Main() {
    const { items, page, limit, search, setItems, setPagination, hasNext } = useSearch();
    
    const paginate = async() => {
        if(!hasNext) return
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        try {
            const response = await fetch(`${process.env.EXPO_PUBLIC_API}/search?search=${search}&page=${page}&limit=${limit}`);
            const data = await response.json();
            const { items, hasNext } = data;
            
            const filtered = items.filter(item => item.price !== null);

            setItems(filtered)
            setPagination({
                page, 
                hasNext
            })
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
        } catch (error) {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
        }
    };

    return (
        <View style={styles.view}>
            <FlashList
                style={{
                    paddingBottom: 200
                }}
                data={items}
                keyExtractor={(item) => item.uuid}
                renderItem={({ item }: ItemCardInterface) => {
                    return (
                        <ItemCard
                            uuid={item.uuid}
                            image={item.image}
                            title={item.title}
                            source={item.source_name}
                            link={item.link}
                            prices={item.price}
                        />
                    )
                }}
                ListEmptyComponent={
                    <EmptyState />
                }
                contentContainerStyle={{ paddingBottom: 40 }}
                onEndReachedThreshold={0.5}
                onEndReached={paginate}
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