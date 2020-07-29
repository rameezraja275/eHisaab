import React from "react";
import { View } from "react-native";
import { CheckBox } from "react-native-elements";
import { connect } from "react-redux";
import { getTranslation } from "../../utils/language";

const Filters = (props) => {
  const { language } = props;
  return (
    <View style={{ width: 250 }}>
      <CheckBox
        title={getTranslation("RECEIVABLE", language)}
        checkedIcon="dot-circle-o"
        uncheckedIcon="circle-o"
        checked={props.filterType == "receivable" ? true : false}
        onPress={() => props.onPress("receivable")}
      />
      <CheckBox
        title={getTranslation("PAYABLE", language)}
        checkedIcon="dot-circle-o"
        uncheckedIcon="circle-o"
        checked={props.filterType == "payable" ? true : false}
        onPress={() => props.onPress("payable")}
      />
      <CheckBox
        title={getTranslation("ALL", language)}
        checkedIcon="dot-circle-o"
        uncheckedIcon="circle-o"
        checked={props.filterType == "all" ? true : false}
        onPress={() => props.onPress("all")}
      />
    </View>
  );
};

const mapStateToProps = ({ common }) => {
  return {
    language: common.language,
  };
};

export default connect(mapStateToProps, {})(Filters);
