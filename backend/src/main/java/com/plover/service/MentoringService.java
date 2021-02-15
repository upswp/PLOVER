package com.plover.service;

import com.google.common.collect.Sets;
import com.plover.exceptions.EntityNotFoundException;
import com.plover.exceptions.ErrorCode;
import com.plover.model.metoring.MentoringEntity;
import com.plover.model.metoring.chat.request.ChatMentoringInsertRequest;
import com.plover.model.metoring.chat.request.ChatMentoringUpdateRequest;
import com.plover.model.metoring.chat.response.ChatMentoringDetailResPonse;
import com.plover.model.metoring.chat.response.ChatMetoringResponse;
import com.plover.model.metoring.live.request.LiveMentoringInsertRequest;
import com.plover.model.metoring.live.request.LiveMentoringUpdateRequest;
import com.plover.model.metoring.live.response.LiveMentoringDetailResPonse;
import com.plover.model.metoring.meet.request.MeetMentoringInsertRequest;
import com.plover.model.metoring.meet.request.MeetMentoringUpdateRequest;
import com.plover.model.metoring.meet.response.MeetMentoringDetailResPonse;
import com.plover.model.study.Hashtag;
import com.plover.model.study.Study;
import com.plover.model.study.request.StudyRequest;
import com.plover.model.study.response.StudyDetailResponse;
import com.plover.model.user.UserDto;
import com.plover.repository.MentoringRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class MentoringService {

    private MentoringRepository mentoringRepository;

    public MentoringService(MentoringRepository mentoringRepository){
        this.mentoringRepository = mentoringRepository;
    }

    /*멘토링 등록*/

    @Transactional
    public Long saveChat(UserDto user, ChatMentoringInsertRequest mentoringRequest){
        MentoringEntity mentoring = mentoringRequest.toChat();
        mentoring.setUser(user);
        mentoringRepository.save(mentoring);
        return mentoring.getId();
    }

    @Transactional
    public Long saveLive(UserDto user, LiveMentoringInsertRequest mentoringRequest){
        MentoringEntity mentoring = mentoringRequest.toLive();
        mentoring.setUser(user);
        mentoringRepository.save(mentoring);
        return mentoring.getId();
    }

    @Transactional
    public Long saveMeet(UserDto user, MeetMentoringInsertRequest mentoringRequest){
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
