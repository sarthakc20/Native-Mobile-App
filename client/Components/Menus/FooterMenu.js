import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useNavigation, useRoute } from "@react-navigation/native";

const FooterMenu = () => {
    const navigation = useNavigation();
    const route = useRoute();
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <FontAwesome5
          name="home"
          style={styles.iconStyle}
          color={route.name === "Home" && "#BC755D"}
        />
        <Text>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Post")}>
        <FontAwesome5
          name="plus-square"
          style={styles.iconStyle}
          color={route.name === "Post" && "#BC755D"}
        />
        <Text>Post</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("About")}>
        <FontAwesome5
          name="info-circle"
          style={styles.iconStyle}
          color={route.name === "About" && "#BC755D"}
        />
        <Text>My Posts</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Account")}>
        <FontAwesome5
          name="user"
          style={styles.iconStyle}
          color={route.name === "Account" && "#BC755D"}
        />
        <Text>Account</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      margin: 15,
      justifyContent: "space-between",
    },
    iconStyle: {
      marginBottom: 3,
      alignSelf: "center",
      fontSize: 18,
    },
  });

export default FooterMenu;
