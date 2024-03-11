import React from 'react'
import { type NextPage } from "next";
import Head from "next/head";
// import Link from "next/link";


import { api } from "../utils/api";


const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <>
      <Head>
        <title>CelloTree</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <main className="grid grid-cols-sidbar min-h-screen text-white  bg-primary ">
      {/* <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <p className="text-2xl text-white">
            {hello.data ? hello.data.greeting : "Loading tRPC query..."}
          </p>
          <Link href="/protected" className="text-xl text-white">
            Check out a protected procedure
          </Link>
        </div>
       */}

      </main>
    </>
  );
};

export default Home;
