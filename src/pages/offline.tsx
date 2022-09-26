import Head from "next/head";
import { useRouter } from "next/router";
import CardContainer from "@/components/cardContainer";
import CardData from "@/components/cardData";

const Offline = () => {
  const router = useRouter();
  return (
    <div className='flex min-h-screen flex-col items-center justify-center py-2'>
      <Head>
        <title>Bigge!</title>
        <link rel='icon' href='/images/icon.png' />
        <link rel='manifest' href='/manifest.json' />
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
            router.push("/");
            return true;
          }}
        >
          <CardData
            type='Bigge'
            text='
                Ohjee, het lijkt erop dat je offline bent. :(
                Om deze pagina te bereiken heb je een werkende internetverbinding nodig.
                Zorg dat je verbonden bent met het internet en probeer het opnieuw!
            '
          />
        </CardContainer>
      </main>
    </div>
  );
};

export default Offline;
