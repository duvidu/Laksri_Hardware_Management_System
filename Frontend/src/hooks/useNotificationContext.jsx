import { NotificationContext } from "../context/NotificationContext" 
import { useContext } from "react"

export const useNotificationContext = () => {
  const context = useContext(NotificationContext)

  if(!context) {
    throw Error('useNotificationContext must be used inside a NotificationContextProvider')
  }

  return context
}