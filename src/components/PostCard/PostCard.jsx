import React, {useContext } from 'react';
import { Card, Icon, Label, Image} from 'semantic-ui-react';
import { Button } from 'semantic-ui-react';

import {Link} from 'react-router-dom';
import moment from 'moment';

// import 'semantic-ui-css/semantic.min.css';

import {useAuthContext} from '../../context/auth'
import LikeButton from '../LikeButton/LikeButton';
import DeleteButton from '../DeleteButton/DeleteButton'
import MyPopup from '../../util/MyPopup';

function PostCard({ 
    post: { body, createdAt, id, user: userData, likeCount, commentCount, likes } 
}) {

    const {user} = useAuthContext();

    // const likePost =() => {
    //     console.log('Like Post')
    // }

    return (
        <div>
            <Card fluid>
                <Card.Content>
                    <Image
                        floated='right'
                        size='mini'
                        src='https://react.semantic-ui.com/images/avatar/large/molly.png'
                    />
                    <Card.Header>{userData.username}</Card.Header>
                    <Card.Meta as={Link} to={`/posts/${id}`}>{Intl.DateTimeFormat('en-US').format(new Date(Number(createdAt)))}</Card.Meta>
                    <Card.Description>
                        {body}
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                <LikeButton post={{id, likes, likeCount}} user={userData.username}/>
                <MyPopup 
                    content="Comment on Post"
                >
                    <Button labelPosition='right' as={Link} to={`/posts/${id}`}>
                            <Button color='blue' basic>
                                <Icon name='comments' />
                                Comments
                            </Button>
                            <Label as='a' basic color='blue' pointing='left'>
                                {commentCount}
                            </Label>
                        </Button>
                </MyPopup>
                {userData && userData.username === user?.username ?
                <DeleteButton postId={id}/> : null}
                </Card.Content>

            </Card>
    
        </div>
        
    )
}

export default PostCard;