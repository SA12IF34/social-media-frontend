import SideBar from "@/app/components/SideBar";
import styles from '@/app/styles/post.module.css';
import Header from '@/app/components/PostHeader';
import Reaction from "@/app/components/Reaction";
import Comments from "@/app/components/Comments";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const baseUrl = process.env.BASE_URL;

async function getPost(postId) {
    const res = await fetch(`${baseUrl}/projects/social_media/posts/${postId}/`, {
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
};

async function getComments(postId) {
    const res = await fetch(`${baseUrl}/projects/social_media/comments/${postId}/`, {
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


async function getMyAccount() {
    const res = await fetch(`${baseUrl}/projects/social_media/me/`, {
        method: 'GET',
        headers: {
            Cookie: cookies().toString()
        },
        cache: 'no-store'
    });

    if (res.status === 200) {
        const data = await res.json();

        return data['username'];
    } else if (res.status === 403) {
        return false;
    }

}

export const metadata = {
    title: 'post'
}


export default async function Post({params: { post }}) {
    let postObj;
    let postComments;
    let username;
    try {
        postObj = await getPost(post);
        postComments = await getComments(post);
        username = await getMyAccount();
    } catch (error) {
        redirect('/')
    }

    return (
        <div className={styles.container}>
            
            <SideBar className={styles.barNone} />
            
            <div className={styles.main}>
                <div className={styles.postContainer}>
                    <div className={styles.post}>
                        {postObj && <Header postId={post} baseUrl={baseUrl} author={postObj['author']} />}
                        <br />
                        
                        <div className={styles.postContent}>
                            <p>
                                {postObj['content']}
                            </p>
                            <br />
                            <br />
                            <div className={styles.postImgContainer}>
                                {postObj['file'] && (
                                    <img src={`${baseUrl}${postObj['file']}`} alt="" /> 
                                )}
                            </div>
                        </div>
                        <Reaction post={postObj} />
                    </div>
                    
                    <Comments postId={post} comments={postComments} username={username} />
                </div>
            </div>
        </div>
    )
} 