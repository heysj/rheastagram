/* eslint-disable */
import React from 'react';
import './App.css';
import { Auth, Analytics, Storage, API, graphqlOperation } from 'aws-amplify';
import { withAuthenticator, Authenticator, SignIn, ForgotPassword } from 'aws-amplify-react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";
import customTheme from './customTheme';
import RNavbar from './components/RNavbar/RNavbar';
import HomePage from './pages/HomePage';
import PublicPage from './pages/PublicPage';
import PostPhotoPage from './pages/PostPhotoPage';
import UserPage from './pages/UserPage';
import EditProfilePage from './pages/EditProfilePage';
import FooterBar from './components/FooterBar/FooterBar';
import { listUsers, getUser } from './graphql/queries';
import { createUser } from './graphql/mutations';
import { genUUID } from './utils';

const customGetUserQuery = `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      username
      name
      bio
      email
      photoUrl
      userPosts {
        items {
          id
          picUrl
          timeCreated
          comments {
            items {
              id
            }
          }
          likes {
            items {
              id
            }
          }
        }
        nextToken
      }
      comments {
        items {
          id
          content
          timeCreated
        }
        nextToken
      }
      likes {
        items {
          id
          timeCreated
        }
        nextToken
      }
    }
  }
`

function App() {
  const [userData, changeUserData] = React.useState({
    id: null,
    name: '',
    profilePhotoUrl: null,
    posts: [],
    comments: [],
    likes: [],
    bio: ''
  });
  

  React.useEffect(() => {
    console.log("App-useEffect: Getting Auth Data for current logged-in user!")
    //     Auth.currentCredentials()
    // .then(res => {
    //   getUserData(res.data.IdentityId);
    // })
    // .catch(err => console.log(err))
    getAuthenticatedUserAndData();
  }, []);
  

  const postUser = async(identityId, username, email) => {
    const createUserInput = {
      id: identityId,
      username,
      email,
      name: username,
      bio: `Hello my name is ${username} :)`,
    };
    console.log(createUserInput);
    const response = await API.graphql(graphqlOperation(createUser, {input: createUserInput}));
    getUserData(identityId);
  }
  
  const getAuthenticatedUserAndData = () => {
    Auth.currentCredentials()
    .then(res => {
      getUserData(res.data.IdentityId);
    })
    .catch(err => console.log(err))
  }
  
  const getUserData = async(identityId) => {
    const response = await API.graphql(graphqlOperation(customGetUserQuery, {id: identityId}));
    if (response.data.getUser === null) {
      console.log("Not found. Create new profile on database");
      Auth.currentAuthenticatedUser().then(d => {
        postUser(identityId, d.username, d.attributes.email)
      })

    } else {
      console.log('App: Found user on DynamoDB database!')
      let {bio, comments, id, likes, name, photoUrl, userPosts, username} = response.data.getUser;
      changeUserData({
        id,
        name,
        bio,
        username,
        profilePhotoUrl: photoUrl,
        posts: userPosts.items,
        comments: comments.items,
        likes: likes.items
      })
    }
  }
  
  const testfunc = () => console.log('testing!')

  const list = async(identityId) => {
    // console.log('calling api');
    // const response = await API.get(myApi, `/items/postid:456`);
    // console.log(response);
    console.log('listing');
  }


  return (
    <Router>
      <div className="App">
        <RNavbar userData={userData} />
        <Route 
          path="/" 
          exact 
          render={props => 
            <HomePage 
              username={userData.name} 
              post={postUser} 
              getUserData={getUserData} 
              userData={userData} 
              list={list} 
            />
          } 
        />
        <Route path="/public" render={props => <PublicPage userData={userData} />} />
        <Route path="/user/:id" render={props => <UserPage loggedInUserData={userData} props={props} />} />
        <Route path="/editprofile" render={props => <EditProfilePage userData={userData} getAuthenticatedUserAndData={getAuthenticatedUserAndData} />} />
        <Route path="/post" render={props => <PostPhotoPage userData={userData} />} />
        {/* <FooterBar post={postUser} list={list} userData={userData} getUserData={getAuthenticatedUserAndData} /> */}
      </div>
    </Router>
  );
}


export default withAuthenticator(App, false, [], null, customTheme);