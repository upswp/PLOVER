package com.plover.exceptions;

public enum ErrorCode {
    INTERNAL_SERVER_ERROR(500, "C_001", "서버가 올바르게 동작하지 않습니다"),
    INVALID_INPUT_VALUE(400, "C_002", "적절하지 않은 요청 값입니다."),

    STUDY_NOT_FOUND(400,"ST_001","해당 스터디 게시글을 찾을 수 없습니다."),

    FOLLOW_NOT_FOUND(400,"FL_001","해당 팔로우를 찾을 수 없습니다."),

    TAG_DUPLICATED(400, "TA_001", "이미 존재하는 태그입니다."),
    TAG_NOT_FOUND(400, "TA_002", "태그를 찾을 수 없습니다."),

    AUTH_ERROR(400, "AU_001", "인증 관련 오류가 발생했습니다."),
    DUPLICATED_EMAIL(400, "AU_002", "이미 존재하는 E-mail입니다."),
    UNAUTHORIZED_REDIRECT_URI(400, "AU_003", "인증되지 않은 REDIRECT_URI입니다."),
    BAD_LOGIN(400, "AU_004", "잘못된 아이디 또는 패스워드입니다.");

    private final String code;
    private final String message;
    private final int status;

    ErrorCode(int status, String code, String message) {
        this.status = status;
        this.message = message;
        this.code = code;
    }

    public String getMessage() {
        return this.message;
    }

    public String getCode() {
        return code;
    }

    public int getStatus() {
        return status;
    }
}