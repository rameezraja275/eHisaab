import React, { useState } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import colors from "../utils/colors";

const HeaderOptions = (props) => {
  return (
    <View style={{ flexDirection: "row" }}>
      <TouchableOpacity
        onPress={() => props.navigationProps.state.params.showOptions(true)}
      >
        <Icon
          style={{
            marginHorizontal: 20,
            marginVertical: 10,
            color: colors.white,
          }}
          name="ellipsis-v"
          size={20}
        />
      </TouchableOpacity>
    </View>
  );
};

export default HeaderOptions;
