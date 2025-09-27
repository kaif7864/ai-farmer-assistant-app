import { SearchParams } from "expo-router";
import { useSearchParams } from "expo-router/build/hooks";
import React from "react";
import { View, Text } from "react-native";

const DesireCrop = () => {
  const params = useSearchParams();
  const crop = params.get("crop") || "";
  const formData = JSON.parse(decodeURIComponent(params.get("formData") || "{}"));

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Selected Crop: {crop}</Text>
      <Text>Form Data: {JSON.stringify(formData)}</Text>
    </View>
  );
};

export default DesireCrop;
