import React from "react";
import Scrollbar from "react-scrollbars-custom";
import './DisplayingComments.css';


const Displaying_Comments =({commentslist})=>{
    return(
        <Scrollbar rtl={true} style={{backgroundColor: 'rgba(211,211,211 ,0.5 )', color:"black", position:"relative"}}>
            <div className="comments">
                {
                    commentslist.map(comment=>{
                        return(
                            <h5  key={comment._id}> <span> <strong className="postedBy__comments"> {comment.postedBy}:</strong> </span>  {comment.content}   </h5>

                        )
                    })
                }
            </div>
        </Scrollbar>

    )
}
export default Displaying_Comments;