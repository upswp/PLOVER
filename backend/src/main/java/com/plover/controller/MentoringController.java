package com.plover.controller;
import com.plover.model.Response;
import com.plover.model.metoring.chat.request.ChatMentoringInsertRequest;
import com.plover.model.metoring.chat.request.ChatMentoringUpdateRequest;
import com.plover.model.metoring.chat.response.ChatMentoringDetailResPonse;
import com.plover.model.metoring.common.request.DeleteRequest;
import com.plover.model.metoring.live.request.LiveMentoringInsertRequest;
import com.plover.model.metoring.live.request.LiveMentoringUpdateRequest;
import com.plover.model.metoring.live.response.LiveMentoringDetailResPonse;
import com.plover.model.metoring.meet.request.MeetMentoringInsertRequest;
import com.plover.model.metoring.meet.request.MeetMentoringUpdateRequest;
import com.plover.model.metoring.meet.response.MeetMentoringDetailResPonse;
import com.plover.model.user.Users;
import com.plover.service.FileService;
import com.plover.service.MentoringService;
import com.plover.service.AccountService;
import io.swagger.annotations.ApiOperation;
import javassist.NotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

@RestController
@RequestMapping("mentoring")
public class MentoringController {

    private MentoringService mentoringService;
    private AccountService accountService;

    public MentoringController(MentoringService mentoringService, FileService fileService, AccountService accountService){
        this.accountService = accountService;
        this.mentoringService = mentoringService;
    }

    @PostMapping("/article/chat")
    @ApiOperation(value = "채팅 멘토링 게시글 등록", notes = "채팅 멘토링 게시글 정보를 전달받아 멘토링 게시글을 등록한다.", response = Response.class)
    public Object saveChatMentoring(@Valid @RequestBody ChatMentoringInsertRequest chatMentoringInsertRequest){
        ResponseEntity response = null;
        try{
            Users user = accountService.findUserByEmail(chatMentoringInsertRequest.getEmail());
            Long mentoringId = mentoringService.saveChat(user,chatMentoringInsertRequest);
            final Response result = new Response("success","채팅 멘토링 게시글을 등록이 성공하였습니다.",mentoringId);
            response = new ResponseEntity<>(result,HttpStatus.OK);
        }catch (Exception e){
             final Response result = new Response( "error",  "채팅 멘토링 게시글을 등록할 수 없습니다.", null);
             response = new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
        }
        return response;
    }

    @PostMapping("/article/live")
    @ApiOperation(value = "실시간 라이브 멘토링 게시글 등록", notes = "실시간 라이브 멘토링 게시글 정보를 전달받아 멘토링 게시글을 등록한다.", response = Response.class)
    public Object saveLiveMentoring(@Valid @RequestBody LiveMentoringInsertRequest liveMentoringInsertRequest){
        ResponseEntity response = null;
        try{
            Users user = accountService.findUserByEmail(liveMentoringInsertRequest.getEmail());
            Long mentoringId = mentoringService.saveLive(user,liveMentoringInsertRequest);
            final Response result = new Response("success","실시간 라이브 멘토링 게시글을 등록이 성공하였습니다.",mentoringId);
            response = new ResponseEntity<>(result,HttpStatus.OK);
        }catch (Exception e){
            final Response result = new Response( "error",  "실시간 라이브 멘토링 게시글을 등록할 수 없습니다.", null);
            response = new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
        }
        return response;
    }

    @PostMapping("/article/meet")
    @ApiOperation(value = "만남 멘토링 게시글 등록", notes = "만남 멘토링 게시글 정보를 전달받아 멘토링 게시글을 등록한다.", response = Response.class)
    public Object saveMeetMentoring(@Valid @RequestBody MeetMentoringInsertRequest meetMentoringInsertRequest){
        ResponseEntity response = null;
        try{
            Users user = accountService.findUserByEmail(meetMentoringInsertRequest.getEmail());
            Long mentoringId = mentoringService.saveMeet(user,meetMentoringInsertRequest);
            final Response result = new Response("success","만남 멘토링 게시글을 등록이 성공하였습니다.",mentoringId);
            response = new ResponseEntity<>(result,HttpStatus.OK);
        }catch (Exception e){
            final Response result = new Response( "error",  "만남 멘토링 게시글을 등록할 수 없습니다.", null);
            response = new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
        }
        return response;
    }

    @GetMapping("/article/chat/{id}")
    @ApiOperation(value = "채팅 멘토링 게시글 한 개의 정보 반환(상세보기)",
            notes = "채팅 게시글의 아이디를 전달 받아 해당 게시글의 정보를 반환한다.",
            response = Response.class)
    public Object getChatMentoring(@PathVariable @NotNull Long id) {
        ResponseEntity response = null;
        ChatMentoringDetailResPonse chatMentoringDetailResPonse = mentoringService.getChatMentoring(id);
        if (chatMentoringDetailResPonse != null) {
            final Response result = new Response("success", "채팅 멘토링 게시글 정보 조회 성공", chatMentoringDetailResPonse);
            response = new ResponseEntity<>(result, HttpStatus.OK);
        } else {
            final Response result = new Response("error", "채팅 멘토링 게시글 정보 조회 실패", null);
            response = new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
        }
        return response;
    }

    @GetMapping("/article/live/{id}")
    @ApiOperation(value = "라이브 멘토링 게시글 한 개의 정보 반환(상세보기)",
            notes = "라이브 게시글의 아이디를 전달 받아 해당 게시글의 정보를 반환한다.",
            response = Response.class)
    public Object getLiveMentoring(@PathVariable @NotNull Long id) {
        ResponseEntity response = null;
        LiveMentoringDetailResPonse liveMentoringDetailResPonse = mentoringService.getLiveMentoring(id);
        if (liveMentoringDetailResPonse != null) {
            final Response result = new Response("success", "라이브 멘토링 게시글 정보 조회 성공", liveMentoringDetailResPonse);
            response = new ResponseEntity<>(result, HttpStatus.OK);
        } else {
            final Response result = new Response("error", "라이브 멘토링 게시글 정보 조회 실패", null);
            response = new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
        }
        return response;
    }

    @GetMapping("/article/meet/{id}")
    @ApiOperation(value = "채팅 멘토링 게시글 한 개의 정보 반환(상세보기)",
            notes = "채팅 게시글의 아이디를 전달 받아 해당 게시글의 정보를 반환한다.",
            response = Response.class)
    public Object getMeetMentoring(@PathVariable @NotNull Long id) {
        ResponseEntity response = null;
        MeetMentoringDetailResPonse meetMentoringDetailResPonse = mentoringService.getMeetMentoring(id);
        if (meetMentoringDetailResPonse != null) {
            final Response result = new Response("success", "채팅 멘토링 게시글 정보 조회 성공", meetMentoringDetailResPonse);
            response = new ResponseEntity<>(result, HttpStatus.OK);
        } else {
            final Response result = new Response("error", "채팅 멘토링 게시글 정보 조회 실패", null);
            response = new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
        }
        return response;
    }

    @PutMapping("/article/chat/{id}")
    @ApiOperation(value = "채팅 멘토링 게시글 한 개의 정보 수정",
            notes = "수정하려는 정보와 채팅 멘토링의 아이디를 전달 받아 해당 게시글의 정보를 수정한다.",
            response = Response.class)
    public Object updateChatMentoring(@PathVariable @NotNull Long id, @RequestBody @Valid ChatMentoringUpdateRequest chatMentoringUpdateRequest) {
        ResponseEntity response = null;
        try {
            Users user = accountService.findUserByEmail(chatMentoringUpdateRequest.getEmail());
            if (user.getNo() == mentoringService.findById(id).getUser().getNo()) {
                ChatMentoringDetailResPonse returnChatMentoring = mentoringService.updateChatMentoring(id, chatMentoringUpdateRequest);
                final Response result = new Response("success", "스터디 게시글 정보 수정 성공", returnChatMentoring);
                response = new ResponseEntity<>(result, HttpStatus.OK);
            } else {
                final Response result = new Response("error", "스터디 게시글 정보를 수정할 수 있는 권한이 없습니다.", null);
                response = new ResponseEntity<>(result, HttpStatus.UNAUTHORIZED);
            }
        }catch (NotFoundException e){
            final Response result = new Response("error", e.getMessage(), null);
            response = new ResponseEntity<>(result, HttpStatus.UNAUTHORIZED);
        } catch (Exception e) {
            final Response result = new Response("error", "스터디 게시글 정보 수정 실패", null);
            response = new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
        }
        return response;
    }

    @PutMapping("/article/live/{id}")
    @ApiOperation(value = "실시간 라이브 멘토링 게시글 한 개의 정보 수정",
            notes = "수정하려는 정보와 실시간 라이브 멘토링의 아이디를 전달 받아 해당 게시글의 정보를 수정한다.",
            response = Response.class)
    public Object updateLiveMentoring(@PathVariable @NotNull Long id, @RequestBody @Valid LiveMentoringUpdateRequest liveMentoringUpdateRequest) {
        ResponseEntity response = null;
        try {
            Users user = accountService.findUserByEmail(liveMentoringUpdateRequest.getEmail());
            if (user.getNo() == mentoringService.findById(id).getUser().getNo()) {
                LiveMentoringDetailResPonse returnLiveMentoring = mentoringService.updateLiveMentoring(id, liveMentoringUpdateRequest);
                final Response result = new Response("success", "스터디 게시글 정보 수정 성공", returnLiveMentoring);
                response = new ResponseEntity<>(result, HttpStatus.OK);
            } else {
                final Response result = new Response("error", "스터디 게시글 정보를 수정할 수 있는 권한이 없습니다.", null);
                response = new ResponseEntity<>(result, HttpStatus.UNAUTHORIZED);
            }
        }catch (NotFoundException e){
            final Response result = new Response("error", e.getMessage(), null);
            response = new ResponseEntity<>(result, HttpStatus.UNAUTHORIZED);
        } catch (Exception e) {
            final Response result = new Response("error", "스터디 게시글 정보 수정 실패", null);
            response = new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
        }
        return response;
    }

    @PutMapping("/article/meet/{id}")
    @ApiOperation(value = "만남 멘토링 게시글 한 개의 정보 수정",
            notes = "수정하려는 정보와 만남 멘토링의 아이디를 전달 받아 해당 게시글의 정보를 수정한다.",
            response = Response.class)
    public Object updateMeetMentoring(@PathVariable @NotNull Long id, @RequestBody @Valid MeetMentoringUpdateRequest meetMentoringUpdateRequest) {
        ResponseEntity response = null;
        try {
            Users user = accountService.findUserByEmail(meetMentoringUpdateRequest.getEmail());
            if (user.getNo() == mentoringService.findById(id).getUser().getNo()) {
                MeetMentoringDetailResPonse returnMeetMentoring = mentoringService.updateMeetMentoring(id, meetMentoringUpdateRequest);
                final Response result = new Response("success", "스터디 게시글 정보 수정 성공", returnMeetMentoring);
                response = new ResponseEntity<>(result, HttpStatus.OK);
            } else {
                final Response result = new Response("error", "스터디 게시글 정보를 수정할 수 있는 권한이 없습니다.", null);
                response = new ResponseEntity<>(result, HttpStatus.UNAUTHORIZED);
            }
        }catch (NotFoundException e){
            final Response result = new Response("error", e.getMessage(), null);
            response = new ResponseEntity<>(result, HttpStatus.UNAUTHORIZED);
        } catch (Exception e) {
            final Response result = new Response("error", "스터디 게시글 정보 수정 실패", null);
            response = new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
        }
        return response;
    }

    @DeleteMapping("/article/{id}")
    @ApiOperation(value = "멘토링 게시글 한 개 삭제",
            notes = "삭제를 시도하려는 사람의 이메일과 스터디 게시글의 아이디를 전달 받아 해당 게시글을 삭제한다.",
            response = Response.class)
    public Object deleteStudy(@PathVariable @NotNull Long id, @RequestBody @Valid DeleteRequest deleteRequest) {
        ResponseEntity response = null;
        try {
            Users user = accountService.findUserByEmail(deleteRequest.getEmail());
            if (user.getNo() == mentoringService.findById(id).getUser().getNo()) {
                mentoringService.deleteMentoring(id);
                final Response result = new Response("success", "멘토링 게시글 정보 삭제 성공", null);
                response = new ResponseEntity<>(result, HttpStatus.OK);
            }else {
                final Response result = new Response("error", "멘토링 게시글 정보를 삭제할 수 있는 권한이 없습니다.", null);
                response = new ResponseEntity<>(result, HttpStatus.UNAUTHORIZED);
            }
        }catch (NotFoundException e){
            final Response result = new Response("error", e.getMessage(), null);
            response = new ResponseEntity<>(result, HttpStatus.UNAUTHORIZED);
        }catch (Exception e){
            final Response result = new Response("error", "멘토링 게시글 정보 삭제 실패", null);
            response = new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
        }
        return response;
    }
}