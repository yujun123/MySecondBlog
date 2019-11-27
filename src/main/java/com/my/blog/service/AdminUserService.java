package com.my.blog.service;


import com.my.blog.po.User;

/**
 * 管理员登陆业务类
 */
public interface AdminUserService {

    /**
     * 登陆，根据用户名和密码查询用户
     * @param username
     * @param password
     * @return
     */
    User checkUser(String username, String password);
}
