/*
 *  Document   : base_forms_validation.js
 *  Author     : pixelcave
 *  Description: Custom JS code used in Form Validation Page
 */

var BaseFormValidation = function() {
    // Init Bootstrap Forms Validation, for more examples you can check out https://github.com/jzaefferer/jquery-validation
    var initValidationBootstrap = function(){
        jQuery('.js-validation-bootstrap').validate({
            errorClass: 'help-block animated fadeInDown',
            errorElement: 'div',
            errorPlacement: function(error, e) {
                jQuery(e).parents('.form-group > div').append(error);
            },
            highlight: function(e) {
                jQuery(e).closest('.form-group').removeClass('has-error').addClass('has-error');
                jQuery(e).closest('.help-block').remove();
            },
            success: function(e) {
                jQuery(e).closest('.form-group').removeClass('has-error');
                jQuery(e).closest('.help-block').remove();
            },
            rules: {
                'val-username': {
                    required: true,
                    minlength: 3
                },
                'val-email': {
                    required: true,
                    email: true
                },
                'val-password': {
                    required: true,
                    minlength: 5
                },
                'val-confirm-password': {
                    required: true,
                    equalTo: '#val-password'
                },
                'val-suggestions': {
                    required: true,
                    minlength: 5
                },
                'val-skill': {
                    required: true
                },
                'val-website': {
                    required: true,
                    url: true
                },
                'val-digits': {
                    required: true,
                    digits: true
                },
                'val-number': {
                    required: true,
                    number: true
                },
                'val-range': {
                    required: true,
                    range: [1, 5]
                },
                'val-terms': {
                    required: true
                }
            },
            messages: {
                'val-username': {
                    required: '请输入用户名',
                    minlength: '你的用户名必须包含至少3个字符'
                },
                'val-email': '请输入一个有效的邮箱地址',
                'val-password': {
                    required: '请提供密码',
                    minlength: '你的密码必须至少有5个字符长'
                },
                'val-confirm-password': {
                    required: '请提供确认密码',
                    minlength: '你的确认密码必须至少有5个字符长',
                    equalTo: '请输入与上面相同的密码'
                },
                'val-suggestions': '我们怎样才能变得更好?',
                'val-skill': '请选择一项技能!',
                'val-website': '请输入您的网站!',
                'val-digits': '请只输入数字!',
                'val-number': '请输入一个数字!',
                'val-range': '请输入1到5之间的数字!',
                'val-terms': '您必须同意服务条款!'
            }
        });
    };

    // Init Material Forms Validation, for more examples you can check out https://github.com/jzaefferer/jquery-validation
    var initValidationMaterial = function(){
        jQuery('.js-validation-material').validate({
            errorClass: 'help-block text-right animated fadeInDown',
            errorElement: 'div',
            errorPlacement: function(error, e) {
                jQuery(e).parents('.form-group .form-material').append(error);
            },
            highlight: function(e) {
                jQuery(e).closest('.form-group').removeClass('has-error').addClass('has-error');
                jQuery(e).closest('.help-block').remove();
            },
            success: function(e) {
                jQuery(e).closest('.form-group').removeClass('has-error');
                jQuery(e).closest('.help-block').remove();
            },
            rules: {
                'val-username2': {
                    required: true,
                    minlength: 3
                },
                'val-email2': {
                    required: true,
                    email: true
                },
                'val-password2': {
                    required: true,
                    minlength: 5
                },
                'val-confirm-password2': {
                    required: true,
                    equalTo: '#val-password2'
                },
                'val-suggestions2': {
                    required: true,
                    minlength: 5
                },
                'val-skill2': {
                    required: true
                },
                'val-website2': {
                    required: true,
                    url: true
                },
                'val-digits2': {
                    required: true,
                    digits: true
                },
                'val-number2': {
                    required: true,
                    number: true
                },
                'val-range2': {
                    required: true,
                    range: [1, 5]
                },
                'val-terms2': {
                    required: true
                },
                'userName': {
                    required: true,
                    minlength: 3
                },
                'password': {
                    required: true,
                    minlength: 5
                },
            },
            messages: {
                'val-username2': {
                    required: '请输入用户名',
                    minlength: '你的用户名必须包含至少3个字符'
                },
                'val-email2': '请输入一个有效的邮箱地址',
                'val-password2': {
                    required: '请提供密码',
                    minlength: '你的密码必须至少有5个字符长'
                },
                'val-confirm-password2': {
                    required: '请提供确认密码',
                    minlength: '你的确认密码必须至少有5个字符长',
                    equalTo: '请输入与上面相同的密码'
                },
                'userName': {
                    required: '请输入用户名',
                    minlength: '你的用户名必须包含至少3个字符'
                },
                'password': {
                    required: '请提供密码',
                    minlength: '你的密码必须至少有5个字符长'
                },
                'val-suggestions2': '我们怎样才能变得更好?',
                'val-skill2': '请选择一项技能!',
                'val-website2': '请输入您的网站!',
                'val-digits2': '请只输入数字!',
                'val-number2': '请输入一个数字!',
                'val-range2': '请输入1到5之间的数字!',
                'val-terms2': '您必须同意服务条款!'
            }
        });
    };

    return {
        init: function () {
            // Init Bootstrap Forms Validation
            initValidationBootstrap();

            // Init Meterial Forms Validation
            initValidationMaterial();
        }
    };
}();

// Initialize when page loads
jQuery(function(){ BaseFormValidation.init(); });