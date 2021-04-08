import React from 'react'
import Scrollbar from 'react-scrollbars-custom'
import './DisplayingComments.css'

const DisplayingComments = ({ commentsList }) => {
  return (

    <Scrollbar rtl style={{ backgroundColor: 'rgba(211,211,211 ,0.5 )', color: 'black', position: 'relative' }}>

      <div className='comments'>
        {
            commentsList && commentsList.map(comment => {
              return (
                <h5 key={comment._id}> <span> <strong className='postedBy__comments'> {comment.postedBy}:</strong> </span>  {comment.content}   </h5>

              )
            })

        }

      </div>
    </Scrollbar>

  )
}
export default DisplayingComments
