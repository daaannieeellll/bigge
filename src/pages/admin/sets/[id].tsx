import Link from "next/link";
import Editor from "@/components/editor";
import Navigation from "@/components/navigation";
import { useRouter } from "next/router";
import { useState } from "react";
import { getSets } from "@/api/sets/get";
import { update } from "@/utils/firestore/fetch";
import type { GetServerSideProps } from "next";
import type { Set as ISet } from "@/types/firestore/data";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const id = ctx.params?.id;
  const redirect = {
    redirect: {
      destination: "/admin/sets",
      permanent: false,
    },
  };
  if (typeof id !== "string") return redirect;

  return await getSets(id, "yes")
    .then((data) => {
      const { created, saves, owner, cardsId, ...set } = data;
      return {
        props: { set, cardsId },
      };
    })
    .catch(() => redirect);
};

const Set = ({ set, cardsId }: { set: ISet; cardsId: string }) => {
  const router = useRouter();
  const { id } = router.query;
  const { cards, ...info } = set;
  const [setInfo, setSetInfo] = useState(JSON.stringify(info, null, 2));
  const [cardData, setCardData] = useState(JSON.stringify(cards, null, 2));
  const [showInfo, setShowInfo] = useState(true);

  return (
    <div
      className='
        absolute w-full h-full overflow-hidden
        md:flex md:items-start
      '
    >
      {/* Navigation view */}
      <Navigation>
        <Link href='/admin/sets'>
          <a>All sets</a>
        </Link>
        <a onClick={() => setShowInfo(true)}>Info</a>
        <a onClick={() => setShowInfo(false)}>Cards</a>
      </Navigation>

      {/* Editor views */}
      <div
        className='
        relative
        w-full h-full
        flex flex-col
      '
      >
        {showInfo ? (
          <div className='h-full flex flex-col items-center justify-around'>
            <Editor
              key='setInfo'
              value={setInfo}
              onChange={(e) => setSetInfo(e.target.value)}
            />
            <button
              className='border-2 border-gray-500 rounded-md p-2 bg-gray-100'
              onClick={async () => {
                const res = await update("sets", id as string, setInfo);
                if (!res.ok) alert((await res.json()).error);
              }}
            >
              Update Set info
            </button>
          </div>
        ) : (
          <div className='h-full flex flex-col items-center justify-around'>
            <Editor
              key='cardData'
              value={cardData}
              onChange={(e) => setCardData(e.target.value)}
            />
            <button
              className='border-2 border-gray-500 rounded-md p-2 bg-gray-100'
              onClick={async () => {
                const res = await update(
                  "cards",
                  cardsId,
                  `{"cards": ${cardData}}`
                );
                if (!res.ok) alert((await res.json()).error);
              }}
            >
              Update cards
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Set;
