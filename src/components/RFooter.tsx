import React from "react"
import Link from "next/link"

export default function RosFooter() {
    return (
        <footer className="bg-gray-50 border-t border-slate-100">
            <div className="container border-slate-200/5 p-4 flex flex-wrap justify-between">
                <div className="pt-1 pb-8 sm:flex dark:border-slate-200/5">
                    <Link
                        href="/"
                        className="italic text-sm text-slate-500 mb-6 sm:mb-0 sm:flex"
                    >
                        <span className="">{new Date().getFullYear()}</span>
                        <span className="not-italic">&copy;</span>
                        <span className="">Norush</span>
                    </Link>
                </div>
            </div>
        </footer>
    )
}
