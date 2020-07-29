import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  StyleSheet,
  View,
  Text,
  RefreshControl,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { purchaseReport } from "../../store/actions/reports";
import colors from "../../utils/colors";
import Loader from "../../Components/Loader";
import { FormatPrice, FormatDate } from "../../utils/helper";
import ActionCard from "../../Components/ActionCard";
import EmptyList from "../../Components/EmptyList";
import { getTranslation } from "../../utils/language";
import Overlay from "../../Components/Overlay";
import Filters from "../../Components/DateRangeFilter";
import constants from "../../utils/constants";

const PurchaseReport = (props) => {
  const { language, purchaseReport, transaction, navigation, loading } = props;
  const [overlayStatus, setOverlay] = useState(false);
  const URDU = constants.URDU;
  const styles = getStyles({ language, URDU });
  const [filter, setFilter] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });

  const [total, setTotal] = useState({
    total_purchase: 0,
    total_discount: 0,
    total_paid: 0,
  });

  useEffect(() => {
    purchaseReport(filter);
  }, []);

  const reload = () => {
    purchaseReport(filter);
  };

  let total_purchase = 0;
  let total_discount = 0;
  let total_paid = 0;

  useEffect(() => {
    total_discount = 0;
    total_paid = 0;
    total_purchase = 0;
    for (let i = 0; i < transaction.length; i++) {
      total_discount =
        total_discount + Number(transaction[i].purchase_discount);
      total_paid = total_paid + Number(transaction[i].paid_amount);
      total_purchase = total_purchase + Number(transaction[i].purchase_amount);
    }
    setTotal({
      total_discount,
      total_paid,
      total_purchase,
    });
  }, [transaction]);

  return loading.status ? (
    <Loader size={10} />
  ) : (
    <View style={styles.MainContainer}>
      <View style={styles.infobox}>
        <ActionCard
          toggleFilter={() => setOverlay(true)}
          date={
            filter.startDate.toDateString() +
            " - " +
            filter.endDate.toDateString()
          }
        />
      </View>

      {overlayStatus && (
        <Overlay toggleFilter={() => setOverlay(false)} title="FILTERS">
          <Filters
            data={filter}
            setStartDate={(text) => {
              setFilter({ ...filter, endDate: new Date(), startDate: text });
            }}
            onSubmit={() => {
              setOverlay(false);
              purchaseReport(filter);
            }}
            setEndDate={(text) => {
              setFilter({ ...filter, endDate: text });
            }}
          />
        </Overlay>
      )}

      <View style={styles.table}>
        <View style={styles.head}>
          <Text style={{ flex: 0.2, fontFamily: "PrimaryFont" }}>
            {getTranslation("DATE", language)}
          </Text>
          <Text style={{ flex: 0.2, fontFamily: "PrimaryFont" }}>
            {getTranslation("NAME", language)}
          </Text>
          <Text style={{ flex: 0.2, fontFamily: "PrimaryFont" }}>
            {getTranslation("PURCHASE", language)}
          </Text>
          <Text style={{ flex: 0.2, fontFamily: "PrimaryFont" }}>
            {getTranslation("DISCOUNT", language)}
          </Text>
          <Text style={{ flex: 0.2, fontFamily: "PrimaryFont" }}>
            {getTranslation("PAID", language)}
          </Text>
        </View>
        <FlatList
          ListEmptyComponent={<EmptyList />}
          data={transaction}
          keyExtractor={(item) => item.id}
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={reload} />
          }
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={styles.item}
                onPress={() =>
                  navigation.navigate("PurchaseDetailedReport", {
                    purchase: item,
                  })
                }
              >
                <Text style={styles.itemCol}>
                  {FormatDate(item.purchase_date)}
                </Text>
                <Text style={styles.itemCol}>{item.supplier_name}</Text>
                <Text style={styles.itemCol}>
                  {FormatPrice(item.purchase_amount)}
                </Text>
                <Text style={styles.itemCol}>
                  {FormatPrice(item.purchase_discount)}
                </Text>
                <Text style={styles.itemCol}>
                  {FormatPrice(item.paid_amount)}
                </Text>
              </TouchableOpacity>
            );
          }}
        />

        <View style={styles.footer}>
          <Text style={{ flex: 0.2, fontFamily: "PrimaryFont" }}> Total </Text>
          <Text style={{ flex: 0.3, fontFamily: "PrimaryFont" }}>
            {FormatPrice(total.total_purchase)}
          </Text>
          <Text style={{ flex: 0.3, fontFamily: "PrimaryFont" }}>
            {FormatPrice(total.total_discount)}
          </Text>
          <Text style={{ flex: 0.2, fontFamily: "PrimaryFont" }}>
            {FormatPrice(total.total_paid)}
          </Text>
        </View>
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
      padding: 10,
      paddingBottom: 0,
      borderBottomColor: colors.borderColor,
      borderBottomWidth: 0.5,
    },
    item: {
      flexDirection: "row",
      padding: 10,
    },
    footer: {
      position: "relative",
      right: 0,
      bottom: 0,
      flexDirection: "row",
      backgroundColor: colors.white,
      padding: 10,
      borderTopColor: colors.borderColor,
      borderTopWidth: 0.5,
    },
    itemCol: {
      flex: 0.2,
      fontFamily: "PrimaryFont",
      textAlign: language == URDU ? "right" : "left",
    },
  });

const mapStateToProps = ({ common, reports }) => {
  return {
    loading: common.loading,
    language: common.language,
    transaction: reports.purchaseReport,
  };
};

export default connect(mapStateToProps, { purchaseReport })(PurchaseReport);
