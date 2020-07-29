import React from "react";
import { Linking } from "react-native";
import { connect } from "react-redux";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import colors from "../../utils/colors";
import { getTranslation } from "../../utils/language";
import ListItemContainer from "../../Components/ListItemContainer";

const TutorialsItem = ({ title, onClick, language }) => {
  const styles = StyleSheet.create({
    dangerText: {
      color: colors.danger,
    },
    listitem: {
      flex: 1,
      padding: 15,
      borderBottomColor: colors.borderColor,
      borderBottomWidth: 0.5,
      backgroundColor: colors.lightColor,
      flexDirection: "row",
      alignItems: "center",
    },
    title: {
      fontSize: 17,
      color: colors.black,
      padding: 0,
      margin: 0,
      fontFamily: "PrimaryFont",
    },
  });

  return (
    <ListItemContainer onClick={onClick}>
      <Text style={styles.title}>{getTranslation(title, language)}</Text>
    </ListItemContainer>
  );
};

const Tutorials = ({ language }) => {
  const youtube = (link) => {
    Linking.openURL(`https:${link}`);
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <TutorialsItem
        title="How to add Product"
        onClick={() =>
          youtube("www.youtube.com/watch?v=B9EKumdY4EQ&list=RDB9EKumdY4EQ")
        }
      />
      <TutorialsItem
        title="How to Sale Product"
        onClick={() =>
          youtube("www.youtube.com/watch?v=B9EKumdY4EQ&list=RDB9EKumdY4EQ")
        }
      />
      <TutorialsItem
        title="How to Purchase Products"
        onClick={() =>
          youtube("www.youtube.com/watch?v=B9EKumdY4EQ&list=RDB9EKumdY4EQ")
        }
      />
      <TutorialsItem
        title="How to add Expense"
        onClick={() =>
          youtube("www.youtube.com/watch?v=B9EKumdY4EQ&list=RDB9EKumdY4EQ")
        }
      />
      <TutorialsItem
        title="How to add Business Information"
        onClick={() =>
          youtube("www.youtube.com/watch?v=B9EKumdY4EQ&list=RDB9EKumdY4EQ")
        }
      />
      <TutorialsItem
        title="How to add a User"
        onClick={() =>
          youtube("www.youtube.com/watch?v=B9EKumdY4EQ&list=RDB9EKumdY4EQ")
        }
      />
      <TutorialsItem
        title="How to Print Bill"
        onClick={() =>
          youtube("www.youtube.com/watch?v=B9EKumdY4EQ&list=RDB9EKumdY4EQ")
        }
      />
    </ScrollView>
  );
};

const mapStateToProps = ({ user, common }) => {
  return {
    language: common.language,
  };
};

export default connect(mapStateToProps, {})(Tutorials);
