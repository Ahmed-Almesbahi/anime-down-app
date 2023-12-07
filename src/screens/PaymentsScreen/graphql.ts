import { gql } from '@apollo/client'

export const payPalGraphQL = gql`
  mutation ($productId: Int!, $currency: String!) {
    paypal(productId: $productId, currency: $currency) {
      paymentUrl
    }
  }
`
export const paymentsHistoryGraphQL = gql`
  query {
    paymentsHistory {
      id
      amount
      currency
      status
      createdAt
    }
  }
`
export const subscriptionExpireDateGraphQL = gql`
  query {
    me {
      accessExpireDate
    }
  }
`

export const bankGraphQL = gql`
  mutation (
    $amount: Int!
    $bankAccountNumber: String!
    $bankAccountName: String!
  ) {
    bank(
      amount: $amount
      bankAccountNumber: $bankAccountNumber
      bankAccountName: $bankAccountName
    ) {
      id
    }
  }
`
