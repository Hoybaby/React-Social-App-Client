import React, {useContext} from 'react'
import { useQuery } from '@apollo/react-hooks';
// import gql from 'graphql-tag'
import {Grid, Transition} from 'semantic-ui-react';
import PostCard from '../components/PostCard/PostCard'

import {useAuthContext} from '../context/auth';
import PostForm from '../components/PostForm/PostForm'
import {FETCH_POSTS_QUERY} from '../util/graphql';

function Home() {


    const {user} = useAuthContext()

    // from useQuery we get, loading which is true and data. 
    const {
        loading,
        data: {getPosts: posts} = {} 
    } = useQuery(FETCH_POSTS_QUERY);
    
    // if(data) {
    //     console.log(data)
    // }
    return (
        <div>
            <Grid columns={3}>
            <Grid.Row className='page-title'>
                
                    <h1>Recent Posts</h1>
                    
                
            </Grid.Row>
            <Grid.Row>
                {user && (
                    <Grid.Column>
                        <PostForm/>
                    </Grid.Column>
                )}
                {loading ? (
                    <h1>Loading posts...</h1>
                    // else is below
                ): (
                    <Transition.Group> 
                        {posts && posts.map(post => (
                        <Grid.Column key={post.id} style={{marginBottom: 20}}>
                            <PostCard post={post}/>
                        </Grid.Column>
                        ))}
                    </Transition.Group>
                )}
            </Grid.Row>
            
    
        </Grid>
        </div>
       
    )
}



export default Home;
