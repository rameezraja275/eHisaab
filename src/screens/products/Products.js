import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Overlay from "../../Components/Overlay";
import { StyleSheet, View, Text, FlatList, RefreshControl, ScrollView } from "react-native";
import SearchBar from "../../Components/SearchBar";
import Loader from "../../Components/Loader";
import { productGet } from "../../store/actions/product";
import Filters from "./Filters";
import FloatingButton from "../../Components/FloatingButton";
import { FormatPrice } from "../../utils/helper";
import EmptyList from "../../Components/EmptyList";
import { getTranslation } from "../../utils/language";
import ListItemContainer from "../../Components/ListItemContainer";
import constants from "../../utils/constants";
import FloatingInfoCard from "../../Components/FloatingInfoCard";
import colors from "../../utils/colors";
import { Avatar, Badge, Icon, withBadge } from 'react-native-elements'

const Product = (props) => {
  const { productGet, products } = props;
  const [totalStockCostValue, setStockCostValue] = useState(0);
  const [totalStockSaleValue, setStockSaleValue] = useState(0);
  const [state, setState] = useState({
    data: null,
    filteredData: [],
    showOverlay: false,
    filterType: null,
    StockfilterValue: null,
  });

  useEffect(() => {
    setState({
      ...state,
      filteredData: products,
    });
  }, [products]);

  useEffect(() => { }, [state.filteredData]);

  useEffect(() => {
    let data = products;
    if (state.filterType == "outofstock") {
      data = products.filter(
        (item) =>
          Number(item.current_stock) == 0 &&
          item.is_service == constants.PRODUCT
      );
      setState({ ...state, filteredData: data, StockfilterValue: null });
    } else if (state.filterType == "all") {
      setState({ ...state, filteredData: data, StockfilterValue: null });
    }
  }, [state.filterType]);

  const filterMinimunStock = () => {
    let data = products;
    data = products.filter(
      (item) =>
        Number(item.current_stock) < Number(state.StockfilterValue) &&
        item.is_service == constants.PRODUCT
    );
    setState({
      ...state,
      filteredData: data,
      showOverlay: false,
      filterType: "stocklessthen",
    });
  };

  useEffect(() => {
    let tempStockCostValue = 0;
    let tempStockSaleValue = 0;

    let productStockValueCost = 0;
    let productStockValueSale = 0;

    state.filteredData.map((product) => {
      productStockValueCost = 0;
      productStockValueSale = 0;

      productStockValueCost =
        Number(product.product_cost_price) * Number(product.current_stock);
      tempStockCostValue = productStockValueCost + tempStockCostValue;

      productStockValueSale =
        Number(product.product_sale_price) * Number(product.current_stock);
      tempStockSaleValue = productStockValueSale + tempStockSaleValue;
    });

    setStockCostValue(tempStockCostValue);
    setStockSaleValue(tempStockSaleValue);
  }, [state.filteredData]);

  const onSearch = (text) => {
    const filteredData = products.filter((item) =>
      item.product_name.toLowerCase().includes(text.toLowerCase())
    );
    setState({
      ...state,
      filteredData,
    });
  };

  const reload = () => {
    productGet(0);
  };

  return (
    <View style={styles.MainContainer}>
      {props.loading.status ? (
        <Loader size={10} />
      ) : (
          <React.Fragment>
            <SearchBar
              {...props}
              onChange={onSearch}
              toggleFilter={() => setState({ ...state, showOverlay: true })}
            />

            {state.showOverlay && (
              <Overlay
                toggleFilter={() => setState({ ...state, showOverlay: false })}
                title="FILTER"
              >
                <Filters
                  onPress={(text) => {
                    setState({ ...state, showOverlay: false, filterType: text });
                  }}
                  filterType={state.filterType}
                  onChange={(text) => {
                    setState({ ...state, StockfilterValue: text });
                  }}
                  setValue={filterMinimunStock}
                  StockfilterValue={state.StockfilterValue}
                />
              </Overlay>
            )}

            <ScrollView horizontal={true}  >

              <Badge size="large" value={`Total Sale Price : ${totalStockSaleValue} Rs`} badgeStyle={{
                padding: 15,
                margin: 10,
                backgroundColor: colors.darkColor
              }} />
              <Badge size="large" value={`Total Cost Price : ${totalStockCostValue} Rs`} badgeStyle={{
                padding: 15,
                margin: 10,
                backgroundColor: colors.darkColor
              }} />
            </ScrollView>


            <FlatList
              data={state.filteredData}
              refreshControl={
                <RefreshControl refreshing={false} onRefresh={reload} />
              }
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <ListItemContainer
                  onClick={() =>
                    props.navigation.navigate("ViewProduct", { product: item })
                  }
                >
                  <Text style={{ flex: 0.6, fontFamily: "PrimaryFont" }}>
                    {item.product_name}
                  </Text>
                  <View style={{ flex: 0.4 }}>
                    <Text style={{ fontFamily: "PrimaryFont" }}>
                      {getTranslation("SALE_PRICE", props.language) +
                        " : " +
                        FormatPrice(item.product_sale_price)}
                    </Text>
                    {item.is_service == constants.PRODUCT && (
                      <Text style={{ fontFamily: "PrimaryFont" }}>
                        {getTranslation("STOCK", props.language) +
                          " : " +
                          item.current_stock}{" "}
                      </Text>
                    )}
                  </View>
                </ListItemContainer>
              )}
              ListEmptyComponent={
                <EmptyList message="Nothing to Show, Please Reload or Add Data" />
              }
            />
            <FloatingInfoCard
              title="COST_VALUE"
              value={totalStockCostValue}
              color={colors.darkColor}
              position="top"
            />
            <FloatingInfoCard
              title="SALE_VALUE"
              value={totalStockSaleValue}
              color={colors.darkColor}
            />
            <FloatingButton
              onClick={() => props.navigation.navigate("AddProduct")}
              icon="plus"
            />

          </React.Fragment>
        )}
    </View>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: colors.lightColor
  },
});

const mapStateToProps = ({ product, common }) => {
  return {
    loading: common.loading,
    products: product.products,
    language: common.language,
  };
};

export default connect(mapStateToProps, { productGet })(Product);
