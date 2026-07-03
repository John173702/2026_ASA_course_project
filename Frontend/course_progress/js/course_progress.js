document.addEventListener('DOMContentLoaded', function() {
    const student_mobile = localStorage.getItem("student_mobile");

    // 获取课程数据并填充表格
    fetch(`http://8.130.139.193:5000/stu_chosen?stu_id=${student_mobile}`)
        .then(response => response.json())
        .then(data => {
            const tbody = document.querySelector('#data-table tbody');
            tbody.innerHTML = ''; // 清空表格
            
            data.forEach(item => {
                const row = document.createElement('tr');
                if(item.Bi_over == "0") {
                    row.innerHTML = `
                        <td>${item.TR_id}</td>
                        <td>${item.TR_name}</td>
                        <td>${item.TR_sex}</td>
                        <td>${item.TR_school}</td>
                        <td>${item.TR_stage}</td>
                        <td>${item.TR_subject}</td>
                        <td>${item.TR_s}</td>
                        <td><button class="openModalBtn" data-course-id="${item.Bi_id}">结束课程</button></td>
                    `;
                    tbody.appendChild(row);
                }
            });

            // 给动态生成的按钮添加点击事件
            document.querySelectorAll('.openModalBtn').forEach(button => {
                button.addEventListener('click', function() {
                    const courseId = this.getAttribute('data-course-id');
                    const modal = document.getElementById('myModal');
                    modal.setAttribute('data-course-id', courseId);
                    modal.style.display = 'block';
                });
            });
        })
        .catch(error => {
            console.error('获取课程数据失败:', error);
            alert('获取课程数据失败: ' + error.message);
        });

    // 模态框逻辑
    const modal = document.getElementById('myModal');
    const closeBtn = document.querySelector('.close');

    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    document.getElementById('finish-confirm').addEventListener('click', function() {
        const courseId = modal.getAttribute('data-course-id');
        const rating = document.getElementById('rating').value;

        if (rating < 0 || rating > 5 || isNaN(rating)) {
            alert('评分必须在0到5之间');
            return;
        }

        // 发送结束课程请求
        fetch('http://8.130.139.193:5000/stu_eval', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ data:`${courseId},${rating}` })
        })
        .then(response => response.json())
        .then(data => {
            console.log("Success:", data);
            alert(data.res); // 显示后端返回的消息
            location.reload(); // 成功后重新加载页面

        })
        .catch(error => {
            console.error("Error:", error);
            alert('发布失败: ' + error.message);
        });
    });
});