import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom'
import {useMutation} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Button, Label, Icon } from 'semantic-ui-react';
import MyPopup from '../../util/MyPopup';

    
    
function LikeButton({user, post: {id, likeCount, likes}}) {
    
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        if (user && likes?.find((like) => like?.user?.username === user)) {
            setLiked(true);
        } else setLiked(false);
    }, [user, likes]);

    const [likePost] = useMutation(LIKE_POST_MUTATION, {
        variables: {postId: id}
    })

    const likeButton = user ? (
        // if we have liked it, this will be filled
        liked ? (
            <Button color="red">
                <Icon name="heart"/>
            </Button>
        ) : (
            // else it will not be filled in
            <Button color="red" basic>
                <Icon name="heart"/>
            </Button>
        )
    ) : (
        <Button as={Link} to="/login" color="red" basic>
                <Icon name="heart"/>
        </Button>
    )

    return (
        
        <Button as='div' labelPosition='right' onClick={likePost}>
            <MyPopup content={liked ? 'Unlike' : 'Like'}> 
                {likeButton}
            </MyPopup>
            <Label as='a' basic color='red' pointing='left'>
                {likeCount}
            </Label>
        </Button>
    )
    
}


const LIKE_POST_MUTATION = gql`
    mutation likePost($postId: ID!) {
        likePost(postId: $postId) {
            id
            likes{
                id
                username
            }
            likeCount
        }
    }


`

export default LikeButton;
    
    
    
    
    