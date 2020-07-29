import React, { useState } from "react";
import { View } from "react-native";
import DatePicker from "./DatePicker";
import Button from "./Button";
import { connect } from "react-redux";

const DateRangeFilter = ({
  data,
  onSubmit,
  setStartDate,
  setEndDate,
  language,
}) => {
  const { startDate, endDate } = data;

  return (
    <View style={{ width: 250 }}>
      <DatePicker
        placeholder={"START_DATE"}
        required
        date={startDate}
        setDate={setStartDate}
      />
      <DatePicker
        minDate={startDate}
        placeholder={"END_DATE"}
        required
        date={endDate}
        setDate={setEndDate}
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

export default connect(mapStateToProps, {})(DateRangeFilter);
