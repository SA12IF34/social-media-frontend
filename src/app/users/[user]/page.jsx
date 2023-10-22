import {cookies} from 'next/headers';
import {redirect} from 'next/navigation';
import Link from 'next/link';
import styles from '@/app/styles/profile.module.css';
import SideBar from '@/app/components/SideBar';
import FollowBtn from '@/app/components/FollowBtn';
import Profile from '@/app/components/Profile';
 
const baseUrl = process.env.BASE_URL;
async function getUser(userId) {
    try {
        const res = await fetch(`${baseUrl}/projects/social_media/accounts/${userId}/`, {
            method: 'GET',
            headers: {
                Cookie: cookies().toString()
            },
            cache: 'no-store'
        });
    
        if (res.status === 500) throw "serverError";
        if (res.status === 404) throw "doesNotExist";
        if (res.status === 200) {
            const data = await res.json();
    
            return data;
        } 
    } catch (error) {

        switch (error) {
            case "doesNotExist":
                return false;
        
            case "serverError":
                return -1;
            default:
                break;
        }
    }

    
}

async function getUserPosts(user) {
    try {
        const res = await fetch(`${baseUrl}/projects/social_media/posts/author/${user}/`, {
            method: 'GET',
            headers: {
                Cookie: cookies().toString()
            },
            cache: 'no-store'
        })
    
        if (res.status === 500) throw 'serverError';
        if (res.status === 200) {
            const data = await res.json();
    
            return data;
        }
    } catch (error) {
        switch (error) {
            case "serverError":
                return -1;
                    
            default:
                break;
        }
    }
}

async function checkFollow(account, id) {
    try {
        const res = await fetch(`${baseUrl}/projects/social_media/me/`, {
            method: 'GET',
            headers: {
                Cookie: cookies().toString()
            },
            cache: 'no-store'
        })

        if (res.status === 500) throw "serverError";
        if (res.status === 403) throw "notAuthenticated";
        if (res.status === 200) {
            const data = await res.json();
            if (data['id'] === id) {
                redirect('/me');
            }
            const isFollowing = data['followings'].includes(account);
            return isFollowing;
        }
    } catch (error) {
        switch (error) {
            case "notAuthenticated":
                return false;
            
            case "serverError":
                return -1;

            default:
                break;
        }
    }
}

export const metadata = {
    title: 'profile',
    description: 'Generated by create next app',
}

export default async function User({params: {user}}) {
    let data = await getUser(user);
    let userPosts = await getUserPosts(data['id']);
    let isFollowing = await checkFollow(data['id'], data['id']);
    

    return (
        <div className={styles.profile}>
            {!data ? 
            <div className={styles.doesNotExist}>
                <h1>User Does Not Exist</h1>
                <Link href={'/'}><h3>Back To Home Page</h3></Link>
            </div> : data === -1 || userPosts === -1 || isFollowing === -1 ? 
            <div className={styles.doesNotExist}>
                <h1>Internal ServerError</h1>
            </div> : <>
                
            <SideBar />
            <div className={styles.main}>
                <div className={styles.info}> 
                    <div>
                        <div className={styles.img}>
                        {data['profile_img'] && <img  src={process.env.BASE_URL+data['profile_img']}/>}
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
        
            </>}
        </div>
    )
}