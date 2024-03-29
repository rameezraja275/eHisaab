import React, { useEffect, useState } from 'react'
import { View, StyleSheet, FlatList, RefreshControl, Image } from 'react-native'
import route from '../../store/api'
import colors from "../../utils/colors";
import * as Sharing from "expo-sharing";
import { connect } from "react-redux";
import { getStoreProducts } from '../../store/actions/store'
import Loader from "../../Components/Loader";
import { Avatar, Text, Divider } from 'react-native-elements';
import usePrevious from "../../utils/previousState";
import Button from '../../Components/Button';
import EmptyList from "../../Components/EmptyList";
import { FormatPrice } from "../../utils/helper";
import FloatingButton from "../../Components/FloatingButton";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ShowFlash, shareText } from "../../utils/helper";
import images from '../../utils/images';
import api from '../../store/api'
import WelcomeScreen from './index'

const Store = ({ bussiness, navigation, getStoreProducts, storeProducts, loading, categories, language, totalUnreadOrder, isLoadMore, bussiness_is_store }) => {

    const [limit, setLimit] = useState({
        start: 0,
        end: 20,
    });

    useEffect(() => {
        getStoreProducts(0, limit)
    }, [])

    const reload = () => {
        setLimit({
            start: 0,
            end: 20,
        })
        getStoreProducts(0, {
            start: 0,
            end: 20,
        })
    };

    const getCategory = (id) => {
        if (id != 0) {
            let cat = categories.find((cat) => cat.id == id)
            if (cat) {
                return cat.name
            }
        }
        return ""
    }

    const prevStart = usePrevious(limit.start);
    useEffect(() => {
        if (limit.start != prevStart) {
            isLoadMore && getStoreProducts(0, limit)
        }
    }, [limit]);

    return (
        <View style={styles.MainContainer}>
            {loading.status ? (
                <Loader size={10} />
            ) : (
                bussiness_is_store == "0" ? <WelcomeScreen navigation={navigation} /> :
                    <React.Fragment>
                        <View style={styles.header}>
                            <View style={{ flexDirection: "row", alignItems: 'center', marginVertical: 10 }}>
                                <TouchableOpacity onPress={() => { navigation.navigate("BussinessEdit") }} >
                                    <Avatar
                                        rounded
                                        size="large"
                                        source={{
                                            uri:
                                                api.IMAGE_URL + bussiness.logo,
                                        }}
                                    />
                                </TouchableOpacity>
                                <View style={{ marginLeft: 10 }}>
                                    {
                                        bussiness.store_name == null ?
                                            <TouchableOpacity onPress={() => { navigation.navigate("BussinessEdit") }} >
                                                <Text h4>{"Add Store Name"} </Text>
                                            </TouchableOpacity>
                                            :
                                            <Text numberOfLines={1} ellipsizeMode='tail' h4>{`${bussiness.store_name}`}</Text>
                                    }
                                    <Text>{bussiness.phone} </Text>
                                    <Text>{getCategory(bussiness.category_id)} </Text>
                                </View>
                            </View>

                            <View >

                                <View >
                                    <Text style={{ paddingBottom: 10, }} >{bussiness.narration} </Text>
                                    <Text style={{ paddingBottom: 10, }}  >{bussiness.address} </Text>
                                </View>
                                <View style={{ marginVertical: 5 }} >
                                    <Button badgeValue={totalUnreadOrder} title={`ORDERS`} onClick={() => { navigation.navigate("Orders") }} sm={true} />

                                </View>
                                <Button type="secondary" title={"EDIT_BUSSINESS_INFO"} onClick={() => { navigation.navigate("BussinessEdit") }} sm={true} />

                            </View>
                        </View>

                        <Divider style={{ backgroundColor: colors.darkColor, }} />

                        <View style={{ flex: 1 }}>
                            <FlatList
                                data={storeProducts}
                                refreshControl={
                                    <RefreshControl refreshing={false} onRefresh={reload} />
                                }
                                keyExtractor={(item) => item.product_id}
                                onEndReached={() => {
                                    setLimit({ ...limit, start: limit.start + 20 });
                                }}
                                onEndReachedThreshold={0.2}
                                renderItem={({ item }) => {
                                    return <React.Fragment>
                                        <View style={styles.item}>
                                            <Image
                                                // source={{ uri: route.IMAGE_URL + item.image_url }}
                                                source={item.image_url ? { uri: route.IMAGE_URL + item.image_url } : images.default_image}
                                                style={{ width: 100, height: 100, marginRight: 15 }}
                                            />
                                            <View style={{ flex: 1 }} >
                                                <Text style={{ fontSize: 20 }}>{item.product_name}</Text>
                                                <Text style={{ fontSize: 13 }} >{FormatPrice(item.product_sale_price)}</Text>
                                                <Text style={{ fontSize: 13 }}>{item.current_stock}</Text>
                                                <Text style={{ fontSize: 15, color: item.is_in_store == 2 ? colors.warning : colors.success }}>{item.is_in_store == 2 ? "Pending" : "Active"}</Text>

                                            </View>

                                        </View>
                                        <Divider style={{ backgroundColor: colors.borderColor }} />
                                    </React.Fragment>
                                }}
                                ListEmptyComponent={
                                    <EmptyList message="Nothing to Show, Please Reload or Add Data" />
                                }
                            />
                        </View>


                        {bussiness.store_name != null && <FloatingButton
                            onClick={() => { shareText(`${api.STORE_BASE_URL}${bussiness.store_name}`) }}
                            icon="sharealt"
                            bottomPosition={0}
                        />}

                        {/* <FloatingButton
                                onClick={() => { navigation.navigate("StoreAddProducts") }}
                                icon="plus"
                            /> */}
                    </React.Fragment>)}
        </View>
    )
}

const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        backgroundColor: colors.lightColor,
        // padding: 5,
    },
    header: {
        padding: 10,
        // marginBottom: 20,
    },
    item: {
        margin: 10,
        display: "flex",
        flexDirection: "row"
    }

});

const mapStateToProps = ({ common, bussiness, store, orders }) => {
    return {
        loading: common.loading,
        bussiness: bussiness.bussiness,
        language: common.language,
        storeProducts: store.products,
        isLoadMore: store.isLoadMore,
        categories: bussiness.categories,
        totalUnreadOrder: orders.totalUnreadOrder,
        bussiness_is_store: bussiness.bussiness.is_store
    };
};

export default connect(mapStateToProps, { getStoreProducts })(Store);