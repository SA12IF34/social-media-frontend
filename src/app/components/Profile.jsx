'use client';
import React, {useState, useEffect} from 'react';
import Link from 'next/link';
import styles from '@/app/styles/profile.module.css';

function Profile({
    posts, 
    followers,
    followings,
    me,
    fname
}) {
 
  const [contentName, setContentName] = useState('posts');
  const [content, setContent] = useState([]);

  useEffect(() => {
    let btns = document.querySelectorAll('#list button');
    btns.forEach(btn => {
        btn.onclick = () => {
            btns.forEach(btn2 => {
                if (btn2 !== btn) {
                    btn2.classList.remove(styles.clicked);
                }
            })
            btn.classList.add(styles.clicked);
            setContentName(btn.textContent);
        }
    })
  }, [])

  const mapPosts = p => {
    return (
        <Link style={{color: 'white', textDecoration: 'none'}} href={`/posts/${p['post_id']}/`}>
            <div className={styles.postContainer}>
                <div className={styles.post}>
                    <p >
                    {`${p['content']}`}
                    </p>
                    <br />
                    <br />
                    <div>
                        {p.file && <img src={process.env.NEXT_PUBLIC_BASE_URL+p.file} alt="post " />}
                    </div>
                </div>
            </div>
        </Link>
    )
  }
  const mapAccounts = f => {
    return (
        <Link href={`/users/${f['user']}`} style={{color: 'white', textDecoration: 'none'}}>
            <div className={styles.account}>
                <div className={styles.img}>
                    {f['profile_img'] && <img src={process.env.NEXT_PUBLIC_BASE_URL+f['profile_img']} />}
                </div>
                <div>
                    <h4>{f['fname']} {f['lname']}</h4>
                    <h5>@{f['username'] || f['name']}</h5>
                </div>
            </div>
        </Link>
    )

  }

  
  return (
    <div className={styles.profileContainer}>
        <div>
            <div id='list' className={styles.list}>
                <button className={styles.clicked}>posts</button>
                <button>followers</button>
                <button>followings</button>
            </div>
            <div id='' className={styles.content}>
                {
                contentName === 'posts' ? posts && posts.length > 0 ? posts.map(mapPosts)
                : me ? (<h2>you didn't share anything yet</h2>) : (<h2>{fname} didn't share anything yet</h2>)
                : contentName === 'followers' ? followers && followers.length > 0 ? followers.map(mapAccounts) 
                : me ? (<h2>you don't have followers</h2>) : (<h2>{fname} doesn't have followers</h2>)
                : contentName === 'followings' ? followers && followings.length > 0 ? followings.map(mapAccounts) 
                : me ? (<h2>you didn't follow anyone</h2>) : (<h2>{fname} didn't follow anyone</h2>) : (<h2>we ran into a problem</h2>)
                }
            </div>
        </div>
    </div>
  )
}

export default Profile;