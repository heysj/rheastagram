import React from 'react';
import './PostPage.css';
import { API } from 'aws-amplify';
import PostCard from '../../components/PostCard/PostCard';

function PostPage({props, loggedInUserData}) {
  const [findPostState, changeFindPostState] = React.useState('loading');
  const [arrOfLikes, changeArrOfLikes] = React.useState([]);
  const [postData, changePostData] = React.useState({
    id: '',
    picUrl: '',
    timeCreated: '',
    user: {},
    comments: {items: []},
    likes: {items: []}
  });
  const paramsPostId = props.match.params.postId;
  
  const getPostData = async (paramsPostId) => {
    const query = `
      query GetPost($postId: ID!) {
        getPost(id: $postId) {
          id
          picUrl
          timeCreated
          user {
            id
            username
            photoUrl
          }
          comments {
            items {
              id
              content
              timeCreated
              user {
                id
                photoUrl
                username
              }
            }
          }
          likes {
            items {
              id
              user {
                id
              }
            }
          }
        }
      }
    `;
    
    const variables = {
      postId: paramsPostId
    }
    
    console.log("Getting post data.");

    const res = await API.graphql({query, variables});
    if (res.data.getPost) {
      changePostData(res.data.getPost);
      return 'found';
    } else {
      return 'notfound';
    }
  }
  
  const reduceUserLikes = (loggedInUserData) => {
    return loggedInUserData.likes.reduce((acc, currVal) => {
    	acc.push(currVal.post.id);
    	return acc;
    }, []);
  }
  
  const getNewArrOfLikes = () => {
    changeArrOfLikes(reduceUserLikes(loggedInUserData));
  }
  
  React.useEffect(() => {
    console.log("PostPage: useEffect");
    let res = getPostData(paramsPostId);
    res.then(d => changeFindPostState(d));
    getNewArrOfLikes();
  }, [paramsPostId, loggedInUserData]);
  
  return (
    <div className="PostPage" style={{paddingTop: '100px', margin: '0 auto', maxWidth: '1000px'}}>
      {{loading: <h1>Loading</h1>,
        found:  <PostCard
                  postId={postData.id}
                  postImgUrl={postData.picUrl}
                  userData={postData.user}
                  loggedInUserData={loggedInUserData} 
                  likes={postData.likes.items}
                  comments={postData.comments.items}
                  getPostData={getPostData}
                  arrOfLikes={arrOfLikes}
                  timeCreated={postData.timeCreated}
                  likeId={postData.likes.items.id}
                  getNewArrOfLikes={getNewArrOfLikes}
                />,
        notfound: <h1>Post not found</h1>
      }[findPostState]}
    </div>
  )
}

export default PostPage;