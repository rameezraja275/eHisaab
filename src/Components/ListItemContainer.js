import React from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import colors from "../utils/colors";

const ListItemContainer = ({ children, onClick, commingSoon, isBorder }) => {

  const borderStyle = {
    borderStartColor: colors.darkColor,
    borderStartWidth: isBorder ? 5 : 0
  }

  return (
    <TouchableOpacity style={[{ flex: 1 }, borderStyle]} onPress={onClick}>
      <View style={styles.ListItem}>{children}
        {commingSoon && <Text style={styles.tag}>Comming Soon</Text>}
      </View>
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
  tag: {
    fontSize: 10,
    backgroundColor: colors.primaryColor,
    color: colors.white,
    padding: 5
  }
});

export default ListItemContainer;
