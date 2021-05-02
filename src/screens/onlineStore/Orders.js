import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Overlay from "../../Components/Overlay";
import { StyleSheet, View, Text, FlatList, RefreshControl } from "react-native";
import SearchBar from "../../Components/SearchBar";
import usePrevious from "../../utils/previousState";
import Loader from "../../Components/Loader";
import { getOrders } from "../../store/actions/order";
import FloatingButton from "../../Components/FloatingButton";
import { FormatPrice, FormatDate } from "../../utils/helper";
import OptionsAction from "../../Components/Options";
import EmptyList from "../../Components/EmptyList";
import ListItemContainer from "../../Components/ListItemContainer";
import constants from "../../utils/constants";
import { getTranslation } from "../../utils/language";
import Filters from './Filters'

const Orders = ({ navigation, getOrders, loading, language, orders, isLoadMore }) => {

    const [orderStatus, setOrderStatus] = useState(constants.PENDDING)
    const [filter, toggleFilter] = useState(false)
    const [searchKey, setSearchKey] = useState("")

    const [limit, setLimit] = useState({
        start: 0,
        end: 20,
    });

    const reload = () => {
        const defaultLimit = {
            start: 0,
            end: 20,
        };
        setLimit(defaultLimit);
        getOrders(0, defaultLimit, orderStatus, searchKey)
    }

    const prevStart = usePrevious(limit.start);
    useEffect(() => {
        if (limit.start != prevStart) {
            isLoadMore && getOrders(0, limit, orderStatus, searchKey)
        }
    }, [limit]);

    const prevorderStatus = usePrevious(orderStatus);
    useEffect(() => {
        if (orderStatus != prevorderStatus) {
            const defaultLimit = {
                start: 0,
                end: 20,
            };
            setLimit(defaultLimit);
            getOrders(0, defaultLimit, orderStatus, searchKey)
        }
    }, [orderStatus]);

    const onSearch = (text) => {
        setSearchKey(text)
        if (text.length > 3 || text.length < 1) {
            const defaultLimit = {
                start: 0,
                end: 20,
            };
            setLimit(defaultLimit);
            getOrders(0, defaultLimit, orderStatus, text)
        }
    }

    const renderStatus = (status) => {
        let message = ""
        if (status == constants.PENDDING) {
            message = "PENDING"
        } else if (status == constants.ACCEPT) {
            message = "ACCEPTED"
        } else if (status == constants.DISPATCH) {
            message = "DISPATCH"
        } else if (status == constants.COMPLETED) {
            message = "COMPLETE"
        }
        return getTranslation(message, language)
    }

    return (
        <View style={styles.MainContainer}>
            <React.Fragment>
                <SearchBar
                    onChange={onSearch}
                    toggleFilter={() => toggleFilter(true)}
                />

                {filter && (
                    <Overlay
                        toggleFilter={() => toggleFilter(false)}
                        title="FILTERS"
                    >
                        <Filters
                            onPress={(text) => {
                                toggleFilter(false)
                                setOrderStatus(text)
                            }}
                            filterType={orderStatus}
                        />
                    </Overlay>
                )}
                {loading.status ? (
                    <Loader size={10} />
                ) : (<FlatList
                    ListEmptyComponent={<EmptyList message="No Orders." />}
                    data={orders}
                    refreshControl={
                        <RefreshControl refreshing={false} onRefresh={reload} />
                    }
                    keyExtractor={(item) => item.id}
                    onEndReached={() => {
                        setLimit({ ...limit, start: limit.start + 20 });
                    }}
                    onEndReachedThreshold={0.1}
                    renderItem={({ item }) => {
                        return (
                            <ListItemContainer
                                onClick={() =>
                                    navigation.navigate("OrderDetails", {
                                        order: item,
                                        id: item.id,
                                        color: "black",
                                    })
                                }
                                isBorder={item.read_status == "1" ? false : true}
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
                                    <Text style={{ color: "black", fontFamily: "PrimaryFont" }}>
                                        {renderStatus(item.status)}
                                    </Text>
                                </View>
                            </ListItemContainer>
                        );
                    }}
                />)}</React.Fragment>
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
        orders: orders.orders,
        isLoadMore: orders.isLoadMore,
    };
};

export default connect(mapStateToProps, {
    getOrders
})(Orders);