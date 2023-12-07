import { useSelector } from 'react-redux'

export const isHasActiveSubscription = () => {
  const { subscription } = useSelector((state) => ({
    subscription: state.user.status,
  }))
  if (subscription === 1) {
    return true
  } else {
    return false
  }
}

export const isSignedIn = () => {
  const { userId } = useSelector((state) => ({
    userId: state.user.id,
  }))
  if (userId > 0) {
    return true
  } else {
    return false
  }
}

export const formatDate = (date: any) => {
  let bits = date.split(/\D/)
  return `${bits[0]}/${bits[1]}/${bits[2]}`
}
