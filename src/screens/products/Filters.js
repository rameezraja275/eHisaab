import React from "react";
import { View } from "react-native";
import { CheckBox } from "react-native-elements";
import TextInput from "../../Components/TextInput";
import Button from "../../Components/Button";
import { connect } from "react-redux";
import { getTranslation } from "../../utils/language";

const Filters = (props) => {
  const disabled =
    props.StockfilterValue == null || props.StockfilterValue == ""
      ? true
      : false;
  return (
    <View style={{ width: 250 }}>
      <CheckBox
        title={getTranslation("OUT_OF_STOCK", props.language)}
        checkedIcon="dot-circle-o"
        uncheckedIcon="circle-o"
        checked={props.filterType == "outofstock" ? true : false}
        onPress={() => props.onPress("outofstock")}
      />
      <CheckBox
        title={getTranslation("ALL", props.language)}
        checkedIcon="dot-circle-o"
        uncheckedIcon="circle-o"
        checked={props.filterType == "all" ? true : false}
        onPress={() => props.onPress("all")}
      />
      <View style={{ margin: 10, flexDirection: "row" }}>
        <View style={{ marginRight: 5, flex: 1 }}>
          <TextInput
            value={props.StockfilterValue}
            onChange={props.onChange}
            keyboardType={"number-pad"}
            placeholder="STOCK_LESS_THAN"
            required
          />
        </View>

        <Button icon="check" onClick={props.setValue} disabled={disabled} />
      </View>
    </View>
  );
};

const mapStateToProps = ({ common }) => {
  return {
    language: common.language,
  };
};

export default connect(mapStateToProps, {})(Filters);
