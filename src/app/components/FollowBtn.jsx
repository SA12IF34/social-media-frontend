'use client';
import React, {useState} from 'react';
import styles from '@/app/styles/profile.module.css';
import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL+'/social_media/'
});
export {api};

function FollowBtn({following, target}) {

  const [isFollowing, setFollowing] = useState(following)

  async function handleFollow() {
    const res = await api.post('follow/', {
        target: target
    });

    if (res.status === 202) {
      setFollowing(true);
      window.location.reload(); 

    }
  }

  async function handleUnfollow() {
    const res = await api.post('unfollow/', {
      target: target
    });

    if (res.status === 202) {
      setFollowing(false);
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
    }} className={styles.followBtn}>{isFollowing ? (<>unfollow</>) : (<>follow</>)}</button>
  )
}

export default FollowBtn;