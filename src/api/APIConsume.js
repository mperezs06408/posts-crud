import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
});

export const getAllPosts = async () => {
    const request = await axiosInstance.get(`/posts`);

    return request;
}

export const createPost = async (body) => {
    const request = await axiosInstance.post('/posts', body)

    return request
}

export const setPost = async (idPost, body) => {
    const request = await axiosInstance.patch(`/posts/${idPost}`, body);

    return request
}