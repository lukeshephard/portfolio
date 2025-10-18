import { DEFAULT_THEME } from "./themes";

export type ThemePrefs = {
    theme: string;
    enableSeasonalThemes: boolean;
}


export function createThemePrefs(theme: string, enableSeasonalThemes: boolean): ThemePrefs {
    return {
        theme: theme,
        enableSeasonalThemes: enableSeasonalThemes
    } 
}

export default function getDefaultThemePrefs(): ThemePrefs {
    return {
        theme: DEFAULT_THEME,
        enableSeasonalThemes: true
    }
}