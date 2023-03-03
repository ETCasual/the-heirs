/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { ref } from "firebase/database";
import { type NextPage } from "next";
import { useDatabase, useDatabaseObjectData } from "reactfire";
import { LiveCard } from "~/components/LiveCard";
import * as aos from "aos";
import "aos/dist/aos.css";
import { useEffect, useLayoutEffect, useRef } from "react";
import animateScrollTo from "animated-scroll-to";

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

  const containerRef = useRef(null);
  const prevDataLengthRef = useRef(0);

  useEffect(() => {
    const prevDataLength = prevDataLengthRef.current;
    const newData = Object.values(data || {}).filter(
      (p) => p && p.id && p.approved
    );
    if (newData.length > prevDataLength) {
      void animateScrollTo(
        document.getElementById(
          newData[newData.length - 1]?.id as string
        ) as Element,
        {
          easing: (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
          verticalOffset: 30,
        }
      );
    }
    prevDataLengthRef.current = newData.length;
  }, [data]);

  return (
    <main
      ref={containerRef}
      className="flex flex-col items-center justify-center gap-5 bg-cover bg-fixed bg-center p-10"
    >
      {data &&
        Object.values(data)
          .filter((p) => p && p.id && p.approved)
          .sort((a, b) => a.createdAt - b.createdAt)
          .map((post, i) => (
            <LiveCard
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
    </main>
  );
};
export default Live;
