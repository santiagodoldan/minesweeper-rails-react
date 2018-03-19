import { plainToClass } from "class-transformer"
import { injectable } from "inversify"
import { Match } from "../models/match"

export interface IRequestOptions {
  path: string
  body?: any
  query?: any
  headers?: { [key: string]: string }
}

type Method = "GET" | "POST" | "PUT"

@injectable()
export class DataService {
  private matches: Match[]

  private host: string = `${process.env.RAILS_API_DOMAIN}/api`

  public async getMatches(): Promise<Match[]> {
    if (this.matches) {
      return this.matches
    }

    const response = await this.request("GET", { path: `/matches` })

    return (this.matches = await this.parseResponse(response, Match))
  }

  public async getMatch(id: number): Promise<Match> {
    const response = await this.request("GET", { path: `/matches/${id}` })

    return this.parseResponse(response, Match)
  }

  private parseResponse(response: Response, klass?: any) {
    return response.json().then((x) => {
      if (response.status >= 200 && response.status < 300) {
        if (klass) {
          return plainToClass(klass, x)
        } else {
          return x
        }
      } else {
        throw new Error(x.message)
      }
    })
  }

  private request(method: Method, options: IRequestOptions): Promise<Response> {
    const url = this.host + options.path + ".json"

    return fetch(url, { method })
  }
}
