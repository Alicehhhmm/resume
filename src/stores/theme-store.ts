/**
 * @description 主题配置状态
 */
import { create } from "zustand"

export type ThemeState = {
    isDark: boolean
}

export type ThemeActions = {
    setDark: (isDark: boolean) => void
}

export type ThemeStore = ThemeState & ThemeActions

export const defaultInitState: ThemeState = {
    isDark: false,
}

export const useThemeStore = create<ThemeStore>((set) => ({
    ...defaultInitState,
    setDark: (val) =>
        set((state) => ({
            isDark: val,
        })),
}))
