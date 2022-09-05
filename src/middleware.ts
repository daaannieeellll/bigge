import { NextResponse } from "next/server";
import { userAuthenticated } from "./utils/jwt";
import { routes } from "./constants/routes";

import type { NextRequest } from "next/server";

const pathInGroup = (request: NextRequest, group: string[]) =>
  group.indexOf(request.nextUrl.pathname) !== -1;

export async function middleware(req: NextRequest) {
  if (pathInGroup(req, groups.authenticated))
    if (!(await userAuthenticated(req)))
      return NextResponse.redirect(new URL(routes.signIn, req.url));

  return NextResponse.next();
}

const groups = {
  authenticated: ["/middlewareprotected"],
  public: ["/"],
};
