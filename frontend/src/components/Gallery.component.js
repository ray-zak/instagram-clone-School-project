import React from 'react';

const Gallery = () => {
    return (
        <div className='gallery'>
            <div className='gallery-item' tabIndex='0'>
                <img src='https://images.unsplash.com/photo-1511765224389-37f0e77cf0eb?w=500&h=500$fit=crop' alt='Gallery-1' className='gallery-image'/>
                <div className='gallery-item-info'>
                    <ul>
                        <li className='gallery-item-likes'><span className='visually-hidden'>Likes:</span><i className='fa fa-heart' aria-hidden/>56</li>
                        <li className='gallery-item-comments'><span className='visually-hidden'>Comments:</span><i className='fa fa-comment' aria-hidden/>56</li>
                    </ul>
                </div>
            </div>
            <div className='gallery-item' tabIndex='0'>
                <img src='https://images.unsplash.com/photo-1497445462247-4330a224fdb1?w=500&h=500$fit=crop' alt='Gallery-1' className='gallery-image'/>
                <div className='gallery-item-info'>
                    <ul>
                        <li className='gallery-item-likes'><span className='visually-hidden'>Likes:</span><i className='fa fa-heart' aria-hidden/>56</li>
                        <li className='gallery-item-comments'><span className='visually-hidden'>Comments:</span><i className='fa fa-comment' aria-hidden/>56</li>
                    </ul>
                </div>
            </div>
            <div className='gallery-item' tabIndex='0'>
                <img src='https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=500&h=500$fit=crop' alt='Gallery-1' className='gallery-image'/>
                <div className='gallery-item-type'>
                    <span className='visually-hidden'>Gallery</span>
                    <i className='fa fa-clone' aria-hidden></i>
                </div>
                <div className='gallery-item-info'>
                    <ul>
                        <li className='gallery-item-likes'><span className='visually-hidden'>Likes:</span><i className='fa fa-heart' aria-hidden/>56</li>
                        <li className='gallery-item-comments'><span className='visually-hidden'>Comments:</span><i className='fa fa-comment' aria-hidden/>56</li>
                    </ul>
                </div>
            </div>
            <div className='gallery-item' tabIndex='0'>
                <img src='https://images.unsplash.com/photo-1504214208698-ea1916a2195a?w=500&h=500$fit=crop' alt='Gallery-1' className='gallery-image'/>
                <div className='gallery-item-type'>
                    <span className='visually-hidden'>Video</span>
                    <i className='fa fa-video-camera' aria-hidden></i>
                </div>
                <div className='gallery-item-info'>
                    <ul>
                        <li className='gallery-item-likes'><span className='visually-hidden'>Likes:</span><i className='fa fa-heart' aria-hidden/>56</li>
                        <li className='gallery-item-comments'><span className='visually-hidden'>Comments:</span><i className='fa fa-comment' aria-hidden/>56</li>
                    </ul>
                </div>
            </div>
            <div className='gallery-item' tabIndex='0'>
                <img src='https://images.unsplash.com/photo-1515814472071-4d632dbc5d4a?w=500&h=500$fit=crop' alt='Gallery-1' className='gallery-image'/>
                <div className='gallery-item-type'>
                    <span className='visually-hidden'>Gallery</span>
                    <i className='fa fa-clone' aria-hidden></i>
                </div>
                <div className='gallery-item-info'>
                    <ul>
                        <li className='gallery-item-likes'><span className='visually-hidden'>Likes:</span><i className='fa fa-heart' aria-hidden/>56</li>
                        <li className='gallery-item-comments'><span className='visually-hidden'>Comments:</span><i className='fa fa-comment' aria-hidden/>56</li>
                    </ul>
                </div>
            </div>
            <div className='gallery-item' tabIndex='0'>
                <img src='https://images.unsplash.com/photo-1511407397940-d57f68e81203?w=500&h=500$fit=crop' alt='Gallery-1' className='gallery-image'/>
                <div className='gallery-item-info'>
                    <ul>
                        <li className='gallery-item-likes'><span className='visually-hidden'>Likes:</span><i className='fa fa-heart' aria-hidden/>56</li>
                        <li className='gallery-item-comments'><span className='visually-hidden'>Comments:</span><i className='fa fa-comment' aria-hidden/>56</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Gallery;