import React, { useContext } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import FooterMenu from "../Components/Menus/FooterMenu";
import { PostContext } from "../Context/postContext";
import PostCard from "../Components/PostCard";

const Home = () => {
  //global state
  const [posts] = useContext(PostContext);
  return (
    <View style={styles.container}>
      <ScrollView>
        <PostCard posts={posts}/>
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
});

export default Home;
