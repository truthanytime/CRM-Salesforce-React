import React, {useState} from 'react'

type LayoutContextProps = {
    setLeftPanelChildren: (comp: JSX.Element | null) => void
    leftPanelChildren: JSX.Element | null
}

export const LayoutContext = React.createContext<
  LayoutContextProps | undefined
>(undefined)

export default function Layout(props: {children: JSX.Element | JSX.Element[]}) {
  const {children} = props

  const [leftPanelChildren, setLeftPanelChildren] = useState<null | JSX.Element>(null);

  // Add sidebar here
  return (
    <>
      <LayoutContext.Provider
        value={{
            leftPanelChildren,
            setLeftPanelChildren
        }}
      >
        <>{children}</>
      </LayoutContext.Provider>
    </>
  )
}


export function useLayout() {
    const context = React.useContext(LayoutContext)
    if (context === undefined) {
      throw new Error('useLayout must be used within Layout.')
    }
  
    return context
}
  