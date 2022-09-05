import type {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  PreviewData,
} from "next";
import type { ParsedUrlQuery } from "querystring";
import type { Session } from "next-auth";

export interface AuthServerSidePropsContext<
  Q extends ParsedUrlQuery = ParsedUrlQuery,
  D extends PreviewData = PreviewData
> extends GetServerSidePropsContext {
  session: Session;
}

export type AuthGetServerSideProps<
  P extends { [key: string]: any } = { [key: string]: any },
  Q extends ParsedUrlQuery = ParsedUrlQuery,
  D extends PreviewData = PreviewData
> = (
  context: AuthServerSidePropsContext<Q, D>
) => Promise<GetServerSidePropsResult<P>>;

export type AuthServerSideProps = {
  session: Session.user;
  [key: string]: any;
};

export type InferAuthGetServerSidePropsType<T> =
  T extends AuthGetServerSideProps<infer P, any>
    ? P
    : T extends (
        context?: AuthServerSidePropsContext<any>
      ) => Promise<GetServerSidePropsResult<infer P>>
    ? P
    : T;
