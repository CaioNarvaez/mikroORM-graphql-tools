export const rootTypedef = `
enum FilterOperation {
    EQ
    NE
    LT
    LTE
    GT
    GTE
    IN
    NIN
    LIKE 
}  

enum FilterGroupOperator {
  AND
  OR
}

enum OrderByDirection {
  ASC
  DESC
}

`;