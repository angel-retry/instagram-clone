import { createContext, useState } from 'react'

const TabContext = createContext()

const TabProvider = ({ chidren }) => {
  const [selectedTab, setSelectedTab] = useState('profile')

  return (
    <TabContext.Provider value={{ selectedTab, setSelectedTab }}>
      {chidren}
    </TabContext.Provider>
  )
}

export {
  TabContext,
  TabProvider
}
