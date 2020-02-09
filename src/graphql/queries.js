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
