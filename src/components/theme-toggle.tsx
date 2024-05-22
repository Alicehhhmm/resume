"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function ThemeToggle() {
    const { setTheme, theme } = useTheme()
    const onHandleChange = () => {
        setTheme(theme === "light" ? "dark" : "light")
    }

    const toggleDark = (event: MouseEvent) => {
        if (!document.startViewTransition) return

        const isDark: boolean = theme === "dark"

        // 获取当前鼠标位置
        const { clientX: x, clientY: y } = event
        const endRadius = Math.hypot(
            Math.max(x, innerWidth - x),
            Math.max(y, innerHeight - y)
        )

        console.log("获取当前鼠标位置", endRadius)

        // 获取transition API 实例
        const transition = document.startViewTransition(() => {
            setTheme(theme === "light" ? "dark" : "light")
        })

        transition.ready.then(() => {
            console.log("transition ready")
            const clipPath = [
                `circle(0px at ${x}px ${y}px)`,
                `circle(${endRadius}px at ${x}px ${y}px)`,
            ]

            // 自定义动画
            document.documentElement.animate(
                {
                    clipPath: isDark ? [...clipPath].reverse() : clipPath,
                },
                {
                    duration: 400,
                    easing: "ease-out",
                    pseudoElement: isDark
                        ? "::view-transition-old(root)"
                        : "::view-transition-new(root)",
                }
            )
        })
    }

    return (
        <Button variant="ghost" asChild size="icon" onClick={onHandleChange}>
            {/*{theme === "light" ? (*/}
            {/*    <Sun className="h-[1.5rem] w-[1.3rem] dark:hidden" />*/}
            {/*) : (*/}
            {/*    <Moon className="h-[1.5rem] w-[1.3rem] dark:hidden" />*/}
            {/*)}*/}
            <Sun className="h-[1.5rem] w-[1.3rem] dark:hidden" />
        </Button>
    )
}
