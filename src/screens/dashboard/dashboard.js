import React, { useEffect } from 'react'
import { View, StyleSheet, Text, ScrollView, RefreshControl } from 'react-native'
import { connect } from "react-redux";
import colors from '../../utils/colors'
import { getTranslation } from '../../utils/language'
import { getCashBook } from '../../store/actions/reports'
import { getTopProducts, getTotalBankBalance, getTotalPayable, getTotalReceiveable } from '../../store/actions/dashboard'
import Loader from '../../Components/Loader'
import { FormatPrice } from '../../utils/helper';

const Dashboard = ({ language, loading, cashbook, getCashBook, getTopProducts, topProducts, getTotalBankBalance, totalBankBalance, getTotalPayable, totalPayable, getTotalReceiveable, totalReceiveable }) => {

    const today = {
        date: new Date()
    }

    useEffect(() => {
        getTopProducts(9);
        getTotalBankBalance();
        getTotalPayable();
        getTotalReceiveable();
        getCashBook(today);
    }, [])

    const reload = () => {
        getTopProducts(9);
        getTotalBankBalance();
        getTotalPayable();
        getTotalReceiveable();
        getCashBook(today);
    }


    const {
        opening_cash,
        sale,
        receipt,
        purchase,
        payment,
        expense,
        bank_withdrawal,
        bank_deposit
    } = cashbook;
    const totalDebit = Number(opening_cash) + Number(sale) + Number(receipt) + Number(bank_withdrawal);
    const totalCredit = Number(purchase) + Number(payment) + Number(expense) + Number(bank_deposit);
    const cashinHand = totalDebit - totalCredit;

    return (
        <ScrollView style={styles.MainContainer} refreshControl={
            <RefreshControl refreshing={false} onRefresh={reload} />
        }>
            <View style={styles.card} >
                <Text style={styles.title}>{getTranslation("BANKBALANCE", language)}</Text>
                {totalBankBalance.loading ? <Loader size={10} /> : <Text style={styles.title} >{FormatPrice(totalBankBalance.data)}</Text>}
            </View>
            <View style={styles.row} >
                <View style={[styles.card, styles.col]} >
                    <Text style={styles.title}>{getTranslation("RECEIVABLE", language)}</Text>
                    {totalReceiveable.loading ? <Loader size={10} /> : <Text style={styles.title} >{FormatPrice(totalReceiveable.data)}</Text>}
                </View>
                <View style={[styles.card, styles.col]}  >
                    <Text style={styles.title}> {getTranslation("PAYABLES", language)}</Text>
                    {totalPayable.loading ? <Loader size={10} /> : <Text style={[styles.title, styles.textRed]} >{FormatPrice(totalPayable.data)}</Text>}
                </View>
            </View>
            <View style={[styles.card, styles.col]} >

                {/* <View style={styles.line} /> */}
                <View style={[styles.row, styles.justifyContentSB, styles.alignItemCenter]} >
                    <Text style={styles.title}>{getTranslation("BESTSALEINGPRODUCTS", language)}</Text>
                    <Text style={styles.subTitle}>{getTranslation("QTY", language)} </Text>
                </View>
                <View style={styles.line} />
                {topProducts.loading ? <Loader size={10} /> : <View >
                    {
                        topProducts.data.map((pro, index) => <View key={index} style={[styles.row, styles.justifyContentSB]} >
                            <Text>{index + 1 + " " + pro.product_name}</Text>
                            <Text>{pro.total_quantity} </Text>
                        </View>)
                    }
                </View>}
            </View>
            <View style={styles.card} >
                <Text style={styles.title}>{getTranslation("CASHINHAND", language)}</Text>
                {loading.status ? <Loader size={10} /> : <Text style={[styles.title]} >{FormatPrice(cashinHand)}</Text>}
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
    subTitle: {
        fontSize: 12,
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
    },
    justifyContentSB: {
        justifyContent: 'space-between'
    },
    alignItemCenter: {
        alignItems: "center"
    }
});

const mapStateToProps = ({ user, dashboard, reports, common }) => {
    return {
        token: user.token,
        topProducts: dashboard.topProducts,
        totalBankBalance: dashboard.totalBankBalance,
        totalPayable: dashboard.totalPayable,
        totalReceiveable: dashboard.totalReceiveable,
        cashbook: reports.cashbook,
        loading: common.loading,
        language: common.language,
    };
};

export default connect(mapStateToProps, { getTopProducts, getTotalBankBalance, getTotalPayable, getTotalReceiveable, getCashBook })(Dashboard);