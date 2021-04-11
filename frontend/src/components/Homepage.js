import React, { useEffect, useState } from 'react'
import './Profile/Profile.css'
import DisplayingComments from './Comments/DisplayingComments'
import './Comments/DisplayingComments.css'
import fetch from 'node-fetch'
import '../global'

const Homepage = () => {
  const [posts, SetPosts] = useState([])
  const [content, SetContent] = useState('')
  const [postId, SetPostId] = useState('')

  useEffect(() => {
    fetch(global.backendURL + '/posts/newsfeedposts', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + window.sessionStorage.getItem('token')
      }
    }).then(result => {
      result.json().then(data => SetPosts(data))
    })
      .catch(err => err.json)
  }, [])

  const addComment = async (e) => {
    e.preventDefault()

    await fetch(global.backendURL + '/posts/add-comment', {
      method: 'Post',
      headers: {
        Authorization: `Bearer ${window.sessionStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        content: content,
        postId: postId

      })

    }).then(res => {
      SetContent('')
    })
  }

  return (
    <div>
      <h2 style={{ marginLeft: '40%', fontSize: 35 }}> NewsFeed </h2>
      <hr />

      <div className='gallery'>

        {posts.map((post) => {
          return (
            <div key={post._id} className='gallery-item' tabIndex='0'>
              <img src={post.imageURL} alt='Gallery-1' className='gallery-image' />

              <form onSubmit={addComment}>
                <input
                  id={post._id} value={content} type='text' placeholder='comments here'
                  style={{ padding: '5px 10px', width: '90%' }} onChange={(e) => {
                    SetContent(e.target.value)
                    SetPostId(post._id)
                  }}
                />
                <input
                  style={{
                    padding: '5px 10px',
                    width: '10%',
                    border: 'none',
                    borderRadius: '5px',
                    backgroundColor: '#343a40',
                    color: 'white'
                  }} type='submit' value='send comment'
                />
              </form>
              <div className='gallery-item-info'>

                {
                  // eslint-disable-next-line multiline-ternary
                                post.comments.length > 0 ? (
                                  <DisplayingComments commentslist={post.comments} />
                                ) : ''
                            }

                <ul>
                  <li className='gallery-item-likes'> <span className='visually-hidden'> </span> {post.username}</li>

                  <li className='gallery-item-likes'><span
                    className='visually-hidden'/>{post.caption}
                  </li>
                  <br />
                  <li className='gallery-item-comments'><span
                    className='visually-hidden'>Comments:
                  </span>{post.comments.length} <i
                    className='fa fa-comment' aria-hidden
                                                />
                  </li>
                </ul>
              </div>
            </div>
          )
        })}

      </div>
    </div>
  )
}
export default Homepage
