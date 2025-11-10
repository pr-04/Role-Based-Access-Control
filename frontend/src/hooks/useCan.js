import { useContext, useMemo } from 'react'
import AuthContext from '../context/AuthContext'
import { ROLE_PERMISSIONS } from '../config/permissions'

export default function useCan(capability){
  const { user } = useContext(AuthContext)
  return useMemo(()=>{
    if(!user) return false
    const perms = ROLE_PERMISSIONS[user.role] || []
    return perms.includes(capability) || perms.includes(capability + ':own') || perms.includes(capability.split(':')[0])
  }, [user, capability])
}
