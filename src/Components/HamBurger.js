import React from "react";
import { View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import colors from "../utils/colors";
import { Badge } from 'react-native-elements'
import { connect } from 'react-redux'

const Header = (props) => {
  toggleDrawer = () => {
    props.navigationProps.toggleDrawer();
  };

  return (
    <View >
      <TouchableOpacity onPress={toggleDrawer}>
        <Icon
          style={{ margin: 20, color: colors.white }}
          name="bars"
          size={20}
        // color='black'
        />
        <View style={{ position: "absolute", right: 5, top: 10 }} >
          {props.totalUnreadOrder && <Badge status="error" value={props.totalUnreadOrder} textStyle={{ margin: 3 }} />}
        </View>
      </TouchableOpacity>
    </View>
  );
};

const mapStateToProps = ({ orders }) => {
  return {
    totalUnreadOrder: orders.totalUnreadOrder
  };
};

export default connect(mapStateToProps, null)(
  Header
);
