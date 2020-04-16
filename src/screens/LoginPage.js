import React from "react";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-community/google-signin";
import { Image, View } from "react-native";
import { Text } from "@ui-kitten/components";
const LoginPage = () => {
  return (
    <View
      style={{
        alignItems: "center",
        minWidth: 300,
        minHeight: 350,
      }}
    >
      <Text category="h2" style={{ marginBottom: 10 }}>
        VJTI Mobile
      </Text>
      <Image
        source={require("../../assets/logo.png")}
        resizeMode="contain"
        style={{ marginVertical: 40 }}
      />
      <GoogleSigninButton
        style={{ width: 186, height: 48 }}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Light}
        onPress={() => {}}
        disabled={false}
      />
    </View>
  );
};

export default LoginPage;
