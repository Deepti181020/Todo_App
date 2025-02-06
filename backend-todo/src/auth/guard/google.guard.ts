import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class GoogleGuard extends AuthGuard('google') {
  async canActivate(context: ExecutionContext) {
    console.log("✅ GoogleGuard: canActivate called");

    const activate = (await super.canActivate(context)) as boolean;
    const request = context.switchToHttp().getRequest();

    if (!request.user) {
      return false;
    }

    await super.logIn(request);
    return activate;
  }
}
