'use client';
import React from 'react';
import styles from '@/app/styles/post.module.css';
import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL+'/projects/social_media/'
})


function EditButton({post}) {

  async function handleEdit() {
    let fileInput = document.getElementById("file");
    let textContent = document.getElementById('write').innerText;
    let editContent = document.getElementById('write').innerHTML;

    let data = {
        content: textContent,
        edit_content: editContent
    }
    if (fileInput.files[0]) {
        data['file'] = fileInput.files[0]
    }
    const res = await api.patch(`posts/${post}/edit/`, data, {
        headers: {
            'Accept': "application/json",
            'Content-Type': "multipart/form-data"
        }
    })

    if (res.status === 202) {
        window.location.assign('/me');
    }
  }

  return (
    <button onClick={(e) => {
        e.preventDefault();
        handleEdit();
    }} className={styles.share}>edit</button>
  )
}

export default EditButton;