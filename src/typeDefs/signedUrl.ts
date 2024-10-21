export const signedUrlDefs = `
    type SignedUrlObject {
        signedUrl: String!
        token: String!
        path: String!
    }
    type Mutation {
        getSignedUrl(filename:String!): SignedUrlObject
    }
    
`;