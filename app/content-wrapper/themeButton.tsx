import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { LucideIcon, Moon, Sun, SunMoon } from "lucide-react";
import { useTheme } from "next-themes";
import { createElement, ReactNode, useCallback, useEffect, useMemo, useState } from "react";

// Button to switch themes
export default function ThemeButton() {
    const [initialTheme, setInitialTheme] = useState<string | undefined>();
    const [, setHovered] = useState(false);
    const { theme, setTheme } = useTheme();

    const themeMap: {[key: string]: LucideIcon} = {
        "system": SunMoon,
        "light": Sun,
        "dark": Moon,
    }

    function generateIconTags() {
        const iconTags = [];
        for (const theme of Object.keys(themeMap)) {
            iconTags.push(<MenuItem key={`theme${theme}`} className="bg-background-alt whitespace-pre text-text" value={theme}>{createElement(themeMap[theme], {className: "text-text"})} {theme.substring(0, 1).toUpperCase() + theme.substring(1)}</MenuItem>)
        } 

        return iconTags
    }

    useEffect(() => {
        if (initialTheme !== undefined) {
            return;
        }
        setInitialTheme(theme);
    }, [initialTheme, theme])

    return initialTheme === undefined ? null : (
        <FormControl sx={{
            color: "transparent",
            "& .MuiInputLabel-root": {
                color: "transparent"
            },
            "&:hover .MuiInputLabel-root": {
                color: "var(--logo-hover)"
            },
            ".MuiInputLabel-root.Mui-focused": {
                color: "var(--logo-active)"
            },
        }} variant="outlined" fullWidth>
            <InputLabel>Theme</InputLabel>
            <Select
                label="Theme"
                defaultValue={initialTheme}
                renderValue={(value) => {
                    return createElement(themeMap[value], {suppressHydrationWarning: true})
                }}
                className="bg-background text-text h-12"
                MenuProps={{
                    slotProps: {
                        paper: {
                            className: "bg-background-alt"
                        }
                    }
                }}
                onChange={(event) => setTheme(event.target.value.toLowerCase())}
                sx={{
                    "& .MuiSelect-icon": {
                        color: "var(--text-title)"
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "transparent"
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "var(--logo-hover)"
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "var(--logo-active)"
                    }
                }}
            >
                {generateIconTags()}
            </Select>
        </FormControl>
    );

}