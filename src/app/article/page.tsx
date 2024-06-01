import Link from "next/link"

import { getAllPosts } from "@/lib/posts"

export default async function BlogsPage() {
    const posts = await getAllPosts()

    return (
        <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
            <div className="flex max-w-[980px] flex-col items-start gap-2">
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
