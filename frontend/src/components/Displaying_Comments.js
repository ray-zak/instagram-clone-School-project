import React, {useEffect, useState} from "react";
import Scrollbar from "react-scrollbars-custom";


const Displaying_Comments =({commentslist})=>{


    return(

        <Scrollbar rtl={true} style={{backgroundColor: "lightgray", color:"black", opacity:0.5}}>

        <div>


        {
            commentslist.map(comment=>{
                return(
                    <h5 key={comment._id}> <span> <strong> {comment.postedBy}:</strong> </span>  {comment.content}   </h5>

                )

            })

        }



        </div>
        </Scrollbar>





    )





}
export default Displaying_Comments;