export type PostType = {
  id: number;
  cover: string;
  date: string;
  time: string;
  title: string;
  description: string;
  tags: string[];
  author: {
    logo: string;
    firstName: string;
    lastName: string;
  };
};

export const posts: PostType[] = [
  {
    id: 1,
    cover:
      "https://res.cloudinary.com/dbtcocjdk/image/fetch/f_auto,dpr_auto,w_auto/https://storage.jukeboxprint.com/s/images/Jukebox-Influential-Fonts-00-Header-Collage-b.jpg",
    date: "15 September 2023",
    time: "13 minutes",
    title: "My Family",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero est explicabo aspernatur ipsam, iure fugiat nesciunt necessitatibus officia dolorem vel officiis unde rem quis sint quaerat! Unde facilis tempore corporis.",
    tags: ["FAMILY"],
    author: {
      logo: `${process.env.NEXT_PUBLIC_API_URL}/sher.png`,
      firstName: "Шерболот",
      lastName: "Арбаев",
    },
  },
];