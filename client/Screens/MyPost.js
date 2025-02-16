import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import PostCard from "../Components/PostCard";
import FooterMenu from "../Components/Menus/FooterMenu";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import Loader from "../Components/Loader/Loader";

const MyPost = () => {
  //State
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  // Get user posts
  const getUserPosts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/post/get-user-posts");
      setLoading(false);
      setPosts(data?.userPosts);
    } catch (error) {
      setLoading(false);
      console.log(error);
      alert(error);
    }
  };

  // Initial
  useEffect(() => {
    getUserPosts();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <Loader count={posts && posts.length || 2} />
      ) : posts && posts.length > 0 ? (
        <ScrollView>
          <PostCard posts={posts} myPostScreen={true} />
        </ScrollView>
      ) : (
        <View style={styles.noPostContainer}>
          <Text style={styles.noPostText}>No post yet!</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("Post")}
            style={styles.createPostButton}
          >
            <FontAwesome5Icon name="plus-circle" style={styles.iconStyle} />
            <Text style={styles.createPostText}>Create post now!</Text>
          </TouchableOpacity>
        </View>
      )}

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
  noPostContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
  noPostText: {
    fontWeight: "bold",
    color: "#BC755D",
    fontSize: 18,
    marginBottom: 10,
  },
  createPostButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#BC755D",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 25,
    marginTop: 10,
  },
  iconStyle: {
    fontSize: 20,
    color: "white",
    marginRight: 8,
  },
  createPostText: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
});

export default MyPost;
