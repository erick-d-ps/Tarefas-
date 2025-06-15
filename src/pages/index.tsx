import { GetStaticProps } from "next";
import Head from "next/head";
import styles from './home.module.css'

import {collection, getDocs} from 'firebase/firestore'
import { db } from '../services/firebaseConection'

import Image from "next/image";

import heroLogo from "../../public/assets/hero.png"

interface HomeProps{
  posts: number,
  comments: number
}

export default function Home({comments, posts}: HomeProps) {
  return (
    <div className={styles.container}>
      <Head>
      <title
       >Tarefas+ | Organize suas tarefas de forma</title>
      </Head>

      <main className={styles.main}>
        <div className={styles.LogoContent}>
          <Image
            className={styles.hero}
            alt="Logo tarefas+"
            src={heroLogo}
            priority
          />
          <h1 className={styles.title}>Sistema feito para você organizar <br />
          seus estudos e tarefas
          </h1>

          <div className={styles.infoContent}>

            <section className={styles.box}>
              <span>+ {posts} posts</span>
            </section>

            <section className={styles.box}>
              <span>+ {comments} comentarios</span>
            </section>

          </div>

        </div>
      </main>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {

  const commentRef = collection(db, "comments");
  const postsRef = collection(db, "tarefas")

  const commentSnapshot = await getDocs(commentRef)
  const postsSnapshot = await getDocs(postsRef)

  return {
    props: {
      posts: postsSnapshot.size || 0,
      comments: commentSnapshot.size || 0
    }
  }
}