import React, { useEffect, useState } from 'react'
import './Profile.css'
import OtherProfileBanner from './OtherProfileBanner'
import fetch from 'node-fetch'
import { useParams } from 'react-router'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import OtherProfileGallery from '../OtherProfileGallery.js'

const OtherProfileComponent = ({ token }) => {
  const [otherUserUsername, setOtherUserUsername] = useState()
  const [otherUserFollowers, setOtherUserFollowers] = useState([])
  const [otherUserFollowing, setOtherUserFollowing] = useState([])
  // const [otherUserPosts. setOtherUserPosts] = useState([])
  const [otherUserPosts, setOtherUserPosts] = useState([])
  const otherUserId = useParams()
  const tokenData = jwtDecode(token)

  useEffect(() => {
    axios.get('http://localhost:5000/users/' + otherUserId.id)
      .then(response => {
        setOtherUserFollowers(response.data.followers)
        setOtherUserFollowing(response.data.following)
        setOtherUserUsername(response.data.username)
        setOtherUserPosts(response.data.postsID)
      })
  }, [])

  useEffect(() => {
    fetch('http://localhost:5000/posts/otheruser_posts/' + otherUserId.id, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(response => response.json().then(data => setOtherUserPosts(data)))
      .catch(err => err.json)
  }, [])

  console.log(otherUserId.id)
  return (
    <div>
      <div className='body'>
        <div className='container'>
          <OtherProfileBanner userId={tokenData.id} otherUserUsername={otherUserUsername} otherUserFollowers={otherUserFollowers} otherUserFollowing={otherUserFollowing} otherUserId={otherUserId.id} otherUserPosts={otherUserPosts} />
          <OtherProfileGallery posts={otherUserPosts} />
        </div>
      </div>
    </div>
  )
}

export default OtherProfileComponent
