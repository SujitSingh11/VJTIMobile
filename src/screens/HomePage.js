import React, { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  StatusBar,
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  Image,
} from "react-native";
import * as eva from "@eva-design/eva";
import {
  ApplicationProvider,
  IconRegistry,
  BottomNavigationTab,
  BottomNavigation,
  Icon,
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
  Avatar,
  MenuItem,
  OverflowMenu,
  Divider,
  Card,
} from "@ui-kitten/components";

const MenuIcon = (props) => (
  <Icon {...props} fill="#8F9BB3" name="more-vertical" />
);
const InfoIcon = (props) => <Icon {...props} fill="#8F9BB3" name="info" />;
const LogoutIcon = (props) => <Icon {...props} fill="#8F9BB3" name="log-out" />;

const HomePage = ({ navigation }) => {
  const [menuVisible, setMenuVisible] = React.useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const renderMenuAction = () => (
    <TopNavigationAction icon={MenuIcon} onPress={toggleMenu} />
  );

  const renderOverflowMenuAction = () => (
    <React.Fragment>
      <OverflowMenu
        anchor={renderMenuAction}
        visible={menuVisible}
        onBackdropPress={toggleMenu}
      >
        <MenuItem accessoryLeft={InfoIcon} title="Profile" />
        <MenuItem accessoryLeft={LogoutIcon} title="Logout" />
      </OverflowMenu>
    </React.Fragment>
  );

  const renderTitle = (props) => (
    <View style={styles.titleContainer}>
      <Avatar style={styles.logo} source={require("../../assets/Avatar.png")} />
      <Text {...props}>Feed</Text>
    </View>
  );

  const Header = (props) => (
    <View {...props} style={styles.cardHeader}>
      <Avatar
        style={styles.cardLogo}
        source={require("../../assets/Avatar.png")}
      />
      <Text category="s1">Sujit Singh</Text>
      <View style={{ marginLeft: "auto" }}>
        <OverflowMenu anchor={renderMenuAction}>
          <MenuItem accessoryLeft={InfoIcon} title="About" />
          <MenuItem accessoryLeft={LogoutIcon} title="Logout" />
        </OverflowMenu>
      </View>
    </View>
  );
  const Header2 = (props) => (
    <View {...props} style={styles.cardHeader}>
      <Avatar
        style={styles.cardLogo}
        source={require("../../assets/Avatar2.png")}
      />
      <Text category="s1">Shubham Shripurkar</Text>
      <View style={{ marginLeft: "auto" }}>
        <OverflowMenu anchor={renderMenuAction}>
          <MenuItem accessoryLeft={InfoIcon} title="About" />
          <MenuItem accessoryLeft={LogoutIcon} title="Logout" />
        </OverflowMenu>
      </View>
    </View>
  );
  const Header3 = (props) => (
    <View {...props} style={styles.cardHeader}>
      <Avatar
        style={styles.cardLogo}
        source={require("../../assets/Avatar3.png")}
      />
      <Text category="s1">Vyanktesh Chitte</Text>
      <View style={{ marginLeft: "auto" }}>
        <OverflowMenu anchor={renderMenuAction}>
          <MenuItem accessoryLeft={InfoIcon} title="About" />
          <MenuItem accessoryLeft={LogoutIcon} title="Logout" />
        </OverflowMenu>
      </View>
    </View>
  );
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation
        title={renderTitle}
        accessoryRight={renderOverflowMenuAction}
      />
      <Divider />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}
      >
        <View style={styles.container}>
          <Card style={styles.card} header={Header}>
            <Layout style={styles.cardBody}>
              <Image
                style={styles.cardImg}
                source={require("../../assets/img1.jpg")}
              />
              <Text category="s2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </Text>
            </Layout>
          </Card>
          <Card style={styles.card} header={Header2}>
            <Layout style={styles.cardBody}>
              <Text category="s2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </Text>
            </Layout>
          </Card>
          <Card style={styles.card} header={Header3}>
            <Layout style={styles.cardBody}>
              <Text category="s2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </Text>
            </Layout>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    marginHorizontal: 16,
  },
  container: {
    flex: 1,
    flexDirection: "column",
  },
  card: {
    borderRadius: 5,
    margin: 10,
  },
  cardHeader: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  cardLogo: {
    marginRight: 15,
  },
  cardImg: {
    width: "100%",
    maxHeight: 250,
    resizeMode: "contain",
  },
  cardBody: {
    maxHeight: 340,
  },
});
export default HomePage;
