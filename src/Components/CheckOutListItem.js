import React, { useState, useEffect } from "react";
import { TouchableWithoutFeedback, Text, View, StyleSheet } from "react-native";
import TextInput from "./TextInput";
import Button from "../Components/Button";
import color from "../utils/colors";
import { FormatPrice } from "../utils/helper";
import constants from "../utils/constants";

const CheckOutListItem = ({ item, onDel, onSubmit }) => {
  const [editstatus, showEdit] = useState(false);

  const [state, setState] = useState({
    id: null,
    price: null,
    qty: null,
  });

  useEffect(() => {
    setState({
      id: item.id,
      price: item.price,
      qty: item.qty,
    });
  }, [item]);

  return (
    <React.Fragment>
      <TouchableWithoutFeedback onPress={() => showEdit(!editstatus)}>
        <View style={styles.ListItem}>
          <View
            style={{ flex: 0.2, flexDirection: "row", alignItems: "center" }}
          >
            <Text
              style={{
                marginRight: 1,
                fontSize: 20,
                fontFamily: "PrimaryFont",
              }}
            >
              {item.qty}
            </Text>
            <Text style={{ marginRight: 20, fontFamily: "PrimaryFont" }}>
              {"x"}
            </Text>
          </View>
          <View style={{ flex: 0.5 }}>
            <Text style={{ marginBottom: 1, fontFamily: "PrimaryFont" }}>
              {item.product_name}
            </Text>
            <Text style={{ fontFamily: "PrimaryFont" }}>
              {FormatPrice(item.price)}
            </Text>
          </View>

          <Text style={{ flex: 0.3, fontFamily: "PrimaryFont" }}>
            {FormatPrice(item.price * item.qty)}
          </Text>
        </View>
      </TouchableWithoutFeedback>

      {editstatus && (
        <View style={{ flex: 1, margin: 15 }}>
          {item.is_service == constants.PRODUCT && (
            <TextInput
              value={state.qty.toString()}
              onChange={(text) => setState({ ...state, qty: text })}
              placeholder="QUANTITY"
              keyboardType="number-pad"
            />
          )}
          <TextInput
            value={state.price}
            onChange={(text) => setState({ ...state, price: text })}
            placeholder="PRICE"
            keyboardType="number-pad"
          />
          <View style={{ marginBottom: 10 }}>
            <Button
              title={"SAVE"}
              onClick={() => {
                onSubmit(state);
                showEdit(false);
              }}
              icon="save"
            />
          </View>
          <Button title="DELETE" type="danger" onClick={onDel} icon="delete" />
        </View>
      )}
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  ListItem: {
    padding: 10,
    borderWidth: 0.5,
    borderColor: color.grey,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    flex: 1,
  },
});

export default CheckOutListItem;
