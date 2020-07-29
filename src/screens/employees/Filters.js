import React from "react";
import { View } from "react-native";
import DatePicker from "../../Components/DatePicker";
import Button from "../../Components/Button";

const Filters = (props) => {
  return (
    <View style={{ width: 250 }}>
      <DatePicker
        placeholder="DATE"
        required
        date={props.date ? props.date : new Date()}
        setDate={props.onChange}
      />
      <Button title={"ALL"} onClick={() => props.onChange(null)} />
    </View>
  );
};

export default Filters;
