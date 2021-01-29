package com.plover.service;

import com.google.common.collect.Sets;
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

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Service
public class StudyService {
    @Autowired
    StudyRepository studyRepository;

    @Autowired
    HashtagRepository hashtagRepository;

    // 스터디 게시글 목록 최신순으로 페이징해서 받아옴
    @Transactional(readOnly = true)
    public StudiesResponse getStudiesOrderByRecent(Long cursorId) {
        Pageable page = PageRequest.of(0, Constant.PAGE_SIZE.getValue());
        // 페이지에 맞게 리스트 반환
        List<Study> studies;
        if (cursorId == 0) {
            studies = studyRepository.findByNoticeOrderByIdDesc(false, page);
        } else {
            studies = studyRepository.findByIdLessThanAndNoticeOrderByIdDesc(cursorId, false, page);
        }

        final Long lastIdOfList = studies.isEmpty() ?
                null : studies.get(studies.size() - 1).getId();

        return new StudiesResponse(studies, hasNext(lastIdOfList));
    }

    private Boolean hasNext(Long lastIdOfList) {
        if (lastIdOfList == null) return false;
        // 마지막 인덱스보다 작은 것이 있으면 true, 없으면 false
        return studyRepository.existsByIdLessThan(lastIdOfList);
    }

    // 스터디 게시글 상세보기
    @Transactional(readOnly = true)
    public StudyDetailResponse getStudy(Long id) {
        Study study = findById(id);
        return StudyDetailResponse.of(study);
    }

    // 스터디 게시글 등록
    @Transactional
    public Long save(StudyRequest studyRequest) {
        Study study = studyRequest.toStudy();
        studyRepository.save(study);
        // 이미 등록이 되어있는 hashtag 리스트를 뽑는다.
        List<Hashtag> hashtags = hashtagRepository.findByNameIn(studyRequest.getHashtag());
        // 등록되어 있지 않은 hashtagName들을 객체로 만들어 DB에 저장하고, hashtags에 저장
        saveHashtags(hashtags, studyRequest.getHashtag());
        // 연결해준다(mapping)
        associate(study, hashtags);

        return study.getId();
    }

    private void saveHashtags(List<Hashtag> hashtags, Set<String> requestHashtag) {
        Hashtag hashtag;
        for (String hashtagName : requestHashtag) {
            if (hashtags.stream().noneMatch(h->h.getName().equals(hashtagName))) {
                hashtag = new Hashtag(hashtagName);
                hashtagRepository.save(hashtag);
                // 연관시켜주기위해 추가
                hashtags.add(hashtag);
            }
        }
    }

    private void associate(Study study, List<Hashtag> hashtags) {
        for (Hashtag hashtag : hashtags) {
            StudyHashtag.associate(study, hashtag);
        }
    }

    // 스터디 게시글 수정
    @Transactional
    public StudyDetailResponse updateStudy(Long id, StudyRequest studyRequest) {
        Study study = findById(id);
        Study requestStudy = studyRequest.toStudy();

        // 이미 등록이 되어있는 hashtag 리스트를 뽑는다.
        List<Hashtag> hashtags = hashtagRepository.findByNameIn(studyRequest.getHashtag());
        // 등록되어 있지 않은 hashtagName들을 객체로 만들어 DB에 저장하고, hashtags에 저장
        saveHashtags(hashtags, studyRequest.getHashtag());

        Study updatedStudy = study.update(requestStudy, Sets.newHashSet(hashtags));
        return StudyDetailResponse.of(updatedStudy);
    }

    private Study findById(Long id) {
        return studyRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(ErrorCode.STUDY_NOT_FOUND));
    }

    // 스터디 게시글 삭제
    @Transactional
    public void deleteStudy(Long id){
        studyRepository.deleteById(id);
    }
}
