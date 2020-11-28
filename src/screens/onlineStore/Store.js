import React, { useEffect } from 'react'
import { View, StyleSheet, FlatList, RefreshControl, Image, Dimensions } from 'react-native'
import route from '../../store/api'
import colors from "../../utils/colors";
import { connect } from "react-redux";
import { getStoreProducts } from '../../store/actions/store'
import Loader from "../../Components/Loader";
import { Avatar, Text, Divider } from 'react-native-elements';
import Button from '../../Components/Button';
import EmptyList from "../../Components/EmptyList";
import { FormatPrice } from "../../utils/helper";
import FloatingButton from "../../Components/FloatingButton";
import { TouchableOpacity } from 'react-native-gesture-handler';

const Store = ({ bussiness, navigation, getStoreProducts, storeProducts, loading, categories }) => {

    useEffect(() => {
        getStoreProducts(0)
    }, [])

    const reload = () => {
        getStoreProducts(0)
    };

    const getCategory = (id) => {
        if (id != 0) {
            let cat = categories.find((cat) => cat.id == id)
            return cat.name
        }
        return ""
    }

    console.log("bussines", storeProducts)

    return (
        <View style={styles.MainContainer}>
            {loading.status ? (
                <Loader size={10} />
            ) : (
                    <React.Fragment>
                        <View style={styles.header}>
                            <View style={{ flex: 1, alignItems: "center" }}>
                                <TouchableOpacity onPress={() => { navigation.navigate("BussinessEdit") }} >
                                    <Avatar
                                        rounded
                                        size="large"
                                        source={{
                                            uri:
                                                "data:image/png;base64," + bussiness.logo,
                                        }}
                                    />
                                </TouchableOpacity>

                            </View>

                            <View style={{ flex: 2 }}>
                                {
                                    bussiness.storeName == null ?
                                        <TouchableOpacity onPress={() => { navigation.navigate("BussinessEdit") }} >
                                            <Text h4>{"Click here to Set Store name"} </Text>
                                        </TouchableOpacity>
                                        :
                                        <Text h4>{bussiness.storeName} </Text>
                                }
                                <View >
                                    <Text style={{ paddingVertical: 10, }} >{bussiness.narration} </Text>
                                    <View style={{ display: "flex", justifyContent: "space-between", flexDirection: "row", marginRight: 20 }} >
                                        <Text>{bussiness.phone} </Text>
                                        <Text>{getCategory(bussiness.categoryId)} </Text>
                                    </View>
                                    <Text style={{ paddingBottom: 10, }}  >{bussiness.address} </Text>
                                </View>
                                <Button title={"EDIT_BUSSINESS_INFO"} onClick={() => { navigation.navigate("BussinessEdit") }} sm={true} />
                            </View>
                        </View>

                        <Divider style={{ backgroundColor: colors.darkColor }} />

                        <View style={{ flex: 1 }}>
                            <FlatList
                                data={storeProducts}
                                refreshControl={
                                    <RefreshControl refreshing={false} onRefresh={reload} />
                                }
                                keyExtractor={(item) => item.id}
                                renderItem={({ item }) => (
                                    <React.Fragment>
                                        <View style={styles.item}>
                                            <Image
                                                source={{ uri: route.IMAGE_URL + item.product_image }}
                                                style={{ width: 100, height: 100, marginRight: 15 }}
                                            />
                                            <View style={{ flex: 1 }} >
                                                <Text style={{ fontSize: 20 }}>{item.product_name}</Text>
                                                <Text style={{ marginVertical: 5, fontSize: 13 }} >{item.narration} </Text>
                                                <Text style={{ fontSize: 13 }} >{FormatPrice(item.product_sale_price)}</Text>
                                            </View>

                                        </View>
                                        <Divider style={{ backgroundColor: colors.borderColor }} />
                                    </React.Fragment>
                                )}
                                ListEmptyComponent={
                                    <EmptyList message="Nothing to Show, Please Reload or Add Data" />
                                }
                            />
                        </View>

                        <FloatingButton
                            onClick={() => { navigation.navigate("StoreAddProducts") }}
                            icon="plus"
                        />
                    </React.Fragment>)}
        </View>
    )
}

const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        backgroundColor: colors.lightColor,
        padding: 5
    },
    header: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        marginBottom: 20
    },
    item: {
        margin: 10,
        display: "flex",
        flexDirection: "row"
    }

});

const mapStateToProps = ({ common, bussiness, store }) => {
    return {
        loading: common.loading,
        bussiness: bussiness.bussiness,
        language: common.language,
        storeProducts: store.products,
        categories: bussiness.categories
    };
};

export default connect(mapStateToProps, { getStoreProducts })(Store);