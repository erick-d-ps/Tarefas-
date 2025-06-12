import { ChangeEvent, FormEvent, useState } from "react";
import { useSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import styles from "./styles.module.css";

import { Textarea } from "../../components/textarea";

import { db } from "../../services/firebaseConection";
import {
  doc,
  collection,
  query,
  where,
  getDoc,
  addDoc,
  getDocs,
} from "firebase/firestore";

interface TaskProps {
  item: {
    tarefa: string;
    created: string;
    public: boolean;
    user: string;
    taskId: string;
  };
  allComments: CommentsProps[],
}

interface CommentsProps{
  id: string,
  comment: string,
  name: string,
  user: string,
  taskId: string, 
}

export default function Task({ item, allComments }: TaskProps) {
  const [input, setInput] = useState("");
  const { data: session } = useSession();
  const [comments, setCopmments] = useState<CommentsProps[]>(allComments || [])

  async function handleComent(event: FormEvent) {
    event.preventDefault;

    if (input && "") return;

    if (!session?.user?.email || !session?.user?.name) return;
    

    try {
      const docRef = await addDoc(collection(db, "comments"), { 
        comment: input,
        created: new Date(),
        nome: session?.user?.name,
        user: session?.user?.email,
        taskId: item?.taskId,
      });
      setInput("");
    } catch (err) {
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
            onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
              setInput(event.target.value)
            }
            placeholder="Digite seu comentário..."
          />
          <button className={styles.button} disabled={!session?.user}>
            Enviar comentário
          </button>
        </form>
      </section>
      
      <section className={styles.comentsContainer}>
        <h2>Todos comentários</h2>
        {comments.length === 0 && (
          <span>Nenhum comentário foi encontardo...</span>
        )}

        {comments.map((item) => (
          <article key={item.id} className={styles.comment}>
            <p>{item.comment}</p>
          </article>
        ))}
      </section>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = params?.id as string;

  const docRef = doc(db, "tarefas", id);

  const q = query(collection(db, "comments"), where("taskId", "==", id));

  const snapshotComments = await getDocs(q)

  let allComments: CommentsProps[] = []
  snapshotComments.forEach((doc) => {
    allComments.push({
      id: doc.id,
      comment: doc.data().comment,
      name: doc.data().nome,
      taskId: doc.data().taskId,
      user: doc.data().user,
    })
  })

  
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

  const miliseconds = snapshot.data()?.created?.seconds * 1000;

  const task = {
    tarefa: snapshot.data()?.tarefa,
    public: snapshot.data()?.public,
    created: new Date(miliseconds).toLocaleDateString(),
    user: snapshot.data()?.user,
    taskId: id,
  };

  return {
    props: {
      item: task,
      allComments: allComments,
    },
  };
};
