package com.plover.controller;

import com.plover.model.Response;
import com.plover.model.study.request.StudyRequest;
import com.plover.model.study.response.StudiesResponse;
import com.plover.model.study.response.StudyDetailResponse;
import com.plover.service.StudyService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import java.net.URI;

@ApiResponses(value = {
        @ApiResponse(code = 401, message = "Unauthorized", response = Response.class),
        @ApiResponse(code = 403, message = "Forbidden", response = Response.class),
        @ApiResponse(code = 404, message = "Not Found", response = Response.class),
        @ApiResponse(code = 500, message = "Failure", response = Response.class)})

//개발 모드에서는 모두 허용
//@CrossOrigin(origins = {"*"})
@RestController
@RequestMapping("study")
public class StudyController {
    @Autowired
    private StudyService studyService;

    @GetMapping("/article/{order}/{cursorid}")
    @ApiOperation(value = "페이징 된 스터디 게시글 목록, 다음 페이지 유무여부 반환",
            notes = "조회한 게시글의 마지막 번호와 정렬(최신순, 조회순)을 받아 스터디 일반게시글의 목록을 반환한다.",
            response = Response.class)
    public Object getStudies(@PathVariable @NotBlank @Pattern(regexp = "최신순|조회순", message = "'최신순', '조회순'만 입력 가능합니다.") String order, @PathVariable Long cursorid) {
        ResponseEntity<Response> response = null;
        try {
            // 최신순
            if (order.equals("최신순")) {
                StudiesResponse studiesResponse = studyService.getStudiesOrderByRecent(cursorid);
                final Response result = new Response("success", "스터디 게시글 최신순 목록 조회 성공", studiesResponse);
                response = new ResponseEntity<>(result, HttpStatus.OK);
            }
            // 조회순
            else {
                final Response result = new Response("success", "스터디 게시글 조회순 목록 아직 미구현", null);
                response = new ResponseEntity<>(result, HttpStatus.OK);
            }
        } catch (Exception e) {
            final Response result = new Response("error", "스터디 게시글 목록 조회 실패", e.getMessage());
            return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
        }

        return response;
    }

    @PostMapping("/article")
    @ApiOperation(value = "스터디 게시글 등록",
            notes = "스터디 게시글 정보를 전달받아 스터디 게시글을 등록한다.",
            response = Response.class)
    public Object saveStudy(@Valid @RequestBody StudyRequest studyRequest) {
        Long studyId = studyService.save(studyRequest);
        System.out.println("[스터디게시글등록]studyId: " + studyId);
        return ResponseEntity.created(URI.create("/study/article/" + studyId)).build();
    }

    @GetMapping("/article/{id}")
    @ApiOperation(value = "스터디 게시글 한 개의 정보 반환(상세보기)",
            notes = "스터디 게시글의 아이디를 전달 받아 해당 게시글의 정보를 반환한다.",
            response = Response.class)
    public Object getStudy(@PathVariable @NotNull Long id) {
        ResponseEntity<Response> response = null;
        StudyDetailResponse studyDetailResponse = studyService.getStudy(id);
        if (studyDetailResponse != null) {
            final Response result = new Response("success", "스터디 게시글 정보 조회 성공", studyDetailResponse);
            response = new ResponseEntity<>(result, HttpStatus.OK);
        } else {
            final Response result = new Response("error", "스터디 게시글 정보 조회 실패", null);
            response = new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
        }
        return response;
    }

    @PutMapping("/article/{id}")
    @ApiOperation(value = "스터디 게시글 한 개의 정보 수정",
            notes = "스터디 게시글의 아이디를 전달 받아 해당 게시글의 정보를 수정한다.",
            response = Response.class)
    public Object updateStudy(@PathVariable @NotNull Long id, @RequestBody @Valid StudyRequest studyRequest) {
        StudyDetailResponse returnStudy = studyService.updateStudy(id, studyRequest);
        System.out.println("[스터디게시글수정]returnStudy: " + returnStudy);
        final Response result = new Response("success", "스터디 게시글 정보 수정 성공", returnStudy);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @DeleteMapping("/article/{id}")
    @ApiOperation(value = "스터디 게시글 한 개 삭제",
            notes = "스터디 게시글의 아이디를 전달 받아 해당 게시글을 삭제한다.",
            response = Response.class)
    public Object deleteStudy(@PathVariable @NotNull Long id) {
        studyService.deleteStudy(id);
        final Response result = new Response("success", "스터디 게시글 정보 삭제 성공", null);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
