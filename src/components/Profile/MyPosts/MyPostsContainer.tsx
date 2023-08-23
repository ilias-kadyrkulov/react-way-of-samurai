import React from 'react';
import { actions } from '../../../redux/profile-reducer';
import MyPosts, { DispatchPropsType, MapPropsType } from './MyPosts';
import { connect } from 'react-redux';
import { RootState } from '../../../redux/redux-store';

const mapStateToProps = (state: RootState) => {
    return {
        posts: state.profilePage.posts
    }
}

const MyPostsContainer = connect<MapPropsType, DispatchPropsType, {}, RootState>(
    mapStateToProps,
    { addPost: actions.addPost }
)(MyPosts);

export default MyPostsContainer;