package com.plover.model.mentoring.common;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.util.Date;

@Getter
@Setter
@EntityListeners(value = {AuditingEntityListener.class})
public abstract class BaseTimeEntity {

    @Temporal(TemporalType.DATE)
    @CreationTimestamp
    private Date createDate;

    @Temporal(TemporalType.DATE)
    @UpdateTimestamp
    private Date updateDate;
}
