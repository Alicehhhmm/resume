/**
 * @description 动态路由页面，用于渲染博客文章
 */
import { MDXRemote } from "next-mdx-remote/rsc"
import remarkMath from "remark-math"

import { getAllPosts, getPostBySlug } from "@/lib/posts"

export default async function PostPage({ params }: any) {
    const { slug } = params
    const post = await getPostBySlug(slug.join("/"))
    console.log("post detail pages:", post)
    return (
        <div>
            <h1>{post.meta.title}</h1>
            <h1>{post.meta.date}</h1>
            <MDXRemote
                {...post.content}
                options={{
                    parseFrontmatter: true,
                    remarkPlugins: [remarkMath],
                }}
            />
        </div>
    )
}

export async function generateStaticParams() {
    const posts = await getAllPosts()
    return posts.map((post: any) => ({
        slug: post.slug.split("/"),
    }))
}
