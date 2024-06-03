import {useMDXComponent} from "next-contentlayer/hooks"
import React, {FC} from "react";
import {cn} from "@/lib/utils";
import Image from "next/image"
import {Button} from "@/components/ui/button";

interface MdxProps {
    code: string
}

const components = {
    h1: ({className, ...props}: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h1
            className={cn(
                "font-heading mt-2 scroll-m-20 text-4xl font-bold",
                className
            )}
            {...props}
        />
    ),
    h2: ({className, ...props}: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h2
            className={cn(
                "font-heading mt-12 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0",
                className
            )}
            {...props}
        />
    ),
    h3: ({className, ...props}: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h3
            className={cn(
                "font-heading mt-8 scroll-m-20 text-xl font-semibold tracking-tight",
                className
            )}
            {...props}
        />
    ),
    h4: ({className, ...props}: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h4
            className={cn(
                "font-heading mt-8 scroll-m-20 text-lg font-semibold tracking-tight",
                className
            )}
            {...props}
        />
    ),
    h5: ({className, ...props}: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h5
            className={cn(
                "mt-8 scroll-m-20 text-lg font-semibold tracking-tight",
                className
            )}
            {...props}
        />
    ),
    h6: ({className, ...props}: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h6
            className={cn(
                "mt-8 scroll-m-20 text-base font-semibold tracking-tight",
                className
            )}
            {...props}
        />
    ),
    a: ({className, ...props}: React.HTMLAttributes<HTMLAnchorElement>) => (
        <a
            className={cn("font-medium underline underline-offset-4", className)}
            {...props}
        />
    ),

    code: ({className, ...props}: React.HTMLAttributes<HTMLElement>) => (
        <code
            className={cn(
                "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm",
                className
            )}
            {...props}
        />
    ),
    Image,
    Button,
}

export default function MDX({code}: MdxProps) {
    const Component = useMDXComponent(code, {
        style: 'default',
    })

    return (
        <div className="mdx">
            <Component components={components}/>
        </div>
    )
}
