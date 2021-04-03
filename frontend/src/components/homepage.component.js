import React, { Component , useEffect , useState} from 'react';
import "./Profile/Profile.css"
import Displaying_Comments from "./Comments/Displaying_Comments";
import "./Comments/Displaying_Comments.css";

const Homepage= ({token})=>{
    const [posts , Setposts] = useState([]);
    const [content, Setcontent] = useState("");
    const [postId, SetpostId] = useState("");

    useEffect(()=>{

        fetch("http://localhost:5000/posts/newsfeedposts" , {
            method:"GET",
            headers:{
                'Authorization': `Bearer `+sessionStorage.getItem("token"),
            }
        }).then(result=>{
            result.json().then(data=>Setposts(data))
        })
            .catch(err=>err.json)

    },[])

    const add_comment = async (e) => {

        //e.preventDefault();

        await fetch("http://localhost:5000/posts/add-comment", {
            method: "Post",
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem("token")}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content: content,
                postId: postId,

            })

        }).then(res => {
            Setcontent("");


        })

    }

    return (
        <div>
            <h2 style={{marginLeft:"40%", fontSize:35}}> NewsFeed </h2>
            <hr/>

            <div className='gallery'>

                {posts.map((post) => {
                    return <div key={post._id} className='gallery-item' tabIndex='0'>
                        <img src={post.imageURL} alt='Gallery-1' className='gallery-image'/>

                        <form onSubmit={add_comment}>
                            <input id={post._id} value={content} type="text" placeholder={"comments here"}
                                   style={{padding: '5px 10px', width: '90%'}} onChange={(e) => {
                                Setcontent(e.target.value);
                                SetpostId(post._id)
                            }}/>
                            <input style={{
                                padding: '5px 10px',
                                width: '10%',
                                border: 'none',
                                borderRadius: '5px',
                                backgroundColor: '#343a40',
                                color: 'white'
                            }} type={"submit"} value={"send comment"}/>
                        </form>
                        {/*<input type="text" placeholder={"comments here"} style={{padding:'5px 10px', width:'90%'}}/>*/}
                        {/*<button style={{padding:'5px 10px', width:'10%', border:'none', borderRadius:'5px', backgroundColor:'#343a40', color:'white'}}>submit</button>*/}
                        <div className='gallery-item-info'>

                            {
                                post.comments.length > 0 ? (
                                    <Displaying_Comments commentslist={post.comments}/>
                                ) : ""
                            }

                            <ul>
                                <li className={'gallery-item-likes'}> <span className='visually-hidden'> </span> {post.username}</li>

                                <li className='gallery-item-likes'><span
                                    className='visually-hidden'></span>{post.caption}</li>
                                <br/>

                                <li className='gallery-item-comments'><span
                                    className='visually-hidden'>Comments:</span>{post.comments.length} <i
                                    className='fa fa-comment' aria-hidden/></li>
                            </ul>
                        </div>
                    </div>
                })
                }

            </div>
        </div>
    )

}
export default Homepage