import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import SearchBar from "../../../Components/SearchBar";
import Loader from "../../../Components/Loader";
import { userGet } from "../../../store/actions/user";
import FloatingButton from "../../../Components/FloatingButton";
import colors from "../../../utils/colors";
import EmptyList from "../../../Components/EmptyList";
import ListItemContainer from "../../../Components/ListItemContainer";

const Users = (props) => {
  const { userGet, users } = props;

  const [state, setState] = useState({
    data: null,
    filteredData: [],
    showOverlay: false,
  });

  useEffect(() => {
    userGet(0);
  }, []);

  useEffect(() => {
    setState({
      ...state,
      filteredData: users,
    });
  }, [users]);

  const onSearch = (text) => {
    const filteredData = users.filter((item) =>
      item.user_name.toLowerCase().includes(text.toLowerCase())
    );
    setState({
      ...state,
      filteredData,
    });
  };

  const reload = () => {
    userGet(0);
  };
  return (
    <View style={styles.MainContainer}>
      {props.loading.status ? (
        <Loader size={10} />
      ) : (
        <React.Fragment>
          <SearchBar {...props} onChange={onSearch} />

          <FlatList
            ListEmptyComponent={<EmptyList message="Nothing to Show." />}
            data={state.filteredData}
            refreshControl={
              <RefreshControl refreshing={false} onRefresh={reload} />
            }
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ListItemContainer
                onClick={() =>
                  props.navigation.navigate("EditUser", { user: item })
                }
              >
                <Text style={{ fontFamily: "PrimaryFont" }}>
                  {item.full_name}
                </Text>
              </ListItemContainer>
            )}
          />

          <FloatingButton
            onClick={() => props.navigation.navigate("AddUser")}
            icon="plus"
            disabled={state.filteredData.length > 0 ? true : false}
          />
        </React.Fragment>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

const mapStateToProps = ({ user, common }) => {
  return {
    loading: common.loading,
    users: user.users,
  };
};

export default connect(mapStateToProps, { userGet })(Users);
