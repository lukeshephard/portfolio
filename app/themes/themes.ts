import { BookUser, Ghost, LucideIcon, Moon, RotateCcw, Sun, SunMoon } from "lucide-react";

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
        name: "System (Light/Dark)",
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
    "throwback": {
        name: "Throwback",
        icon: RotateCcw
    },
    "halloween": {
        name: "Halloween",
        icon: Ghost,
    }
}

export const DEFAULT_THEME = "lukeShephard";

// Seasonal theme detection goes here
export function getSeasonalTheme(): string | null {
    return "halloween";
}

// Starter inventory - WIP
export function createInventory() {
    return ["lukeShephard", "system", "light", "dark", "halloween"];
};

export default themes;