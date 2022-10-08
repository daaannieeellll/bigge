import Head from "next/head";
import { useRouter } from "next/router";
import GameLayout from "@/components/gameLayout";
import CardContainer from "@/components/cardContainer";
import CardData from "@/components/cardData";
import type { NextPageWithLayout } from "@/types/app";
import type { ReactElement } from "react";

const Home: NextPageWithLayout = () => {
  const router = useRouter();
  return (
    <div className='flex min-h-screen flex-col items-center justify-center py-2'>
      <Head>
        <title>Bigge!</title>
      </Head>

      <main
        className='absolute w-full h-full
        flex items-center justify-center
        bg-[#F98F8F] bg-[url("/images/bg.svg")]
        bg-80 bg-blend-multiply
        '
      >
        <CardContainer
          onDiscard={() => {
            router.push("/play");
            return true;
          }}
        >
          <CardData
            type='Bigge'
            text='Hii, superleuk dat je Bigge! komt spelen. Bigge! is
                  het leukste drankspelletje om de avond mee te beginnen
                  of te eindigen!
                  Roep je vienden erbij en swipe deze kaart om te beginnen
                  met het spel! Veel plezier!'
          />
        </CardContainer>
      </main>
    </div>
  );
};
Home.getLayout = (page: ReactElement) => <GameLayout>{page}</GameLayout>;

export default Home;
