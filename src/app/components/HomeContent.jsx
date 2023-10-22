'use client'
import React, {useEffect, useState} from 'react';
import styles from '@/app/styles/page.module.css';
import Post from './Post';
import axios from 'axios'; 

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL+'/projects/social_media/'
});
export {api}; 

function MainContent() {

  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState([]);
  const [limit, setLimit] = useState(0);
  const [contentType, setContentType] = useState('latest');
 
  async function getLatest() {
    const res = await api.get(`posts/type/latest/`);

    if (res.status === 200) {
      const data = await res.data;
      // setLimit(limit+10);
      setContent(data) 
    }
    return null;
    
  }

  async function getForyou() {
    const res = await api.get(`posts/type/foryou/`);
    if (res.status === 200) {
      const data = await res.data;
      // setLimit(limit+10);
      setContent(data);
    }
    return null
  }

  


  useEffect(() => {

    if (loading) {
      getLatest();
      setLoading(false);
    }


    let types = document.querySelectorAll("#contentType h4");

    types.forEach(t => {
      t.onclick = () => {
        types.forEach(t2 => {
          t !== t2 ? t2.classList.remove(styles.chosen) : '';
        })
        t.classList.add(styles.chosen);
        // setContent([])
        if (t.id === 'foryou') {
          setContentType('foryou');
          getForyou();
        } else if (t.id === 'latest') {
          setContentType('latest')
          getLatest();
        }
      }
    })

  }, [])

  return (
    <div data-testid='container' className={styles.main}>
        <div id='contentType' className={styles.contentChoices}>
          <h4 id='foryou'>For You</h4>
          <h4 className={styles.chosen} id='latest'>Latest</h4>
        </div>
        <div className={styles.content}>
            { content.length > 0 ?
              content.map((p) => {
                  return (
                    <Post len={content.length} p={p} /> 
                  )
                
              }) : contentType === 'latest'? (<h2 className={styles.msg}>no one has shared anything yet</h2>) : (<h2 className={styles.msg}>Here posts of people you follow will appear</h2>)
            }
        </div>
    </div>
  )
}

export default MainContent; 