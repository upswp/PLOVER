package com.plover.model.follow;

import com.plover.model.user.Users;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name="follow",
        uniqueConstraints={
                @UniqueConstraint(
                        columnNames={"from_user_no","to_user_no"}
                )
        })
public class Follow {
    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    @JoinColumn(name = "from_user_no")
    private Users fromUser;

    @ManyToOne
    @JoinColumn(name = "to_user_no")
    private Users toUser;

    @Temporal(TemporalType.TIMESTAMP)
    @CreationTimestamp
    private Date createDate;

    @Builder
    public Follow(Users fromUser, Users toUser) {
        this.fromUser = fromUser;
        this.toUser = toUser;
    }
}
