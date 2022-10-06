import Editor from "@/components/editor";
import { useMemo } from "react";
import { CombinedSchema, CombinedSchemaExample } from "@/api/schemas";
import { callApi } from "@/utils/firestore/client";
import type { IEditorFile } from "@/types/jsonEditor";

const New = () => {
  const files = useMemo<IEditorFile[]>(
    () => [
      {
        name: "Card set",
        schema: CombinedSchema,
        defaultValue: JSON.stringify(CombinedSchemaExample, null, 2),
        onSave: async (value) => {
          const res = await callApi("POST", "sets", "", value);
          if (!res.ok) alert((await res.json()).error);
        },
      },
    ],
    []
  );

  return (
    <div
      className='
        absolute w-full h-full
        grid grid-cols-8
        bg-neutral-100 dark:bg-neutral-850
      '
    >
      <div className='col-start-1 col-span-8 md:col-start-2 md:col-span-6'>
        <Editor files={files} />
      </div>
    </div>
  );
};
export default New;
