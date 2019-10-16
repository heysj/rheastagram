import React from 'react';
import { Storage, API, graphqlOperation } from 'aws-amplify';
import { PhotoPicker } from 'aws-amplify-react';
import customTheme from '../../customTheme';
import { Button, Icon } from 'antd';
import { createPost } from '../../graphql/mutations';
import { genUUID, getISODate } from '../../utils';
import { useHistory } from "react-router";


function PostPhotoForm({userData}) {
  const [imgKey, changeImgKey] = React.useState();
  const history = useHistory();
  
  const handlePick = data => {
    console.log(data);
    Storage.put(`${userData.id}/${data.name}`, data.file, {
        level: 'public',
        contentType: data.type
    })
    .then (result => changeImgKey(result.key))
    .catch(err => console.log(err));
  }
  
  const handleSave = async(e) => {
    let createPostInput = {
      id: `postid:${genUUID()}`,
      picUrl: imgKey,
      postUserId: userData.id,
      timeCreated: getISODate()
    };
    const data = await API.graphql(graphqlOperation(createPost, {input: createPostInput}))
    console.log(data);
    history.push("/");
  }
  
  return (
    <div>
      <button onClick={e => {
        Storage.get('ktgiraffe.jpg').then(d => console.log(d)).catch(err => console.log(err))
      }}>click</button>
      <button onClick={e => console.log(imgKey)}>what is the img key</button>
      <PhotoPicker 
        preview 
        theme={customTheme} 
        onPick={handlePick} 
      />
      <Button onClick={handleSave}><Icon type="save" />Submit</Button>
    </div>
  )
}

export default PostPhotoForm;