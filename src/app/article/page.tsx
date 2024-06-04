import { allPosts } from "contentlayer/generated"
import { compareDesc } from "date-fns"

import { getAllPosts } from "@/lib/posts"
import PostCard from "@/components/PostCard";
import BlogCard from "@/components/BlogCard";

export default async function BlogsPage() {
    let allBlog = await getAllPosts()
    const postsAll = allPosts.sort((a, b) =>
        compareDesc(new Date(a.date), new Date(b.date))
    )

    return (
        <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
            <div className="flex flex-col items-start gap-2">
                <div className="w-full max-w-7xl py-8">
                    <h1 className="mb-8 text-center text-2xl font-black">
                        Next.js + Contentlayer Example
                    </h1>
                    {postsAll.map((post, idx) => (
                        <PostCard key={idx} {...post} />
                    ))}
                </div>
                <div className="w-full max-w-7xl py-8">
                    {allBlog && (
                        allBlog.map((post: any, idx) => (
                            <BlogCard key={idx} {...post}  />
                        )))}
                </div>
            </div>
        </section>
    )
}
