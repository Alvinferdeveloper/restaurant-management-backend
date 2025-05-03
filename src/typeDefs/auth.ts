export const authDefs = `
    type Mutation {
        userRegister(userInput: UserInput): User
        login(email:String!, password:String): User
        logOut:Boolean
    }
`