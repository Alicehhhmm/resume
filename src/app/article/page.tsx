import Link from "next/link"
import { allPosts, Post } from "contentlayer/generated"
import { compareDesc, format, parseISO } from "date-fns"

import { getAllPosts } from "@/lib/posts"

function PostCard(post: Post) {
    return (
        <div className="mb-8">
            <h2 className="mb-1 text-xl">
                <Link
                    href={post.url}
                    className="text-blue-700 hover:text-blue-900 dark:text-blue-400"
                >
                    {post.title}
                </Link>
            </h2>
            <time
                dateTime={post.date}
                className="mb-2 block text-xs text-gray-600"
            >
                {format(parseISO(post.date), "LLLL d, yyyy")}
            </time>
            <div
                className="text-sm [&>*]:mb-3 [&>*:last-child]:mb-0"
                dangerouslySetInnerHTML={{ __html: post.body.html }}
            />
        </div>
    )
}

export default async function BlogsPage() {
    const posts = await getAllPosts()
    const posts2 = allPosts.sort((a, b) =>
        compareDesc(new Date(a.date), new Date(b.date))
    )
    console.log(allPosts, "allPosts")
    console.log(posts2, "posts2")

    return (
        <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
            <div className="flex max-w-[980px] flex-col items-start gap-2">
                <div className="mx-auto max-w-xl py-8">
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
