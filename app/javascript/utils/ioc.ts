import { Container } from "inversify"
import getDecorator from "inversify-inject-decorators"

import { DataService } from "../services/data_service"

const container = new Container()

// Dependencies
container.bind<DataService>(DataService).toSelf()

// Injection
//
// This injector should be used in React components
const inject = getDecorator(container).lazyInject

export { container, inject }
