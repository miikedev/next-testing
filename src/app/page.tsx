import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link";
import BlogList from "@/components/blog-list";
type PostType = {
  title: string
  description: string
  url: string
  urlToImage: string
  publishedAt: string
  author: string
}

type NewsApiResponse = {
  articles: PostType[]
}
export default async function Home() {
  console.log('env', process.env.NEWS_URL)
  const data = await fetch(`${process.env.NEWS_URL}?category=science&apiKey=${process.env.NEWS_API_KEY}`)
  const posts: NewsApiResponse = await data.json()
  console.log('posts', posts)
  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen p-8 sm:p-16 font-sans bg-white text-black">
      <main className="w-full flex flex-col items-center gap-12">
        <Image width={100} height={100} src="/logo.svg" alt="logo" />
        <h1 className="text-3xl font-bold text-center">Notes from Someone</h1>
        <BlogList />
      </main>

      <footer className="row-start-3 mt-16 text-sm text-center text-gray-500">
        &copy; 2025 @NotesFromSomeone
      </footer>
    </div>

  );
}
