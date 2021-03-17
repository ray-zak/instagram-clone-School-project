import React from 'react';
import ImageUploader from "react-images-upload";
const PostForm = ({ onDrop, onSubmit, onChange, uploading }) => {
    return (
        <div className='Modal' style={{padding:'20px'}}>
            <form onSubmit={onSubmit}>
                <h3>New Post</h3>
                <label>Caption</label>
                <input style={{padding:'5px 10px', width:'100%'}} type="text" name='caption' placeholder="Enter caption" onChange={onChange} />
                <ImageUploader
                    withIcon={false}
                    buttonText="Choose images"
                    onChange={onDrop}
                    withPreview={true}
                    singleImage={true}
                    imgExtension={[".jpg", ".gif", ".png",]}
                    maxFileSize={10485760}
                />
                <button style={{padding:'5px 10px', width:'100%', border:'none', borderRadius:'5px', backgroundColor:'#343a40', color:'white'}} disabled={uploading} type="submit">Submit</button>
            </form>
        </div>
    );
};

export default PostForm;
