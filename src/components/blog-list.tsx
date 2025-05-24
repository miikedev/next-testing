import React from 'react'
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
const BlogList = async () => {
    console.log('env', process.env.NEWS_URL)
    const data = await fetch(`${process.env.NEWS_URL}?category=science&apiKey=${process.env.NEWS_API_KEY}`)
    const posts: NewsApiResponse = await data.json()
    console.log('posts', posts)
    return (
        <div className="blog-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
            {posts.articles?.slice(0, 10).map((post: PostType, index) => (
                <Card key={index} className="w-full max-w-sm mx-auto shadow-md rounded-lg overflow-hidden">
                    <CardHeader className="p-4">
                        <CardTitle className="text-base font-semibold mb-1">
                            {post.title}
                        </CardTitle>
                        <span className="text-xs text-gray-500">{new Date(post.publishedAt).toLocaleDateString()}</span>
                        <div className="mt-3">
                            <Image
                                className="w-full h-48 object-cover rounded"
                                width={500}
                                height={300}
                                src={
                                    post?.urlToImage ||
                                    "https://images.pexels.com/photos/32058694/pexels-photo-32058694/free-photo-of-cozy-alpine-cabins-in-misty-mountain-landscape.jpeg?auto=compress&cs=tinysrgb&w=800"
                                }
                                alt={post.title}
                            />
                        </div>
                    </CardHeader>

                    <CardContent className="p-4">
                        <p className="text-sm text-gray-700 line-clamp-3">{post.description}</p>
                    </CardContent>
                    <CardContent>
                        <Link href={post?.url} className="text-xs text-blue-400">See more...</Link>
                    </CardContent>

                    <CardFooter className="p-4 pt-0">
                        <p className="text-xs text-gray-600">Author - {post.author || 'unknown'}</p>
                    </CardFooter>
                </Card>
            ))}
        </div>
    )
}

export default BlogList