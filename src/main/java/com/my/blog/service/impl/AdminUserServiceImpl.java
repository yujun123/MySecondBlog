package com.my.blog.service.impl;

import com.my.blog.dao.AdminUserMapper;
import com.my.blog.po.User;
import com.my.blog.service.AdminUserService;
import com.my.blog.utils.MD5Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * 管理员登陆业务实现类
 */
@Service
public class AdminUserServiceImpl implements AdminUserService {

    @Autowired
    private AdminUserMapper adminUserMapper;

    /**
     * 登陆，根据用户名和密码查询用户
     * @param username
     * @param password
     * @return
     */
    @Override
    public User checkUser(String username, String password) {
        return adminUserMapper.checkUser(username, MD5Utils.code(password));
    }
}
