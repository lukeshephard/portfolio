import { BookUser, Ghost, LucideIcon, Moon, Sun, SunMoon } from "lucide-react";
import themeGroups from "./themeGroups.json";

export type ThemeGroup = {
    name: string,
    themes: string[];
}

export type Theme = {
    name: string;
    icon: LucideIcon;
}

// List of all themes
export const themes: {[name: string]: Theme} = {
    "system": {
        name: "System",
        icon: SunMoon,
    },
    "light": {
        name: "Light",
        icon: Sun,
    },
    "dark": {
        name: "Dark",
        icon: Moon,
    },
    "lukeShephard": {
        name: "Luke Shephard",
        icon: BookUser,
    },
    "halloween": {
        name: "Halloween",
        icon: Ghost,
    }
}

export const DEFAULT_THEME = "lukeShephard";

export function getSeasonalTheme(): string | null {
    return "halloween";
}

export function createInventory() {
    return new Set(["system", "light", "dark", "lukeShephard"])
};
// An array of groups of themes
export default themeGroups as ThemeGroup[];