import { View, Text, Image } from "react-native";
import images from "../constants/images";
import React from "react";

interface LayoutGradientProps {
  isFooter?: boolean;
  invert?: boolean;
}

const LayoutGradient: React.FC<LayoutGradientProps> = ({
  isFooter,
  invert,
}) => {
  return (
    <View
      style={
        invert
          ? isFooter
            ? {
                bottom: 0,
                right: 0,
              }
            : {
                top: 0,
                left: 0,
              }
          : isFooter
          ? {
              bottom: 0,
              left: 0,
            }
          : {
              top: 0,
              right: 0,
            }
      }
      className="absolute w-full h-full overflow-hidden -z-10"
    >
      <View
        style={
          invert
            ? isFooter
              ? {
                  position: "absolute",
                  bottom: -800,
                  left: -100,
                  width: 1466,
                  height: 804,
                  transform: "rotate(-150deg)",
                  opacity: 0.85,
                }
              : {
                  position: "absolute",
                  top: -800,
                  right: -100,
                  width: 1466,
                  height: 804,
                  transform: "rotate(-150deg)",
                  opacity: 0.65,
                }
            : isFooter
            ? {
                position: "absolute",
                bottom: -800,
                right: -100,
                width: 1466,
                height: 804,
                transform: "rotate(150deg)",
                opacity: 0.85,
              }
            : {
                position: "absolute",
                top: -800,
                left: -100,
                width: 1466,
                height: 804,
                transform: "rotate(150deg)",
                opacity: 0.65,
              }
        }
      >
        <Image
          source={images.gradientBackdrop}
          className="w-full h-full rounded-full"
        />
      </View>
    </View>
  );
};

export default LayoutGradient;
