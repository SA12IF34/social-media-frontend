import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import styles from '@/app/styles/profile.module.css';
import SideBar from '../components/SideBar';
import Profile from '../components/Profile';
import {RiSettings5Fill} from 'react-icons/ri';


const baseUrl = 'https://saifchan.online/projects/social_media/';

async function getAccount() {
    const res = await fetch(baseUrl+'me/', {
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

async function getPosts() {
    const res = await fetch(baseUrl+'posts/', {
        method: 'GET',
        headers: {
            Cookie: cookies().toString()
        },
        cache: 'no-store'
    })

    if (res.status === 200) {
        const data = await res.json();

        return data;
    }

    return false;
}

async function getFollowers() {
    const res = await fetch(baseUrl+'followers/', {
        method: 'GET',
        headers: {
            Cookie: cookies().toString()
        }, 
        cache: 'no-store'
    })

    if (res.status === 200) {
        const data = await res.json();
        
        return data;
    }

    return false;
}

async function getFollowings() {
    const res = await fetch(baseUrl+'follow/', {
        method: 'GET',
        headers: {
            Cookie: cookies().toString()
        },
        cache: 'no-store'
    });

    if (res.status === 200) {
        const data = await res.json();

        return data;

    }
} 

export const metadata = {
    title: 'my profile'
}

export default async function MyProfile() {

    let data;
    let posts;
    let followers;
    let followings;
    try {
        data = await getAccount();
        posts = await getPosts();
        followers = await getFollowers();
        followings = await getFollowings();
    } catch (error) {
        redirect('/');
    }

    
    
    return (
        <>

        <div className={styles.profile}>
            <SideBar />
            <main className={styles.main}>
                <div className={styles.info}>
                    <div>
                        <div className={styles.img}>
                        {data['profile_img'] && <img src={'https://saifchan.online'+data['profile_img']} />}
                        </div>
                        <div className={styles.name}>
                            <h3>{data['fname']} {data['lname']}</h3>
                            <h4>@{data['username']}</h4>
                        </div>
                    </div>
                    <div>
                        <span>
                            following {data['followings'].length}
                        </span>
                        <span>
                            followers {followers.length}
                        </span>
                    </div> 
                    <Link href={'/me/settings/'} className={styles.settings}>
                        <RiSettings5Fill />
                    </Link>
                </div>

                <Profile followers={followers} followings={followings} posts={posts} me={true} />
            </main>
        </div>
        </>
    )
}