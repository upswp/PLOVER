package com.plover.repository;

import com.plover.model.notification.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Map;

public interface NotificationRepository extends JpaRepository<Notification,Long> {
   List<Notification> findByToUserNoOrderByCreateDateDesc(long toUserNo);

    void deleteByNo(Long no);
//   List<Notification> findNotificationsByToNo(long toNo);

}