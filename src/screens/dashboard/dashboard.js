import React from 'react'
import { View, StyleSheet, Text, ScrollView } from 'react-native'
import { useDashBoard } from "./api"
import { connect } from "react-redux";
import colors from '../../utils/colors'
import { getTranslation } from '../../utils/language'

const Dashboard = ({ token }) => {

    const data = useDashBoard("payable", token, "payables=true")

    console.log(data)

    return (
        <ScrollView style={styles.MainContainer}>
            <View style={styles.card} >
                <Text style={styles.title}>{getTranslation("BANKBALANCE")}</Text>
                <Text style={styles.title} > 100Rs </Text>
            </View>
            <View style={styles.row} >
                <View style={[styles.card, styles.col]} >
                    <Text style={styles.title}>{getTranslation("RECEIVABLE")}</Text>
                    <Text style={styles.title} > 100Rs </Text>
                </View>
                <View style={[styles.card, styles.col]}  >
                    <Text style={styles.title}> {getTranslation("PAYABLES")}</Text>
                    <Text style={[styles.title, styles.textRed]} > 100Rs </Text>
                </View>
            </View>
            <View style={[styles.card, styles.col]} >
                <Text style={styles.title}>{getTranslation("BESTSALEINGPRODUCTS")}</Text>
                <View style={styles.line} />
                <View >
                    <Text>1: Surf Exel </Text>
                    <Text>2: Surf Exel </Text>
                    <Text>3: Surf Exel </Text>
                </View>
            </View>
            <View style={styles.card} >
                <Text style={styles.title}>{getTranslation("CASHINHAND")}</Text>
                <Text style={[styles.title]} > 100Rs </Text>
            </View>
        </ScrollView >
    )
}

const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        backgroundColor: colors.lightColor,
        padding: 10
    },
    card: {
        flex: 1,
        backgroundColor: colors.white,
        padding: 10,
        borderColor: colors.borderColor,
        borderWidth: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        margin: 5,

    },
    title: {
        fontSize: 18,
        flexWrap: 'wrap',
    },
    textRed: {
        color: colors.danger
    },
    row: {
        flexDirection: 'row',
        justifyContent: "center"
    },
    col: {
        flexDirection: "column",
    },
    line: {
        borderWidth: 1,
        borderColor: colors.borderColor,
        marginVertical: 10
    }
});

const mapStateToProps = ({ user }) => {
    return {
        token: user.token
    };
};

export default connect(mapStateToProps, null)(Dashboard);