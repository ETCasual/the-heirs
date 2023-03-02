import { ref } from "firebase/database";
import { type NextPage } from "next";
import { useDatabase, useDatabaseObjectData } from "reactfire";
import { Card } from "~/components/Card";

export type Post = {
  msg: string;
  name: string;
  cg: string;
  id: string;
  createdAt: EpochTimeStamp;
};

const Live: NextPage = () => {
  const db = useDatabase();
  const dbRef = ref(db);

  const { data } = useDatabaseObjectData<Record<string, Post>>(dbRef);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <div className="my-10 flex w-full flex-col items-center justify-center gap-5">
        {data &&
          Object.values(data)
            .filter((p) => p && p.id)
            .sort((a, b) => a.createdAt - b.createdAt)
            .map((post) => (
              <Card
                cg={post.cg}
                createdAt={post.createdAt}
                name={post.name}
                key={post.id}
                msg={post.msg}
                id={post.id}
              />
            ))}
      </div>
    </main>
  );
};
export default Live;
