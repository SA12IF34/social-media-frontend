'use client';
import { useRef } from 'react';
// import { cookies } from 'next/headers';
import styles from '@/app/styles/account.module.css';
import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const api = axios.create({
    baseURL: 'http://0.0.0.0:8000/projects/social_media/'
})

export default function Account() {

    const nameRef = useRef(); 
    const emailRef = useRef();
    const pswrdRef = useRef();

    async function handleLogin() {
        const res = await api.post('create-account/', {
            username: nameRef.current.value,
            email: emailRef.current.value,
            password: pswrdRef.current.value
        })
        if (res.status === 202) {
            console.log("YES !!");
        }
    }

    return (
        <div className={styles.main}>
            <div>
                <p>

                </p>
                <br />
                <form onSubmit={(e) => {
                    e.preventDefault();
                    handleLogin();
                }} >
                    <input type='text' placeholder='username' ref={nameRef} />
                    <br />
                    <input type='email' placeholder='email' ref={emailRef} />
                    <br />
                    <input type='password' placeholder='password' ref={pswrdRef} />
                    <br />
                    <input type='submit' value='submit' />
                </form>
            </div>
        </div>
    )
}