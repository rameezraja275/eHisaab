import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import colors from "../utils/colors";

const ListItemContainer = ({ children, onClick }) => {
  return (
    <TouchableOpacity style={{ flex: 1 }} onPress={onClick}>
      <View style={styles.ListItem}>{children}</View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  ListItem: {
    flex: 1,
    padding: 15,
    borderBottomWidth: 0.2,
    borderBottomColor: colors.borderColor,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.lightColor,
  },
});

export default ListItemContainer;
