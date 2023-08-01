'use client';
import {redirect} from 'next/navigation';
import React, {useEffect, useRef} from 'react';
import styles from '@/app/styles/post.module.css';
import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const api = axios.create({
    baseURL: 'https://saifchan.site/projects/social_media/'
})

function Comments({postId, comments}) {

  const commentRef = useRef();

  async function handleComment() {
    try {
        const res = await api.post(`comments/${postId}/`, {
            content: commentRef.current.value
        })
        
        if (res.status === 201) {
            console.log("Done !");
            const data = await res.data;
            let comments = document.getElementById("comments");
            let ele = document.createElement('div');
            let h4 = document.createElement('h4');
            let p = document.createElement('p');
            ele.classList.add(styles.comment);
            h4.classList.add(styles.commentAuthor);
            p.classList.add(styles.commentContent);
            h4.textContent = `@${data['author']}`;
            p.innerText = data['content'];
            ele.appendChild(h4);
            ele.appendChild(p);
    
            comments.firstElementChild ? 
            comments.insertBefore(ele, comments.firstElementChild) :
            comments.appendChild(ele);
            commentRef.current.value = '';
        }
    } catch (error) {
        if (error.response.status === 403) {
            window.location.assign('/')
        }
        
    }
  }

  return (
    <div className={styles.commentsContainer}>
        <div className={styles.postComment}>
            <h4>post a comment</h4>
            <br />
            <div>
                <input type="text" id='comment' className={styles.commentInput} ref={commentRef} />
                <button onClick={() => {
                    handleComment();
                }} className={styles.commentBtn}>
                    comment
                </button>
            </div>
        </div>
        <div id='comments' className={styles.comments}>
            {comments && comments.length > 0 
            ? comments.map(c => {
                return (
                    <div className={styles.comment}>
                        <h4 className={styles.commentAuthor}>@{c.author}</h4>
                        <p className={styles.commentContent}>
                            {c.content}
                        </p>
                    </div>
                  )
            })
            : (<div></div>)
            }
        </div>
    </div>
  )
}

export default Comments;