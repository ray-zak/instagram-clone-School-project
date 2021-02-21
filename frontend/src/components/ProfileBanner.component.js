import React from 'react';
const ProfileBanner = ({ addNewPost }) => {
    return (
        <div className='profile'>
            <div className='profile-image'>
                <img src='https://images.unsplash.com/photo-1513721032312-6a18a42c8763?w=152&h=152&fit=crop&crop=faces' alt='User' />
            </div>
            <div className="profile-user-settings">
                <h1 className="profile-user-name">Imaginary_User</h1>
                <button class='btn profile-edit-btn'>Edit Profile</button>
                <button class='btn profile-settings-btn' aria-label="Profile Settings"><i className="fa fa-cog" aria-hidden></i></button>
            </div>
            <div className='profile-stats'>
                <ul>
                    <li><span className='profile-stat-count'>111</span> posts</li>
                    <li><span className='profile-stat-count'>111</span> followers</li>
                    <li><span className='profile-stat-count'>111</span> following</li>
                </ul>
            </div>
            <div className='profile-bio'>
                <p><span className='profile-real-name'>Header</span> Random Bio</p>
            </div>
            <div className='profile-operations'>
                <ul>
                    <li><button className='btn profile-operations-btn'><i className='fa fa-user' aria-hidden></i></button></li>
                    <li><button onClick={addNewPost} className='btn profile-operations-btn'><i className='fa fa-plus-circle' aria-hidden></i></button></li>
                    <li><button className='btn profile-operations-btn'><i className='fa fa-history' aria-hidden></i></button></li>
                </ul>
            </div>
        </div>
    );
}


export default ProfileBanner;
