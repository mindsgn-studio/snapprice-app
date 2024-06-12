import { StyleSheet, View, ScrollView } from 'react-native';
import { useUser } from '@/context';
import ItemCard from './itemCard';
import { FlashList } from "@shopify/flash-list";

export default function Main() {
    const { data } = useUser()

    return (
        <View style={styles.view}>
            <FlashList
                style={{
                    flex: 1,
                }}
                data={data}
                renderItem={({ item }: any) => <ItemCard 
                id={item.id} 
                title={item.Title} 
                image={item.Images[0]} 
                price={item.Price} />}
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
    },
});
