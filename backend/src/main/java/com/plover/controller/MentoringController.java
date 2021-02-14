package com.plover.controller;


import com.plover.model.Response;
import com.plover.model.metoring.request.MentoringRequest;
import com.plover.model.user.Users;
import com.plover.service.FileService;
import com.plover.service.MentoringService;
import com.plover.service.AccountService;
import io.swagger.annotations.ApiOperation;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("mentoring")
public class MentoringController {

    private MentoringService mentoringService;
    private AccountService accountService;
    private FileService fileService;

    public MentoringController(MentoringService mentoringService, FileService fileService, AccountService accountService){
        this.accountService = accountService;
        this.fileService = fileService;
        this.mentoringService = mentoringService;
    }

    @PostMapping("/article")
    @ApiOperation(value = "멘토링 게시글 등록", notes = "멘토링 게시글 정보를 전달받아 멘토링 게시글을 등록한다.", response = Response.class)
    public Object saveMentoring(@Valid @RequestBody MentoringRequest mentoringRequest){
        ResponseEntity response = null;
        try{
            Users user = accountService.findUserByEmail(mentoringRequest.getEmail());
            Long mentoringId = mentoringService.save(user,mentoringRequest);
            final Response result = new Response("success","멘토링 게시글을 등록이 성공하였습니다.",mentoringId);
            response = new ResponseEntity<>(result,HttpStatus.OK);
        }catch (Exception e){
             final Response result = new Response( "error",  "멘토링 게시글을 등록할 수 없습니다.", null);
             response = new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
        }
        return response;
    }
}
