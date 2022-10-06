import Link from "next/link";
import Editor from "@/components/editor";
import Navigation from "@/components/navigation";
import { useMemo } from "react";
import { useRouter } from "next/router";
import { callApi } from "@/utils/firestore/client";
import { getSets } from "@/api/sets/get";
import { SetSchema, CardsSchema } from "@/api/schemas";
import type { GetServerSideProps } from "next";
import type { Set as ISet } from "@/types/firestore/data";
import type { IEditorFile } from "@/types/jsonEditor";

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

  const files = useMemo<IEditorFile[]>(() => {
    const { cards, ...info } = set;
    return [
      {
        name: "Set description",
        schema: SetSchema,
        defaultValue: JSON.stringify(info, null, 2),
        onSave: async (value) => {
          const res = await callApi("PUT", "sets", id as string, value);
          if (!res.ok) alert((await res.json()).error);
        },
      },
      {
        name: "Cards",
        schema: CardsSchema,
        defaultValue: JSON.stringify(cards, null, 2),
        onSave: async (value) => {
          const res = await callApi("PUT", "cards", cardsId, value);
          if (!res.ok) alert((await res.json()).error);
        },
      },
    ];
  }, []);

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
      </Navigation>

      {/* Editor views */}
      <div
        className='
        relative
        w-full h-full
        grid grid-cols-8
        bg-neutral-100 dark:bg-neutral-850
      '
      >
        <div className='col-start-1 col-span-8 md:col-start-2 md:col-span-6'>
          <Editor files={files} />
        </div>
      </div>
    </div>
  );
};

export default Set;
