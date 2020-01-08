import BaseCollude from "./contracts/BaseCollude.json"
//import SimpleColludeAdapter from "./contracts/SimpleColludeAdapter.json"

const options = {
  web3: {
    block: false,
    fallback: {
      type: "ws",
      url: "ws://127.0.0.1:7545"
    }
  },
  contracts: [BaseCollude],
  events: {
    BaseCollude: ["CollusionDealCreated", "CollusionDealSettled", "CollusionDealRefunded"]
  },
  polls: {
    accounts: 1500
  }
}

export default options
