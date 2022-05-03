import { useState, createContext, useContext, useEffect, useMemo } from 'react'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from 'firebase/auth'
import { useRouter } from 'next/router'
import { auth } from '../firebase'

interface IAuth {
  user: User | null
  signUp: (email: string, password: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  error: string | null
  loading: boolean
}

const AuthContext = createContext<IAuth>({
  user: null,
  signUp: async () => {},
  signIn: async () => {},
  logout: async () => {},
  error: null,
  loading: false,
})

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [user, setUser] = useState<User | null>(null)
  const [initialLoading, setInitialLoading] = useState(true)
  const router = useRouter()

// Persisting the user
  useEffect(
    () => 
      onAuthStateChanged(auth,(user)=>{
        if(user){
          // logged in
          setUser(user)
          setLoading(false)
        }else{
          // not logged in
          setUser(null)
          setLoading(true)
          router.push('./login')
        }

        setInitialLoading(false)
      }),
    [auth]
  )

  const signUp = async (email: string, password: string) => {
    setLoading(true)

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCreds) => {
        setUser(userCreds.user)
        router.push('/')
        setLoading(false)
      })
      .catch((error) => {
        alert(error.message)
        setError(error)
      })
      .finally(() => setLoading(false))
  }

  const signIn = async (email: string, password: string) => {
    setLoading(true)

    await signInWithEmailAndPassword(auth, email, password)
      .then((userCreds) => {
        setUser(userCreds.user)
        router.push('/')
        setLoading(false)
      })
      .catch((error) => {
        alert(error.message)
        setError(error)
      })
      .finally(() => setLoading(false))
  }

  const logout = async () => {
    setLoading(true)

    signOut(auth)
      .then(() => {
        setUser(null)
      })
      .catch((err) => {
        alert(err.message)
        setError(error)
      })
      .finally(() => setLoading(false))
  }

  const memeoedValue = useMemo(
    () => ({
      user,
      signUp,
      signIn,
      error,
      logout,
      loading,
    }),
    [user, loading, error]
  )

  return (
    <AuthContext.Provider value={memeoedValue}>
      {!initialLoading && children}
    </AuthContext.Provider>
  )
}

export default function useAuth() {
  return useContext(AuthContext)
}
