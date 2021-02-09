package com.plover.config;

import lombok.Getter;

@Getter
public enum Constant {
    PAGE_SIZE(8),
    FOLLOW_PAGE_SIZE(20);

    private final int value;

    Constant(int value) {
        this.value = value;
    }
}
