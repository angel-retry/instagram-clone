import { createContext, useState } from 'react'

const TabContext = createContext()

const TabProvider = ({ children }) => {
  const [selectedTab, setSelectedTab] = useState('profile')

  return (
    <TabContext.Provider value={{ selectedTab, setSelectedTab }}>
      {children}
    </TabContext.Provider>
  )
}

export {
  TabContext,
  TabProvider
}
