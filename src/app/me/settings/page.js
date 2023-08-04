'use client';
import Head from 'next/head';
import { redirect } from 'next/navigation';
import {useState, useEffect} from 'react';
import styles from '@/app/styles/settings.module.css';
import SideBar from '@/app/components/SideBar';
import {AiOutlineEdit} from 'react-icons/ai';
import validator from 'validator';
import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const api = axios.create({
    baseURL: 'https://saifchan.online/projects/social_media/'
})

export default function Settings() {

    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [img, setImg] = useState(null);


    async function getAccount() {
        try {
            const res = await api.get('me/');
        
            if (res.status === 200) {
                const data = await res.data;
                setUsername(data['username']);
                setEmail(data['email']);
                setImg(data['profile_img']);
            }
        } catch (error) {
            window.location.assign('/');
        }
    }

    async function handleEdit(data) {
        const res = await api.patch("me/", data, {
            headers: {
                'Accept': "application/json",
                'Content-Type': "multipart/form-data"
            }
        });

        if (res.status === 202) {
            window.location.reload();
        } else if (res.status === 400) {
            console.log('shit');
        } else if (res.status === 500) {
            console.log("SHIT !!!!");
        }
    }

    async function handleLogout() {
        const res = await api.post('logout/', {});

        if (res.status === 202) {
            localStorage.clear();
            window.location.assign('/');
        }
    }

    async function handleClose() {
        const res = await api.post('close-account/', {});

        if (res.status === 204) {
            localStorage.clear();
            window.location.assign('/');
            
        } else {
            alert("We couldn't delete your account.")
        }
    
    }

    useEffect(() => {
        
        if (!username && !email) {
            getAccount();
            
        } 
        
        
    }, [])

    useEffect(() => {
        let btns = document.querySelectorAll('#dataBtn');

        btns.forEach(b1 => {
            let input = b1.previousElementSibling;
            

            b1.addEventListener('click', () => {
                input.setAttribute("contentEditable", true);
                input.classList.add(styles.editable);
                input.focus();

                let submitBtn = document.getElementById("submit");
                let cancelBtn = document.getElementById("cancel");
                submitBtn.style.display = 'inline-block';
                cancelBtn.style.display = 'inline-block';


                btns.forEach(b2 => {
                    if (b2 !== b1) {
                        let input = b2.previousElementSibling;
                        input.setAttribute("contentEditable", false);
                        input.classList.remove(styles.editable);
                    }
                })

                cancelBtn.onclick = () => {
                    input.setAttribute("contentEditable", false);
                    input.classList.remove(styles.editable);

                    btns.forEach(b3 => {
                        let input = b3.previousElementSibling;
                        if (input.id === 'username') {
                            input.textContent = username;
                        } else if (input.id === 'email') {
                            input.textContent = email;
    
                        } else if (input.id = 'password') {
                            input.textContent = '';
                        }
                    })
                    submitBtn.style.display = 'none';
                    cancelBtn.style.display = 'none';
                }

                submitBtn.onclick = () => {
                    input.setAttribute("contentEditable", false);
                    input.classList.remove(styles.editable);

                    let data = {}
                    btns.forEach(b3 => {
                        let input = b3.previousElementSibling;
                        if (input.id === 'username') {
                            if (input.textContent !== username) {
                                if (input.textContent.length >= 3) {
                                    data['username'] = input.textContent;
                                } else {
                                    alert("choose longer username");
                                }
                            }

                        } else if (input.id === "email") {
                            if (input.textContent !== email) {
                                if (input.textContent.length > 0 && validator.isEmail(input.textContent)) {
                                    data['email'] = input.textContent;
                                } else {
                                    alert("you entered invalid email")
                                }
                            }


                        } else if (input.id === "password") {
                            if (input.textContent.length > 0) {
                                if (input.textContent.length >= 4) {
                                    data['password'] = input.textContent;
                                } else {
                                    alert("you entered invalid password");
                                }
                            }
                            
                        }
                    })
                    if (data) {
                        handleEdit(data);
                    } 

                    submitBtn.style.display = 'none';
                    cancelBtn.style.display = 'none';

                }
            })
        })

    }, [username, email])

    useEffect(() => {

        let imgInput = document.querySelector("input#img");
        let logoutBtn = document.getElementById("logout");
        let closeBtn = document.getElementById("close");


        imgInput.onchange = (e) => {
            handleEdit({profile_img: imgInput.files[0]});
        }
        
        logoutBtn.addEventListener('click', () => {
            handleLogout();
        })

        closeBtn.addEventListener('click', (e) => {
            if (confirm("are you sure you want to close your account ?")) {
                handleClose();
            } else {
             console.log("CANCEL!");
            }
        })
        
    }, [])



    return (
        <>
        <Head>
            <title>settings</title>
        </Head>
        <div className={styles.settings}>
            <SideBar />
            <div className={styles.main}>
                <div>
                    <div className={styles.img}>
                        {img && <img src={'https://saifchan.online'+img} />}
                    </div>
                    <label htmlFor='img' className={styles.imgBtn}>
                        <h4 >change image</h4>
                    </label>
                    <input type="file" id='img' name='img' style={{display: 'none'}} />
                </div>
                <div>
                    <div>
                        <h4>username</h4> 
                        <h4 id='username'>{username}</h4> 
                        <button className='username' id='dataBtn'>
                            <AiOutlineEdit />
                        </button>
                    </div>
                    <br />
                    <div>
                        <h4>email</h4>
                        <h4 id='email'>{email}</h4>
                        <button className='email' id='dataBtn'>
                            <AiOutlineEdit />
                        </button>
                    </div>
                    <br />
                    <div>
                        <h4>password</h4>
                        <h4 id='password'></h4>
                        <button className='password' id='dataBtn'>
                            <AiOutlineEdit />
                        </button>
                    </div>
                    <br />
                    <button style={{display: 'none'}} id='submit' className={styles.submit}>
                        submit
                    </button>
                    <button style={{display: 'none'}} id='cancel' className={`${styles.submit} ${styles.cancel}`}>
                        cancel
                    </button>
                </div>
                <br />
                <button id="logout" className={styles.logout}>
                    logout
                </button>
                <button id="close" className={styles.close}>
                    close account
                </button>
            </div>
        </div>
        </>
    )
}