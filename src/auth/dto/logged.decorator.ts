import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const LoggedUser = createParamDecorator((_, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();

  const user = request.user;
  console.log("🚀 ~ file: logged.decorator.ts:7 ~ LoggedUser ~ user", user)

  return user;
});
