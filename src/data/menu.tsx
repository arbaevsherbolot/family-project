import React from "react";
import { SettingsSvg, CopySvg, ShareSvg } from "../assets/svg";

export type ItemType = {
  icon: React.ReactElement;
  name: string;
};

export const menuItems: ItemType[] = [
  {
    icon: (
      <SettingsSvg
        style={{
          fontSize: "1rem",
        }}
      />
    ),
    name: "Settings",
  },
  {
    icon: (
      <CopySvg
        style={{
          fontSize: "1rem",
        }}
      />
    ),
    name: "Copy",
  },
  {
    icon: (
      <ShareSvg
        style={{
          fontSize: "1rem",
        }}
      />
    ),
    name: "Share",
  },
];
