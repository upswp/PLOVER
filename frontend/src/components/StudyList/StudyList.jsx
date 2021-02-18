import React from 'react';
import StudyListItem from './StudyListItem';

const StudyList = ({ data }) => {
  return (
    data.map((item, i) => {
      return <StudyListItem key={"study_list_" + i} item={item} />;
    })
  )
};

export default StudyList;