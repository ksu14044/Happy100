package com.Happy100BE.Happy100.entity;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Role {
    private Integer roleId; // role_tb.role_id
    private String roleName; // role_tb.role_name (e.g., ROLE_USER)
}
