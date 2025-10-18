"use client"

import { Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { Check, Palette } from "lucide-react";
import { useTheme } from "next-themes";
import { createElement, Dispatch, SetStateAction, useEffect, useState } from "react";
import themeGroups, { createInventory, DEFAULT_THEME, getSeasonalTheme, themes } from "./themes";

// Button to switch themes
export default function ThemeButton({setForcedTheme}: {setForcedTheme: Dispatch<SetStateAction<string | undefined>>}) {
    const [ mounted, setMounted] = useState<boolean>(false);
    const { theme, setTheme } = useTheme();
    const [ enableSeasonalThemes, setEnableSeasonalThemes ] = useState(true);

    // WIP for later versions, currently used for seasonal only
    const inventory = createInventory();

    // Turns icons into items for select
    function generateIconTags() {
        const iconTags = [];
        for (const group of themeGroups) {
            for (const themeName of group.themes) {
                const currentTheme = themes[themeName];
                iconTags.push(<MenuItem key={`theme${themeName}`} className={`bg-background flex gap-1 ${themeName === theme ? "text-link" : "text-text-title"}`} value={themeName}>{createElement(currentTheme.icon, {className: themeName === theme ? "text-link" : "text-text-title"})} {currentTheme.name}</MenuItem>)
            }
        } 

        return iconTags
    }

    useEffect(() => {
        setMounted(true);
    }, [])


    // Get initial theme for the icon
    useEffect(() => {
        const seasonalTheme = getSeasonalTheme();
        if (theme !== undefined && !inventory.has(theme)) {
            console.warn(`Cannot find theme "${theme}"! Reverting to default...`)
            setTheme(DEFAULT_THEME);
            return;
        } else if (enableSeasonalThemes && seasonalTheme) {
            setForcedTheme(seasonalTheme);
        } else {
            setForcedTheme(undefined)
        }
    }, [setTheme, setForcedTheme, theme, inventory, enableSeasonalThemes])


    if (!mounted) {
        return null;
    }

    // Return dummy button until theme is loaded
    return (
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
            <InputLabel id="theme" className="ml-[1.1rem] md:m-0">Theme</InputLabel>
            <Select
                label="Theme"
                labelId="theme"
                value={theme}
                renderValue={() => <Palette/>}
                className="text-text-title h-12 w-18 md:w-auto mx-auto"
                
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
                <FormControlLabel control={<Checkbox className="text-logo" checked={enableSeasonalThemes} onChange={() => setEnableSeasonalThemes(!enableSeasonalThemes)}/>} className="text-text-title pl-1 pr-4" label="Seasonal Theme Override" labelPlacement="start"/>
                {generateIconTags()}
            </Select>
        </FormControl>
    );

}