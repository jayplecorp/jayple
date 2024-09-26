import React from "react";
import {
  Image,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import { Category } from "../../types";
import { Ionicons } from "@expo/vector-icons";

interface CategoryCardProps {
  category: Category;
  isSalonPage?: boolean;
  styles?: string;
  separators?: {
    highlight: () => void;
    unhighlight: () => void;
    updateProps: (select: "leading" | "trailing", newProps: any) => void;
  };
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  isSalonPage,
  styles,
  separators,
}) => {
  return (
    <TouchableHighlight
      key={category.id}
      onShowUnderlay={separators?.highlight ?? null}
      onHideUnderlay={separators?.unhighlight ?? null}
    >
      <View className={`bg-secondary rounded-md w-[180px] mb-4 ${styles}`}>
        <Image
          source={{
            uri: category.imageURL,
          }}
          className="h-[140px] w-full rounded-md"
        />
        <View className="p-3">
          <Text className="text-white font-semibold text-xl">
            {category.name}
          </Text>

          {isSalonPage && (
            <View className="flex flex-row items-center justify-between mt-2">
              <Text className="text-accent text-xl font-psemibold">
                ₹{category.price}
              </Text>
              <TouchableOpacity
                className="bg-accent w-[33px] h-[33px] flex items-center justify-center rounded-full border border-white/20"
                onPress={(e) => {
                  e.stopPropagation();
                }}
              >
                <Ionicons name="add" color="#ffffff" size={30} />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </TouchableHighlight>
  );
};

export default CategoryCard;
