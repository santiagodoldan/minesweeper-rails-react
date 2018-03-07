import { Base } from "./base"
import { Expose } from "class-transformer"

export class Match extends Base {

  @Expose()
  public name: string

  @Expose()
  public rows: number

  @Expose()
  public columns: number

  @Expose()
  public mines: string[]

  @Expose()
  public flags: string[]

}
