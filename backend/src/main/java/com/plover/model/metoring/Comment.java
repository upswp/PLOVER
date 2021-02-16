package com.plover.model.metoring;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.plover.model.user.Users;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.Set;

@Entity
@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name="comment")
public class Comment {
    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_no") // fk컬럼명
    private Users user;

    @NotBlank
    private String Contents;

//    @JsonIgnore
//    @OneToOne(mappedBy = "comment")
//    private Set<MentoringComments> mentoringCommentsSet;

    public Comment(@NotBlank String contents) {
        Contents = contents;
    }
}
