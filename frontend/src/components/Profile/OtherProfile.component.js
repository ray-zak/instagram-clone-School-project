import React from 'react';
import './Profile.css';
import OtherProfileBanner from "./OtherProfileBanner";
import { useEffect, useState } from 'react';
import {useParams} from "react-router";
import axios from "axios";
import jwt_decode from "jwt-decode";
import OtherProfileGallery from "../OtherProfileGallery.js";

const OtherProfileComponent = ({token}) => {
    const [otherUserUsername, setOtherUserUsername] = useState()
    const [otherUserFollowers, setOtherUserFollowers] = useState([])
    const [otherUserFollowing, setOtherUserFollowing] = useState([])
    const [otherUserPosts, setOtherUserPosts] = useState([])
    const [otheruser_posts , setotheruser_posts] = useState([]);
    const otherUserId = useParams()
    const tokenData = jwt_decode(token)


    useEffect(() =>{
        axios.get("http://localhost:5000/users/" + otherUserId.id)
            .then(response => {
                setOtherUserFollowers(response.data.followers)
                setOtherUserFollowing(response.data.following)
                setOtherUserUsername(response.data.username)
                setOtherUserPosts(response.data.postsID)
            })
    },[])

    useEffect(()=>{
        fetch("http://localhost:5000/posts/otheruser_posts/"+ otherUserId.id , {
            method: "GET",
            headers:{
                'Authorization': `Bearer ${token}`
            }
        }).then(response=>response.json().then(data=>setotheruser_posts(data)))
            .catch(err=>err.json);
    },[])

    console.log(otherUserId.id)
    return (
        <div>
            <div className='body'>
                <div className='container'>
                    <OtherProfileBanner userId={tokenData.id} otherUserUsername={otherUserUsername} otherUserFollowers={otherUserFollowers} otherUserFollowing={otherUserFollowing} otherUserId={otherUserId.id} otherUserPosts={otheruser_posts}/>
                    <OtherProfileGallery posts={otheruser_posts} />
                </div>
            </div>
        </div>
    );
};

export default OtherProfileComponent;