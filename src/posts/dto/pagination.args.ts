import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class PaginationArgs {
  @Field((type) => Int, { defaultValue: 1 })
  page: number;
}
