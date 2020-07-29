import React from "react";
import { View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import colors from "../utils/colors";

const Header = (props) => {
  toggleDrawer = () => {
    props.navigationProps.toggleDrawer();
  };

  return (
    <View style={{ flexDirection: "row" }}>
      <TouchableOpacity onPress={toggleDrawer}>
        <Icon
          style={{ margin: 20, color: colors.white }}
          name="bars"
          size={20}
          // color='black'
        />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
