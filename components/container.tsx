import { StatusBar } from "expo-status-bar";
import React from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <SafeAreaView className="bg-primary flex-1">
      <ScrollView>{children}</ScrollView>

      <StatusBar backgroundColor="transparent" style="light" />
    </SafeAreaView>
  );
};

export default Container;
