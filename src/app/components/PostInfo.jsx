'use client';
import React from 'react';
import styles from '@/app/styles/page.module.css';
import {BiLike, BiDislike} from 'react-icons/bi';
import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const api = axios.create({
    baseURL: 'https://saifchan.site/projects/social_media/'
})

function PostInfo({postId, likes, dislikes}) {

    async function handleRequest(req, num) {
        let requestData;
        if (req === 'like') {
            requestData = {
                likes: num+1
            }
        } else if (req === 'dislike') {
            requestData = {
                dislikes: num+1
            }
        }
        const res = await api.patch(`posts/${postId}/`, requestData);
        
        if (res.status === 202) {
            console.log('liked');
            return;
        }
        console.log('didnot like')
    }

    document.createElement('span').lastElementChild
  return (
    <div className={styles.postInfo}>
      <span onClick={(e) => {
        handleRequest('like', parseInt(likes))
        document.getElementById('likes').innerText = parseInt(likes) +1 ;
      }} ><BiLike /><span id='likes'>{likes}</span></span>
      <span onClick={(e) => {
        handleRequest('dislike', parseInt(dislikes));
        document.getElementById('dislikes').innerText = parseInt(dislikes) +1 ;
      }} ><BiDislike /><span id='dislikes'>{dislikes}</span></span> 
    </div>
  )
}

export default PostInfo;