import './Profile.css'
import ProfileBanner from '../ProfileBanner'
import Gallery from '../Gallery'
import PostForm from '../PostForm'
import React, { useEffect, useState } from 'react'
import jwtDecode from 'jwt-decode'
import axios from 'axios'
import fetch from 'node-fetch'

function Profile ({ token }) {
  const [post, setPost] = useState({ caption: '', imageURL: '' })
  const [posts, setPosts] = useState([])
  const [showForm, setShowForm] = useState(false)
  const tokenData = jwtDecode(token)
  const [followers, setFollowers] = useState([])
  const [following, setFollowing] = useState([])
  const [username, setUsername] = useState()
  const fetchHeaders = new window.Headers({ authorization: token })

  useEffect(() => {
    fetch('http://localhost:5000/posts/all-posts', {
      method: 'get', headers: fetchHeaders
    }).then(response => response.json())
      .then(data => setPosts(data))
  })
  useEffect(() => {
    axios.get('http://localhost:5000/users/' + tokenData.id)
      .then(response => {
        setFollowers(response.data.followers)
        setFollowing(response.data.following)
        setUsername(response.data.username)
      })
  })
  const [uploading, setUploading] = useState(false)
  const onDrop = picture => {
    if (!picture[0]) {
      setPost(Object.assign({}, post, { imageURL: '' }))
      return
    }
    setUploading(true)
    // create form data
    const formData = new window.FormData()

    formData.append('file', picture[0])
    // upload image to server s3
    fetch('http://localhost:5000/posts/upload-image', {
      method: 'post',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    }).then(response => response.json())
      .then(data => {
        // update image url
        setPost(Object.assign({}, post, { imageURL: data.Location }))
      })
      .then(() => { setUploading(false) })
  }

  const onChange = (e) => {
    const p = post
    // update caption
    p[e.target.name] = e.target.value
    setPost(Object.assign({}, p))
  }

  const onSubmit = (e) => {
    //e.preventDefault()
    // update uploading
    setUploading(true)

    // imageURL cant be null
    if (post.imageURL === '') {
      // alert message
      alert('imageURL cant be null ')
      return
    }
    // upload post to server
    fetch('http://localhost:5000/posts/add-post', {
      method: 'post',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(post)
    })
      .then(response => response.json())
      .then(data => {
        // add post to array
        posts.unshift(data.post)
        // update state
        setPosts([...posts])
        setPost({ caption: '', imageURL: '' })
        setShowForm(false)
      }).catch(err => console.log(err))
      .then(() => { setUploading(false) })
  }

  const addNewPost = () => {
    setShowForm(!showForm)
  }
  return (
    <div>
      <div className='body'>
        <div className='container'>
          <ProfileBanner addNewPost={addNewPost} followers={followers} following={following} username={username} posts={posts} />
        </div>
        {showForm ? <PostForm uploading={uploading} onDrop={onDrop} onSubmit={onSubmit} onChange={onChange} /> : ''}
        <main>
          <div className='container'>
            {uploading ? <div className='loader' /> : ''}
            <Gallery posts={posts} />
          </div>
        </main>
      </div>
    </div>
  )
}

export default Profile
