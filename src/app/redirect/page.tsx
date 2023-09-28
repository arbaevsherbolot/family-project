import RedirectClient from "./page.c";

interface props {
  searchParams: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata({ searchParams }: props) {
  return {
    title: `Переадресация на ${searchParams.to || "..."}`,
  };
}

export default async function Redirect() {
  return <RedirectClient />;
}
