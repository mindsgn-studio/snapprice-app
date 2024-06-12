import { StyleSheet, View, ScrollView } from 'react-native';
import { useUser } from '@/context';
import ItemCard from './itemCard';
import { FlashList } from "@shopify/flash-list";

export default function Main() {
    const { data } = useUser()

    return (
        <ScrollView style={styles.view}>
            <FlashList
                data={data}
                renderItem={({ item }: any) => <ItemCard 
                id={item.id} 
                title={item.Title} 
                image={item.Images[0]} 
                price={item.Price} />}
                estimatedItemSize={100}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
    },
});
