import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image, View, Text, StyleSheet, ActivityIndicator } from "react-native";
import {
  GoogleSigninButton,
  GoogleSignin,
  statusCodes,
} from "@react-native-community/google-signin";
import auth from "@react-native-firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { material } from "react-native-typography";
import Background from "../../components/Background";
import firestore from "@react-native-firebase/firestore";

const Login = () => {
  const dispatch = useDispatch();
  const { isLogging } = useSelector((state) => state.Auth);

  const onGoogleButtonPress = async () => {
    try {
      // add any configuration settings here:
      await GoogleSignin.hasPlayServices();

      // Get the users ID token
      const { idToken } = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      return auth()
        .signInWithCredential(googleCredential)
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        console.log("user cancelled the login flow");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
        console.log("operation (f.e. sign in) is in progress already");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        console.log("play services not available or outdated");
      } else {
        // some other error happened
        console.log("some other error happened");
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Background>
        {isLogging ? (
          <ActivityIndicator size="large" />
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                alignItems: "center",
                minWidth: 300,
                minHeight: 350,
              }}
            >
              <Text style={material.display2}>VJTI Mobile</Text>
              <Image
                source={require("../../../assets/logo.png")}
                resizeMode="contain"
                style={{ marginVertical: 80, borderRadius: 50 }}
              />
              <GoogleSigninButton
                style={{ width: 230, height: 48 }}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Light}
                onPress={() =>
                  onGoogleButtonPress().then((loggedUser) => {
                    if (loggedUser.additionalUserInfo.isNewUser) {
                      const ref = firestore()
                        .collection("users")
                        .doc(loggedUser.user.uid)
                        .set({ collegeId: null }, { merge: true });
                    }
                    console.log("SignIn with Google");
                  })
                }
                disabled={false}
              />
            </View>
          </View>
        )}
      </Background>
    </SafeAreaView>
  );
};

export default Login;
