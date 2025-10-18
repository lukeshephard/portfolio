"use client"

import { Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select } from "@mui/material";
import { Palette } from "lucide-react";
import { useTheme } from "next-themes";
import { createElement, useEffect, useState } from "react";
import themeGroups, { createInventory, DEFAULT_THEME, getSeasonalTheme, themes } from "./themes";
import { useLocalStorage } from 'usehooks-ts'
import getDefaultThemePrefs, { createThemePrefs, ThemePrefs } from "./themePrefs";

// Button to switch themes
export default function ThemeButton() {
    const [ mounted, setMounted] = useState<boolean>(false);
    const { setTheme } = useTheme();
    const [ themePrefs, setThemePrefs ] = useLocalStorage<ThemePrefs>("themePrefs", getDefaultThemePrefs());

    // WIP for later versions, currently used for seasonal only
    const inventory = createInventory();

    // Turns icons into items for select
    function generateIconTags() {
        const iconTags = [];
        for (const group of themeGroups) {
            for (const themeName of group.themes) {
                const currentTheme = themes[themeName];
                iconTags.push(<MenuItem key={`theme${themeName}`} className={`bg-background flex gap-1 ${themeName === themePrefs.theme ? "text-link" : "text-text-title"}`} value={themeName}>{createElement(currentTheme.icon, {className: themeName === themePrefs.theme ? "text-link" : "text-text-title"})} {currentTheme.name}</MenuItem>)
            }
        } 

        return iconTags
    }

    useEffect(() => {
        setMounted(true);
    }, [])
    
    useEffect(() => {
        const seasonalTheme = getSeasonalTheme();
        if (seasonalTheme && themePrefs.enableSeasonalThemes) {
            setTheme(seasonalTheme)
        } else {
            setTheme(themePrefs.theme)
        }
    }, [themePrefs, setTheme])

    // Get initial theme for the icon
    useEffect(() => {
        if (themePrefs.theme !== undefined && !inventory.has(themePrefs.theme)) {
            console.warn(`Cannot find theme "${themePrefs.theme}"! Reverting to default...`)
            setThemePrefs(createThemePrefs(DEFAULT_THEME, themePrefs.enableSeasonalThemes));
            return;
        }
    }, [inventory, setThemePrefs, themePrefs])


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
                value={themePrefs.theme}
                renderValue={() => <Palette/>}
                className="text-text-title h-12 w-18 md:w-auto mx-auto"
                
                MenuProps={{
                    slotProps: {
                        paper: {
                            className: "bg-background"
                        }
                    }
                }}
                onChange={(event) => setThemePrefs(createThemePrefs(event.target.value, themePrefs.enableSeasonalThemes))}
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
                <FormControlLabel control={<Checkbox className="text-logo" checked={themePrefs.enableSeasonalThemes} onChange={() => setThemePrefs(createThemePrefs(themePrefs.theme, !themePrefs.enableSeasonalThemes))}/>} className="text-text-title pl-1 pr-4" label="Seasonal Theme Override" labelPlacement="start"/>
                {generateIconTags()}
            </Select>
        </FormControl>
    );

}
