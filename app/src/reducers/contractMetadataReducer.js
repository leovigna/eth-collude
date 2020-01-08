// actions
const ADD_CONTRACT_METADATA = "ADD_CONTRACT_METADATA"
const DELETE_CONTRACT_METADATA = "DELETE_CONTRACT_METADATA"
const SET_CONTRACT_METADATA = "SET_CONTRACT_METADATA"

const initialState = {}

// reducers
export const contractMetadataReducer = (state = initialState, action) => {
  if (action.type === ADD_CONTRACT_METADATA) {
    return {
      ...state,
      [action.contractName]: action.contractMetadata
    }
  }

  if (action.type === DELETE_CONTRACT_METADATA) {
    const { [action.contractName]: omitted, ...rest } = state
    return rest
  }

  if (action.type === SET_CONTRACT_METADATA) {
    return action.contractMetadata
  }

  return state
}

export default contractMetadataReducer
