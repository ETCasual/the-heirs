import { ref } from "firebase/database";
import { type NextPage } from "next";
import { useEffect, useState } from "react";
import { useDatabase, useDatabaseObjectData } from "reactfire";
import { Card } from "~/components/Card";

export type Post = {
  msg: string;
  name: string;
  cg: string;
  id: string;
};

const exampleData = {
  msg: "Test",
  name: "Lengzai",
  cg: "79S",
  id: 1,
};
const Live: NextPage = () => {
  const db = useDatabase();
  const dbRef = ref(db);

  const { data } = useDatabaseObjectData<Record<string, Post>>(dbRef);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      {data &&
        Object.values(data)
          .filter((p) => p && p.id)
          .map((post) => (
            <Card
              cg={post.cg}
              name={post.name}
              key={post.id}
              msg={post.msg}
              id={post.id}
            />
          ))}
    </main>
  );
};
export default Live;
