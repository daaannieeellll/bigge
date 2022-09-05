import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center py-2'>
      <Head>
        <title>Bigge!</title>
        <link rel='icon' href='/icon.png' />
      </Head>

      <main
        className='absolute w-full h-full
        flex items-center justify-center
        bg-[#F98F8F] bg-[url("/img/bg.svg")]
        bg-80 bg-blend-multiply
        '
      >
        <div
          className='w-[50vh] max-w-[85vw]
          aspect-[5/8]
          bg-[url("/img/linnen.svg")] bg-cover
          rounded-3xl
          flex items-center justify-around flex-col
          shadow-2xl shadow-black
          '
        >
          <div className='w-3/4'>
            <img src='/img/big.svg' alt=':(' />
          </div>
          <div className='text-[2vh] text-center w-4/5 h-1/2'>
            <p>
              Oh jee, Bigge! is aan het verhuizen. Maar wees niet getreurd. Er
              is een grote update onderweg voor n&oacute;g meer speelplezier!
              <br />
              In de tussentijd kun je{" "}
              <Link href='https://bigge.herokuapp.com'>
                <a className='text-red-900 underline'>hier klikken</a>
              </Link>{" "}
              om alsnog een spel te starten.
              <br />
              Hopelijk tot gauw! :)
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
