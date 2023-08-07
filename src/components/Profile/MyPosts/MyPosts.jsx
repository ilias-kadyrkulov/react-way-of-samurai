import React from 'react'
import styles from './MyPosts.module.css'
import Post from './Post/Post'
import AddNewPostForm from './AddNewPostForm/AddNewPostForm'


const MyPosts = (props) => {
    
    const addNewPost = (formData) => {
        props.addPost(formData.newPostText);
    }
    
    return (
        <div className={styles.myPosts}>
            <h3>My Posts</h3>
            <div>
                <AddNewPostForm onSubmit={addNewPost} />
            </div>

            <div className={styles.posts}>
                {props.posts.map(post =>
                    <Post key={post.id} message={post.message} likesCount={post.likesCount} />
                )}
            </div>
        </div>
    )
}


export default MyPosts