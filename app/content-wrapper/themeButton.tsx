import { LucideIcon, Moon, Palette, Sun, SunMoon } from "lucide-react";
import { useTheme } from "next-themes";
import { createElement, ReactNode, useCallback, useEffect, useMemo, useState } from "react";

// Button to switch themes
export default function ThemeButton() {
    const [hovered, setHovered] = useState(false);
    const { theme, setTheme } = useTheme();

    const themeList = useMemo(() => {
        return ["system", "light", "dark"]
    }, [])
    const iconList = useMemo(() => {
        return [SunMoon, Sun, Moon]
    }, [])

    const createThemeIcon = useCallback((icon: LucideIcon) => {
        return createElement(hovered ? icon : Palette, { className: "flex m-auto size-9 cursor-pointer hover:text-link-hover active:text-link-active", onClick: () => setTheme(themeList[(themeList.indexOf(theme? theme : "system") + 1) % themeList.length]), onMouseEnter: () => setHovered(true), onMouseLeave: () => setHovered(false) });
    }, [setTheme, theme, themeList, hovered]) 

    const [themeIcon, setThemeIcon] = useState<ReactNode>(createThemeIcon(SunMoon));

    // Show theme icon in navbar depending on theme
    useEffect(() => {
        // Theme validation, defaults to system
        if (theme == undefined || !themeList.includes(theme)) {
            setTheme("system");
            return;
        }

        setThemeIcon(createThemeIcon(iconList[themeList.indexOf(theme)]))
    }, [theme, themeList, iconList, setTheme, createThemeIcon])

    return themeIcon;

}