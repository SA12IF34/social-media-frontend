'use client';
import React, {useEffect, useState} from 'react';
import styles from '@/app/styles/page.module.css';
import Link from 'next/link';
import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL+'/social_media/'
})
export {api};

function Post({len, p}) {

  const [author, setAuthor] = useState(); 

  async function getAuthor() {
    try {
      const res = await api.get(`accounts/${p.author}/`);
      if (res.status === 200) {
        const data = await res.data;
        setAuthor(data);

      }
    } catch (error) {
      return;
    }

  }

  useEffect(() => {
    setAuthor(null);
    getAuthor();
  }, [len])

  // useEffect(() => {
  //   if (id === len-3) {
  //     const observer = new IntersectionObserver((entries, observer) => {
  //       entries.forEach(entry => {
  //         if (entry.isIntersecting) {
  //           console.log("we reached the third element");
  //         }
  //       })
  //     })
  //     if (document.getElementById(`ele-${len-3}`)) {
  //       observer.observe(document.getElementById(`ele-${len-3}`));
  //     }
  //   }
  // }, [])

  return (
    <Link style={{color: 'white', textDecoration: 'none'}} href={`/posts/${p['post_id']}/`}>
        <div>
          <div data-testid='post' className={styles.post}>
            {
              author ? (
                <Link href={`/users/${author.id}/`}>
                  <div className={styles.authorAccount}>
                    <div className={styles.img}>
                      {author.profile_img && <img src={process.env.NEXT_PUBLIC_BASE_URL+author.profile_img} />}
                    </div>
                    <div>
                      <h4>{author['fname']} {author['lname']}</h4>
                      <h5 data-testid='post-author'>@{author['username']}</h5>
                    </div>
                  </div>
                </Link>
              ) : ''
            }
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

export default Post