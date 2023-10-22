'use client';
import React, {useEffect, useState, useRef} from 'react';
import styles from '@/app/styles/page.module.css';
import Link from 'next/link';
import {redirect} from 'next/navigation';
import {BiHomeAlt2, BiImageAdd, BiSearch, BiArrowBack} from 'react-icons/bi';
import {MdOutlineNotificationsNone} from 'react-icons/md';
import {CgProfile} from 'react-icons/cg';
import {MdClear} from 'react-icons/md'
import axios from 'axios'; 
 
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL+'/projects/social_media/'
})
export {api};

function SideBar({content, className}) {
  const [searchVal, setSearchVal] = useState('');
  const searchRef = useRef();
  const [results, setResults] = useState([]);
  const [notifications, setNotifications] = useState([]);
  let val = '';
  
  async function getNotifications() {
    try {
        const res = await api.get('notifications/');
        if (res.status === 200) {
            const data = await res.data;

            setNotifications(data);
            if (data.length > 0) {
                let notificationsEle = document.getElementById('notifications');
                let span = document.createElement('span');
                span.id = 'notify';
                span.innerHTML = `
                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 0 1 0-96 48.01 48.01 0 0 1 0 96z"></path>
                </svg>
                `;
                notificationsEle.appendChild(span);
            }
        } else {
            console.log('Failed 1')
            return;
        }
    } catch (error) {
        console.log('Failed 2')
    }
  } 

  let n = 0;
  useEffect(() => {
    if (n < 1) {

        getNotifications();

        let side = document.getElementById("side");

        let search = document.getElementById("search");
        search.addEventListener('click', (e) => {
            

            if (window.matchMedia('(min-width: 914px').matches) {
                e.preventDefault();
                let searchContainer = document.getElementById("searchContainer");
                let searchInput =document.getElementById("searchInput");
                let inputBtn = document.getElementById("searchBtn");
                let back = document.getElementById("searchBack");

                searchInput.value = searchVal;
                searchInput.onchange = (e) => {
                    setSearchVal(e.target.value);
                    val = e.target.value;
                }
            

                side.classList.remove(styles.sideExtend)
                side.classList.add(styles.sideShrink);
                searchContainer.classList.remove(styles.shrink);
                searchContainer.classList.add(styles.extend);
                

                back.onclick = () => {
                    side.classList.remove(styles.sideShrink);
                    side.style.style = 'width: calc(15vw - 80%)';
                    side.classList.add(styles.sideExtend);
                    searchContainer.classList.remove(styles.extend);
                    searchContainer.classList.add(styles.shrink);
                    
                }
            }

        })

        let notificationsEle = document.getElementById("notifications");
        

        notificationsEle.addEventListener("click", (e) => {
            let span = notificationsEle.querySelector('#notify');
            if (span) {
                span.remove();
            }

            if (window.matchMedia('(min-width: 914px)').matches) {
                e.preventDefault();

                let notificationsContainer = document.getElementById('notificationsContainer')
                let back = document.getElementById("notificationsBack")

                side.classList.remove(styles.sideExtend)
                side.classList.add(styles.sideShrink);
                notificationsContainer.classList.remove(styles.shrink);
                notificationsContainer.classList.add(styles.extend);
            
                back.onclick = () => {
                    side.classList.remove(styles.sideShrink);
                    side.style.style = 'width: calc(15vw - 80%)';
                    side.classList.add(styles.sideExtend);
                    notificationsContainer.classList.remove(styles.extend);
                    notificationsContainer.classList.add(styles.shrink);
                }
            }

        })  

        n = 1;
    }
  }, [])

  async function handleSearch(term) {
    if (term !== '') {
        const res = await api.get(`search/${term}/`);

        if (res.status === 200) {
            const data = await res.data;

            setResults(data);

        }
    } else {
        setResults([]);
    }
  }

  async function handleDeleteNotification(id) {

    const res = await api.delete(`notification/${id}/delete/`);

    if (res.status === 205) {
        const data = await res.data;
        setNotifications(data);
        return;
    } else {
        alert("there is a problem");
    }
  }

  return (
    <div data-testid='side-bar' id='grandParent' className={`${styles.sideParent} ${className}`}>
        <section id='side' className={styles.side}>
        <Link href={'/'}> 
            <h1>Name</h1>
        </Link>
        <br />
        <div className={styles.navigate}>
            <div className={styles.smProfile}>
            <Link href={'/me/'}>
                
                    <CgProfile />                
                
            </Link>
            </div>
            <div>
                <Link id='home' href={'/'}>
                    <span>
                        <BiHomeAlt2 />
                    </span>
                    <h3>home</h3>
                </Link>
            </div>
            <div>
                <Link id='search' href={'/search/'}>
                    <span>
                        <BiSearch />
                    </span>
                    <h3>search</h3>
                </Link>
            </div>
            <div>
                <Link id='notifications' href={'/notifications/'}>
                    <span>
                        <MdOutlineNotificationsNone />
                    </span>
                    <h3>notifications</h3>
                </Link>
            </div>
            <div>
                <Link id='create-post' href={'/create-post/'}>
                    <span>
                        <BiImageAdd />
                    </span>
                    <h3>create post</h3>
                </Link>
            </div>
        </div>
    </section>
    <div className={styles.search} id='searchContainer'>
        <button id='searchBack'>
        <BiArrowBack />
        </button>
        <div style={{width: '100%', height: 'max-content', display: 'flex', justifyContent: 'space-evenly'}}>
            <input data-testid='search-input' onChange={(e) => {
                handleSearch(searchRef.current.value);
            }} id='searchInput' type="text" ref={searchRef} />
            <button id='searchBtn'>
                <BiSearch />
            </button>
        </div>
        <ul id='searchResults' className={styles.results}>
            {results.map(a => {
                return (
                    <li data-testid='search-result'>
                        <Link style={{color: 'white', textDecoration: 'none'}} href={`users/${a.id}/`}>
                            <div className={styles.img}>
                                {a['profile_img'] && <img src={process.env.NEXT_PUBLIC_BASE_URL+a['profile_img']} />}
                            </div>
                            <div>
                                <h4>{a['fname']} {a['lname']}</h4>
                                <h5>@{a['username']}</h5>
                            </div>
                        </Link>
                    </li>
                )
            })}
        </ul>
    </div>
    <div id='notificationsContainer' className={styles.notifications}>
        <button id='notificationsBack'>
            <BiArrowBack />
        </button>
        <ul>
            {notifications && notifications.map(notification => {
                return (
                    <li data-testid='notification' key={notification.account} id={notification.id} className={styles.notification}>
                        <Link href={`/users/${notification.account}/`}>
                            <p>
                                {notification.notification_type === 'follow' 
                                ? (<>{notification.username} has followed you</>) 
                                : (<>{notification.username} has unfollowed you</>)}
                            </p>
                            <span data-testid='delete-notification' onClick={(e) => {
                                e.preventDefault();
                                handleDeleteNotification(notification.id)
                            }} className={styles.remove}>
                                <MdClear />
                            </span>
                        </Link>
                    </li>
                )
            })}
        </ul>
    </div> 
    </div> 
  )
}

export default SideBar;