import React from 'react'
import axios from 'axios'
import '../../global'
const OtherProfileBanner = ({ userId, otherUserFollowers, otherUserFollowing, otherUserUsername, otherUserId, otherUserPosts }) => {
  function follow () {
    axios.post(global.backendURL + '/users/follow/' + userId + '/' + otherUserId)
      .then(response => console.log(response.data))
    window.location.reload()
  }
  function unfollow () {
    axios.post(global.backendURL + '/users/unfollow/' + userId + '/' + otherUserId)
      .then(response => console.log(response.data))
    window.location.reload()
  }
  function buttonDisplayed () {
    if (otherUserFollowers.includes(userId)) {
      return <button className='btn profile-edit-btn' onClick={unfollow}>Unfollow</button>
    } else { return <button className='btn profile-edit-btn' onClick={follow}>Follow</button> }
  }
  return (
    <div className='profile'>
      <div className='profile-user-follow'>
        <h1 className='profile-user-name'>{otherUserUsername}</h1>
        {buttonDisplayed()}
      </div>
      <div className='profile-stats'>
        <ul>
          <li><span className='profile-stat-count'>{otherUserPosts.length}</span> posts</li>
          <li><span className='profile-stat-count'>{otherUserFollowers.length}</span> followers</li>
          <li><span className='profile-stat-count'>{otherUserFollowing.length}</span> following</li>
        </ul>
      </div>
    </div>
  )
}

export default OtherProfileBanner
