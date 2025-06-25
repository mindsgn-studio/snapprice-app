import { StyleSheet, View, ScrollView } from 'react-native';
import ItemCard from '@/@src/components/card';
import { FlashList } from "@shopify/flash-list";
import { useSortedRowIds } from "tinybase/ui-react"
import { TABLES } from '@/@src/constants/database';

export default function Main() {
    const data = useSortedRowIds(TABLES.items)
    
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