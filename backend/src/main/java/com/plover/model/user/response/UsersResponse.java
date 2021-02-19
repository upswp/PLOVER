package com.plover.model.user.response;

import com.plover.model.user.Users;
import lombok.Getter;

import java.util.List;

@Getter
public class UsersResponse {
    List<UserResponse> users;

    public UsersResponse(List<Users> users) {
        this.users = UserResponse.lisfOf(users);
    }
}
