
import './Profile.css';
import ProfileBanner from "../ProfileBanner.component";
import Gallery from "../Gallery.component";
import PostForm from '../PostForm.component';
import { useEffect, useState } from 'react';


function Profile ({ token }) {
    const [post, setPost] = useState({ caption: '', imageURL: '' });
    const [posts, setPosts] = useState([]);
    const [showForm, setShowForm] = useState(false);
    useEffect(() => {
        fetch('http://localhost:5000/posts/all-posts', {
            method: 'get',
        }).then(response => response.json())
            .then(data => setPosts(data))
    }, [])
    const [uploading, setUploading] = useState(false)
    const onDrop = picture => {
        if (!picture[0]) {
            setPost(Object.assign({}, post, { imageURL: '' }))
            return
        }
        setUploading(true);
        // create formdata
        const formData = new FormData();

        formData.append('file', picture[0]);
        // upload image to server s3
        fetch('http://localhost:5000/posts/upload-image', {
            method: 'post',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData,
        }).then(response => response.json())
            .then(data => {
                let p = post;
                // update imageurl
                setPost(Object.assign({}, p, { imageURL: data.Location }))
            })
            .then(() => { setUploading(false); })
    };

    const onChange = (e) => {
        let p = post;
        // update caption
        p[e.target.name] = e.target.value
        setPost(Object.assign({}, p))
    }

    const onSubmit = (e) => {
        e.preventDefault();
        // update uploading
        setUploading(true);

        // aption or imageURL cant be null
        if (post.caption === '' || post.imageURL === '') {
            // alert message
            alert('caption or imageURL cant be null ');
            return
        }
        // upload post to server
        fetch('http://localhost:5000/posts/add-post', {
            method: 'post',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(post),
        })
            .then(response => response.json())
            .then(data => {
                // add post to array
                posts.unshift(data.post);
                // update state
                setPosts([...posts]);
                alert('success')
                setPost({ caption: '', imageURL: '' })
                setShowForm(false);
            }).catch(err => console.log(err))
            .then(() => { setUploading(false); })
    }

    const addNewPost = () => {
        setShowForm(!showForm);
    }
    return (
        <div>
            <div className='body'>
                <div className='container'>
                    <ProfileBanner addNewPost={addNewPost} />
                </div>
                {showForm ? <PostForm uploading={uploading} onDrop={onDrop} onSubmit={onSubmit} onChange={onChange}></PostForm> : ''}
                <main>
                    <div className='container'>
                        {uploading ? <div className='loader'></div> : ''}
                        <Gallery posts={posts} />
                    </div>
                </main>

            </div>
        </div>
    );
}

export default Profile;
