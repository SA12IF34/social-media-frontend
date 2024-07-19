'use client';
import React from 'react';
import styles from '@/app/styles/post.module.css';
import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL+'/social_media/'
})

function ShareButton() {

  async function handleShare() {
    let fileInput = document.getElementById("file");
    let textContent = document.getElementById('write').innerText;
    let editContent = (document.getElementById('write').innerHTML);
    
    let data = {
        content: textContent,
        edit_content: editContent
    }
    if (fileInput.files[0]) {
        data['file'] = fileInput.files[0]
    }

    const res = await api.post('posts/', data, {
        headers: {
            'Accept': "application/json",
            'Content-Type': "multipart/form-data"
        }
    })

    if (res.status === 201) {
        window.location.assign('/me');
    }

  }

  return (
    <button onClick={(e) => {
        e.preventDefault();
        handleShare();
    }} className={styles.share}>share</button>
  )
}

export default ShareButton;