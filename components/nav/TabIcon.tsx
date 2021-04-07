import React from "react";
import { Ionicons } from "@expo/vector-icons";

interface ITabIcon {
  iconName: any;
  color: string;
  focused: boolean;
}

const TabIcon: React.FC<ITabIcon> = ({ iconName, color, focused }) => {
  return (
    <Ionicons
      name={focused ? iconName : `${iconName}-outline`}
      color={color}
      size={focused ? 26 : 22}
    />
  );
};

export default TabIcon;
