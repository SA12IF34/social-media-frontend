'use client';
import React from 'react';
import styles from '@/app/styles/post.module.css';
import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const api = axios.create({
    baseURL: 'https://saifchan.site/projects/social_media/'
})

function DeletePost({postId}) {

  async function deletePost() {
    const res = await api.delete(`posts/${postId}/`);
    
    if (res.status === 202) {
        window.location.assign('/');
    }

  }


  return (
    <button onClick={() => {
        deletePost();
    }} className={styles.delete}>
        delete
    </button>
  )
}

export default DeletePost;