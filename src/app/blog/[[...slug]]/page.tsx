/**
 * @description 动态路由页面，用于渲染博客文章
 * @scheme1: next-mdx-remote 方案
 */
import { Suspense } from "react"
import { MDXRemote } from "next-mdx-remote/rsc"
import rehypeKatex from "rehype-katex"
import rehypePrettyCode from "rehype-pretty-code"
import remarkMath from "remark-math"

import { fontSans } from "@/lib/fonts"
import { getAllPosts, getPostBySlug } from "@/lib/posts"
import { cn } from "@/lib/utils"

interface PostType {
    meta: {
        title: string
        date: string
    }
    content: string
}

export default async function PostPage({ params }: any) {
    const { slug } = params
    const post: PostType = await getPostBySlug(slug.join("/"))
    console.log("post detail pages:", post)
    return (
        <div className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
            <article>
                <h1
                    className={cn(
                        fontSans.className,
                        "text-[32px] font-black leading-[36px] text-[--title]"
                    )}
                >
                    {post.meta.title}
                </h1>
                <p className="mb-6 mt-2 text-[13px] text-gray-700 dark:text-gray-300">
                    {new Date(post.meta.date).toLocaleDateString("cn", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                    })}
                </p>
                <div className="">
                    <Suspense fallback={<>Loading...</>}>
                        <MDXRemote
                            lazy
                            source={post.content || "# 默认内容"}
                            options={{
                                parseFrontmatter: true,
                                mdxOptions: {
                                    remarkPlugins: [remarkMath],
                                    rehypePlugins: [
                                        rehypeKatex,
                                        [
                                            rehypePrettyCode,
                                            {
                                                theme: "material-theme-palenight",
                                            },
                                        ],
                                    ],
                                },
                            }}
                            components={{}}
                        />
                    </Suspense>
                </div>
            </article>
        </div>
    )
}

export async function generateStaticParams() {
    const posts = await getAllPosts()
    return posts.map((post: any) => ({
        slug: post.slug.split("/"),
    }))
}
