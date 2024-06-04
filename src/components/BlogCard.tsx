import Link from "next/link"
import {format} from "date-fns"

export function BlogCard(post: any) {
    return (
        <div className="mb-4 p-2 hover:bg-slate-100 rounded-md">
            <Link
                href={`/blog/${post.url}`}
                passHref legacyBehavior
                className="text-blue-700 hover:text-blue-900 dark:text-blue-400"
            >
                <div className="flex-nowrap flex justify-center items-center cursor-pointer">
                    <h2 className="text-md text-neutral-800">{post.title}</h2>
                    <span className="grow mx-4 h-1 border-b border-dashed border-line"/>
                    <time dateTime={post.date} className="block text-sm text-[#8a8f8d]">
                        <a title={format(new Date(post.date), "LLLL d, yyyy, HH:mm a ").concat("CST + 8")}>
                            {format(new Date(post.date), "yyyy-MM-dd HH:mm")}
                        </a>
                    </time>
                </div>
            </Link>
        </div>
    )
}

export default BlogCard
