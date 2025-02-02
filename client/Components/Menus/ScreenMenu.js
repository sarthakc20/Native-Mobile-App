import { View, Text } from "react-native";
import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Signup from "../../Screens/Auth/Signup";
import Login from "../../Screens/Auth/Login";
import Home from "../../Screens/Home";
import HomePage from "../../Screens/HomePage";
import { AuthContext } from "../../Context/authContext";
import HeaderMenue from "./HeaderMenue";
import Post from "../../Screens/Post";
import About from "../../Screens/About";
import Account from "../../Screens/Account";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const ScreenMenu = () => {
  //global state
  const [state] = useContext(AuthContext);
  const authenticatedUser = state?.user && state?.token;
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName="Login">
      {authenticatedUser ? (
        <>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerTitle: () => (
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <FontAwesome5
                    name="pen-nib"
                    size={20}
                    color="orange"
                    style={{ marginRight: 8, paddingTop: 2 }}
                  />
                  <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                    Post Book
                  </Text>
                </View>
              ),
              headerRight: () => <HeaderMenue />,
            }}
          />
          <Stack.Screen
            name="Post"
            component={Post}
            options={{
              headerBackTitle: "Back",
              headerRight: () => <HeaderMenue />,
            }}
          />
          <Stack.Screen
            name="About"
            component={About}
            options={{
              headerBackTitle: "Back",
              headerRight: () => <HeaderMenue />,
            }}
          />
          <Stack.Screen
            name="Account"
            component={Account}
            options={{
              headerBackTitle: "Back",
              headerRight: () => <HeaderMenue />,
            }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="HomePage"
            component={HomePage}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default ScreenMenu;
