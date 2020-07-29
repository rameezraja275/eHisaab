import React from "react";
import { View } from "react-native";
import DatePicker from "./DatePicker";
import Picker from "./Picker";
import Button from "./Button";
import { connect } from "react-redux";
import { getTranslation } from "../utils/language";

const Filters = ({ data, setType, onSubmit, setDate, language }) => {
  const { date, filter_type } = data;

  const options = [
    {
      id: "1",
      name: getTranslation("DATE", language),
    },
    {
      id: "2",
      name: getTranslation("MONTH", language),
    },
  ];

  return (
    <View style={{ width: 250 }}>
      <DatePicker placeholder={"DATE"} required date={date} setDate={setDate} />
      <Picker
        placeholder={"FILTER_TYPE"}
        required
        options={options}
        value={filter_type}
        onChange={setType}
        type="name"
      />
      <Button title={"FILTER"} onClick={onSubmit} />
    </View>
  );
};

const mapStateToProps = ({ common }) => {
  return {
    language: common.language,
  };
};

export default connect(mapStateToProps, {})(Filters);
