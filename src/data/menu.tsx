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
    name: "Настройки",
  },
  {
    icon: (
      <CopySvg
        style={{
          fontSize: "1rem",
        }}
      />
    ),
    name: "Копировать текст",
  },
  {
    icon: (
      <ShareSvg
        style={{
          fontSize: "1rem",
        }}
      />
    ),
    name: "Поделиться",
  },
];
