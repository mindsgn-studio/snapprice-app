import { useEffect, useState } from 'react';
import { StyleSheet, View, TextInput, Text, TouchableOpacity } from 'react-native';
import { useSearch } from '../store/search';
import { replaceString } from '../hooks/replaceString';

export default function SearchInput() {
    const { setSearch, clearSearch } = useSearch();
    const [ searchText, setsearchText ] = useState("sony");

    const search = async() => {
        if (searchText === "") return 
        clearSearch()
        try {
            const response = await fetch(`https://api.takealot.com/rest/v-1-14-0/searches/products,filters,facets,sort_options,breadcrumbs,slots_audience,context,seo,layout?r=1&sb=1&si=16f505529571cecf83dcabb18c4118b6&qsearch=${searchText}&via=suggestions&searchbox=true&offer_opt=true`)
            const data = await response.json()
            const { sections } = data;
            const { products } = sections;
            const { results } = products;

            results.map((data: any) => {
                const { product_views } = data;
                const { core, gallery, buybox_summary } = product_views;
                const { images } = gallery;
                const image = replaceString(images[0]);
                const { title, id } = core;
                const { pretty_price } = buybox_summary
                setSearch({title, id, image, price: pretty_price});
            })
        }catch{
            clearSearch()
        } finally{
            
        }
    };

    useEffect(() => {
        search()
    },[]);

    return (
        <View style={styles.view}>
            <TextInput
                style={styles.textInput}
                placeholder='Search any item'
                onChangeText={(text) => {setsearchText(text)}}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={search}
            >
                <Text style={styles.text}>SEARCH</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        width: "90%",
        backgroundColor: "white",
        display: "flex",
        flexDirection: "row",
        padding: 2,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 80,
        marginBottom: 20,
        alignSelf: "center",
        height: 50,
    },
    textInput:{
        flex: 1,
        paddingHorizontal: 10,
    },
    button:{
        backgroundColor: "blue",
        height: 40,
        width: 80,
        borderRadius: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        color: "white",
        fontWeight: "bold"
    }
});