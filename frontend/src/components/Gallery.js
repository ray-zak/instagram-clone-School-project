import React, { useState } from 'react'
import DisplayingComments from './Comments/DisplayingComments'
import fetch from 'node-fetch'
import '../global'

const Gallery = ({ posts }) => {
  const [content, SetContent] = useState('')
  const [postId, SetPostId] = useState('')

  const addComment = async () => {

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
    <div className='gallery'>
      {posts.map((post) => {
        return (
          <div key={post._id} className='gallery-item' tabIndex='0'>
            <img src={post.imageURL} alt='Gallery-1' className='gallery-image' />

            <form onSubmit={addComment}>
              <input
                id={post._id} value={content} placeholder='comments here'
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
                post.comments.length > 0
                  // eslint-disable-next-line multiline-ternary
                  ? (
                    <DisplayingComments commentslist={post.comments} />
                    ) : ''
              }

              <ul>
                <li className='gallery-item-likes'><span
                  className='visually-hidden'
                  /> {post.caption}
                </li>
                <br />
                <li className='gallery-item-comments'><span
                  className='visually-hidden'>Comments:</span>{post.comments.length} <i className='fa fa-comment' aria-hidden/>
                </li>
              </ul>
            </div>
          </div>
        )
      })}

    </div>
  )
}

export default Gallery
