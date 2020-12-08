import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { StyleSheet, View, Text, RefreshControl, FlatList } from "react-native";
import {
    getOrderDetails,
    orderModify
} from "../../store/actions/order";
import InfoCard from "../../Components/InfoCard";
import colors from "../../utils/colors";
import Loader from "../../Components/Loader";
import ActionCard from "../../Components/ActionCard";
import { showAlert } from "../../utils/helper";
import EmptyList from "../../Components/EmptyList";
import { getTranslation } from "../../utils/language";
import constants from "../../utils/constants";
import { TouchableOpacity } from "react-native-gesture-handler";

const OrderDetails = (props) => {
    const order = props.navigation.state.params.order;
    const id = props.navigation.state.params.id;
    const { language } = props;
    const URDU = constants.URDU;
    const styles = getStyles({ language, URDU });

    useEffect(() => {
        props.getOrderDetails(id);
    }, [id]);

    const reload = () => {
        props.getOrderDetails(id);
    };

    const onReject = () => {
        showAlert(
            "REJECT_ORDER",
            () => {
                props.orderModify({ id, status: 2 });
            },
            language
        );
    };

    const onAccept = () => {
        showAlert(
            "ACCEPT_ORDER",
            () => {
                props.orderModify({ id, status: 1 });
            },
            language
        );
    };

    return props.loading.status ? (
        <Loader size={10} />
    ) : (
            <View style={styles.MainContainer}>
                <View style={styles.infobox}>
                    <InfoCard
                        title="NAME"
                        value={order.buyer_name}
                    />
                    <InfoCard title="ADDRESS" value={order.buyer_adress} />
                    {order.status == "1" && <InfoCard title="PHONE" value={order.buyer_phone} />}
                    <ActionCard
                        orderAccept={order.status == "3" ? onAccept : undefined}
                        orderReject={order.status == "3" ? onReject : undefined}
                        phoneNumber={order.status == "1" ? order.buyer_phone : undefined}
                        messageText={""}
                    />
                </View>

                <View style={styles.table}>
                    <View style={styles.head}>
                        <Text style={[styles.col, styles.alignText, { flex: 1 }]}>
                            {getTranslation("NAME", language)}
                        </Text>
                        <Text style={[styles.col, styles.alignText, { flex: 1 }]}>
                            {getTranslation("QTY", language)}
                        </Text>
                    </View>

                    <FlatList
                        ListEmptyComponent={<EmptyList message="No Products." />}
                        data={props.orderDetails}
                        keyExtractor={(item) => item.id}
                        refreshControl={
                            <RefreshControl refreshing={false} onRefresh={reload} />
                        }
                        renderItem={({ item }) => {
                            return (
                                <TouchableOpacity style={styles.item} >
                                    <Text style={[styles.col, { flex: 1 }]}>
                                        {item.product_name}
                                    </Text>
                                    <Text style={[styles.col, { flex: 1 }]}>
                                        {item.qty}
                                    </Text>
                                </TouchableOpacity>
                            );
                        }}
                    />
                </View>
            </View>
        );
};

const getStyles = ({ language, URDU }) =>
    StyleSheet.create({
        MainContainer: {
            flex: 1,
        },
        infobox: {
            backgroundColor: colors.darkColor,
            borderBottomColor: colors.borderColor,
            borderBottomWidth: 0.5,
            paddingBottom: 15,
        },
        table: {
            flex: 1,
        },
        head: {
            flexDirection: "row",
            margin: 10,
            borderBottomColor: colors.borderColor,
            borderBottomWidth: 0.5,
        },
        item: {
            flexDirection: "row",
            justifyContent: "center",
            margin: 10,
        },
        col: {
            flex: 0.3,
            fontFamily: "PrimaryFont",
        },
        alignText: {
            textAlign: "left",
        },
    });

const mapStateToProps = ({ common, orders }) => {
    return {
        loading: common.loading,
        language: common.language,
        orderDetails: orders.orderDetails
    };
};

export default connect(mapStateToProps, {
    getOrderDetails,
    orderModify
})(OrderDetails);
