package com.plover.model.study.response;

import com.plover.model.study.Hashtag;
import lombok.Getter;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Getter
public class HashtagResponse {
    private Long id;

    private String name;

    public HashtagResponse(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    public static Set<HashtagResponse> listOf(Set<Hashtag> hashtags) {
        return hashtags.stream()
                .map(HashtagResponse::of)
                .collect(Collectors.toSet());
    }

    private static HashtagResponse of(Hashtag hashtag) {
        return new HashtagResponse(hashtag.getId(), hashtag.getName());
    }
}
