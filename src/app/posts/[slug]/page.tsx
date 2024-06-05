import {notFound} from "next/navigation"
import {allPosts, Post} from "contentlayer/generated"
import { format, parseISO } from "date-fns"
import {Metadata} from "next"
import MDX from "@/components/mdx-components"
import {cn} from "@/lib/utils";
import {fontSans} from "@/lib/fonts";

interface PostPageProps {
    params: {
        slug: string
    }
}

interface CustomPost extends Post {
    description?: string;
}

/**
 * 获取指定路径文件内容
 * @param slug 动态路由路径
 */
async function analysisPageParams({params}: PostPageProps) {
    const doc = allPosts.find((doc: CustomPost) => doc._raw.flattenedPath === params.slug)

    if (!doc) {
        return null
    }

    return doc
}

/**
 * 配置生成页面的元数据
 * @param params
 * @return Metadata
 */
export async function generateMetadata({params}: PostPageProps): Promise<Metadata> {
    const doc: Metadata | null = await analysisPageParams({params})

    if (!doc) {
        return {}
    }

    return {
        title: doc.title,
        description: doc?.description,
    }
}

/**
 * 生成动态路由的参数数组
 * @return [slug] 路由数组
 */
export async function generateStaticParams(): Promise<PostPageProps["params"][]> {
    return allPosts.map(post => ({slug: post._raw.flattenedPath}))
}

/**
 * posts 详情页面
 * @param params
 * @constructor
 */
export default async function PostPage({params}: PostPageProps) {
    const post = await analysisPageParams({params})
    if (!post) return notFound()

    return (
        <article className="mx-auto max-w-xl py-8">
            <div className="mb-8 ">
                <h1 className={cn(
                    fontSans.className,
                    "text-[32px] font-black leading-[36px] text-[--title]"
                )}>
                    {post.title}
                </h1>
                <time dateTime={post.date} className="mb-1 text-gl text-gray-600">
                    {format(new Date(post.date), "LLLL d, yyyy")}
                </time>
            </div>
            {post.body?.code && <MDX code={post.body.code}/>}
        </article>
    )
}
