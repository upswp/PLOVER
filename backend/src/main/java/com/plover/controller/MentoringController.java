package com.plover.controller;

import com.plover.model.Response;
import com.plover.model.mentoring.request.MentoringRequest;
import com.plover.model.mentoring.request.MentoringUpdateRequest;
import com.plover.model.mentoring.response.MentoringListResponse;
import com.plover.model.mentoring.response.MentoringResponse;
import com.plover.model.user.Users;
import com.plover.service.MentoringService;
import com.plover.service.UserService;
import com.plover.utils.CookieUtil;
import com.plover.utils.JwtUtil;
import io.swagger.annotations.ApiOperation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.Locale;
import java.util.UUID;

@RestController
@RequestMapping("mentoring")
public class MentoringController {

    private static final Logger logger = LoggerFactory.getLogger(MentoringController.class);

    @Value("${file.path}")
    String localFilePath;
    private MentoringService mentoringService;
    private UserService userService;
    private JwtUtil jwtUtil;
    private CookieUtil cookieUtil;

    public MentoringController(MentoringService mentoringService, UserService userService, JwtUtil jwtUtil, CookieUtil cookieUtil) {
        this.mentoringService = mentoringService;
        this.userService = userService;
        this.jwtUtil = jwtUtil;
        this.cookieUtil = cookieUtil;
    }

    @GetMapping("list/{cursorid}")
    @ApiOperation(value = "페이징 된 멘토링 게시글 목록, 다음 페이지 유무여부 반환",
            notes = "조회한 게시글의 마지막 번호와 정렬(최신순)을 받아 멘토링 일반게시글의 목록을 반환한다.",
            response = Response.class)
    public Object getMentorings(@PathVariable Long cursorid) {
        ResponseEntity response = null;
        try {
            MentoringListResponse mentoringResponse = mentoringService.getMentoringOrderByRecent(cursorid);
            final Response result = new Response("success", "멘토링 게시글 최신순 목록 조회 성공", mentoringResponse);
            response = new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            final Response result = new Response("error", "멘토링 게시글 목록 조회 실패", e.getMessage());
            response = new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
        }

        return response;
    }

    @PostMapping
    @ApiOperation(value = "멘토링 게시글 등록(로그인필수)", notes = "멘토링 게시글 정보를 전달받아 멘토링 게시글을 등록한다.", response = Response.class)
    public Object saveMentoring(HttpServletRequest request, @RequestPart(value = "file", required = false) MultipartFile image, @Valid @RequestPart("mentoring") MentoringRequest mentoringRequest) {
        ResponseEntity response = null;
        //멘토링 대표 이미지 저장
        if (image != null) {
            UUID uuid = UUID.randomUUID();
            long time = System.currentTimeMillis();
            SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss", Locale.KOREA);
            String filename = uuid + "-" + formatter.format(time) + image.getOriginalFilename();
            Path filePath = Paths.get(localFilePath + filename);
            try {
                Files.write(filePath, image.getBytes());
                mentoringRequest.setMentoringImageUrl("images/" + filename);
            } catch (IOException e) {
                final Response result = new Response("success", "멘토링 이미지 저장 중 오류 발생", e.getMessage());
                return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
            }
        }//파일 저장 끝

        try {
            Long no = (long) jwtUtil.getNo(cookieUtil.getCookie(request, JwtUtil.ACCESS_TOKEN_NAME).getValue());
            if (no != null) {
                Users user = userService.findUserByNo(no);
                Long mentoringId = mentoringService.save(user, mentoringRequest);
                final Response result = new Response("success", "멘토링 게시글을 등록이 성공하였습니다.", mentoringId);
                response = new ResponseEntity<>(result, HttpStatus.OK);
            } else {
                final Response result = new Response("error", "유효하지 않은 토큰 값입니다.", null);
                response = new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            final Response result = new Response("error", "멘토링 게시글을 등록할 수 없습니다.", null);
            response = new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
        }
        return response;
    }

    @GetMapping("/{id}")
    @ApiOperation(value = "멘토링 게시글 한 개의 정보 반환(상세보기)",
            notes = "게시글의 아이디를 전달 받아 해당 게시글의 정보를 반환한다.",
            response = Response.class)
    public Object getMentoring(@PathVariable @NotNull Long id) {
        ResponseEntity response = null;
        MentoringResponse mentoringResponse = mentoringService.getMentoring(id);
        if (mentoringResponse != null) {
            final Response result = new Response("success", "멘토링 게시글 정보 조회 성공", mentoringResponse);
            response = new ResponseEntity<>(result, HttpStatus.OK);
        } else {
            final Response result = new Response("error", "멘토링 게시글 정보 조회 실패", null);
            response = new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
        }
        return response;
    }

    @PutMapping
    @ApiOperation(value = "멘토링 게시글 한 개의 정보 수정(로그인필수)",
            notes = "수정하려는 정보와 멘토링의 아이디를 전달 받아 해당 게시글의 정보를 수정한다.",
            response = Response.class)
    public Object updateMentoring(HttpServletRequest request, @RequestPart(value = "file", required = false) MultipartFile image, @Valid @RequestPart("mentoring") MentoringUpdateRequest mentoringUpdateRequest) {
        ResponseEntity response = null;

        //멘토링 대표 이미지 저장
        if (image != null) {
            UUID uuid = UUID.randomUUID();
            long time = System.currentTimeMillis();
            SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss", Locale.KOREA);
            String filename = uuid + "-" + formatter.format(time) + image.getOriginalFilename();
            Path filePath = Paths.get(localFilePath + filename);
            try {
                Files.write(filePath, image.getBytes());
                mentoringUpdateRequest.setMentoringImageUrl("images/" + filename);
            } catch (IOException e) {
                final Response result = new Response("success", "멘토링 이미지 저장 중 오류 발생", e.getMessage());
                return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
            }
        }//파일 저장 끝

        try {
            Long no = (long) jwtUtil.getNo(cookieUtil.getCookie(request, JwtUtil.ACCESS_TOKEN_NAME).getValue());
            if (no != null) {
                if (no == mentoringService.findById(mentoringUpdateRequest.getId()).getUser().getNo()) {
                    MentoringResponse mentoringResponse = mentoringService.updateMentoring(mentoringUpdateRequest);
                    final Response result = new Response("success", "멘토링 게시글 정보 수정 성공", mentoringResponse);
                    response = new ResponseEntity<>(result, HttpStatus.OK);
                } else {
                    final Response result = new Response("error", "멘토링 게시글 정보를 수정할 수 있는 권한이 없습니다.", null);
                    response = new ResponseEntity<>(result, HttpStatus.UNAUTHORIZED);
                }
            } else {
                final Response result = new Response("error", "유효하지 않은 토큰 값입니다.", null);
                response = new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            final Response result = new Response("error", "멘토링 게시글 정보 수정 실패", null);
            response = new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
        }
        return response;
    }

    @DeleteMapping("/{id}")
    @ApiOperation(value = "멘토링 게시글 한 개 삭제(로그인필수)",
            notes = "멘토링 게시글의 아이디를 전달 받아 해당 게시글을 삭제한다.",
            response = Response.class)
    public Object deleteMentoring(HttpServletRequest request, @PathVariable @NotNull Long id) {
        ResponseEntity response = null;
        try {
            Long no = (long) jwtUtil.getNo(cookieUtil.getCookie(request, JwtUtil.ACCESS_TOKEN_NAME).getValue());
            if (no != null) {
                if (no == mentoringService.findById(id).getUser().getNo()) {
                    mentoringService.deleteMentoring(id);
                    final Response result = new Response("success", "멘토링 게시글 정보 삭제 성공", null);
                    response = new ResponseEntity<>(result, HttpStatus.OK);
                } else {
                    final Response result = new Response("error", "멘토링 게시글 정보를 삭제할 수 있는 권한이 없습니다.", null);
                    response = new ResponseEntity<>(result, HttpStatus.UNAUTHORIZED);
                }
            } else {
                final Response result = new Response("error", "유효하지 않은 토큰 값입니다.", null);
                response = new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            final Response result = new Response("error", "멘토링 게시글 정보 삭제 실패", null);
            response = new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
        }
        return response;
    }
}