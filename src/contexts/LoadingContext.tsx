import React, { ReactNode, useEffect } from "react"

interface LoadingContext {
  didAppLoad: boolean
}

export const LoadingContext = React.createContext<LoadingContext>({
  didAppLoad: false,
})

interface LoadingProviderProps {
  children: ReactNode
}

export const LoadingProvider = (props: LoadingProviderProps) => {
  const [didAppLoad, setDidAppLoad] = React.useState(false)

  useEffect(() => {
    setDidAppLoad(true)
  }, [])

  return (
    <LoadingContext.Provider value={{ didAppLoad }}>
      {props.children}
    </LoadingContext.Provider>
  )
}
