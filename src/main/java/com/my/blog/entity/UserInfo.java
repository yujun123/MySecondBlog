package com.my.blog.entity;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.io.Serializable;

/**
 * @Author wul
 * @Description 用户bean
 * @Date 2019/12/4 16:10
 */

@Data
public class UserInfo implements Serializable {

    /**
     * 姓名
     */
    private String userName;
    /**
     * 手机号
     */
    private String mobile;
    /**
     * 照片
     */
    private MultipartFile photo;
}
