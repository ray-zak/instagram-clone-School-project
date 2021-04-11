import React, { useState, useEffect } from 'react'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import './Profile/Profile.css'
import PropTypes from 'prop-types'
import '../global'

const SearchBar = ({ token }) => {
  const tokenData = jwtDecode(token)
  const [data, setData] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  useEffect(() => {
    axios.get(global.backendURL + '/users/')
      .then(response => {
        setData(response.data)
      })
  }, [])
  function redirectTo (id) {
    if (id === tokenData.id) {
      window.location.href = (global.frontendURL + '/profile/')
    } else {
      window.location.href = (global.frontendURL + '/otherprofile/' + id)
    }
  }
  return (
    <div className='searchPart'>
      <input type='text' placeholder='Search' onChange={event => { setSearchTerm(event.target.value) }} />
      {/* eslint-disable-next-line array-callback-return */}
      {data.filter(val => {
        if (searchTerm === '') {
          return null
        } else if (val.username.toLowerCase().includes(searchTerm.toLowerCase())) {
          return val
        }
      }).map((val, key) => {
        return (
          <div className='user' key={key}>
            <button className='btn profile-edit-btn' onClick={() => redirectTo(val._id)} style={{ color: 'white', fontFamily: 'Arial', margin: '5px', fontSize: '10px' }}> {val.username}</button>
          </div>
        )
      })}
    </div>
  )
}

SearchBar.propTypes = {
  token: PropTypes.any
}

export default SearchBar
