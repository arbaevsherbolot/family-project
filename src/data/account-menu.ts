export type ItemType = {
  name: string;
  path: string;
};

export const menuItems: ItemType[] = [
  {
    name: "Профиль",
    path: "/profile",
  },
  {
    name: "Мои фото",
    path: "/profile/photos",
  },
];
