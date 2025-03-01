import { JsonRpcProvider } from 'ethers'

import methods from './methods'
import { configs, apiUrls } from './utils'
import { createContracts, vaultMulticall } from './contracts'


type VaultMulticallInput = Pick<Parameters<typeof vaultMulticall>[0], 'request' | 'userAddress' | 'vaultAddress'>

class StakeWiseSDK {
  readonly utils: StakeWise.Utils
  readonly config: StakeWise.Config
  readonly options: StakeWise.Options
  readonly provider: StakeWise.Provider
  readonly vault: StakeWise.VaultMethods
  readonly contracts: StakeWise.Contracts
  readonly osToken: StakeWise.OsTokenMethods

  constructor(options: StakeWise.Options) {
    const config = configs[options.network]
    const provider = options.provider || new JsonRpcProvider(apiUrls.getWeb3Url(options))

    this.config = config
    this.options = options
    this.provider = provider
    this.contracts = createContracts({ provider, config })

    const argsForMethods = { options, contracts: this.contracts }

    this.utils = methods.createUtils(argsForMethods)
    this.vault = methods.createVaultMethods(argsForMethods)
    this.osToken = methods.createOsTokenMethods(argsForMethods)
  }

  // Temporary method
  vaultMulticall<T extends unknown>({ userAddress, vaultAddress, request }: VaultMulticallInput) {
    return vaultMulticall<T>({
      vaultContract: this.contracts.helpers.createVaultContract(vaultAddress),
      keeperContract: this.contracts.base.keeper,
      options: this.options,
      vaultAddress,
      userAddress,
      request,
    })
  }

  get network() {
    return this.options.network
  }
}


export default StakeWiseSDK
