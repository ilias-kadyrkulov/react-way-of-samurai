import React, { FC } from 'react'
import styles from './MyPosts.module.css'
import Post from './Post/Post'
import AddNewPostForm, { AddPostFormValuesType } from './AddNewPostForm/AddNewPostForm'
import { PostType } from '../../../types/types'

export type MapPropsType = {
    posts: Array<PostType>
}
export type DispatchPropsType = {
    addPost: (newPostText: string) => void
}

const MyPosts: FC<MapPropsType & DispatchPropsType> = (props) => {

    const addNewPost = (formData: AddPostFormValuesType) => {
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

const MyPostsMemorized = React.memo(MyPosts)

export default MyPostsMemorized