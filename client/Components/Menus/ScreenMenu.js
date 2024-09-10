import { View, Text } from "react-native";
import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Signup from "../../Screens/Auth/Signup";
import Login from "../../Screens/Auth/Login";
import Home from "../../Screens/Home";
import HomePage from "../../Screens/HomePage";
import { AuthContext } from "../../Context/authContext";
import HeaderMenue from "./HeaderMenue";

const ScreenMenu = () => {
  //global state
  const [state] = useContext(AuthContext);
  const authenticatedUser = state?.user && state?.token;
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName="Login">
      {authenticatedUser ? (
        <>
          <Stack.Screen name="Home" component={Home} options={{
            title: "Native Full-Stack App",
            headerRight: () => <HeaderMenue />,
          }}/>
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
