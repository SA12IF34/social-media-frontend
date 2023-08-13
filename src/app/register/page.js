'use client';
import { useRef, useEffect, useState } from 'react';
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


function Register() {

  const imgRef = useRef();
  const fnameRef = useRef(); 
  const lnameRef = useRef(); 
  const nameRef = useRef(); 
  const emailRef = useRef();
  const pswrdRef = useRef();
  const pswrdRef2 = useRef();

  const [imgData, setImgData] = useState();
  const [img, setImg] = useState();

  async function handleCreate() {

    if (pswrdRef.current.value === pswrdRef2.current.value) {
        let data = {
            first_name: fnameRef.current.value.charAt(0).toUpperCase() + fnameRef.current.value.slice(1),
            last_name: lnameRef.current.value.charAt(0).toUpperCase() + lnameRef.current.value.slice(1),
            username: nameRef.current.value.toLowerCase(),
            email: emailRef.current.value,
            password: pswrdRef.current.value
        }
        if (img) {
            data['img'] = img;
        }
        const res = await api.post('create-account/', data, {
            headers: {
                'Accept': "application/json",
                'Content-Type': "multipart/form-data"
            }
        })
        
        if (res.status === 201) {
            window.localStorage.setItem('auth', 'yes');
            window.location.assign('/');
        
        } else if (res.status ===  400) {
            const data = await res.data;
            
            if (data['response'] === 'email') {
                alert("email already exists");
            } else if (data['response'] === 'username') {
                alert("username must be unique")
            }
        
        } else {
            alert("there are some problems on server side ")
        }
    } else {
        alert("password doesn't match");
    }
  }

  async function handleChooseImg() {
    let input = imgRef.current;
    if (input.files[0]) {
        setImg(input.files[0]);
        let reader = new FileReader();
        
        reader.onload = () => {
            setImgData(reader.result);
        }

        reader.readAsDataURL(input.files[0])
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
        <title>
            create account
        </title>
    </Head>
    <div className={styles.main}>
        <div>
            <h3>
                Signup :
            </h3>
            <br />
            <br />
            <div className={styles.imgContainer}>
                <div className={styles.img}>
                    {imgData && <img src={imgData} />}
                </div>
                <div>
                    <label htmlFor='img'>
                        <h3>choose an image</h3>
                    </label>
                    <input onChange={() => {
                        handleChooseImg();
                    }} type="file" name='img' id='img' ref={imgRef} />
                    <h5>not required</h5>
                </div>
            </div>
            <br />
            <form onSubmit={(e) => {
                e.preventDefault();
                handleCreate();
            }} >
                <div className={styles.names}>
                    <input type='text' placeholder='first name' ref={fnameRef} required />
                    <input type='text' placeholder='last name' ref={lnameRef} required />
                </div>
                <br />
                <input type='text' placeholder='username' ref={nameRef} required />
                <br />
                <input type='email' placeholder='email' ref={emailRef} required />
                <br />
                <input type='password' placeholder='password' ref={pswrdRef} required />
                <br />
                <input type='password' placeholder='repeat password' ref={pswrdRef2} required />
                <br />
                <input type='submit' value='submit' />
            </form>
            <br />
            <span>or</span>
            <br />
            <Link href={'/login/'}>already have an account</Link>
        </div>
    </div>
    </>
  )
}

export default Register