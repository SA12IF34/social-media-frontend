'use client';
import {redirect} from 'next/navigation';
import React, {useEffect, useRef, useState} from 'react';
import {BiDotsVerticalRounded} from 'react-icons/bi'
import styles from '@/app/styles/post.module.css';
import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL+'/projects/social_media/'
})


function Comments({postId, comments, username}) {

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
            let button = document.createElement('div');
            ele.classList.add(styles.comment);
            ele.id = `${data['id']}`;
            h4.classList.add(styles.commentAuthor);
            p.classList.add(styles.commentContent);
            button.classList.add(styles.options);
            button.id = 'options';

            h4.textContent = `@${data['author']}`;
            p.innerText = data['content'];
            button.innerHTML = `
            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path>
            </svg>
            `;
            

            button.onclick = (e) => {
                handleClick(e);
            }
            ele.appendChild(h4);
            ele.appendChild(p);
            ele.appendChild(button);

            comments.firstElementChild ? 
            comments.insertBefore(ele, comments.firstElementChild) :
            comments.appendChild(ele);
            commentRef.current.value = '';
        }
    } catch (error) {
        if (error.response) {
            if (error.response.status === 403) {
                window.location.assign('/')
            }
        }
        
    }
    return;
  };

  async function handleDelete(commentId) {
    const res = await api.delete(`comment/${commentId}/`);

    if (res.status === 204) {
        document.getElementById(commentId).remove()
    }
    return;
  }


  function handleClick(e) {

    if (e.target.tagName !== 'svg') {
        return;
    }

    let options = e.target.parentElement;
    console.log(options)

    let div = document.createElement('div');
    let btn1 = document.createElement('button');
    let btn2 = document.createElement('button');

    btn1.textContent = 'Delete';
    btn2.textContent = 'Close';

    div.append(btn1,btn2);
    options.appendChild(div);
    div.classList.add(styles.optionsContainer);
    div.id = 'optionsContainer';

    btn1.addEventListener('click', () => {
        let commentId = options.parentElement.id;
        handleDelete(commentId);
    })

    btn2.addEventListener('click', () => {
        div.remove();
    })
    return;
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
                    <div key={c.id} id={`${c.id}`} className={styles.comment}>
                        <h4 className={styles.commentAuthor}>@{c.author}</h4>
                        <p className={styles.commentContent}>
                            {c.content}
                        </p>
                        {username === c.author ? (
                            <div onClick={handleClick} id='options' className={styles.options}>
                                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path>
                                </svg>
                            </div>
                        ): (<></>)}
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