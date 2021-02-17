package com.plover.model.mentoring;

import com.plover.model.user.Users;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.util.Date;
@Getter
@Setter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name="comment")
public class Comment {
    @Id
    @GeneratedValue
    @Column(name="comment_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_no")
    private Users user;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="mentoring_id")
    private Mentoring mentoring;

    @Lob
    private String content;

    @Temporal(TemporalType.DATE)
    @CreationTimestamp
    private Date createDate;

    @Temporal(TemporalType.DATE)
    @UpdateTimestamp
    private Date updateDate;

    public void setUser(Users user) {
        this.user = user;
    }

    public void setMentoring(Mentoring mentoring) {this.mentoring = mentoring;}

    @Builder
    public Comment(String content) {
        this.content = content;
    }


    public Comment update(Comment comment){
        this.content = comment.content;

        return this;
    }
}
