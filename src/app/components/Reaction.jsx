'use client';
import {useEffect, useState} from 'react';
import styles from '@/app/styles/post.module.css';
import {BiLike, BiDislike, BiSolidLike, BiSolidDislike} from 'react-icons/bi';
import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;
 
const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL+'/social_media/'
})

function Reaction({post}) {

  let [liked, setLiked] = useState(post.liked);
  let [disliked, setDisliked] = useState(post.disliked);
  let [likesNum, setLikesNum] = useState(post.likes);
  let [dislikesNum, setDislikesNum] = useState(post.dislikes);


  async function handleLike() {
    const res = await api.post(`like/${post.post_id}/`);
    if (res.status === 202) {
      setLikesNum(likesNum+1);
      if (disliked) {
        setDislikesNum(dislikesNum-1);
      }
    } else if (res.status === 205) {
      setLikesNum(likesNum-1);
    }
  }

  async function handleDislike() {
    const res = await api.post(`dislike/${post.post_id}/`);
    if (res.status === 202) {
      setDislikesNum(dislikesNum+1);
      if (liked) {
        setLikesNum(likesNum-1)
      }
    } else if (res.status === 205) {
      setDislikesNum(dislikesNum-1);
    }
  }

  useEffect(() => {


    let like = document.getElementById("like");
    let dislike = document.getElementById("dislike");

    
    like.onclick = () => {
      handleLike();
      if (liked) {
        setLiked(false);
        return;
      }
      
      setLiked(true);
      setDisliked(false);

      return
    }

    dislike.onclick = () => {
      handleDislike();
      
      if (disliked) {
        setDisliked(false);
        return;
      }
      
      setDisliked(true);
      setLiked(false);
      
      return
    }


  })

  return (
    <div className={styles.reactions}>
      <span id='like'>{liked ? (<BiSolidLike id={'likeI'} />) : (<BiLike id={'likeI'} />)} {likesNum}</span> 
      <span id='dislike'>{disliked ? (<BiSolidDislike id={'disilkeI'} />) : (<BiDislike id={'dislikeI'} />)} {dislikesNum}</span>
    </div>
  )
}

export default Reaction;