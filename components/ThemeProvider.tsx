"use client";
import {
	createContext,
	useContext,
	useEffect,
	useState,
	useSyncExternalStore,
} from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
	theme: Theme;
	toggleTheme: () => void;
	mounted: boolean;
}

const ThemeContext = createContext<
	ThemeContextType | undefined
>(undefined);

// Helper to get initial theme from localStorage/system
function getInitialTheme(): Theme {
	if (typeof window === "undefined")
		return "light";

	const stored = localStorage.getItem("darkMode");
	if (stored !== null) {
		return stored === "true" ? "dark" : "light";
	}

	return window.matchMedia(
		"(prefers-color-scheme: dark)",
	).matches
		? "dark"
		: "light";
}

export function ThemeProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [theme, setTheme] = useState<Theme>(
		getInitialTheme,
	);

	// Use useSyncExternalStore to track mounted state without causing warnings
	const mounted = useSyncExternalStore(
		() => () => {}, // subscribe (no-op)
		() => true, // getSnapshot (client)
		() => false, // getServerSnapshot (server)
	);

	// Apply theme to document when theme changes
	useEffect(() => {
		const root = document.documentElement;
		root.classList.remove("light", "dark");
		root.classList.add(theme);
	}, [theme]);

	const toggleTheme = () => {
		const newTheme =
			theme === "light" ? "dark" : "light";
		setTheme(newTheme);
		localStorage.setItem(
			"darkMode",
			String(newTheme === "dark"),
		);
	};

	return (
		<ThemeContext.Provider
			value={{ theme, toggleTheme, mounted }}>
			{children}
		</ThemeContext.Provider>
	);
}

export function useTheme() {
	const context = useContext(ThemeContext);
	if (context === undefined) {
		throw new Error(
			"useTheme must be used within ThemeProvider",
		);
	}
	return context;
}
