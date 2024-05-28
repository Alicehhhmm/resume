import React from "react"

interface BlogLayoutProps {
    children: React.ReactNode
}

export default function BlogLayout({ children }: BlogLayoutProps) {
    return (
        <>
            {children}
            <footer className="mt-12">footer</footer>
        </>
    )
}
