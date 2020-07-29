import React, { useState } from "react";
import { View } from "react-native";
import DatePicker from "./DatePicker";
import Button from "./Button";
import { connect } from "react-redux";

const DateFilter = ({ data, onSubmit, setDate }) => {
  const { date } = data;

  return (
    <View style={{ width: 250 }}>
      <DatePicker placeholder={"DATE"} required date={date} setDate={setDate} />
      <Button title={"FILTER"} onClick={onSubmit} />
    </View>
  );
};

const mapStateToProps = ({ common }) => {
  return {
    language: common.language,
  };
};

export default connect(mapStateToProps, {})(DateFilter);
