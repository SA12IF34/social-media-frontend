'use client';
import React from 'react';
import styles from '@/app/styles/profile.module.css';
import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const api = axios.create({
    baseURL: 'https://saifchan.site/projects/social_media/'
})

function FollowBtn({following, target}) {


  async function handleFollow() {
    const res = await api.post('follow/', {
        target: target
    });

    if (res.status === 202) {
        window.location.reload();
    }
  }

  async function handleUnfollow() {
    const res = await api.post('unfollow/', {
      target: target
    });

    if (res.status === 202) {
      window.location.reload();
    }
  }

  return (
    <button onClick={() => {
        if (following) {
          handleUnfollow();
        } else {
          handleFollow();
        }
    }} className={styles.followBtn}>{following ? (<>unfollow</>) : (<>follow</>)}</button>
  )
}

export default FollowBtn;