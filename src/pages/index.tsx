import { type NextPage } from "next";
import Head from "next/head";
import { useDatabase } from "reactfire";
import { ref, set } from "firebase/database";
import { uuid } from "uuidv4";
import { Field, Form, Formik } from "formik";
import { useState } from "react";

const Home: NextPage = () => {
  const dbRef = useDatabase();
  const [loading, setLoading] = useState(false);
  return (
    <>
      <Head>
        <title>The Heirs 继承者 | FGACYCYW</title>
        <meta
          name="description"
          content={`但圣灵降临在你们身上，你们就必得着能力\n并要在耶路撒冷、犹太全地和撒玛利亚, 直到地极, 作我的见证 \n But you will receive power when the Holy Spirit comes on you;\nand you will be my witnesses in Jerusalem, and in all Judea and Samaria, and to the ends of the earth. \n 使徒行传 Acts 1:8`}
        />
        <link rel="icon" href="/theheirsLogo.png" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          {/* <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Create <span className="text-[hsl(280,100%,70%)]">T3</span> App
          </h1> */}
          <div
            className="flex max-w-md flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
            // onClick={() => {
            //   void set(ref(dbRef, `/${uuid()}`), {
            //     fullname: "Chin Jia Hao",
            //     cg: "79S",
            //     message: "Inventions",
            //   });
            // }}
          >
            <div className="text-2xl font-bold">
              <p>你为神做过最疯狂的事</p>
              <p className="text-lg italic">
                What is the craziest thing you did for God?
              </p>
            </div>
            <Formik
              initialValues={{ name: "", cg: "", msg: "" }}
              onSubmit={async (values, actions) => {
                setLoading(true);
                const id = uuid();
                const now = Date.now();
                if (!values.name || !values.cg || !values.msg) {
                  alert("必须填写每一个格子");
                  setLoading(false);
                  throw new Error("必须填写每一个格子");
                }
                await set(ref(dbRef, `${now}`), {
                  ...values,
                  id: id,
                  approved: false,
                  createdAt: now,
                }).then(() => {
                  setLoading(false);
                  alert("成功!");
                  actions.resetForm();
                });
              }}
            >
              {({ errors }) => (
                <Form>
                  <div className="mb-2 flex flex-row items-center justify-center">
                    <label className="w-[70%] text-sm font-semibold">
                      全名 Full Name:
                    </label>
                    <Field
                      name="name"
                      as="input"
                      disabled={loading}
                      className={`w-full rounded-md px-2 py-1 font-bold text-[hsl(280,38%,41%)] focus-within:outline-none ${
                        errors.name ? "outline-2 outline-red-500" : ""
                      }`}
                    />
                  </div>
                  <div className="mb-2 flex flex-row items-center justify-center">
                    <label className="w-[70%] text-sm font-semibold">
                      小组 CG:
                    </label>
                    <Field
                      name="cg"
                      disabled={loading}
                      as="input"
                      className={`w-full rounded-md px-2 py-1 font-bold text-[hsl(280,38%,41%)] focus-within:outline-none ${
                        errors.cg ? "outline-2 outline-red-500" : ""
                      }`}
                    />
                  </div>
                  <Field
                    as="textarea"
                    name="msg"
                    rows={5}
                    disabled={loading}
                    className={`w-full rounded-md px-2 py-1 font-bold text-[hsl(280,38%,41%)] focus-within:outline-none ${
                      errors.msg ? "outline-2 outline-red-500" : ""
                    }`}
                  />
                  <button className="mt-2 w-full rounded-md bg-[hsl(280,100%,70%)] py-2 text-base font-bold">
                    确定 Confirm
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
