/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { ref } from "firebase/database";
import { type NextPage } from "next";
import { useDatabase, useDatabaseObjectData } from "reactfire";
import { Card } from "~/components/Card";
import * as aos from "aos";
import "aos/dist/aos.css";
import { useLayoutEffect } from "react";

export type Post = {
  msg: string;
  name: string;
  cg: string;
  approved: boolean;
  id: string;
  createdAt: EpochTimeStamp;
};

const Live: NextPage = () => {
  useLayoutEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    aos.init({
      duration: 1000,
      easing: "ease-in-out",
    });
  }, []);
  const db = useDatabase();
  const dbRef = ref(db);

  const { data } = useDatabaseObjectData<Record<string, Post>>(dbRef);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <div className="scroll-container my-10 flex w-full flex-col items-center gap-10 p-20">
        {data &&
          Object.values(data)
            .filter((p) => p && p.id && p.approved)
            .sort((a, b) => a.createdAt - b.createdAt)
            .map((post, i) => (
              <Card
                number={i}
                approved={post.approved}
                cg={post.cg}
                createdAt={post.createdAt}
                name={post.name}
                key={post.id}
                msg={post.msg}
                id={post.id}
                onMounted={(el) => {
                  el.scrollIntoView({ behavior: "smooth" });
                }}
              />
            ))}
      </div>
    </main>
  );
};
export default Live;
