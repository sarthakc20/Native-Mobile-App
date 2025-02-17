import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import FooterMenu from "../Components/Menus/FooterMenu";
import { PostContext } from "../Context/postContext";
import PostCard from "../Components/PostCard";
import { AuthContext } from "../Context/authContext";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";
import Loader from "../Components/Loader/Loader";

const Home = () => {
  //global state
  const [posts, setPosts, getPosts] = useContext(PostContext);
  const [state, setState] = useContext(AuthContext);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getPosts(); // Fetch posts on component mount
  }, []);

  // refresh controll
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getPosts().then(() =>
      setTimeout(() => {
        setRefreshing(false);
      }, 1000)
    ); // Ensure posts load before stopping refresh
  }, [getPosts]);

  const navigation = useNavigation();
  const getGreeting = () => {
    const hours = new Date().getHours();
    if (hours >= 5 && hours < 12) return "Good morning";
    if (hours >= 12 && hours < 17) return "Good afternoon";
    if (hours >= 17 && hours < 21) return "Good evening";
    return "Good night";
  };

  const firstName = state?.user?.name?.split(" ")[0] || "Guest";
  const greeting = getGreeting();
  return (
    <View style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <LinearGradient
          colors={["#000000", "#000000", "#FFA500"]} // Dominant black, small orange section
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.banner}
        >
          <View style={styles.content}>
            <Text style={styles.mainText}>Post Book</Text>
            <Text style={styles.tagline}>
              Your premium space to share and explore posts. Explore today!
            </Text>

            <TouchableOpacity
              onPress={() => navigation.navigate("Post")}
              style={styles.createPostButton}
            >
              <FontAwesome5Icon name="plus" style={styles.iconStyle} />
              <Text style={styles.createPostText}>Create post now!</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
        <View>
          <Text style={{ fontWeight: "bold", color: "#BC755D" }}>
            {greeting} {firstName}!
          </Text>
        </View>
        {refreshing ? (
          <Loader count={(posts && posts.length) || 3} />
        ) : (
          <PostCard posts={posts} />
        )}
      </ScrollView>

      <View>
        <FooterMenu />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 15,
    justifyContent: "space-between",
  },
  banner: {
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  content: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  mainText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
    marginBottom: 0,
  },
  tagline: {
    fontSize: 14,
    color: "white",
    marginBottom: 20,
  },
  createPostButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#FFFFFF",
  },
  iconStyle: {
    fontSize: 12,
    color: "#fff",
    marginRight: 10,
  },
  createPostText: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "500",
  },
});

export default Home;
