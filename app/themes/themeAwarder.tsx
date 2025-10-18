// WIP not for stable
'use client'

import { useLocalStorage } from "usehooks-ts"
import themes, { createInventory, getSeasonalTheme } from "./themes"
import { useEffect, useState } from "react"
import getDefaultThemePrefs, { createThemePrefs, ThemePrefs } from "./themePrefs";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText } from "@mui/material";

// Adds listener to element, rewards theme when clicked
export default function ThemeAwarder({theme, element} : {theme: string, element: HTMLElement}) {
    const [themeInventory, setThemeInventory] = useLocalStorage<string[]>("themeInventory", createInventory());
    const [, setThemePrefs] = useLocalStorage<ThemePrefs>("themePrefs", getDefaultThemePrefs());

    const [modalOpen, setModalOpen] = useState(false);

    // Switches theme to this one and closes modal
    function applyTheme() {
        const themePrefs = createThemePrefs(theme, true);
        if (getSeasonalTheme()) {
            themePrefs.enableSeasonalThemes = false;
        }
        setThemePrefs(themePrefs);
        setModalOpen(false);
    }

    useEffect(() => {
        // Adds theme to user's inventory
        function addTheme(newTheme: string) {
            setModalOpen(true);
            if (themeInventory.includes(newTheme)) return themeInventory;

            const newThemeInventory = [...themeInventory]
            newThemeInventory.push(newTheme);

            setThemeInventory(newThemeInventory);
        }

        element.onclick = () => addTheme(theme);
    }, [theme, element, setThemeInventory, themeInventory])

    // Dialog box when unlocked
    return (
        <Dialog
            open={modalOpen}
            onClose={() => setModalOpen(false)}
        >
            <DialogContent className="bg-background-alt border-red-400">
                <DialogContentText className="text-text-title text-4xl" component={"h2"}>
                    {themes[theme].name} theme unlocked!
                </DialogContentText>
                <br/>
                <DialogContentText className="text-text">
                    Apply theme now?
                </DialogContentText>
            </DialogContent>
            <DialogActions  className="bg-background-alt">
                <Button onClick={() => setModalOpen(false)} className="text-link hover:text-link-hover active:text-link-active">No</Button>
                <Button onClick={() => applyTheme()} className="text-link hover:text-link-hover active:text-link-active" autoFocus>
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    )
}