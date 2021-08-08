import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { StyleSheet, View, Text, RefreshControl, FlatList } from "react-native";
import { saleDetail } from "../../store/actions/reports";
import colors from "../../utils/colors";
import Loader from "../../Components/Loader";
import { FormatPrice, FormatDate } from "../../utils/helper";
import EmptyList from "../../Components/EmptyList";
import { getTranslation } from "../../utils/language";
import InfoCard from "../../Components/InfoCard";
import constants from "../../utils/constants";

const SaleDetail = (props) => {
  const { language, saleDetail, saleDetailReport, navigation, loading } = props;
  const URDU = constants.URDU;
  const styles = getStyles({ language, URDU });
  const {
    id,
    customer_name,
    sale_date,
    sale_amount,
    paid_amount,
    sale_discount,
  } = navigation.state.params.sale;

  useEffect(() => {
    saleDetail(id);
  }, []);

  const reload = () => {
    saleDetail(id);
  };

  return loading.status ? (
    <Loader size={10} />
  ) : (
    <View style={styles.MainContainer}>
      {saleDetailReport.summary && <View style={styles.infobox}>
        <InfoCard title="NAME" value={customer_name} />
        <InfoCard title="DATE" value={FormatDate(saleDetailReport?.summary?.sale_date)} />
        <InfoCard title="PRICE" value={FormatPrice(saleDetailReport?.summary?.sale_amount)} />
        <InfoCard title="DISCOUNT" value={FormatPrice(saleDetailReport?.summary?.sale_discount)} />
        <InfoCard title="PAID" value={FormatPrice(saleDetailReport?.summary?.paid_amount)} />
      </View>}

      <View style={styles.head}>
        <Text style={{ flex: 0.4, fontFamily: "PrimaryFont" }}>
          {getTranslation("NAME", language)}
        </Text>
        <Text style={{ flex: 0.2, fontFamily: "PrimaryFont" }}>
          {getTranslation("QUANTITY", language)}
        </Text>
        {/* <Text style={{ flex: 0.2, fontFamily: "PrimaryFont" }}>
          {getTranslation("PURCHASE", language)}
        </Text> */}
        <Text style={{ flex: 0.4, fontFamily: "PrimaryFont" }}>
          {getTranslation("SALE", language)}
        </Text>
      </View>

      <FlatList
        ListEmptyComponent={<EmptyList />}
        data={saleDetailReport.products}
        keyExtractor={(item) => item.product_id}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={reload} />
        }
        renderItem={({ item }) => {
          return (
            <View style={styles.ListItem}>
              <Text style={[styles.col, { flex: 0.4 }]}>
                {item.product_name}
              </Text>
              <Text style={styles.col}>{item.qty_out}</Text>
              {/* <Text style={styles.col}>
                {FormatPrice(item.product_cost_price)}
              </Text> */}
              <Text style={[styles.col, { flex: 0.4 }]}>
                {FormatPrice(item.product_sale_price)}
              </Text>
            </View>
          );
        }}
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
    ListItem: {
      padding: 10,
      flexDirection: "row",
    },
    head: {
      flexDirection: "row",
      padding: 10,
      paddingBottom: 0,
      borderBottomColor: colors.borderColor,
      borderBottomWidth: 0.5,
    },
    col: {
      flex: 0.2,
      fontFamily: "PrimaryFont",
      textAlign: language == URDU ? "right" : "left",
    },
  });

const mapStateToProps = ({ common, reports }) => {
  return {
    loading: common.loading,
    language: common.language,
    saleDetailReport: reports.saleDetail,
  };
};

export default connect(mapStateToProps, { saleDetail })(SaleDetail);
