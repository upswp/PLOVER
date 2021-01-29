package com.plover.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;

import lombok.Getter;
import lombok.Setter;

// 보안기법의 일종
// 비밀번호를 그냥 저장안하고 암호화를 진행해서 저장.
// 기존의 비밀번호 + Salt(random String)이 합쳐져서 DB에 저장.
@Entity
@Getter
@Setter
public class Salt {

    @Id
    @GeneratedValue
    private int id;

    @NotNull
    private String salt;

    public Salt() {
    }

    public Salt(String salt) {
        this.salt = salt;
    }
}