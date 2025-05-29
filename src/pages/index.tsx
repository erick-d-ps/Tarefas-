import Head from "next/head";
import styles from "../../styles/home.module.css";

import Image from "next/image";

import heroLogo from "../../public/assets/hero.png"

export default function Home() {
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
              <span>+12 posts</span>
            </section>

            <section className={styles.box}>
              <span>+90 comentarios</span>
            </section>

          </div>

        </div>
      </main>
    </div>
  );
}
