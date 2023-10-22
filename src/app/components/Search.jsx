'use client';
import Link from 'next/link';
import React, {useRef, useState} from 'react';
import styles from '@/app/styles/search.module.css';
import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL+'/projects/social_media/'
})
export {api};

function Search() {

  const searchRef = useRef();
  const [results, setResults] = useState([]);

  async function handleSearch(term) {
    try {
        const res = await api.get(`search/${term}/`)
        if (res.status === 200) {
            const data = await res.data;
            setResults(data);
        }else {
            setResults([]);
        }
    } catch (error) {
        setResults([])
    }
  } 

  return (
    <div className={styles.search}>
        <input onChange={() => {
            handleSearch(searchRef.current.value);
        }} type="text" className={styles.input} ref={searchRef} placeholder='type username' />
        <br />
        <ul className={styles.results}>
            {results.map((result) => {
                return (
                    <li key={result.id}>
                        <Link href={`/users/${result.id}/`}>
                        <div className={styles.img}>
                            {result.profile_img && <img src={process.env.NEXT_PUBLIC_BASE_URL+result.profile_img} />}
                        </div>
                        <div className={styles.names}>
                            <h4>{result.fname} {result.lname}</h4>
                            <h5>@{result.username}</h5>
                        </div>
                        </Link>
                    </li>
                )
            })}
        </ul>
    </div>
  )
}

export default Search;