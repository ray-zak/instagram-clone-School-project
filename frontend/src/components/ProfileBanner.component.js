import React from 'react';
const ProfileBanner = ({ addNewPost, followers, following, username, posts }) => {
    return (
        <div className='profile'>
            <div className="profile-user-settings">
                <h1 className="profile-user-name">{username}</h1>
            </div>
            <div className='profile-stats'>
                <ul>
                    <li><span className='profile-stat-count'>{posts.length}</span> posts</li>
                    <li><span className='profile-stat-count'>{followers.length}</span> followers</li>
                    <li><span className='profile-stat-count'>{following.length}</span> following</li>
                </ul>
            </div>
            <div className='profile-operations'>
                <li><button onClick={addNewPost} className='btn profile-operations-btn'><i className='fa fa-plus-circle' aria-hidden></i></button></li>
            </div>
        </div>
    );
}


export default ProfileBanner;
