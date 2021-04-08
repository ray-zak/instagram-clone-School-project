
import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import Navbar from './components/Navbar'
import Homepage from './components/Homepage'
import Profile from './components/Profile/Profile.component'
import Login from './components/Login/Login'
import useToken from './useToken'
import OtherProfileComponent from './components/Profile/OtherProfile.component'

function App () {
  // const [token, setToken] = useState();
  const { token, setToken } = useToken()

  console.log('token in appjs', token)

  // look for a JWT token to check if user is already logged in
  if (!token) {
    return (
      <Router>
        <Navbar />
        <div className='container'>
          <Login setToken={setToken} />
        </div>
      </Router>

    )
  }

  return (
    <Router>
      {token
        ? <Navbar token={token} /> : <Navbar />}
      <div className='container'>
        <br />
        <Route path='/' exact component={Homepage} token={token} />
        <Route path='/profile' exact>
          <Profile token={token} />
        </Route>
        <Route path='/otherprofile/:id' exact>
          <OtherProfileComponent token={token} setToken={setToken} />
        </Route>
        <Route path='/logout' exact component={Login} setToken='' />
      </div>
    </Router>
  )
}

export default App
