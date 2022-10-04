import Editor from "@/components/editor";
import { useState } from "react";

const New = () => {
  const [id, setId] = useState("");
  const [data, setData] = useState(
    `{
  "name": "My New Card Set",
  "types": [
    {
      "name": "Type 1",
      "probability": 0.5
      "color": "#AAAAAA",
      "cards": [
        "Card 1",
        "Card 2"
      ]
    },
    {
      "name": "Type 2",
      "probability": 0.5
      "color": "#BBBBBB",
      "cards": [
        "Card 1",
        "Card 2"
      ]
    }
  ]
}`
  );
  return (
    <div
      className='
      absolute
        w-full h-full
        flex flex-row
      '
    >
      <div className='w-full h-full'>
        <label>Card Set ID:</label>
        <input
          name='id'
          type='text'
          className='border-2 border-gray-500 rounded-md bg-gray-100'
          onBlur={(e) => {
            setId(e.target.value);
          }}
        />
        <Editor value={data} onChange={(e) => setData(e.target.value)} />
        <button
          className='border-2 border-gray-500 rounded-md p-2 bg-gray-100'
          onClick={async () => {
            const res = await fetch(`/v1/sets${id ? `/${id}` : ""}`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: data,
            });
            if (!res.ok) alert((await res.json()).error);
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
};
export default New;
