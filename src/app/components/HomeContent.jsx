'use client'
import React from 'react';
import styles from '@/app/styles/page.module.css';


function MainContent({content}) {
  return (
    <div className={styles.main}>
        <div className={styles.contentChoices}>
          <h4 id={styles.chosen}>For You</h4>
          <h4 id=''>Latest</h4>
        </div>
        <div className={styles.content}>
            {content && (
                <div>
                    hallo
                </div>
            )}
        </div>
    </div>
  )
}

export default MainContent;