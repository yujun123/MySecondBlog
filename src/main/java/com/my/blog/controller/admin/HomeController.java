package com.my.blog.controller.admin;

import com.my.blog.po.User;
import com.my.blog.service.AdminUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.FileOutputStream;
import java.util.Base64;

/**
 * 后台首页
 */
@Controller
@RequestMapping("/admin")
public class HomeController {

    @Autowired
    private AdminUserService userService;

    //后台管理员首页
    @GetMapping("/index")
    public String index() {
        return "admin/index";
    }

    @GetMapping("/table")
    public String table() {
        return "admin/table";
    }

    //后台管理员登陆界面
    @GetMapping("/login")
    public String loginPage() {
        //model.addAttribute("message","123123");
        return "admin/login";
    }

    //后台登陆校验
    @PostMapping("/login")
    public String login(@RequestParam(value = "userName")String userName,
                        @RequestParam(value = "password")String password,
                        HttpSession session, RedirectAttributes attributes){
        if(StringUtils.isEmpty(userName)) {
            attributes.addFlashAttribute("message","用户名不能为空");
            return "admin/login";
        }
        if(StringUtils.isEmpty(password)) {
            attributes.addFlashAttribute("message","密码不能为空");
            return "admin/login";
        }

        User user = userService.checkUser(userName, password);
        if(user != null) {
            user.setPassword(null);
            session.setAttribute("user", user);
            return "redirect:/admin/index";
        }else {
            attributes.addFlashAttribute("message","用户名和密码错误");
            return "admin/login";
        }
    }

    /**
     * 注册页面
     * @return
     */
    @GetMapping("/register")
    public String registerPage() {
        return "admin/register";
    }

    @GetMapping("/uploadImg")
    public String uploadImg() {
        return "img";
    }

    @PostMapping("/uploadImg")
    @ResponseBody
    public String upload(@RequestParam("file") String file,
                         HttpServletRequest request) {
        Base64.Decoder decoder = Base64.getDecoder();
        // 去掉base64编码的头部 如："data:image/jpeg;base64," 如果不去，转换的图片不可以查看
        file = file.substring(23);
        //解码
        byte[] imgByte = decoder.decode(file);

            /*//在tomcat目录下创建picture文件夹保存图片
            String path = request.getSession().getServletContext()
                    .getRealPath("");
            String contextPath = request.getContextPath();
            path = path.replace(contextPath.substring(1), "")  + "picture";
            File dir = new File(path);
            if (!dir.exists()) {// 判断文件目录是否存在
                dir.mkdirs();
            }
                    //因为windows和linux路径不同，window：D:\dir   linux:opt/java
            //System.getProperty("file.separator")能根据系统的不同获取文件路径的分隔符
            String fileName = getFileName();
            path = path + System.getProperty("file.separator") + fileName;
                    */

        try {
            FileOutputStream out = new FileOutputStream("/Users/yujun/Desktop/docs/examples/1.jpg"); // 输出文件路径
            out.write(imgByte);
            out.close();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return "redirect:/admin/index";

            /*String url = request.getScheme() + "://" + request.getServerName()
                    + ":" + request.getServerPort() + "/picture/" + fileName;
            return url; */
    }
    /**
     * 登出系统
     * @param session
     * @return
     */
    @GetMapping("/logout")
    public String logout(HttpSession session) {
        session.removeAttribute("user");
        return "redirect:/admin/login";
    }
}
