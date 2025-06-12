import { ChangeEvent, FormEvent, useState } from "react";
import { useSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import styles from "./styles.module.css";

import { Textarea } from '../../components/textarea'

import { db } from "../../services/firebaseConection";
import { doc, collection, query, where, getDoc, addDoc } from "firebase/firestore";

interface TaskProps{
  item: {
    tarefa: string,
    created: string,
    public: boolean,
    user: string,
    taskId: string
  }
}

export default function Task({item}: TaskProps) {
  const [input, setInput] = useState("") 
  const { data: session } = useSession();

  async function handleComent(event: FormEvent){
    event.preventDefault

    if(input && "")return; 

    if(!session?.user?.email || !session?.user?.name)return;

    try{
      const docRef = await addDoc(collection(db, "comments"), {
        comment: input,
        created: new Date(),
        nome: session?.user?.name,
        user: session?.user?.email,
        taskId: item?.taskId
      })
      setInput("")
    }catch(err){
      console.log(err);
    }
  }
  

  return (
    <div className={styles.container}>
      <Head>
        <title>Detalhes da tarefa</title>
      </Head>

      <main className={styles.main}>
        <h1>Tarefa</h1>
        <article className={styles.task}>
          <p>{item.tarefa}</p>
        </article>
      </main>

      <section className={styles.comentsContainer}>
        <h2>Deixe um comentário</h2>

        <form onSubmit={handleComent}>
          <Textarea
            value={input}
            onChange={(event: ChangeEvent<HTMLTextAreaElement>) => setInput(event.target.value)}
            placeholder="Digite seu comentário..."
          />
          <button 
            className={styles.button}
            disabled={!session?.user}
          >Enviar comentário</button>
        </form>
      </section>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = params?.id as string; 

  const docRef = doc(db, "tarefas", id); 
  const snapshot = await getDoc(docRef); 

  if (snapshot.data() === undefined) {
    return {
      redirect: {
        
        destination: "/",
        permanent: false,
      },
    };
  }

  if (!snapshot.data()?.public) {
    return {
      redirect: { 
       
        destination: "/",
        permanent: false,
      },
    };
  }

  const miliseconds = snapshot.data()?.created?.seconds * 1000

  const task = {
    tarefa: snapshot.data()?.tarefa,
    public: snapshot.data()?.public,
    created: new Date(miliseconds).toLocaleDateString(),
    user: snapshot.data()?.user,
    taskId: id,
  }


  return {
    props: {
      item: task
    },
  };
};
