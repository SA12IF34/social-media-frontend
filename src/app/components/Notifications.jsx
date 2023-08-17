'use client';
import Link from 'next/link';
import React, {useState, useEffect} from 'react';
import styles from '@/app/styles/search.module.css';
import {MdClear} from 'react-icons/md'
import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL+'/projects/social_media/'
})


function Notifications() {

  const [notifications, setNotifications] = useState([]);

  async function getNotifications() {
    const res = await api.get('notifications/');
    if (res.status === 200) {
        const data = await res.data;

        setNotifications(data);
    } else if (res.status === 403) {
        alert("You are not authencated to get notifications.");
    }
  }


  async function handleDeleteNotification(id) {
    const res = await api.delete(`notification/${id}/delete/`);
    if (res.status === 202) {
        const data = await res.data;
        setNotifications(data);
    } else {
        alert('there is a problem');
    }
  }

  let n = 0;
  useEffect(() => {
    if (n < 1) {
        getNotifications();

        n=1;
    }
  }, [])

  return (
    <div>
        <ul className={styles.results}> 
            {notifications.map(notification => {
                return (
                    <li>
                        <Link href={`/users/${notification.account}/`}>
                            <p>
                            {notification.notification_type === 'follow' 
                            ? <>{notification.username} has followed you</> 
                            : <>{notification.username} has unfollowed you</>}
                            </p>
                            <span onClick={(e) => {
                                e.preventDefault();
                                handleDeleteNotification(notification.id);
                            }}>
                                <MdClear />
                            </span>
                        </Link>
                    </li>
                )
            })}
        </ul>
    </div>
  )
}

export default Notifications;