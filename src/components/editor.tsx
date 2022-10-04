import type { ChangeEvent } from "react";

const Editor = ({
  value,
  onChange,
}: {
  value: string;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void | Promise<void>;
}) => {
  return (
    <textarea
      className='
        w-full h-5/6 resize-none
        md:p-2
        whitespace-nowrap
        font-mono text-sm
        bg-gray-50 border border-gray-300
        '
      value={value}
      onChange={onChange}
    ></textarea>
  );
};
export default Editor;
