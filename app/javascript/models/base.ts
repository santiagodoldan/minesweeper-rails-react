import { Expose } from "class-transformer"

export class Base {
  public id: number

  @Expose({ name: "created_at" })
  public createdAt: Date

  @Expose({ name: "updated_at" })
  public updatedAt: Date
}
