'use client';
import { useRef, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link'
import styles from '@/app/styles/account.module.css';
import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL+'/projects/social_media/'
})


export default function Account() {

    const nameRef = useRef(); 
    const emailRef = useRef();
    const pswrdRef = useRef();

    async function handleLogin() {
        try {
            const res = await api.post('login/', {
                username: nameRef.current.value.toLowerCase(),
                email: emailRef.current.value,
                password: pswrdRef.current.value
            })
            if (res.status === 202) {
                window.localStorage.setItem('auth', 'yes');
                window.location.assign('/');
            }
        } catch (error) {
            if (error['response']['status'] === 404) {
                alert("User does not exist or you entered wrong data.")
            }  
        }
    }

    
    async function getToken() {
        const res = await api.get('token/');
        if (res.status === 200) {
            console.log("yes")
            window.location.reload();

        }
    }

    useEffect(() => {
        if (localStorage.getItem('auth')) {
            window.location.assign('/');
        }
    }, [])

    return (
        <>
        <Head>
            <title>login</title>
        </Head>
        <div className={styles.main}>
            <div>
                <h3>
                    Login :
                </h3>
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
                <br />
                <span>or</span>
                <br />
                <Link href={'/register/'}>create account</Link>
            </div>
        </div>
        </>
    )
}