import React, { useState } from "react";
import { View, Text } from "react-native";
import Button from "./Button";
import colors from "../utils/colors";

const Nofitications = ({ notifications, onClose }) => {
  const [currentNotification, setCurrent] = useState(0);
  const lastNotification = notifications.length - 1;

  return (
    <View
      style={{
        width: 250,
        borderTopColor: colors.borderColor,
        borderTopWidth: 2,
        alignItems: "center",
      }}
    >
      {
        <View style={{ marginVertical: 10, marginHorizontal: 8 }}>
          <Text
            style={{
              fontSize: 20,
              color: colors.darkColor,
              fontFamily: "PrimaryFont",
            }}
          >
            {notifications[currentNotification].notification_text}
          </Text>
        </View>
      }
      <View style={{ width: "50%" }}>
        {lastNotification == currentNotification ? (
          <Button title={"CLOSE"} onClick={onClose} sm={true} />
        ) : (
          <Button
            title={"NEXT"}
            onClick={() => setCurrent(currentNotification + 1)}
            sm={true}
          />
        )}
      </View>
    </View>
  );
};

export default Nofitications;
