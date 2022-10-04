import Link from "next/link";
import { firestore } from "@/services/firebase/admin";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const sets: { [key: string]: string } = {};
  await firestore
    .collection("sets")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => (sets[doc.id] = doc.get("name")));
    });

  return {
    props: { sets },
  };
};

const Index = ({
  sets,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div>
      <ul>
        {Object.keys(sets).map((id) => (
          <li key={id}>
            <Link href={`/admin/sets/${id}`}>
              <a>{sets[id]}</a>
            </Link>
          </li>
        ))}
      </ul>
      <Link href='/admin/sets/new'>
        <a>Create a new card set</a>
      </Link>
    </div>
  );
};
export default Index;
