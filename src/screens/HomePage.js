import React from "react";
import { View, SafeAreaView } from "react-native";
import { Text, Layout } from "@ui-kitten/components";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const HomePage = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <Layout
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Text category="h1">HOME</Text>
      </Layout>
    </SafeAreaView>
  );
};

export default HomePage;
