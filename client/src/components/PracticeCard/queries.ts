import gql from 'graphql-tag';

export const DELETE_CARD = gql`
  mutation DeletePracticeCard($id: ID!) {
    deletePracticeCard(id: $id) {
      id
    }
  }
`;
