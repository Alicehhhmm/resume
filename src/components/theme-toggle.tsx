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
