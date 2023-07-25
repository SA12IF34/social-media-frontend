'use client';
import Link from 'next/link';
import styles from '@/app/styles/post.module.css';
import SideBar from '../components/SideBar';
import PostBoard from '../components/PostBoard';

export default function CreatePost() {


    return (
        <div className={styles.container}> 
            <SideBar />
            <div className={styles.playground}> 
                <PostBoard />
                <div className={styles.assets}>
                    <div>
                        <h2>attach a file</h2>
                        <h5>Drag a file here or press upload</h5>
                        <br/>
                        <button>upload</button>
                    </div>
                    <button onClick={(e) => {
                        console.log(document.getElementById("write").value);
                    }} className={styles.share}>share</button>
                </div>
            </div>
        </div>
    )
}