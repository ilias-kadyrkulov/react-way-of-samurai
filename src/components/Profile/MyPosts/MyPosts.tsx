import React, { FC } from 'react'
import styles from './MyPosts.module.css'
import Post from './Post/Post'
import AddNewPostForm, { AddPostFormValuesType } from './AddNewPostForm/AddNewPostForm'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { actions } from '../../../redux/profile-reducer'


const MyPosts: FC = (props) => {
    const posts = useAppSelector(state => state.profilePage.posts)

    const dispatch = useAppDispatch()

    const addNewPost = (formData: AddPostFormValuesType) => {
        dispatch(actions.addPost(formData.newPostText))
    }

    return (
        <div className={styles.myPosts}>
            <h3>My Posts</h3>
            <div>
                <AddNewPostForm onSubmit={addNewPost} />
            </div>

            <div className={styles.posts}>
                {posts.map(post =>
                    <Post key={post.id} message={post.message} likesCount={post.likesCount} />
                )}
            </div>
        </div>
    )
}

const MyPostsMemorized = React.memo(MyPosts)

export default MyPostsMemorized