import React, { useEffect, useState } from 'react'
import { View, StyleSheet, FlatList, RefreshControl, Image, Dimensions } from 'react-native'
import colors from "../../utils/colors";
import Loader from "../../Components/Loader";
import { connect } from "react-redux";
import { CheckBox } from 'react-native-elements';
import Button from '../../Components/Button';
import EmptyList from "../../Components/EmptyList";
import { FormatPrice } from "../../utils/helper";
import { productGet } from "../../store/actions/product";
import { addProductsToStore } from '../../store/actions/store'
import FloatingButton from "../../Components/FloatingButton";

const AddProduct = ({ loading, productGet, products, addProductsToStore }) => {

    const [juggaadd, rerender] = useState(false)

    useEffect(() => {
        productGet(0)
    }, [])

    const reload = () => {
        productGet(0);
    };

    const filterOnlinePro = () => {
        const onlineProducts = []
        products.map((pro, index) => {
            if (pro.is_in_store === "1")
                onlineProducts.push(pro.id)
        })
        return onlineProducts
    }

    const onSubmit = () => {
        const onlineProducts = filterOnlinePro()
        addProductsToStore(onlineProducts)
    }

    const onSelect = (id, value, item) => {
        const index = products.findIndex((pro) => pro.id === id);
        console.log(index)
        products[index] = {
            ...item,
            is_in_store: value === "0" ? "1" : "0"
        };

        rerender(!juggaadd)
    }

    console.log("dfasdjhi", products.lenght)

    return (
        <View style={styles.MainContainer}>
            {loading.status ? (
                <Loader size={10} />
            ) : (
                    <React.Fragment>
                        <FlatList
                            numColumns={1}
                            data={products}
                            refreshControl={
                                <RefreshControl refreshing={false} onRefresh={reload} />
                            }
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <View style={styles.item}>
                                    <CheckBox
                                        title={item.product_name}
                                        checked={item.is_in_store == "0" ? false : true}
                                        checkedColor={colors.darkColor}
                                        iconRight
                                        onPress={() => onSelect(item.id, item.is_in_store, item)}
                                    />
                                </View>
                            )}
                            ListEmptyComponent={
                                <EmptyList message="Nothing to Show, Please Reload or Add Data" />
                            }
                        />

                        <FloatingButton
                            onClick={onSubmit}
                            title={`ADD_TO_STORE`}
                            value={""}
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
    item: {
        margin: 5,
        display: "flex",
        flexDirection: "row"
    }

});

const mapStateToProps = ({ common, bussiness, product }) => {
    return {
        loading: common.loading,
        bussiness: bussiness.bussiness,
        products: product.products,
        language: common.language,
    };
};

export default connect(mapStateToProps, { productGet, addProductsToStore })(AddProduct);