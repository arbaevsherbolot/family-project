export type ItemType = {
  name: string;
  path: string;
  icon: string;
};

export const menuItems: ItemType[] = [
  {
    name: "Профиль",
    path: "/profile",
    icon: "UserSvg",
  },
  {
    name: "Мои фото",
    path: "/profile/photos",
    icon: "ImagesSvg",
  },
];
