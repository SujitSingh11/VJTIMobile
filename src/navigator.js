import React, { useEffect, useState } from "react";
import {
  View,
  ImageBackground,
  StyleSheet,
  StatusBar,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeNavigator from "./views/Home/Home.navigator";
import ProfileNavigator from "./views/Profile/Profile.navigator";
import LoginNavigator from "./views/Login/Login.navigator";
import auth, { firebase } from "@react-native-firebase/auth";
import { login, logout } from "./store/actions";
import firestore from "@react-native-firebase/firestore";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Theme from "./containers/Theme";
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Body,
  Text,
  Right,
  Left,
  Form,
  Item,
  Input,
  Label,
  Button,
} from "native-base";

const Tab = createBottomTabNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: Theme.COLORS.DEFAULT,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarLabel: "HOME",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="home"
              color={Theme.COLORS.PRIMARY}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Event"
        component={HomeNavigator}
        options={{
          tabBarLabel: "EVENT",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="calendar-multiple-check"
              color={Theme.COLORS.PRIMARY}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Group"
        component={HomeNavigator}
        options={{
          tabBarLabel: "GROUPS",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-multiple"
              color={Theme.COLORS.PRIMARY}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileNavigator}
        options={{
          tabBarLabel: "PROFILE",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-circle"
              color={Theme.COLORS.PRIMARY}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function Switch() {
  const { isAuthenticated } = useSelector((state) => state.Auth);
  const { user } = useSelector((state) => state.Auth);
  const [isCollegeId, setIsCollegeId] = useState(false);
  const [collegeId, setCollegeId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const ref = firestore()
    .collection("users")
    .doc(user.user.uid);
  useEffect(() => {
    ref
      .get()
      .then((doc) => {
        if (doc.exists) {
          const data = doc.data();
          if (data.collegeId != null) {
            setIsCollegeId(true);
          }

          setIsLoading(false);
        } else {
          console.log("No such document!");
        }
      })
      .catch(function(error) {
        console.log("Error getting document:", error);
      });
  }, []);
  const addUserDetails = () => {
    let length = collegeId.toString().length;
    let valid = false;
    if (length == 9) {
      valid = true;
      let yearOfEnrollment =
        collegeId.toString().charAt(0) + collegeId.toString().charAt(1);
      let graduateLevel = collegeId.toString().charAt(2);
      let isStaff = collegeId.toString().charAt(3);
      let departmentCode = collegeId.toString().charAt(4);
      let gender = collegeId.toString().charAt(5);
      let rollNumber =
        collegeId.toString().charAt(6) +
        collegeId.toString().charAt(7) +
        collegeId.toString().charAt(8);

      if (isStaff == "0") isStaff = false;
      else if (isStaff == "1") isStaff = true;
      else valid = false;

      if (departmentCode == "1" && graduateLevel == "2") departmentCode = "MCA";
      else if (departmentCode == "6" && graduateLevel == "1")
        departmentCode = "EE";
      else if (departmentCode == "7" && graduateLevel == "1")
        departmentCode = "CS";
      else if (departmentCode == "8" && graduateLevel == "1")
        departmentCode = "IT";
      else valid = false;

      if (graduateLevel == "0") graduateLevel = "Diploma";
      else if (graduateLevel == "1") graduateLevel = "Undergraduate";
      else if (graduateLevel == "2") graduateLevel = "Postgraduate";
      else valid = false;

      if (gender == "0") gender = "Male";
      else if (gender == "1") gender = "Female";
      else valid = false;

      yearOfEnrollment = parseInt(20 + yearOfEnrollment);
      let date = new Date();
      let year = parseInt(date.getFullYear() - yearOfEnrollment);
      let subScript;
      if (year == 1) {
        subScript = "st";
      } else if (year == 2) {
        subScript = "nd";
      } else if (year == 3) {
        subScript == "rd";
      } else {
        subScript = "th";
      }
      console.log(
        "Official " + departmentCode + " " + year + "" + subScript + " Year"
      );
      const groupName =
        "Official " + departmentCode + " " + year + "" + subScript + " Year";
      const userRef = firestore()
        .collection("users")
        .doc(user.user.uid);
      const groupRef = firestore()
        .collection("groups")
        .where("groupName", "==", groupName);
      userRef.set(
        {
          collegeId: collegeId,
          yearOfEnrollment: "20" + yearOfEnrollment,
          year: year,
          isStaff: isStaff,
          graduateLevel: graduateLevel,
          departmentCode: departmentCode,
          gender: gender,
          rollNumber: rollNumber,
        },
        { merge: true }
      );
      setIsCollegeId(true);
      // groupRef.get().then((docSnapshot) => {
      //   if (docSnapshot.exists) {
      //     console.log("Group exist");
      //     groupRef.get().update({
      //       users: firebase.firestore.FieldValue.arrayUnion(
      //         user.user.uid
      //       ),
      //     });
      //   } else {
      //     console.log("Group dosen't exist");
      //     let newGroup = {
      //       createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
      //       groupName: groupName,
      //       users: [],
      //     };
      //     firestore()
      //       .collection("groups")
      //       .add(newGroup)
      //       .then((ref) => {
      //         console.log("Added document with ID in Groups: ", ref.id);
      //       });
      //     groupRef.get().update({
      //       regions: firebase.firestore.FieldValue.arrayUnion(
      //         user.user.uid
      //       ),
      //     });
      //   }
      // });
    } else {
      Alert.alert(
        "Wrong ID",
        "Enter a valid College ID",
        [
          {
            text: "OK",
            onPress: () => console.log("OK Pressed"),
          },
        ],
        { cancelable: false }
      );
    }
  };

  if (isLoading) {
    return <ActivityIndicator size="large" />;
  } else {
    return (
      <>
        {isAuthenticated ? (
          !isCollegeId ? (
            <View style={styles.container}>
              <StatusBar barStyle="default" backgroundColor="black" />
              <View
                style={{
                  alignContent: "center",
                }}
              >
                <Card style={{ padding: 10 }}>
                  <CardItem header>
                    <Text style={{ fontSize: 25 }}>
                      Let us get to know you better
                    </Text>
                  </CardItem>
                  <CardItem>
                    <Body>
                      <Form style={{ width: "100%" }}>
                        <Item floatingLabel style={{ paddingVertical: 10 }}>
                          <Label>Enter your college ID</Label>
                          <Input
                            onChangeText={(text) => {
                              setCollegeId(text);
                            }}
                          />
                        </Item>
                        <Button
                          rounded
                          style={{
                            alignSelf: "center",
                            paddingHorizontal: 80,
                            marginTop: 40,
                          }}
                          onPress={addUserDetails}
                        >
                          <Text>Submit</Text>
                        </Button>
                      </Form>
                    </Body>
                  </CardItem>
                  <CardItem footer>
                    <Left
                      style={{
                        flexDirection: "row-reverse",
                        marginVertical: 10,
                      }}
                    >
                      <Text note />
                    </Left>
                  </CardItem>
                </Card>
              </View>
            </View>
          ) : (
            <BottomTabs />
          )
        ) : (
          <LoginNavigator />
        )}
      </>
    );
  }
}

function Navigator() {
  const dispatch = useDispatch();
  // Handle user state changes
  const onAuthStateChanged = (user) => {
    if (user) {
      const ref = firestore()
        .collection("users")
        .doc(user.uid);
      ref.set(
        {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          lastSignInTime: user.metadata.lastSignInTime,
        },
        { merge: true }
      );
      dispatch(login({ user }));
    } else {
      dispatch(logout());
    }
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <NavigationContainer>
      <Switch />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  text: {
    color: "grey",
    fontSize: 30,
    fontWeight: "bold",
  },
});

export default Navigator;
