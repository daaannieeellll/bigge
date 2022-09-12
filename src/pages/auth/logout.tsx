import { RedirectTo, withAuth } from "@/utils/auth/PageGuard";
import { signOut } from "next-auth/react";

export const getServerSideProps = withAuth(undefined, {
  whenUnauthedRedirect: RedirectTo.Home,
});

const Logout = () => {
  return (
    <div>
      <button onClick={() => signOut()}>Logout</button>
    </div>
  );
};

export default Logout;
