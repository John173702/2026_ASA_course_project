$(document).ready(function() {
    const userId = localStorage.getItem("teacher_mobile");

    // 获取教师头像
    fetch(`http://8.130.139.193:5000/tea_img?mobile=${userId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.blob();
        })
        .then(blob => {
            const url = URL.createObjectURL(blob);
            $("#user_avatar").attr("src", url);
        })
        .catch(error => {
            console.error("Error fetching teacher avatar:", error);
            alert('获取教师头像失败: ' + error.message);
        });

    // 提交注销账号请求
    $("#confirm_submit").click(function() {
        const oldPassword = $("#old_password").val();
        const confirmPassword = $("#new_password").val();

        if (oldPassword !== confirmPassword) {
            alert("两次输入的密码不一致，请重新输入。");
            $("#old_password").val('');
            $("#new_password").val('');
            return;
        }

        const regPsd = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
        if (!regPsd.test(oldPassword)) {
            alert("密码必须为6-20位字母、数字的组合。");
            return;
        }

        const loginInfo = `${userId},${oldPassword}`;

        // 验证密码并注销账号
        fetch('http://8.130.139.193:5000/tea_login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ data: loginInfo })
        })
        .then(response => response.json())
        .then(data => {
            if (data.res) {
                // 如果密码验证成功，则注销账号
                const deleteInfo = `${userId},${oldPassword}`;

                return fetch('http://8.130.139.193:5000/tea_del', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ data: deleteInfo })
                });
            } else {
                throw new Error('原密码错误，请重新输入。');
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.res) {
                alert(data.message || "账号注销成功");
                window.location.href = "../../login/templates/login_teacher.html";
            } else {
                throw new Error('账号注销失败，请稍后再试。');
            }
        })
        .catch(error => {
            console.error("Error deleting account:", error);
            alert('账号注销失败: ' + error.message);
            $("#old_password").val('');
            $("#new_password").val('');
        });
    });
});
