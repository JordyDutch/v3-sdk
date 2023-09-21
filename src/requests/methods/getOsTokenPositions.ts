import { apiUrls } from 'helpers'
import { subgraph } from 'graphql'


type GetOsTokenPositionsInput = {
  userAddress: string
  vaultAddress: string
  options: StakeWise.Options
}

const getOsTokenPositions = async (values: GetOsTokenPositionsInput) => {
  const { options, vaultAddress, userAddress } = values

  const result = await subgraph.osToken.fetchOsTokenPositionsQuery({
    url: apiUrls.getSubgraphqlUrl(options),
    variables: {
      vaultAddress,
      address: userAddress,
    },
  })

  return result?.osTokenPositions || []
}


export default getOsTokenPositions
