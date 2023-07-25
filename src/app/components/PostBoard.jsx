'use client';
import React, {useEffect} from 'react';
import styles from '@/app/styles/post.module.css';

function PostBoard() {

  let n = 0;
  useEffect(() => {
    
    document.getElementById("write").focus();

  }, []);

  return (
    <div className={styles.board}>
        <textarea id='write' className={styles.write}>

        </textarea>
    </div>
  )
}

export default PostBoard;