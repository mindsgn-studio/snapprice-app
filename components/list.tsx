import { StyleSheet, View } from 'react-native';
import ListCard from '@/components/listCard';
import { FlashList } from "@shopify/flash-list";
import { height, width } from '@/constants/dimensions';
import { EmptyState } from './empty';
import { useSQLiteContext } from 'expo-sqlite';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import { useLiveQuery } from 'drizzle-orm/expo-sqlite';
import * as schema from "@/schema"

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
  source: string,
  link: string,
}

interface ItemCardInterface {
    item: Item
}

export default function List() {
    const db = useSQLiteContext();
    const drizzleDb = drizzle(db, { schema});
    const { data } = useLiveQuery(drizzleDb.select().from(schema.items))

    return (
        <View style={styles.view}>
            <FlashList
                style={{
                    paddingBottom: 200
                }}
                data={data}
                keyExtractor={(item) => item.uuid}
                renderItem={({ item }: ItemCardInterface) => {
                    return (
                        <ListCard
                            uuid={item.uuid}
                            image={item.image}
                            title={item.title}
                            source={item.source}
                            link={item.link}
                            brand={item.brand}
                        />
                    )                }}
                ListEmptyComponent={
                    <EmptyState 
                        title={"Nothing Here Yet"}
                        message={"Add your first item and let the magic happen"}
                    />
                }
                contentContainerStyle={{ paddingBottom: 40 }}
                onEndReachedThreshold={0.5}
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