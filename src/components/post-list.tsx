import React from "react"
import { createRegistry } from "@/scripts/build-registry"
import { MDXRemote } from "next-mdx-remote/rsc"
import remarkMath from "remark-math"

export async function PostList() {
    const postList = await createRegistry()
    console.log("--post--", postList)

    return (
        <div>
            <h1 className="text-2xl">PostList</h1>
            {postList &&
                postList.map((el) => (
                    <div className="text-gl">
                        <MDXRemote
                            source={el.content || ""}
                            options={{
                                parseFrontmatter: true,
                                mdxOptions: {
                                    remarkPlugins: [remarkMath],
                                },
                            }}
                        />
                    </div>
                ))}
        </div>
    )
}
