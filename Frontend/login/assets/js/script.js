// script.js

document.addEventListener('DOMContentLoaded', function() {
    // 学生登录表单提交
    const studentLoginForm = document.getElementById('loginFormStudent');
    if (studentLoginForm) {
        studentLoginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            sendFormData('student');
        });
    }

    // 教师登录表单提交
    const teacherLoginForm = document.getElementById('loginFormTeacher');
    if (teacherLoginForm) {
        teacherLoginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            sendFormData('teacher');
        });
    }

    // 注册表单提交
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(event) {
            event.preventDefault();
            sendFormData('register');
        });
    }
});

function sendFormData(formType) {
    let dataToSend = '';
    let url = '';

    if (formType === 'student') {
        const mobile = document.getElementById('student_mobile').value;
        const password = document.getElementById('student_password').value;
        dataToSend = `${mobile},${password}`;
        url = 'http://8.130.139.193:5000/stu_login';
    } else if (formType === 'teacher') {
        const mobile = document.getElementById('teacher_mobile').value;
        const password = document.getElementById('teacher_password').value;
        dataToSend = `${mobile},${password}`;
        url = 'http://8.130.139.193:5000/tea_login';
    } else if (formType === 'register') {
        const name = document.getElementById('name').value;
        const mobile = document.getElementById('mobile').value;
        const password = document.getElementById('password').value;
        const role = document.querySelector('.select span').textContent;
        const school = document.getElementById('school').value;
        const gender = document.querySelector('input[name="gender"]:checked').value;

        if (role === '家教') {
            dataToSend = `${mobile},${name},${gender},${school},${password}`;
            url = 'http://8.130.139.193:5000/tea_register';
        } else if (role === '学生') {
            dataToSend = `${mobile},${name},${gender},${password}`;
            url = 'http://8.130.139.193:5000/stu_register';
        } else {
            alert('请选择身份！');
            return;
        }
    }

    console.log("Sending data to Flask:", dataToSend);

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data: dataToSend })
    })
    .then(response => response.json())
    .then(data => {
        console.log("Success:", data);
        if (data.res == "登录成功") {
            alert('Success: ' + data.res);
            if(formType == 'student'){
                localStorage.setItem("student_mobile", document.getElementById('student_mobile').value);
                window.location.href = "../../homepage/templates/homepage_stu.html";
            }
            else if(formType == 'teacher'){
                localStorage.setItem("teacher_mobile", document.getElementById('teacher_mobile').value);
                window.location.href = "../../homepage/templates/homepage_tea.html";
            }
        } else {
            alert('Error: ' + data.res);
        }
    })
    .catch(error => {
        console.error("Error:", error);
        alert('Error: ' + error.message);
    });
}
