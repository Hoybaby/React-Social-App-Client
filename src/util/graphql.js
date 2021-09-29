
import gql from 'graphql-tag'


export const FETCH_POSTS_QUERY = gql`
    {
        getPosts{
            id 
            body 
            createdAt 
            user {
                username
            } 
            # likeCount
            # likes {
            #     user {
            #         username
            #     }
            # }
            # commentCount
            # comments{
            #     id 
            #     createdAt 
            #     body
            #     user {
            #         username
            #     }
            # }
        }
    }
`