import {cookies} from 'next/headers';
import {redirect} from 'next/navigation';
import styles from '@/app/styles/profile.module.css';
import SideBar from '@/app/components/SideBar';
import FollowBtn from '@/app/components/FollowBtn';
import Profile from '@/app/components/Profile';

const baseUrl = 'https://saifchan.site';
async function getUser(userId) {
    const res = await fetch(`${baseUrl}/projects/social_media/accounts/${userId}/`, {
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

    return false;
}

async function getUserPosts(user) {
    const res = await fetch(`${baseUrl}/projects/social_media/posts/author/${user}/`, {
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
}

async function checkFollow(account, id) {
    const res = await fetch(`${baseUrl}/projects/social_media/me/`, {
        method: 'GET',
        headers: {
            Cookie: cookies().toString()
        },
        cache: 'no-store'
    })

    if (res.status === 200) {
        const data = await res.json();
        if (data['id'] === id) {
            redirect('/me');
        }
        const isFollowing = data['followings'].includes(account);

        return isFollowing;
    }
}

export const metadata = {
    title: 'profile',
    description: 'Generated by create next app',
}

export default async function User({params: {user}}) {
    let data;
    let userPosts;
    let isFollowing;
    try {
        data = await getUser(user);
        userPosts = await getUserPosts(data['id']);
        isFollowing = await checkFollow(data['id'], data['id']);    
    } catch (error) {
        redirect('/');
    }

    return (
        <div className={styles.profile}>

            <SideBar />
            <div className={styles.main}>
                <div className={styles.info}> 
                    <div>
                        <div className={styles.img}>
                        {data['profile_img'] && <img  src={'https://saifchan.site'+data['profile_img']}/>}
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
                            followers {data['followers'].length}
                        </span>
                    </div>
                    {!isFollowing && <FollowBtn following={false} target={data['user']} />}
                    {isFollowing && <FollowBtn following={true} target={data['user']} />}
                </div>
                <Profile followers={data['followers']} followings={data['followings']} posts={userPosts} me={false} fname={data['fname']} />
            </div>
        

        </div>
    )
}