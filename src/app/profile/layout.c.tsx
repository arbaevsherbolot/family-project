"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ItemType, menuItems } from "../../data/account-menu";
import { ImagesSvg, UserSvg } from "../../assets/svg";
import styles from "./Profile.module.scss";

type Icons = {
  name: string;
  icon: React.ReactElement;
};

interface props {
  children: React.ReactNode;
}

export default function ProfileLayoutClient({ children }: props) {
  const pathname = usePathname();

  const icons: Icons[] = [
    {
      name: "ImagesSvg",
      icon: <ImagesSvg className={styles.icon} />,
    },
    {
      name: "UserSvg",
      icon: <UserSvg className={styles.icon} />,
    },
  ];

  const icon = (item: ItemType) => {
    const foundIcon = icons.find((icon) => item.icon === icon.name);
    return foundIcon ? foundIcon.icon : null;
  };

  return (
    <>
      <div className={styles.layout_wrapper}>
        <div className={styles.sidebar}>
          <div className={styles.links}>
            {menuItems.map((link, i) => (
              <Link
                key={i}
                href={link.path}
                className={
                  pathname === link.path
                    ? `${styles.link} ${styles.active}`
                    : styles.link
                }>
                {icon(link)}
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        {children}
      </div>
    </>
  );
}
