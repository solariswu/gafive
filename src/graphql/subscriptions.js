/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateGaFiveQList = `subscription OnCreateGaFiveQList(
  $idx: String
  $index: Int
  $base: String
  $A: String
  $B: String
) {
  onCreateGAFiveQList(idx: $idx, index: $index, base: $base, A: $A, B: $B) {
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
export const onUpdateGaFiveQList = `subscription OnUpdateGaFiveQList(
  $idx: String
  $index: Int
  $base: String
  $A: String
  $B: String
) {
  onUpdateGAFiveQList(idx: $idx, index: $index, base: $base, A: $A, B: $B) {
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
export const onDeleteGaFiveQList = `subscription OnDeleteGaFiveQList(
  $idx: String
  $index: Int
  $base: String
  $A: String
  $B: String
) {
  onDeleteGAFiveQList(idx: $idx, index: $index, base: $base, A: $A, B: $B) {
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
export const onCreateGafiveHistory = `subscription OnCreateGafiveHistory(
  $id: ID
  $username: String
  $date: AWSDate
  $time: AWSTime
  $itemId: Int
) {
  onCreateGafiveHistory(
    id: $id
    username: $username
    date: $date
    time: $time
    itemId: $itemId
  ) {
    id
    username
    date
    time
    itemId
    response
    result
    round
    genre
  }
}
`;
export const onUpdateGafiveHistory = `subscription OnUpdateGafiveHistory(
  $id: ID
  $username: String
  $date: AWSDate
  $time: AWSTime
  $itemId: Int
) {
  onUpdateGafiveHistory(
    id: $id
    username: $username
    date: $date
    time: $time
    itemId: $itemId
  ) {
    id
    username
    date
    time
    itemId
    response
    result
    round
    genre
  }
}
`;
export const onDeleteGafiveHistory = `subscription OnDeleteGafiveHistory(
  $id: ID
  $username: String
  $date: AWSDate
  $time: AWSTime
  $itemId: Int
) {
  onDeleteGafiveHistory(
    id: $id
    username: $username
    date: $date
    time: $time
    itemId: $itemId
  ) {
    id
    username
    date
    time
    itemId
    response
    result
    round
    genre
  }
}
`;
