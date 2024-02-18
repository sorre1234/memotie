import { FETCH_ALL, FETCH_POST, CREATE, UPDATE, START_LOADING, END_LOADING, DELETE, FETCH_BY_SEARCH,COMMENT } from '../constants/actionTypes';
import * as api from '../api/index.js';

//action creators using thunk

export const getPost = (id) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.fetchPost(id);//fetch posts from api folder
        dispatch({ type: FETCH_POST, payload: { post: data } });//sending that data to reducer to create logic;
    } catch (error) {
        console.log(error);
    }
}

export const getPosts = (page) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data: { data, currentPage, numberOfPages } } = await api.fetchPosts(page);//fetch posts from api folder
        dispatch({ type: FETCH_ALL, payload: { data, currentPage, numberOfPages } });//sending that data to reducer to create logic;
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error.message);
    }
}

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data: { data } } = await api.fetchPostsBySearch(searchQuery);
        dispatch({ type: FETCH_BY_SEARCH, payload: { data } });
        dispatch({ type: END_LOADING });

    } catch (error) {
        console.log(error);
    }
}

export const createPost = (post, navigate) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });

        const { data } = await api.createPost(post);
        dispatch({ type: CREATE, payload: data });
        navigate(`/posts/${data._id}`);

    } catch (error) {
        console.log(error.message);
    }
}

export const updatePost = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, post);
        dispatch({ type: UPDATE, payload: data });
    } catch (error) {
        console.log(error.message);
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id);

        dispatch({ type: DELETE, payload: id });
    } catch (error) {
        console.log(error);
    }
}

export const likePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.likePost(id);

        dispatch({ type: UPDATE, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const commentPost = (value, id) => async (dispatch) => {
    try {
        const {data} = await api.comment(value, id);
        dispatch({ type: COMMENT, payload: data});
        return data.comments;
    } catch (error) {
        console.log(error);
    }

}