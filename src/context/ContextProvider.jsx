// export default DataContextProvider

import React, { createContext } from 'react'
import { useState } from 'react'

export const DataContext = createContext()

const  DataContextProvider=({ children })=> {
  const [searchDataHome, setSearchDataHome] = useState([])
  const [searchQuery, setSearchQuery] = useState([])

  return (
    <DataContext.Provider
      value={{
        searchDataHome,
        setSearchDataHome,
				searchQuery,
				setSearchQuery
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

export default DataContextProvider
