export default function BlogsLayout({ children }: any) {
    return (
        <div className="border-b">
            <div className="flex ">
                <aside className="flex-none w-1/6 fixed top-14 gap-6 pl-4 pr-4 pb-8 pt-6 md:py-10 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] shrink-0 md:sticky md:block">
                    BlogsLayout
                </aside>
                <section className="grow">{children}</section>
                <aside className="flex-none w-[220px] h-[300px] bg-soft-ws top-14 gap-6 pb-8 pt-6 md:py-10 z-30 right-10 ">
                    <div className="h-full bg-white shadow-md rounded-md">
                        <h1 className="h-10 bg-gray-50 border-b ">右侧标题</h1>
                        <h2>标题2</h2>
                    </div>
                </aside>
            </div>
        </div>
    )
}
