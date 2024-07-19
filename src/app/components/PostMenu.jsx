'use client';
import React, {useEffect} from 'react';
import { redirect } from 'next/navigation';
import styles from '@/app/styles/post.module.css';
import {HiOutlineDotsVertical} from 'react-icons/hi';
import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL+'/social_media/'
})

function PostMenu({postId}) {

  async function deletePost() {
      const res = await api.delete(`posts/${postId}/`);
      
      if (res.status === 202) {
          window.location.assign('/');
      }
  
  }
    
  useEffect(() => {
    document.getElementById('menu').addEventListener('click', (e) => {
        let div = document.createElement('div');
        let btn1 = document.createElement('button');
        let btn2 = document.createElement('button');
        let btn3 = document.createElement('button');
        div.classList.add(styles.menu);
        btn1.textContent = 'Delete';
        btn2.textContent = 'Edit';
        btn3.textContent = 'Close';
        
        e.target.parentElement.appendChild(div);
        div.append(btn1, btn2, btn3);


        btn1.addEventListener('click', () => {
            deletePost(postId);
        });

        btn2.addEventListener('click', () => {
            window.location.assign(`/posts/${postId}/edit`)
        })

        btn3.addEventListener('click', () => {
            div.remove();
        })
    })
  }, [])

  return (
    <div className={styles.postMenuContainer}>
        <HiOutlineDotsVertical id='menu'  />
    </div>
  )
}

export default PostMenu;