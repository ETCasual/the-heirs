import type { NextPage } from "next";
import { useDatabase, useDatabaseObjectData } from "reactfire";
import type { Post } from "./live";
import { ref, set } from "firebase/database";
import { Card } from "~/components/Card";

const Master: NextPage = () => {
  const db = useDatabase();
  const dbRef = ref(db);

  const { data } = useDatabaseObjectData<Record<string, Post>>(dbRef);

  return (
    <main className="grid grid-cols-1 items-center justify-center gap-5 p-5 lg:grid-cols-2">
      {data &&
        Object.values(data)
          .filter((p) => p && p.id && !p.approved)
          .sort((a, b) => a.createdAt - b.createdAt)
          .map((post) => (
            <Card
              onClick={() =>
                void set(ref(db, `${post.createdAt}`), {
                  ...post,
                  approved: true,
                  createdAt: Date.now(),
                })
              }
              approved={post.approved}
              cg={post.cg}
              createdAt={post.createdAt}
              name={post.name}
              key={post.id}
              msg={post.msg}
              id={post.id}
              number={1}
              onMounted={(el) => el.scrollIntoView({ behavior: "smooth" })}
            />
          ))}
    </main>
  );
};

export default Master;
