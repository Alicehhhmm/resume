import Link from "next/link"
import { allPosts } from "contentlayer/generated"
import { compareDesc } from "date-fns"

import { getAllPosts } from "@/lib/posts"
import PostCard from "@/components/PostCard";

export default async function BlogsPage() {
    const posts = await getAllPosts()
    const posts2 = allPosts.sort((a, b) =>
        compareDesc(new Date(a.date), new Date(b.date))
    )
    console.log(posts2, "posts2")

    return (
        <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
            <div className="flex flex-col items-start gap-2">
                <div className="w-full max-w-7xl py-8">
                    <h1 className="mb-8 text-center text-2xl font-black">
                        Next.js + Contentlayer Example
                    </h1>
                    {posts2.map((post2, idx) => (
                      <PostCard key={idx} {...post2} />
                    ))}
                </div>
                111
                <div>
                    <h2 className="text-2xl">Blog Posts</h2>
                    <ul>
                        {posts &&
                            posts.map((post: any) => (
                                <li key={post.slug}>
                                    <Link
                                        href={`/blog/${post.slug}`}
                                        legacyBehavior
                                    >
                                        <a>{post.slug}</a>
                                    </Link>
                                </li>
                            ))}
                    </ul>
                </div>
            </div>
        </section>
    )
}
