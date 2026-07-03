$(document).ready(function() {
    const userId = localStorage.getItem("teacher_mobile");

    // 获取教师信息
    fetch(`http://8.130.139.193:5000/tea_msg?mobile=${userId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log("Received teacher info:", data);
            $("#id").val(data.Tea_id);
            $("#name").val(data.Tea_name);
            $("#sex").val(data.Tea_sex);
            $("#school").val(data.Tea_school);
            $("#subject").val(data.Tea_subject || "");
            $("#mail").val(data.Tea_email === "NULL" ? "" : data.Tea_email);
            $("#address").val(data.Tea_addr || "");
        })
        .catch(error => {
            console.error("Error fetching teacher info:", error);
            alert('获取教师信息失败: ' + error.message);
        });

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

    // 修改头像
    $("#modify_img").click(function() {
        const fileInput = $('<input type="file" accept="image/*">');
        fileInput.click();

        fileInput.on('change', function(event) {
            const file = event.target.files[0];
            if (file) {
                const formData = new FormData();
                formData.append('mobile', userId);
                formData.append('avatar', file);

                fetch('http://8.130.139.193:5000/tea_upload_image', {
                    method: 'POST',
                    body: formData
                })
                .then(response => response.json())
                .then(data => {
                    console.log("Avatar upload response:", data);
                    const url = URL.createObjectURL(file);
                    $("#user_avatar").attr("src", url);
                })
                .catch(error => {
                    console.error("Error uploading avatar:", error);
                    alert('头像上传失败: ' + error.message);
                });
            }
        });
    });

    // 保存信息
    $("#save_info").click(function() {
        const updatedInfo = {
            id: $("#id").val(),
            name: $("#name").val(),
            sex: $("#sex").val(),
            school: $("#school").val(),
            subject: $("#subject").val(),
            mail: $("#mail").val(),
            address: $("#address").val()
        };

        console.log("Updated info to be sent:", updatedInfo);

        fetch('http://8.130.139.193:5000/tea_update_msg', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ data: JSON.stringify(updatedInfo) })
        })
        .then(response => response.json())
        .then(data => {
            console.log("Update response:", data);
            if (data.res) {
                alert("信息保存成功");
            } else {
                throw new Error('信息保存失败，请稍后再试。');
            }
        })
        .catch(error => {
            console.error("Error updating teacher info:", error);
            alert('保存教师信息失败: ' + error.message);
        });
    });
});
