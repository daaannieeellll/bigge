import { NextResponse } from "next/server";
import { userAuthenticated } from "./utils/auth/jwt";
import { routes } from "./constants/auth/routes";

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

// Exclude all api routes from middleware
export const config = {
  matcher: ["/((?!v1.0/).*)"],
};
