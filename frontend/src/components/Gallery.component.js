import React from 'react';

const Gallery = ({posts}) => {
    return (
        <div className='gallery'>
            {posts.map((post)=>{
                return <div key={post._id} className='gallery-item' tabIndex='0'>
                <img src={post.imageURL} alt='Gallery-1' className='gallery-image'/>
                <input type="text" placeholder={"comments here"} style={{padding:'5px 10px', width:'90%'}}/>
                <button style={{padding:'5px 10px', width:'10%', border:'none', borderRadius:'5px', backgroundColor:'#343a40', color:'white'}}>submit</button>
                <div className='gallery-item-info'>
                    {/*<ul>
                        <li className='gallery-item-likes'><span className='visually-hidden'></span>{post.caption}</li>
                        <br/>
                        <li className='gallery-item-comments'><span className='visually-hidden'>Comments:</span>0 <i className='fa fa-comment' aria-hidden/></li>
                    </ul>*/}
                </div>
            </div>
            })}
            
        </div>
    );
};

export default Gallery;
