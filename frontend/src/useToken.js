import { useState } from 'react'

export default function useToken () {
  const getToken = () => {
    let tokenString
    // eslint-disable-next-line prefer-const
    tokenString = window.sessionStorage.getItem('token')

    return tokenString
  }

  const [token, setToken] = useState(getToken())

  // set Token to keep user login session active
  const saveToken = userToken => {
    window.sessionStorage.setItem('token', userToken)
    setToken(userToken)
  }

  return {
    setToken: saveToken,
    token
  }
}
