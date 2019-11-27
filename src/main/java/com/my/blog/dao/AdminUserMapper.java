package com.my.blog.dao;

import com.my.blog.po.User;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

/**
 * 管理员登陆数据库查询
 */
@Repository
public interface AdminUserMapper {

    /**
     * 管理员登陆
     * @param username
     * @param password
     * @return
     */
    User checkUser(@Param(value = "username")String username, @Param(value = "password")String password);
}
