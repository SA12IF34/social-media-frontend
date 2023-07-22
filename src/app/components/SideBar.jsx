import React from 'react';
import styles from '@/app/styles/page.module.css';

function SideBar({img}) {
  return (
    <section className={styles.side}>
        <h1>Name</h1>
        <br />
        <div className={styles.navigate}>
            <div className={styles.smProfile}>
                {img && (<img src={img} alt="profile img" />)}
            </div>
            <div>
                <span>H</span>
                <h3>home</h3>
            </div>
            <div>
                <span>S</span>
                <h3>search</h3>
            </div>
            <div>
                <span>N</span>
                <h3>notifications</h3>
            </div>
            <div>
                <span>P</span>
                <h3>posts</h3>
            </div>
        </div>
    </section>
  )
}

export default SideBar;