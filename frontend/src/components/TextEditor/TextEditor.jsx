import React, { useEffect, useState } from 'react';
import styles from './TextEditor.module.css';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import restapi from 'src/api/restapi';

const TextEditor = (props) => {
  const [description, setDescription] = useState('');
  
  useEffect(() => {
    setDescription(props.userInfo.description)
  },[])

  const clickEditBtn = () => {
    restapi.put(`/user/${props.userInfo.no}`, {description})
      .then((response) => {
        // console.log(response)
        if (response.data.response === 'success') {
          props.setUserInfo({
            ...props.userInfo,
            description
          });
          props.setEditMode(false);
        }
      })
      .catch(() => {})
  }


  return(
    <>
      <button className={styles.editBtn} onClick={clickEditBtn}>
        <p className={styles.editBtnText}>SAVE</p>
        <i class="far fa-save"></i>
      </button>
      <CKEditor
        editor={ ClassicEditor }
        data={props.userInfo.description}
        onReady={ editor => {
            console.log( 'Editor is ready to use!', editor );
        } }
        onChange={ ( event, editor ) => {
            const text = editor.getData();
            setDescription(text)
        } }
        onBlur={ ( event, editor ) => {
            console.log( 'Blur.', editor );
        } }
        onFocus={ ( event, editor ) => {
            console.log( 'Focus.', editor );
        } }
      />
    </>
  );
};

export default TextEditor;