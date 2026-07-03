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

    // 提交密码修改请求
    $("#confirm_submit").click(function() {
        const oldPassword = $("#old_password").val();
        const newPassword = $("#new_password").val();
        const confirmPassword = $("#confirm_password").val();

        if (newPassword !== confirmPassword) {
            alert("两次输入的新密码不一致，请重新输入。");
            $("#old_password").val('');
            $("#new_password").val('');
            $("#confirm_password").val('');
            return;
        }

        const regPsd = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
        if (!regPsd.test(newPassword)) {
            alert("新密码必须为6-20位字母、数字的组合。");
            return;
        }

        if (oldPassword === newPassword) {
            alert("新密码不能与原密码相同，请重新输入。");
            return;
        }

        const loginInfo = `${userId},${oldPassword}`;

        // 验证原密码
        fetch('http://8.130.139.193:5000/tea_login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ data: loginInfo })
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message || data.res);
            if (data.res) {
                // 如果原密码验证成功，则更新密码
                const updatedInfo = `${userId},${newPassword}`;

                return fetch('http://8.130.139.193:5000/tea_change_passwd', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ data: updatedInfo })
                });
            } else {
                throw new Error(data.message || '原密码错误，请重新输入。');
            }
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message || data.res);
            if (data.res) {
                alert("密码更新成功");
            } else {
                throw new Error(data.message || '密码更新失败，请稍后再试。');
            }
        })
        .catch(error => {
            console.error("Error updating password:", error);
            alert('密码更新失败: ' + error.message);
            $("#old_password").val('');
            $("#new_password").val('');
            $("#confirm_password").val('');
        });
    });
});
