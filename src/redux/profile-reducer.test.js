import profileReducer, { addPostCreator, deletePost } from "./profile-reducer"
import React from "react"

let state = {
    posts: [
        { id: 1, message: 'Hi, how r u?', likesCount: 11 },
        { id: 2, message: 'Not bad.', likesCount: 19 },
        { id: 3, message: 'It\'s my first post.', likesCount: 25 },
    ]
}

it('length of posts should be incremented', () => {
    // 1. start data
    let action = addPostCreator('salam aleikum')

    // 2. action
    let newState = profileReducer(state, action)

    // 3. expectation
    expect(newState.posts.length).toBe(4);
})

it('message of new post should be correct', () => {
    let action = addPostCreator('salam aleikum')

    let newState = profileReducer(state, action)

    expect(newState.posts[3].message).toBe('salam aleikum');
})

it('after deleting length of messages should be decremented', () => {
    let action = deletePost(1)

    let newState = profileReducer(state, action)

    expect(newState.posts.length).toBe(2);
})

it(`after deleting length of messages shouldn't be changed`, () => {
    let action = deletePost(1000)

    let newState = profileReducer(state, action)

    expect(newState.posts.length).toBe(3);
})