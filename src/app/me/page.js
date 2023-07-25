// 'use client'
import Image from 'next/image';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import styles from '@/app/styles/profile.module.css';
import SideBar from '../components/SideBar';
import {RiSettings5Fill} from 'react-icons/ri';


async function getAccount() {
    const res = await fetch('http://0.0.0.0:8000/projects/social_media/me/', {
        method: 'GET',
        headers: {
            Cookie: cookies().toString()
        },
        cache: 'no-store'
    })

    if (res.status === 200) {
        const data = await res.json();

        return data
    } else {
        redirect("/");
    }


}

export default async function PersonalProfile() {

    const data = await getAccount();

    let posts = true;

    return (
        <div className={styles.profile}>
            <SideBar />
            <main className={styles.main}>
                <div className={styles.info}>
                    <div>
                        <div className={styles.img}>

                        </div>
                        <div className={styles.name}>
                            <h3>{data['name']}</h3>
                            <h4>@{data['name']}</h4>
                        </div>
                    </div>
                    <div>
                        <span>
                            followings {data['followings'].length}
                        </span>
                        <span>
                            followers {data['followers_number']}
                        </span>
                    </div>
                    <Link href={'/me/settings/'} className={styles.settings}>
                        <RiSettings5Fill />
                    </Link>
                </div>

                <div className={styles.posts}>
                    
                        <div>
                        {posts && (
                            <h2>hillw</h2>
                        )}
                        </div>
                </div>
            </main>
        </div>
    )
}