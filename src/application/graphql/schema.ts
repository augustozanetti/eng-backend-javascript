export const typeDefs = `#graphql
  type Currency {
    code: String!
  }
  
  type Money {
    amount: Int!
    currency: String!
  }

  type Quote {
    id: ID!
    currency: String!
    value: Float!
  }

  type Product {
    id: ID!
    name: String
    money(currencies: [String!]): [Money!]!
  }

  input AddProductInput {
    name: String!
    value: Int!
  }

  input UpdateProductInput {
    id: ID!
    name: String!
    value: Int!
  }

  input AddQuoteInput {
    currency: String!
    value: Float!
  }

  input UpdateQuoteInput {
    id: ID!
    currency: String!
    value: Float!
  }

  type Query {
    currencies: [Currency]!
    quotes: [Quote]!
    products: [Product]!
  }

  
  type Mutation {
    addCurrency(code: String!): Currency
    addQuote(input: AddQuoteInput!): Quote
    updateQuote(input: UpdateQuoteInput!): Quote
    addProduct(input: AddProductInput!): Product
    updateProduct(input: UpdateProductInput!): Product
    deleteProduct(id: ID!): Boolean
    deleteCurrency(code: String!): Boolean
    deleteQuote(id: ID!): Boolean
  }
`;
