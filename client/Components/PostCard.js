import { View, Text, StyleSheet } from "react-native";
import React from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const PostCard = ({ posts }) => {
  return (
    <View>
      <Text style={styles.heading}>
      {`Total Post${posts?.length > 1 ? 's' : ''}: ${posts?.length}`}
      </Text>
      {posts?.map((post, index) => (
        <View key={index} style={styles.card}>
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
