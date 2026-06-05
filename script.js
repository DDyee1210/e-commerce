// 表单切换功能
var tabBtns = document.querySelectorAll('.tab-btn');
var formContents = document.querySelectorAll('.form-content');

for (var i = 0; i < tabBtns.length; i++) {
    tabBtns[i].addEventListener('click', function() {
        // 移除所有标签的active类
        for (var j = 0; j < tabBtns.length; j++) {
            tabBtns[j].classList.remove('active');
        }
        // 给当前点击的标签添加active类
        this.classList.add('active');

        // 隐藏所有表单
        for (var k = 0; k < formContents.length; k++) {
            formContents[k].classList.remove('active');
        }
        // 显示对应的表单
        var formId = this.dataset.form + '-form';
        document.getElementById(formId).classList.add('active');
    });
}

// 登录表单提交
document.getElementById('login-submit').addEventListener('click', function() {
    var email = document.getElementById('login-email').value;
    var password = document.getElementById('login-password').value;
    var isValid = true;

    // 验证邮箱/手机号
    if (email.trim() === '') {
        document.getElementById('login-email').classList.add('error');
        document.getElementById('login-email').nextElementSibling.style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('login-email').classList.remove('error');
        document.getElementById('login-email').nextElementSibling.style.display = 'none';
    }

    // 验证密码
    if (password.trim() === '') {
        document.getElementById('login-password').classList.add('error');
        document.getElementById('login-password').nextElementSibling.style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('login-password').classList.remove('error');
        document.getElementById('login-password').nextElementSibling.style.display = 'none';
    }

    if (isValid) {
        alert('登录成功！欢迎回来');
        localStorage.setItem('username',email)
        window.location.href = './首页index.html';
    }
});

// 注册表单提交
document.getElementById('register-submit').addEventListener('click', function() {
    var name = document.getElementById('register-name').value;
    var email = document.getElementById('register-email').value;
    var password = document.getElementById('register-password').value;
    var confirm = document.getElementById('register-confirm').value;
    var isValid = true;

    // 验证用户名
    if (name.trim() === '') {
        document.getElementById('register-name').classList.add('error');
        document.getElementById('register-name').nextElementSibling.style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('register-name').classList.remove('error');
        document.getElementById('register-name').nextElementSibling.style.display = 'none';
    }

    // 验证邮箱
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        document.getElementById('register-email').classList.add('error');
        document.getElementById('register-email').nextElementSibling.style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('register-email').classList.remove('error');
        document.getElementById('register-email').nextElementSibling.style.display = 'none';
    }

    // 验证密码
    if (password.length < 6) {
        document.getElementById('register-password').classList.add('error');
        document.getElementById('register-password').nextElementSibling.style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('register-password').classList.remove('error');
        document.getElementById('register-password').nextElementSibling.style.display = 'none';
    }

    // 验证确认密码
    if (confirm !== password) {
        document.getElementById('register-confirm').classList.add('error');
        document.getElementById('register-confirm').nextElementSibling.style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('register-confirm').classList.remove('error');
        document.getElementById('register-confirm').nextElementSibling.style.display = 'none';
    }

    if (isValid) {
        alert('注册成功！请登录');

        // 切换到登录表单
        tabBtns[0].click();
    }
});


// 输入框获得焦点时移除错误状态
var inputs = document.querySelectorAll('input');
for (var i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener('focus', function() {
        this.classList.remove('error');
        this.nextElementSibling.style.display = 'none';
    });
}