package com.plover.model.follow;

import com.plover.model.user.UserDto;
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
                        columnNames={"from_user_id","to_user_id"}
                )
        })
public class Follow {
    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    @JoinColumn(name = "from_user_id")
    private UserDto fromUser;

    @ManyToOne
    @JoinColumn(name = "to_user_id")
    private UserDto toUser;

    @Temporal(TemporalType.TIMESTAMP)
    @CreationTimestamp
    private Date createDate;

    @Builder
    public Follow(UserDto fromUser, UserDto toUser) {
        this.fromUser = fromUser;
        this.toUser = toUser;
    }
}
