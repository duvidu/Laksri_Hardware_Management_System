import { createContext, useReducer } from 'react'

export const NotificationContext = createContext()

export const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATIONS':
      return { 
        notifications: action.payload 
      }
    case 'CREATE_NOTIFICATION':
      return { 
        notifications: [action.payload, ...state.notifications] 
      }
    
    default:
      return state
  }
}

export const NotificationContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notificationReducer, { 
    notifications: null
  })
  
  return (
    <NotificationContext.Provider value={{ ...state, dispatch }}>
      { children }
    </NotificationContext.Provider>
  )
}