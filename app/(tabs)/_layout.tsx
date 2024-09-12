import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { TabBarIcon } from "../../components/tabBarIcon";

const RootLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#DB4437",
        tabBarInactiveTintColor: "rgb(107 114 128);",
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#121212",
          height: 64,
          borderTopWidth: 0,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <>
              <TabBarIcon
                name={focused ? "home" : "home-outline"}
                color={color}
              />
              <Text
                className={`mt-1 ${
                  focused ? "text-accent" : "text-gray-500"
                } text-[12px]`}
              >
                Home
              </Text>
            </>
          ),
        }}
      />
      <Tabs.Screen
        name="bookings"
        options={{
          title: "Bookings",
          tabBarIcon: ({ color, focused }) => (
            <>
              <TabBarIcon
                name={focused ? "bookmark" : "bookmark-outline"}
                color={color}
              />
              <Text
                className={`mt-1 ${
                  focused ? "text-accent" : "text-gray-500"
                } text-[12px]`}
              >
                Bookings
              </Text>
            </>
          ),
        }}
      />
      <Tabs.Screen
        name="myprofile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <>
              <TabBarIcon
                name={focused ? "person" : "person-outline"}
                color={color}
              />
              <Text
                className={`mt-1 ${
                  focused ? "text-accent" : "text-gray-500"
                } text-[12px]`}
              >
                Profile
              </Text>
            </>
          ),
        }}
      />
    </Tabs>
  );
};

export default RootLayout;

const styles = StyleSheet.create({});
