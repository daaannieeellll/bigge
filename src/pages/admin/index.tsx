import Link from "next/link";

const Index = () => {
  return (
    <>
      <div>
        <li>
          <Link href='/admin/sets/'>
            <a>Card sets</a>
          </Link>
        </li>
      </div>
    </>
  );
};

export default Index;
