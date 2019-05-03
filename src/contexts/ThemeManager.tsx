import React, { createContext, ReactNode, useEffect, useState } from "react"

interface Props {
  children: ReactNode
}

interface ThemeManager {
  isDark: boolean

  toggleDark(): void
}

const defaultState: ThemeManager = {
  isDark: false,
  toggleDark: () => undefined,
}

export const ThemeManagerContext = createContext<ThemeManager>(defaultState)

const supportsDarkMode = () =>
  // You need macOS Mojave + Safari Technology Preview Release 68 to test this currently.
  window.matchMedia("(prefers-color-scheme: dark)").matches

const ThemeManagerProvider = (props: Props) => {
  const [isDark, setIsDark] = useState(false)

  const toggleDark = () => {
    const toggledTheme = !isDark
    setIsDark(toggledTheme)
    localStorage.setItem("dark", JSON.stringify(toggledTheme))
  }

  useEffect(() => {
    // Getting dark mode value from localStorage!
    const localStorageTheme = localStorage.getItem("dark")
    const latestTheme = localStorageTheme && JSON.parse(localStorageTheme)
    if (latestTheme) {
      setIsDark(latestTheme)
    } else if (supportsDarkMode()) {
      setIsDark(true)
    }
  }, [])

  return (
    <ThemeManagerContext.Provider
      value={{
        isDark,
        toggleDark,
      }}
    >
      {props.children}
    </ThemeManagerContext.Provider>
  )
}

export { ThemeManagerProvider }
