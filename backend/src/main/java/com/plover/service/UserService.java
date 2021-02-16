package com.plover.service;

import com.plover.config.Constant;
import com.plover.exceptions.EntityNotFoundException;
import com.plover.exceptions.ErrorCode;
import com.plover.model.user.Users;
import com.plover.model.user.request.DescriptionRequest;
import com.plover.model.user.response.UsersResponse;
import com.plover.repository.UserRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    private UserRepository userRepository;

    public UserService(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    public Users findUserByNo(Long no) {
        return userRepository.findUserByNo(no)
                .orElseThrow(() -> new EntityNotFoundException(ErrorCode.USER_NOT_FOUND));
    }

    // 유저프로필 수정(우선순위 하)
    // 해당 사용자의 소개내용 입력(수정)
    public Long updateUserDescription(DescriptionRequest descriptionRequest){
        Users user = findUserByNo(descriptionRequest.getNo());
        user.setDescription(descriptionRequest.getDescription());
        return user.getNo();
    }

    // 친구 추천으로 random형태의 유저 목록 반환(12명)
    public UsersResponse getUsersByRandom(){
        Pageable page = PageRequest.of(0, Constant.MAIN_USER_RECOMMAND_SIZE.getValue());
        List<Users> users = userRepository.findAllByRandom(page);
        return new UsersResponse(users);
    }

    // 유저프로필 데이터 반환

}
