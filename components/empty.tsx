import { height } from "@/constants/dimensions"
import { View, Text, StyleSheet } from "react-native"


export function EmptyState({
  title = "No Results Found",
  message = "Try searching for a different product or keyword.",
}: {
  title?: string
  message?: string
}) {
    return (
        <View style={styles.component}>
            <Text style={styles.header}>{title}</Text>
            <Text style={styles.text}>{message}</Text>    
        </View>
    )
}

const styles = StyleSheet.create({
    component: {
        padding: 10,
        marginHorizontal: 20,    height: height - 200,
        paddingTop: 80,
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    header: {
        fontSize: 41,
        fontFamily: "heavy",
        paddingBottom: 100,
    },
    text: {
        fontSize: 30,
        textAlign: "center",
        alignSelf: "center",
        fontFamily: "regular",
    }
})