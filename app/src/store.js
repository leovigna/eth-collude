import { Drizzle, generateStore } from "@drizzle/store"
import drizzleOptions from "./drizzleOptions"
import { contractEventNotifier, contractAddNotifier } from "./middleware"

import { todosReducer, appRootSaga } from "./reducers/todos.js"
import contractMetadataReducer from "./reducers/contractMetadataReducer"

// Load saved Web3 contracts
/*
const persistedState = loadLocalStorage("state")
const persistedContracts = loadLocalStorage("contracts")
if (persistedContracts) {
  drizzleOptions.contracts = persistedContracts.contracts
}
*/
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

/*
if (persistedState) {
  if (persistedState.contractMetadata) {
    store.dispatch({
      type: "SET_CONTRACT_METADATA",
      contractMetadata: persistedState.contractMetadata
    })
  }
}

store.subscribe(() => {
  saveLocalStorage(
    {
      todos: store.getState().todos,
      contractMetadata: store.getState().contractMetadata
    },
    "state"
  )
})

// Save Web3 contracts
const handler = {
  set(target, property, value, receiver) {
    target[property] = value
    console.log(target)
    // you have to return true to accept the changes
    const saveTarget = Object.entries(target).map(([key, value]) => {
      const { address, contractName, abi } = value
      const networks = {
        "5777": {
          events: {},
          links: {},
          address
        }
      }
      return { address, contractName, abi, networks }
    })
    saveLocalStorage(
      {
        contracts: saveTarget
      },
      "contracts"
    )

    return true
  }
}
const contractsProxy = new Proxy(drizzle.contracts, handler)
drizzle.contracts = contractsProxy
*/
export default drizzle;
