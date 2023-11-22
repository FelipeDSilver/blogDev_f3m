import { db } from '../firebase/config'
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut,
} from 'firebase/auth';
import { useState, useEffect } from 'react'

export const userAuthentication = () => {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)
    const [cancelled, setCancelled] = useState(false)

    const auth = getAuth()

    function checkIfCancelled() {
        if (cancelled) {
            return
        }
    }

    const{userLogout} = userLogin()
    
    async function createUser(data) {
        checkIfCancelled()

        setLoading(true)
        setError(null)

        try {
            const { user } = await createUserWithEmailAndPassword(auth,
                data.email,
                data.password
            )
            await updateProfile(user, {
                displayName: data.displayName
            })
            userLogout()

            setLoading(false)

            return user
        } catch (error) {
            console.error(error.message)
            console.table(typeof error.message)

            let systemErrorMessage

            if (error.message.includes("Password")) {
                systemErrorMessage = "A senha precisa ter pelo menos 6 caracteres"
            } else if (error.message.includes("email-already")) {
                systemErrorMessage = "O e-mail já cadastrado"
            } else {
                systemErrorMessage = "Ocorreu um erro, tente novamente mais tarde"
            }

            setLoading(false)
            setError(systemErrorMessage)
        }
    }

    useEffect(() => {
        return () => setCancelled(true)
    }, [])

    return {
        auth,
        createUser,
        error,
        loading
    }
}


export const userLogin = () => {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)
    const [cancelled, setCancelled] = useState(false)

    const auth = getAuth()

    function checkIfCancelled() {
        if (cancelled) {
            return
        }
    }
    async function login(data) {
        checkIfCancelled()

        setLoading(true)
        setError(null)

        try {
            const { user } = await signInWithEmailAndPassword(auth,
                data.email,
                data.password
            )

            setLoading(false)

            return user
        } catch (error) {
            console.error(error.message)
            console.table(typeof error.message)

            let systemErrorMessage

            if (error.message.includes("usuario")) {
                systemErrorMessage = "usuario não cadastrado"
            } else if (error.message.includes("password")) {
                systemErrorMessage = "senha incorreta"
            } else {
                systemErrorMessage = "Ocorreu um erro, tente novamente mais tarde"
            }

            setLoading(false)
            setError(systemErrorMessage)
        }
    }

    async function userLogout() {
        checkIfCancelled()

        setLoading(true)
        setError(null)

        try {
            await signOut(auth)
            setLoading(false)
        } catch (error) {
            console.error(error.message)
            console.table(typeof error.message)

            let systemErrorMessage

            systemErrorMessage = "Ocorreu um erro, tente novamente mais tarde"

            setLoading(false)
            setError(systemErrorMessage)
        }
    }


    useEffect(() => {
        return () => setCancelled(true)
    })
    return {
        auth,
        login,
        error,
        loading,
        userLogout
    }
}
