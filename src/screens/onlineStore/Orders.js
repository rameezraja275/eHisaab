import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Overlay from "../../Components/Overlay";
import { StyleSheet, View, Text, FlatList, RefreshControl } from "react-native";
import SearchBar from "../../Components/SearchBar";

import Loader from "../../Components/Loader";
import { getOrders } from "../../store/actions/order";
import FloatingButton from "../../Components/FloatingButton";
import { FormatPrice, FormatDate } from "../../utils/helper";
import OptionsAction from "../../Components/Options";
import EmptyList from "../../Components/EmptyList";
import ListItemContainer from "../../Components/ListItemContainer";
import colors from "../../utils/colors";
import FloatingInfoCard from "../../Components/FloatingInfoCard";


const Orders = ({ navigation, getOrders, loading, language, orders }) => {

    const reload = () => {
        getOrders(0)
    }

    useEffect(() => {
        getOrders(0)
    }, [])

    console.log("orders", orders)

    return (
        <View style={styles.MainContainer}>
            {loading.status ? (
                <Loader size={10} />
            ) : (
                    <FlatList
                        ListEmptyComponent={<EmptyList message="No Orders." />}
                        data={orders}
                        refreshControl={
                            <RefreshControl refreshing={false} onRefresh={reload} />
                        }
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => {
                            console.log("date", item.order_date)
                            return (
                                <ListItemContainer
                                    onClick={() =>
                                        navigation.navigate("OrderDetails", {
                                            order: item,
                                            id: item.id,
                                            color: "black",
                                        })
                                    }
                                >
                                    <View style={{ flex: 0.7 }}>
                                        <Text style={{ fontFamily: "PrimaryFont", fontSize: 17 }}>
                                            {item.buyer_name}
                                        </Text>
                                        <Text style={{ fontFamily: "PrimaryFont" }}>
                                            {item.buyer_adress}
                                        </Text>
                                        {item.status == "1" && <Text style={{ fontFamily: "PrimaryFont" }}>
                                            {item.buyer_phone}
                                        </Text>}
                                    </View>

                                    <View style={{ flex: 0.3 }}>
                                        <Text style={{ color: "black", fontFamily: "PrimaryFont" }}>
                                            {FormatDate(item.order_date)}
                                        </Text>
                                    </View>
                                </ListItemContainer>
                            );
                        }}
                    />)}
        </View>
    )
}

const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
    },
});

const mapStateToProps = ({ common, orders }) => {
    return {
        loading: common.loading,
        language: common.language,
        orders: orders.orders
    };
};

export default connect(mapStateToProps, {
    getOrders
})(Orders);