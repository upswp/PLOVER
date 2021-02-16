package com.plover.service;

import com.plover.config.Constant;
import com.plover.exceptions.EntityNotFoundException;
import com.plover.exceptions.ErrorCode;
import com.plover.model.mentoring.Mentoring;
import com.plover.model.mentoring.request.MentoringRequest;
import com.plover.model.mentoring.request.MentoringUpdateRequest;
import com.plover.model.mentoring.response.MentoringListResponse;
import com.plover.model.mentoring.response.MentoringResponse;
import com.plover.model.user.Users;
import com.plover.repository.MentoringRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class MentoringService {

    private MentoringRepository mentoringRepository;

    public MentoringService(MentoringRepository mentoringRepository){
        this.mentoringRepository = mentoringRepository;
    }

    // 멘토링 게시글 수 조회
    public Long getMentoringNum(Long no){
        return mentoringRepository.countByUserNo(no);
    }

    /*멘토링 조회*/

    @Transactional
    public MentoringListResponse getMentoringOrderByRecent(Long cursorId) {
        Pageable page = PageRequest.of(0, Constant.PAGE_SIZE.getValue());
        // 페이지에 맞게 리스트 반환
        List<Mentoring> mentorings;
        if (cursorId == 0) {
            mentorings = mentoringRepository.findByOrderByIdDesc(page);
        } else {
            mentorings = mentoringRepository.findByIdLessThanOrderByIdDesc(cursorId, page);
        }

        final Long lastIdOfList = mentorings.isEmpty() ?
                null : mentorings.get(mentorings.size() - 1).getId();

        return new MentoringListResponse(mentorings, hasNext(lastIdOfList));
    }
    private Boolean hasNext(Long lastIdOfList) {
        if (lastIdOfList == null) return false;
        // 마지막 인덱스보다 작은 것이 있으면 true, 없으면 false
        return mentoringRepository.existsByIdLessThan(lastIdOfList);
    }

    /*멘토링 등록*/
    @Transactional
    public Long save(Users user, MentoringRequest mentoringRequest){
        Mentoring mentoring = mentoringRequest.toMentoring();
        mentoring.setUser(user);
        mentoringRepository.save(mentoring);
        return mentoring.getId();
    }

    /*멘토링 상세보기*/

    public Mentoring findById(Long id){
        return mentoringRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(ErrorCode.MENTORING_NOT_FOUND));
    }

    @Transactional
    public MentoringResponse getMentoring(Long id) {
        Mentoring mentoring = findById(id);
        return MentoringResponse.of(mentoring);
    }


    /*멘토링 수정*/

    @Transactional
    public MentoringResponse updateMentoring(MentoringUpdateRequest mentoringUpdateRequest) {
        Mentoring mentoring = findById(mentoringUpdateRequest.getId());
        Mentoring requestMentoring = mentoringUpdateRequest.toMentoring();

        Mentoring updateMentoring = mentoring.update(requestMentoring);
        return MentoringResponse.of(updateMentoring);
    }

    /*멘토링 삭제*/

    @Transactional
    public void deleteMentoring(Long id){
        mentoringRepository.deleteById(id);
    }

}
