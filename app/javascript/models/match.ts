import { Base } from "./base"
import { Expose } from "class-transformer"

export class Match extends Base {

  @Expose()
  public height: number

  @Expose()
  public width: number

  @Expose()
  public mines: string[]

  @Expose()
  public flags: string[]

}
