import React from "react"
import Link from "next/link"

export default function RosFooter() {
    return (
        <footer className="border-t border-slate-300">
            <div className="container border-slate-200/5 p-4 flex flex-wrap justify-between">
                <div className="pt-1 pb-8 sm:flex dark:border-slate-200/5">
                    <Link href="/" className="mb-6 sm:mb-0 sm:flex">
                        {new Date().getFullYear()} &copy; Norush
                    </Link>
                </div>
            </div>
        </footer>
    )
}
