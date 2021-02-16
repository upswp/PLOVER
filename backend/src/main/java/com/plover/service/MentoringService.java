package com.plover.service;
import com.plover.config.Constant;
import com.plover.exceptions.EntityNotFoundException;
import com.plover.exceptions.ErrorCode;
import com.plover.model.mentoring.MentoringEntity;
import com.plover.model.mentoring.chat.request.ChatMentoringInsertRequest;
import com.plover.model.mentoring.chat.request.ChatMentoringUpdateRequest;
import com.plover.model.mentoring.chat.response.ChatMentoringDetailResPonse;
import com.plover.model.mentoring.common.response.ListResponse;
import com.plover.model.mentoring.live.request.LiveMentoringInsertRequest;
import com.plover.model.mentoring.live.request.LiveMentoringUpdateRequest;
import com.plover.model.mentoring.live.response.LiveMentoringDetailResPonse;
import com.plover.model.mentoring.meet.request.MeetMentoringInsertRequest;
import com.plover.model.mentoring.meet.request.MeetMentoringUpdateRequest;
import com.plover.model.mentoring.meet.response.MeetMentoringDetailResPonse;
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
    public ListResponse getMentoringOrderByRecent(Long cursorId) {
        Pageable page = PageRequest.of(0, Constant.PAGE_SIZE.getValue());
        // 페이지에 맞게 리스트 반환
        List<MentoringEntity> mentorings;
        if (cursorId == 0) {
            mentorings = mentoringRepository.findByOrderByIdDesc(page);
        } else {
            mentorings = mentoringRepository.findByIdLessThanOrderByIdDesc(cursorId, page);
        }

        final Long lastIdOfList = mentorings.isEmpty() ?
                null : mentorings.get(mentorings.size() - 1).getId();

        return new ListResponse(mentorings, hasNext(lastIdOfList));
    }
    private Boolean hasNext(Long lastIdOfList) {
        if (lastIdOfList == null) return false;
        // 마지막 인덱스보다 작은 것이 있으면 true, 없으면 false
        return mentoringRepository.existsByIdLessThan(lastIdOfList);
    }

    /*멘토링 등록*/

    @Transactional
    public Long saveChat(Users user, ChatMentoringInsertRequest mentoringRequest){
        MentoringEntity mentoring = mentoringRequest.toChat();
        mentoring.setUser(user);
        mentoringRepository.save(mentoring);
        return mentoring.getId();
    }

    @Transactional
    public Long saveLive(Users user, LiveMentoringInsertRequest mentoringRequest){
        MentoringEntity mentoring = mentoringRequest.toLive();
        mentoring.setUser(user);
        mentoringRepository.save(mentoring);
        return mentoring.getId();
    }

    @Transactional
    public Long saveMeet(Users user, MeetMentoringInsertRequest mentoringRequest){
        MentoringEntity mentoring = mentoringRequest.toMeet();
        mentoring.setUser(user);
        mentoringRepository.save(mentoring);
        return mentoring.getId();
    }

    /*멘토링 상세보기*/

    public MentoringEntity findById(Long id){
        return mentoringRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(ErrorCode.MENTORING_NOT_FOUND));
    }

    @Transactional
    public ChatMentoringDetailResPonse getChatMentoring(Long id) {
        MentoringEntity mentoringEntity = findById(id);
        return ChatMentoringDetailResPonse.of(mentoringEntity);
    }

    @Transactional
    public LiveMentoringDetailResPonse getLiveMentoring(Long id) {
        MentoringEntity mentoringEntity = findById(id);
        return LiveMentoringDetailResPonse.of(mentoringEntity);
    }

    @Transactional
    public MeetMentoringDetailResPonse getMeetMentoring(Long id) {
        MentoringEntity mentoringEntity = findById(id);
        return MeetMentoringDetailResPonse.of(mentoringEntity);
    }

    /*멘토링 수정*/

    @Transactional
    public ChatMentoringDetailResPonse updateChatMentoring(Long id, ChatMentoringUpdateRequest chatMentoringUpdateRequest) {
        MentoringEntity mentoringEntity = findById(id);
        MentoringEntity requestChatMentoring = chatMentoringUpdateRequest.toChat();

        MentoringEntity updateChatMentoring = mentoringEntity.updateChatMentoring(requestChatMentoring);
        return ChatMentoringDetailResPonse.of(updateChatMentoring);
    }

    @Transactional
    public LiveMentoringDetailResPonse updateLiveMentoring(Long id, LiveMentoringUpdateRequest liveMentoringUpdateRequest) {
        MentoringEntity mentoringEntity = findById(id);
        MentoringEntity requestLiveMentoring = liveMentoringUpdateRequest.toLive();

        MentoringEntity updateLiveMentoring = mentoringEntity.updateLiveMentoring(requestLiveMentoring);
        return LiveMentoringDetailResPonse.of(updateLiveMentoring);
    }

    @Transactional
    public MeetMentoringDetailResPonse updateMeetMentoring(Long id, MeetMentoringUpdateRequest meetMentoringUpdateRequest) {
        MentoringEntity mentoringEntity = findById(id);
        MentoringEntity requestMeetMentoring = meetMentoringUpdateRequest.toMeet();

        MentoringEntity updateMeetMentoring = mentoringEntity.updateMeetMentoring(requestMeetMentoring);
        return MeetMentoringDetailResPonse.of(updateMeetMentoring);
    }

    /*멘토링 삭제*/

    @Transactional
    public void deleteMentoring(Long id){
        mentoringRepository.deleteById(id);
    }

}
