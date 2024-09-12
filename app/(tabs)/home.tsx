import { Text, View } from "react-native";
import React, { useState } from "react";
import Container from "../../components/container";
import FormField from "../../components/formField";

const Home = () => {
  const [searchQ, setSearchQ] = useState("");

  return (
    <Container>
      <View className="p-5">
        <Text className="text-gray-100 text-2xl font-psemibold mt-3 mb-4">
          Welcome, Abishiek!
        </Text>
        <FormField
          placeholder="Search"
          value={searchQ}
          handleChangeText={(e) => setSearchQ(e)}
        />
      </View>
    </Container>
  );
};

export default Home;
