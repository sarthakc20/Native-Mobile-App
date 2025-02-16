import { View, Text, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import EditModal from "./EditModal";

const PostCard = ({ posts, myPostScreen }) => {
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [post, setPost] = useState({});

  const navigation = useNavigation();

  // Handle delete prompt
  const handleDeletePrompt = (id) => {
    Alert.alert(
      "Attention!",
      "Are you sure you want to delete the post?",
      [
        {
          text: "Cancel",
          onPress: () => {
            console.log("cancel press");
          },
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => handleDeletePost(id),
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };

  // Delete post data
  const handleDeletePost = async (id) => {
    try {
      setLoading(true);
      const { data } = await axios.delete(`/post/delete-post/${id}`);
      setLoading(false);
      alert(data?.message);
      navigation.push("MyPost");
    } catch (error) {
      setLoading(false);
      console.log(error);
      alert(error);
    }
  };
  return (
    <View>
      <Text style={styles.heading}>
        {`Total Post${posts?.length > 1 ? "s" : ""}: ${posts?.length}`}
      </Text>
      {myPostScreen && (
        <EditModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          post={post}
        />
      )}
      {posts?.map((post, index) => (
        <View key={index} style={styles.card}>
          {myPostScreen && (
            <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
              <Text style={{ marginHorizontal: 20 }}>
                <FontAwesome5
                  name="pen"
                  size={16}
                  color={"darkblue"}
                  onPress={() => {
                    setPost(post), setModalVisible(true);
                  }}
                />
              </Text>
              <Text style={{ textAlign: "right" }}>
                <FontAwesome5
                  name="trash"
                  size={16}
                  color={"#B32624"}
                  onPress={() => handleDeletePrompt(post?._id)}
                />
              </Text>
            </View>
          )}

          <View>
            <Text style={styles.title}>{post?.title}</Text>
            <Text style={styles.desc}>{post?.description}</Text>
          </View>
          <View style={styles.footer}>
            {post?.postedBy?.name ? (
              <Text style={styles.postedByName}>
                <FontAwesome5 name="user-alt" color={"orange"} />{" "}
                {post?.postedBy?.name}
              </Text>
            ) : (
              <Text style={styles.postedByName}>
                <FontAwesome5 name="user-alt" color={"orange"} /> My Post
              </Text>
            )}
            <Text style={{ paddingTop: 5 }}>
              <FontAwesome5 name="calendar-alt" color={"orange"} />{" "}
              {String(post?.createdAt).substring(0, 10)}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    color: "green",
    textAlign: "right",
  },
  card: {
    width: "100%",
    backgroundColor: "#ffffff",
    borderWidth: 0.2,
    borderColor: "gray",
    padding: 20,
    borderRadius: 5,
    marginVertical: 10,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 40,
    elevation: 2,
  },
  title: {
    fontWeight: "bold",
    paddingBottom: 10,
    borderBottomWidth: 0.3,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  desc: {
    marginTop: 10,
  },
  postedByName: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    backgroundColor: "#ffdbbb",
    borderRadius: 15,
    verticalAlign: "middle",
  },
});

export default PostCard;
