import { PostList } from "@/components/post-list"

export interface PostListType {}

export default async function IndexPage(params: PostListType) {
    console.log("params@", params)
    return (
        <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
            <div className="flex max-w-[980px] flex-col items-start gap-2">
                111
                <PostList />
            </div>
        </section>
    )
}
