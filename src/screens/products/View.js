/*Example to open a screen out of the Navigation Drawer*/
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { StyleSheet, View, Text, RefreshControl, FlatList } from "react-native";
import { productDelete, getProductStock } from "../../store/actions/product";
import InfoCard from "../../Components/InfoCard";
import colors from "../../utils/colors";
import Loader from "../../Components/Loader";
import FloatingButton from "../../Components/FloatingButton";
import { FormatPrice, FormatDate } from "../../utils/helper";
import OptionsAction from "../../Components/Options";
import { showAlert } from "../../utils/helper";
import EmptyList from "../../Components/EmptyList";
import usePrevious from "../../utils/previousState";
import { getTranslation } from "../../utils/language";
import constants from "../../utils/constants";

const ViewProduct = (props) => {
  const [limit, setLimit] = useState({
    start: 0,
    end: 20,
  });

  const { language } = props;

  const URDU = constants.URDU;
  const styles = getStyles({ language, URDU });
  const prevStart = usePrevious(limit.start);

  const product = props.navigation.state.params.product;

  const [options, showOptions] = useState(false);

  const onDelete = () => {
    showAlert(
      "YOU_SURE",
      () => {
        props.productDelete(product.id, product.image_url);
      },
      props.language
    );
  };

  useEffect(() => {
    props.getProductStock(product.id, limit);
    props.navigation.setParams({
      showOptions: showOptions,
    });
  }, []);

  const reload = () => {
    const defaultLimit = {
      start: 0,
      end: 20,
    };
    setLimit(defaultLimit);
    props.getProductStock(product.id, defaultLimit);
  };

  const Transaction = props.product_stock;

  useEffect(() => {
    if (limit.start == prevStart) {
      props.getProductStock(product.id, limit);
    }
  }, [limit]);

  return props.loading.status ? (
    <Loader size={10} />
  ) : (
      <View style={styles.MainContainer}>
        <View style={styles.infobox}>
          <InfoCard
            title="SALE_PRICE"
            value={FormatPrice(product.product_sale_price)}
          />
          <InfoCard
            title="COST_PRICE"
            value={FormatPrice(product.product_cost_price)}
          />
          <InfoCard title="TOTAL_STOCK" value={product.current_stock} />
          <InfoCard
            title="COST_VALUE"
            value={FormatPrice(
              product.current_stock * product.product_cost_price
            )}
          />
          <InfoCard
            title="SALE_VALUE"
            value={FormatPrice(
              product.current_stock * product.product_sale_price
            )}
          />
        </View>

        <OptionsAction
          status={options}
          close={showOptions}
          title="DELETE"
          onSelect={onDelete}
          danger={true}
        />

        <View style={styles.table}>
          <View style={styles.head}>
            <Text style={{ flex: 0.3, fontFamily: "PrimaryFont" }}>
              {getTranslation("DATE", props.language)}
            </Text>
            <Text style={{ flex: 0.4, fontFamily: "PrimaryFont" }}>
              {getTranslation("DESCRIPTION", props.language)}
            </Text>
            <Text style={{ flex: 0.3, fontFamily: "PrimaryFont" }}>
              {getTranslation("QTY", props.language)}
            </Text>
            <Text style={{ flex: 0.3, fontFamily: "PrimaryFont" }}>
              {getTranslation("PRICE", props.language)}
            </Text>
          </View>

          <FlatList
            ListEmptyComponent={<EmptyList message="No Transactions." />}
            onEndReached={() => {
              setLimit({ ...limit, start: limit.start + 20 });
            }}
            onEndReachedThreshold={0}
            data={Transaction}
            keyExtractor={(item) => item.id}
            refreshControl={
              <RefreshControl refreshing={false} onRefresh={reload} />
            }
            renderItem={({ item }) => {
              const { qty_in } = item;
              const stockOut = qty_in == 0 ? true : false;
              return (
                <View style={styles.item}>
                  <Text style={styles.col}>{FormatDate(item.Date)}</Text>
                  <Text style={[styles.col, { flex: 0.4 }]}>
                    {item.narration}
                  </Text>
                  <Text
                    style={[
                      styles.col,
                      { color: stockOut ? colors.danger : colors.success },
                    ]}
                  >
                    {stockOut ? item.qty_out : item.qty_in}
                  </Text>
                  <Text style={styles.col}>
                    {stockOut
                      ? FormatPrice(item.product_sale_price)
                      : FormatPrice(item.product_cost_price)}
                  </Text>
                </View>
              );
            }}
          />
        </View>

        <FloatingButton
          onClick={() => props.navigation.navigate("EditProduct", { product })}
          icon="edit"
        />
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
      borderBottomColor: colors.borderColor,
      borderBottomWidth: 1,
    },
    center: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    col: {
      flex: 0.3,
      fontFamily: "PrimaryFont",
      textAlign: language == URDU ? "right" : "left",
    },
  });

const mapStateToProps = ({ common, product }) => {
  return {
    loading: common.loading,
    language: common.language,
    product_stock: product.product_stock,
  };
};

export default connect(mapStateToProps, { productDelete, getProductStock })(
  ViewProduct
);
