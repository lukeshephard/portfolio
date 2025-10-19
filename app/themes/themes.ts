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
    const date = new Date();

    // Halloween 15-31 October inclusive
    if (date.getUTCMonth() === 9) {
        const day = date.getUTCDate();
        if (day >= 15) {
            return "halloween"
        }
    }

    return null;
}

// Starter inventory - WIP
export function createInventory() {
    return ["lukeShephard", "system", "light", "dark", "halloween"];
};

export default themes;