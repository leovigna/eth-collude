import { Drizzle, generateStore } from "@drizzle/store"
import drizzleOptions from "./drizzleOptions"
import { contractEventNotifier, contractAddNotifier } from "./middleware"

import { todosReducer, appRootSaga } from "./reducers/todos.js"
import contractMetadataReducer from "./reducers/contractMetadataReducer"

console.log(drizzleOptions.contracts)

const appReducers = {
  todos: todosReducer,
  contractMetadata: contractMetadataReducer
}
const appSagas = [appRootSaga]
const appMiddlewares = [contractEventNotifier, contractAddNotifier]

const config = {
  drizzleOptions,
  appReducers,
  appSagas,
  appMiddlewares,
  disableReduxDevTools: false // enable ReduxDevTools!
}
const store = generateStore(config)
const drizzle = new Drizzle(drizzleOptions, store)

export default drizzle;
