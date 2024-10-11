import { Redirect, Tabs } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import { TabBarIcon } from "../../components/tabBarIcon";
import { useAuthContext } from "../../contexts/authContextProvider";

const TabLayout = () => {
  const { isLoading, isAuthenticated, user } = useAuthContext();

  if (!isLoading && !isAuthenticated) return <Redirect href="/sign-in" />;

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
                name={focused ? "calendar" : "calendar-outline"}
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
        name="admin/index"
        options={{
          title: "Dashboard",
          href: !(user?.type === "admin") ? null : "/admin",
          tabBarIcon: ({ color, focused }) => (
            <View className="mb-7 items-center justify-center">
              <View className="bg-accent rounded-full w-[55px] h-[55px] flex items-center justify-center mb-5">
                <TabBarIcon
                  name={focused ? "grid" : "grid-outline"}
                  color="#fff"
                />
              </View>
              <Text
                className={`-translate-y-2 ${
                  focused ? "text-accent" : "text-gray-500"
                } text-[12px]`}
              >
                Dashboard
              </Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="admin/create"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="admin/service/index"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="admin/service/create"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="admin/vendor/create"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="admin/vendor/[vendorId]"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
          tabBarIcon: ({ color, focused }) => (
            <>
              <TabBarIcon
                name={focused ? "cart" : "cart-outline"}
                color={color}
              />
              <Text
                className={`mt-1 ${
                  focused ? "text-accent" : "text-gray-500"
                } text-[12px]`}
              >
                Cart
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

export default TabLayout;
