'use client';
import React, {useEffect, useState} from 'react';
import styles from '@/app/styles/page.module.css';
import Link from 'next/link';
import {BiHomeAlt2, BiImageAdd, BiSearch, BiArrowBack} from 'react-icons/bi';
import {MdOutlineNotificationsNone} from 'react-icons/md'

function SideBar({img}) {

  const [searchVal, setSearchVal] = useState('');
  let val = '';
  
  let n = 0;
  let num = 0;
  useEffect(() => {
    if (n < 1) {

        let side = document.getElementById("side");

        let search = document.getElementById("search");
        search.addEventListener('click', (e) => {
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
        
            inputBtn.onclick = () => {
                console.log(val);
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

        })

        let notifications = document.getElementById("notifications")
        notifications.addEventListener("click", (e) => {
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

        })  

        n = 1;
    }
  }, [])

  return (
    <div id='grandParent' className={styles.sideParent}>
        <section id='side' className={styles.side}>
        <Link href={'/'}> 
            <h1>Name</h1>
        </Link>
        <br />
        <div className={styles.navigate}>
            <div className={styles.smProfile}>
                {img && (<img src={img} alt="profile img" />)}
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
            <input id='searchInput' type="text" />
            <button id='searchBtn'>
                <BiSearch />
            </button>
        </div>
        <ul></ul>
    </div>
    <div id='notificationsContainer' className={styles.notifications}>
        <button id='notificationsBack'>
            <BiArrowBack />
        </button>
        <ul>

        </ul>
    </div> 
    </div>
  )
}

export default SideBar;