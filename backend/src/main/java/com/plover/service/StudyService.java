package com.plover.service;

import com.plover.config.Constant;
import com.plover.exceptions.EntityNotFoundException;
import com.plover.exceptions.ErrorCode;
import com.plover.model.study.Hashtag;
import com.plover.model.study.Study;
import com.plover.model.study.StudyHashtag;
import com.plover.model.study.request.StudyRequest;
import com.plover.model.study.response.StudiesResponse;
import com.plover.model.study.response.StudyDetailResponse;
import com.plover.repository.HashtagRepository;
import com.plover.repository.StudyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class StudyService {
    @Autowired
    StudyRepository studyRepository;

    @Autowired
    HashtagRepository hashtagRepository;

    @Transactional(readOnly = true)
    public StudiesResponse getStudiesOrderByRecent(Long cursorId){
        Pageable page = PageRequest.of(0, Constant.PAGE_SIZE.getValue());
        // 페이지에 맞게 리스트 반환
        List<Study> studies;
        if(cursorId==null){
            studies = studyRepository.findByNoticeIsTrueOrderByIdDesc(false,page);
        }else{
            studies = studyRepository.findByIdLessThanAndNoticeIsTrueOrderByIdDesc(cursorId,false,page);
        }

        final Long lastIdOfList = studies.isEmpty() ?
                null : studies.get(studies.size() - 1).getId();

        return new StudiesResponse(studies,hasNext(lastIdOfList));
    }

    private Boolean hasNext(Long lastIdOfList) {
        if (lastIdOfList == null) return false;
        // 마지막 인덱스보다 작은 것이 있으면 true, 없으면 false
        return studyRepository.existsByIdLessThan(lastIdOfList);
    }

    @Transactional(readOnly = true)
    public StudyDetailResponse getStudy(Long id) {
        Study study = studyRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(ErrorCode.STUDY_NOT_FOUND));
        return StudyDetailResponse.of(study);
    }

    @Transactional
    public Long save(StudyRequest studyRequest){
        Study study = studyRequest.toStudy();
        studyRepository.save(study);

        if(studyRequest.getHashtag()!=null) {
            List<Hashtag> hashtags = hashtagRepository.findByNameIn(studyRequest.getHashtag());
            associate(study, hashtags);
        }

        return study.getId();
    }

    private void associate(Study study, List<Hashtag> hashtags) {
        for (Hashtag hashtag : hashtags) {
            StudyHashtag.associate(study, hashtag);
        }
    }
}
