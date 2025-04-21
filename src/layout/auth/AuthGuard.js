// ** React Imports
import { useEffect } from 'react'
// ** Next Imports
import { useRouter } from 'next/router'
// ** Hooks Import
import { useAuth } from '@/hooks/useAuth'
import authConfig from '@/configs/auth'

const AuthGuard = props => {
  const { children, fallback } = props
  const auth = useAuth()
  const router = useRouter()

  useEffect(
    () => {
      if (!router.isReady) {
        return
      }

      if (auth.user === null && !window.localStorage.getItem(authConfig.session)) {
        auth.refreshAuth()
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [auth.user, router.route]
  )
  if (auth.loading && !auth.user) {
    return fallback
  }

  return <>{children}</>
}

export default AuthGuard
