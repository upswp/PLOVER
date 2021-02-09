import React from 'react';
import StudyListItem from './StudyListItem';

const StudyList = ({data}) => {
  return (
    data.map((item) => {
      return <StudyListItem item={item}/>;
    })
  )
};

export default StudyList;