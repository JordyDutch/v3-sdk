import { TransactionsQueryVariables } from '../../graphql/subgraph/transactions'
import { apiUrls, validateArgs } from '../../utils'
import { subgraph } from '../../graphql'


type GetTransactionsInput = {
  hash: string
  options: StakeWise.Options
}

const getTransactions = async (input: GetTransactionsInput) => {
  const { options, hash } = input

  validateArgs.string({ hash })

  const data = await subgraph.transactions.fetchTransactionsQuery({
    url: apiUrls.getSubgraphqlUrl(options),
    variables: {
      where: {
        id: hash,
      },
    } as TransactionsQueryVariables,
  })

  return data?.transactions || []
}


export default getTransactions
