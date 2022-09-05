import { RedirectTo, withAuth } from "@/utils/PageGuard";
import type { BuiltInProviderType } from "next-auth/providers";
import type { ClientSafeProvider, LiteralUnion } from "next-auth/react";

import { getProviders, signIn } from "next-auth/react";

export const getServerSideProps = withAuth(
  async () => {
    const providers = await getProviders();
    return { props: { providers } };
  },
  { whenAuthedRedirect: RedirectTo.Home }
);

type Providers = Record<
  LiteralUnion<BuiltInProviderType, string>,
  ClientSafeProvider
>;

const Login = ({ providers }: { providers: Providers }) => (
  <>
    {Object.values(providers).map((provider) => (
      <div key={provider.name}>
        <button onClick={() => signIn(provider.id)}>
          Sign in with {provider.name}
        </button>
      </div>
    ))}
  </>
);
export default Login;
