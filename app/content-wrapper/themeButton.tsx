import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { BookUser, Ghost, LucideIcon, Moon, Palette, Sun, SunMoon } from "lucide-react";
import { useTheme } from "next-themes";
import { createElement, useEffect, useMemo, useState } from "react";

// Button to switch themes
export default function ThemeButton() {
    const [initialTheme, setInitialTheme] = useState<string | undefined>();
    const { theme, setTheme } = useTheme();

    const themeMap: {[theme: string]: {name: string, icon: LucideIcon}} = useMemo(() => {
        return {
            "system": {
                name: "System",
                icon: SunMoon
            },
            "light": {
                name: "Light",
                icon: Sun
            },
            "dark": {
                name: "Dark",
                icon: Moon
            },
            "luke_shephard": {
                name: "Luke Shephard",
                icon: BookUser
            },
            "EXPERIMENTAL_SEASONAL": {
                name: "Seasonal (Experimental)",
                icon: Ghost
            },
        }
    }, [])

    function generateIconTags() {
        const iconTags = [];
        for (const themeName of Object.keys(themeMap)) {
            iconTags.push(<MenuItem key={`theme${themeName}`} className={`bg-background whitespace-pre ${themeName === theme ? "text-link" : "text-text-title"}`} value={themeName}>{createElement(themeMap[themeName].icon, {className: themeName === theme ? "text-link" : "text-text-title"})} {themeMap[themeName].name}</MenuItem>)
        } 

        return iconTags
    }

    useEffect(() => {
        if (initialTheme !== undefined) {
            return;
        } else if (theme !== undefined && themeMap[theme] === undefined) {
            console.log(`Cannot find theme "${theme}"! Defaulting to "system"...`)
            setTheme("system");
            return;
        } else if (theme === undefined) {
            setInitialTheme("system")
            return;
        }
        setInitialTheme(theme);
    }, [setTheme, themeMap, initialTheme, theme])

    return initialTheme === undefined ? <button className="w-12"><Palette className="text-text-title h-12"/></button> : (
        <FormControl sx={{
            color: "transparent",
            "& .MuiInputLabel-root": {
                color: "transparent"
            },
            "&:hover .MuiInputLabel-root": {
                color: "var(--link-hover)"
            },
            ".MuiInputLabel-root.Mui-focused": {
                color: "var(--link-active)"
            },
        }} variant="outlined" fullWidth>
            <InputLabel>Theme</InputLabel>
            <Select
                label="Theme"
                defaultValue={initialTheme}
                renderValue={() => <Palette/>}
                className="text-text-title h-12"
                MenuProps={{
                    slotProps: {
                        paper: {
                            className: "bg-background"
                        }
                    }
                }}
                onChange={(event) => setTheme(event.target.value)}
                sx={{
                    "& .MuiSelect-icon": {
                        color: "var(--text-title)"
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "transparent"
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "var(--link-hover)"
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "var(--link-active)"
                    }
                }}
            >
                {generateIconTags()}
            </Select>
        </FormControl>
    );

}