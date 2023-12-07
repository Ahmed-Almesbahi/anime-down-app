import { gql } from '@apollo/client'

export const paypalVerifyPaymentGraphQL = gql`
  mutation ($payerId: String!, $transferReferenceNumber: String!) {
    paypalVerifyPayment(
      payerId: $payerId
      transferReferenceNumber: $transferReferenceNumber
    ) {
      status
    }
  }
`
