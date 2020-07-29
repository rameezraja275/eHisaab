import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  Platform,
} from "react-native";
import { connect } from "react-redux";
import { processSalaries } from "../../store/actions/employees";
import Button from "../../Components/Button";
import TextInput from "../../Components/TextInput";
import { ShowFlash } from "../../utils/helper";
import colors from "../../utils/colors";
import Loader from "../../Components/Loader";
import { showAlert } from "../../utils/helper";
import Overlay from "../../Components/Overlay";
import DatePicker from "../../Components/DatePicker";
import { getTranslation } from "../../utils/language";

const Salaries = (props) => {
  const [salaries, setSalaries] = useState([]);
  const [showOverlay, setOverlay] = useState(false);
  const [date, setDate] = useState(new Date());

  const setForm = (text, id) => {
    const updatedSalaries = [];
    for (let i = 0; i < salaries.length; i++) {
      if (salaries[i].employee_id == id) {
        updatedSalaries.push({
          employee_id: salaries[i].employee_id,
          name: salaries[i].name,
          salary: text,
        });
      } else {
        updatedSalaries.push({
          employee_id: salaries[i].employee_id,
          name: salaries[i].name,
          salary: salaries[i].salary,
        });
      }
    }
    setSalaries(updatedSalaries);
  };

  useEffect(() => {
    let salaries = [];
    const employee = props.employees;
    for (let i = 0; i < employee.length; i++) {
      salaries.push({
        employee_id: employee[i].id,
        name: employee[i].employee_name,
        salary: employee[i].employee_salary,
      });
    }
    setSalaries(salaries);
  }, [props.employees]);

  const onSubmit = () => {
    showAlert("YOU_SURE", () => {
      setOverlay(false);
      let validSalariesCount = 0;
      for (let i = 0; i < salaries.length; i++) {
        const element = salaries[i];
        if (element.salary == "") {
          break;
        } else {
          validSalariesCount++;
        }
      }
      if (validSalariesCount == salaries.length) {
        props.processSalaries(salaries, date);
      } else {
        ShowFlash("ENTER_REQUIRED_FIELDS", "danger", props.language);
      }
    });
  };

  return (
    <KeyboardAvoidingView
      style={styles.MainContainer}
      behavior={Platform.Os == "ios" ? "padding" : "height"}
    >
      {props.loading.status ? (
        <Loader size={10} />
      ) : (
        <React.Fragment>
          {showOverlay && (
            <Overlay
              toggleFilter={() => setOverlay(false)}
              title="PROCESS_SALARIES"
            >
              <View style={{ width: 250 }}>
                <DatePicker
                  placeholder="DATE"
                  required
                  date={date}
                  setDate={setDate}
                />
                <Text
                  style={{
                    fontFamily: "PrimaryFont",
                    marginBottom: 5,
                    fontSize: 10,
                    color: colors.danger,
                  }}
                >
                  {getTranslation("SALARIES_NOTE", props.language)}
                </Text>
                <Button title="PROCESS" onClick={onSubmit} />
              </View>
            </Overlay>
          )}

          <ScrollView
            style={{ flex: 1 }}
            keyboardDismissMode={"on-drag"}
            keyboardShouldPersistTaps={"handled"}
          >
            <View style={styles.Form}>
              {salaries &&
                salaries.map((item) => (
                  <View key={item.employee_id}>
                    <TextInput
                      value={item.salary}
                      onChange={(text) => setForm(text, item.employee_id)}
                      placeholder={item.name}
                      keyboardType={"number-pad"}
                      required
                    />
                  </View>
                ))}
            </View>
            <View style={styles.Button}>
              <View style={{ flex: 1 }}>
                <Button
                  title={"PROCESS_SALARIES"}
                  onClick={() => setOverlay(true)}
                  icon="check"
                />
              </View>
            </View>
          </ScrollView>
        </React.Fragment>
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: colors.lightColor,
  },
  Form: {
    margin: 15,
  },
  Button: {
    flexDirection: "row",
    marginHorizontal: 15,
  },
  margintop: {
    marginTop: 15,
    fontSize: 15,
  },
});

const mapStateToProps = ({ common, employee }) => {
  return {
    loading: common.loading,
    employees: employee.employees,
    language: common.language,
  };
};

export default connect(mapStateToProps, { processSalaries })(Salaries);
