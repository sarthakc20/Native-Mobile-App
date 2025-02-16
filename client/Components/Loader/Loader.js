import { View, StyleSheet } from "react-native";
import React from "react";

const Loader = ({ count = 1 }) => {
  return (
    <View style={styles.mainContainer}>
      {[...Array(count)].map((_, index) => (
        <View key={index} style={styles.card}>
          <View style={styles.imagePlaceholder} />
          <View style={styles.textPlaceholder1} />
          <View style={styles.textPlaceholder2} />
          <View style={styles.badge} />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: 45,
  },
  card: {
    width: "100%",
    height: "auto",
    marginTop: 20,
    backgroundColor: "#E0E0E0",
    borderRadius: 10,
    padding: 15,
    justifyContent: "space-between",
  },
  imagePlaceholder: {
    width: "100%",
    height: 60,
    backgroundColor: "#D6D6D6",
    borderRadius: 5,
  },
  textPlaceholder1: {
    width: "90%",
    height: 15,
    backgroundColor: "#D6D6D6",
    borderRadius: 5,
    marginTop: 10,
  },
  textPlaceholder2: {
    width: "80%",
    height: 15,
    backgroundColor: "#D6D6D6",
    borderRadius: 5,
    marginTop: 10,
  },
  badge: {
    width: 80,
    height: 25,
    marginTop: 10,
    backgroundColor: "#C0C0C0",
    borderRadius: 20,
    alignSelf: "flex-start",
  },
});

export default Loader;
