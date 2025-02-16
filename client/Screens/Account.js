import React, { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { AuthContext } from "../Context/authContext";
import FooterMenu from "../Components/Menus/FooterMenu";
import axios from "axios";

const Account = () => {
  // Global state
  const [state, setState] = useContext(AuthContext);
  const { user, token } = state;

  // Local state
  const [name, setName] = useState(user?.name);
  const [password, setPassword] = useState(user?.password);
  const [email] = useState(user?.email);
  const [loading, setLoading] = useState(false);

  // Track if there are any changes
  const [isUpdated, setIsUpdated] = useState(false);

  // Check for changes in the fields
  useEffect(() => {
    if (name !== user?.name || password !== user?.password) {
      setIsUpdated(true);
    } else {
      setIsUpdated(false);
    }
  }, [name, password]);

  // Update user data
  const handleUpdate = async () => {
    if (!isUpdated) return; // Do not proceed if no changes

    try {
      setLoading(true);
      const { data } = await axios.put("/auth/update-user", {
        name,
        password,
        email,
      });
      setLoading(false);
      let updatedData = JSON.stringify(data);
      setState({ ...state, user: updatedData?.updatedUser });
      alert(data && data.message);
    } catch (error) {
      alert(error.response.data.message);
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{ alignItems: "center" }}>
          <Image
            source={{
              uri: "https://res.cloudinary.com/dfl9wcmy4/image/upload/v1737737791/avatars/freepik__background__91972_ij1jaq.png",
            }}
            style={{ height: 200, width: 200 }}
          />
        </View>
        <Text style={styles.warningtext}>
          Currently you can only update your name and password*
        </Text>

        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>Name</Text>
          <TextInput
            style={styles.inputBox}
            value={name}
            onChangeText={(text) => setName(text)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>Email</Text>
          <TextInput style={styles.inputBox} value={email} editable={false} />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>Password</Text>
          <TextInput
            style={styles.inputBox}
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>Role</Text>
          <TextInput
            style={styles.inputBox}
            value={state?.user.role}
            editable={false}
          />
        </View>

        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            style={[
              styles.updateBtn,
              { backgroundColor: isUpdated ? "black" : "#ccc" },
            ]} // Disable the button if no changes
            onPress={handleUpdate}
            disabled={!isUpdated} // Disable if no changes
          >
            <Text style={styles.updateBtnText}>
              {loading ? "Please wait" : "Update profile"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <FooterMenu />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    justifyContent: "space-between",
  },
  warningtext: {
    color: "red",
    fontSize: 13,
    textAlign: "center",
  },
  inputContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  inputText: {
    fontWeight: "bold",
    width: 70,
    color: "gray",
  },
  inputBox: {
    width: 250,
    backgroundColor: "#ffffff",
    marginLeft: 10,
    fontSize: 16,
    paddingLeft: 20,
    borderRadius: 5,
  },
  updateBtn: {
    height: 40,
    width: 250,
    borderRadius: 10,
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  updateBtnText: {
    color: "#ffffff",
    fontSize: 16,
  },
});

export default Account;
