/**
 * @description 动态路由页面，用于渲染博客文章
 */
import { MDXRemote } from "next-mdx-remote/rsc"

import { getAllPosts, getPostBySlug } from "@/lib/posts"

export default async function PostPage({ params }) {
    const { slug } = params
    const post = await getPostBySlug(slug.join("/"))

    return (
        <div>
            <h1>{post.meta.title}</h1>
            <MDXRemote {...post.content} />
        </div>
    )
}

export async function generateStaticParams() {
    const posts = await getAllPosts()
    return posts.map((post) => ({
        slug: post.slug.split("/"),
    }))
}
