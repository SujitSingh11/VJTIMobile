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

const EventPage = ({ navigation }) => {
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
      <Text {...props}>Events</Text>
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
      <View style={{ margin: 10 }}>
        <Text category="h3">Upcoming Events</Text>
      </View>
      <View style={{ margin: 10 }}>
        <Text category="h5">Todays Events</Text>
      </View>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}
      >
        <View style={styles.container}>
          <Card style={styles.card} header={Header2}>
            <Layout style={styles.cardBody}>
              <Text category="s2">
                Codicon Hackaton At K.J Somayia, Lorem ipsum dolor sit amet,
                consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                labore et dolore magna aliqua.
              </Text>
              <View style={{ alignItems: "flex-end" }}>
                <Text category="c1" appearance="hint">
                  April 17, 2020
                </Text>
                <Text category="c1" appearance="hint">
                  Starts Time: 8:00 AM
                </Text>
                <Text category="c1" appearance="hint">
                  Ends Time: 12:00 PM
                </Text>
              </View>
            </Layout>
          </Card>
        </View>
      </ScrollView>
      <View style={{ margin: 10 }}>
        <Text category="h5">Week's events at a glance</Text>
      </View>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{ height: "40%" }}
      >
        <View style={styles.container}>
          <View style={styles.container}>
            <Card style={styles.card} header={Header3}>
              <Layout style={styles.cardBody}>
                <Text category="s2">
                  Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit, sed do eiusmod tempor incididunt
                  ut labore et dolore magna aliqua. consectetur adipiscing elit,
                  sed do eiusmod tempor incididunt ut labore et dolore magna
                  aliqua.
                </Text>
                <View style={{ alignItems: "flex-end" }}>
                  <Text category="c1" appearance="hint">
                    April 21, 2020
                  </Text>
                  <Text category="c1" appearance="hint">
                    Starts Time: 7:00 AM
                  </Text>
                  <Text category="c1" appearance="hint">
                    Ends Time: 9:30 PM
                  </Text>
                </View>
              </Layout>
            </Card>
          </View>
          <View style={styles.container}>
            <Card style={styles.card} header={Header2}>
              <Layout style={styles.cardBody}>
                <Text category="s2">
                  sed do eiusmod tempor incididunt ut labore et dolore magna
                  aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing
                  elit, sed do eiusmod tempor incididunt ut labore et dolore
                  magna aliqua.
                </Text>
                <View style={{ alignItems: "flex-end" }}>
                  <Text category="c1" appearance="hint">
                    April 22, 2020
                  </Text>
                  <Text category="c1" appearance="hint">
                    Starts Time: 10:00 AM
                  </Text>
                  <Text category="c1" appearance="hint">
                    Ends Time: 11:00 PM
                  </Text>
                </View>
              </Layout>
            </Card>
          </View>
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
export default EventPage;
