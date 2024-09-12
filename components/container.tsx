import { StatusBar } from "expo-status-bar";
import React from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <SafeAreaView className="bg-primary h-full w-full">
      <ScrollView contentContainerStyle={{ height: "100%", width: "100%" }}>
        {children}
      </ScrollView>

      <StatusBar backgroundColor="#000000" style="inverted" />
    </SafeAreaView>
  );
};

export default Container;
