import { put, takeEvery } from "redux-saga/effects"

// actions
const TODOS_FETCH = "MY_APP/TODOS_FETCH"
const TODOS_RECEIVED = "MY_APP/TODOS_RECEIVED"

// reducers
export const todosReducer = (state = [], action) => {
  if (action.type === TODOS_RECEIVED) {
    // update your state
    return action.todos
  }
  return state
}

// fetch data from service using sagas
export function* fetchTodos() {
  const todos = yield fetch("https://jsonplaceholder.typicode.com/todos").then(
    response => response.json()
  )
  yield put({ type: TODOS_RECEIVED, todos })
}

// Combine all your redux concerns

// app root saga
export function* appRootSaga() {
  yield takeEvery(TODOS_FETCH, fetchTodos)
}
