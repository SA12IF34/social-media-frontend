'use client';
import Image from 'next/image';
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
    baseURL: 'http://127.0.0.1:8000/projects/social_media/'
})

export default function Settings() {

    const [username, setUsername] = useState();
    const [email, setEmail] = useState();


    async function getAccount() {
        const res = await api.get('me/');
        
        if (res.status === 200) {
            const data = await res.data;
            setUsername(data['name']);
            setEmail(data['email']);
        }
    }

    async function handleEdit(data) {
        const res = await api.patch("me/", data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (res.status === 202) {
            console.log("YES !!!!");
        } else if (res.status === 400) {
            console.log('shit');
        } else if (res.status === 500) {
            console.log("SHIT !!!!");
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

    let n=0;

    return (
        <div className={styles.settings}>
            <SideBar />
            <div className={styles.main}>
                <div>
                    <div className={styles.img}>

                    </div>
                    <button className={styles.imgBtn}>
                        <h4 >change image</h4>
                    </button>
                </div>
                <div>
                    <div>
                        <h4>name</h4> 
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

            </div>
        </div>
    )
}