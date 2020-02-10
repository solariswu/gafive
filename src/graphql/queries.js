/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getGaFiveQList = `query GetGaFiveQList($idx: String!, $index: Int!) {
  getGAFiveQList(idx: $idx, index: $index) {
    idx
    index
    base
    A
    B
    C
    D
    Answer
  }
}
`;
export const listGaFiveQLists = `query ListGaFiveQLists(
  $filter: TableGAFiveQListFilterInput
  $limit: Int
  $nextToken: String
) {
  listGAFiveQLists(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      idx
      index
      base
      A
      B
      C
      D
      Answer
    }
    nextToken
  }
}
`;
export const queryQuestionsByIndex = `query QueryQuestionsByIndex($index: Int!, $limit: Int, $nextToken: String) {
  queryQuestionsByIndex(index: $index, limit: $limit, nextToken: $nextToken) {
    items {
      idx
      index
      base
      A
      B
      C
      D
      Answer
    }
    nextToken
  }
}
`;
export const getGafiveHistory = `query GetGafiveHistory($id: ID!) {
  getGafiveHistory(id: $id) {
    id
    username
    timestamp
    itemId
    response
    result
    round
    genre
  }
}
`;
export const listGafiveHistories = `query ListGafiveHistories(
  $filter: TableGafiveHistoryFilterInput
  $limit: Int
  $nextToken: String
) {
  listGafiveHistories(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      username
      timestamp
      itemId
      response
      result
      round
      genre
    }
    nextToken
  }
}
`;
export const queryGafiveHistoriesByUsernameDateIndex = `query QueryGafiveHistoriesByUsernameDateIndex(
  $username: String!
  $first: Int
  $after: String
) {
  queryGafiveHistoriesByUsernameDateIndex(
    username: $username
    first: $first
    after: $after
  ) {
    items {
      id
      username
      timestamp
      itemId
      response
      result
      round
      genre
    }
    nextToken
  }
}
`;
export const queryLastestIndex = `query QueryLastestIndex($round: Int) {
  queryLastestIndex(round: $round) {
    items {
      id
      username
      timestamp
      itemId
      response
      result
      round
      genre
    }
    nextToken
  }
}
`;
