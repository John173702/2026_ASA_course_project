$(document).ready(function () {
    const student_mobile = localStorage.getItem("student_mobile");
    const searchParamsString = localStorage.getItem("searchParams");
    const searchParams = JSON.parse(searchParamsString);
    // alert(searchParams.subject);

    // 获取推荐教师信息
    fetch(`http://8.130.139.193:5000/stu_search?mobile=${student_mobile}&subject=${searchParams.subject}&stage=${searchParams.stage}&time=${searchParams.time}&gender=${searchParams.gender}`)
        .then(response => response.json())
        .then(data => {
            if (data === "暂无满足条件或条件相似的家教") {
                alert(data)
            } else {
                displayRecommendations(data);
            }

        })
        .catch(error => {
            console.error('Error fetching data:', error);
            alert('获取数据失败了: ' + error.message);
        });



    // 显示推荐教师信息
    function displayRecommendations(data) {

        const tableBody = document.getElementById('data-table').getElementsByTagName('tbody')[0];

        // 清空表格内容
        tableBody.innerHTML = "";

        // 遍历数据并生成表格行
        data.forEach(item => {
            const row = tableBody.insertRow();
            // alert(item);
            // 创建包含卡片的单元格
            const cell = row.insertCell();
            cell.colSpan = 11; // 设置单元格跨越整行
            // alert(item.TR_auto);
            // 创建卡片元素
            const cardDiv = document.createElement('div');
            cardDiv.classList.add('card');

            const cardBodyDiv = document.createElement('div');
            cardBodyDiv.classList.add('card-body');

            const cardCircleDiv = document.createElement('div');
            cardCircleDiv.classList.add('card-circle');
            cardCircleDiv.innerHTML = '<div class="circle">O</div>';

            const cardIdDiv = document.createElement('div');
            cardIdDiv.classList.add('card_id');
            cardIdDiv.textContent = item.TR_id;

            const cardNameDiv = document.createElement('div');
            cardNameDiv.classList.add('card_name');
            cardNameDiv.textContent = item.TR_name;
            cardNameDiv.addEventListener('click', function () {
                openInfoModal(item);
            });

            const cardSexDiv = document.createElement('div');
            cardSexDiv.classList.add('card_sex');
            cardSexDiv.textContent = item.TR_sex;

            const cardSchoolDiv = document.createElement('div');
            cardSchoolDiv.classList.add('card_school');
            cardSchoolDiv.textContent = item.TR_school;

            const cardStageDiv = document.createElement('div');
            cardStageDiv.classList.add('card_stage');
            cardStageDiv.textContent = item.TR_stage;

            const cardSubjectDiv = document.createElement('div');
            cardSubjectDiv.classList.add('card_subject');
            cardSubjectDiv.textContent = item.TR_subject;

            const cardTsDiv = document.createElement('div');
            cardTsDiv.classList.add('card_ts');
            cardTsDiv.textContent = item.TR_s;

            const cardTeDiv = document.createElement('div');
            cardTeDiv.classList.add('card_te');
            cardTeDiv.textContent = item.TR_e;

            const ratingDiv = document.createElement('div');
            ratingDiv.classList.add('star-rating');

            const starsDiv = document.createElement('div');
            starsDiv.classList.add('stars');

            for (let i = 1; i <= 5; i++) {
                const starDiv = document.createElement('div');
                starDiv.classList.add('star');
                starDiv.setAttribute('data-value', i);
                starsDiv.appendChild(starDiv);
            }

            ratingDiv.appendChild(starsDiv);
            displayRating(starsDiv, item.Tea_mean_scores);


            const cardOption = document.createElement('div');
            cardOption.classList.add('card_option');
            if (item.TR_selected == 1) {
                cardOption.textContent = '等待确认';
            } else {
                const button = document.createElement('button');
                button.id = 'open_select';
                button.textContent = '选课';
                cardOption.appendChild(button);
                button.addEventListener("click", function () {
                    openSelectModal(item.TR_auto);
                });
            }
            // 将所有元素添加到卡片主体
            cardBodyDiv.appendChild(cardCircleDiv);
            cardBodyDiv.appendChild(cardIdDiv);
            cardBodyDiv.appendChild(cardNameDiv);
            cardBodyDiv.appendChild(cardSexDiv);
            cardBodyDiv.appendChild(cardSchoolDiv);
            cardBodyDiv.appendChild(cardStageDiv);
            cardBodyDiv.appendChild(cardSubjectDiv);
            cardBodyDiv.appendChild(cardTsDiv);
            cardBodyDiv.appendChild(cardTeDiv);
            cardBodyDiv.appendChild(ratingDiv);
            cardBodyDiv.appendChild(cardOption);
            // 将卡片主体添加到卡片容器
            cardDiv.appendChild(cardBodyDiv);

            // 将卡片容器添加到表格单元格
            cell.appendChild(cardDiv);
        });
        function displayRating(starsDiv, rating) {
            const stars = starsDiv.querySelectorAll('.star');
            stars.forEach(star => {
                const starValue = parseFloat(star.getAttribute('data-value'));
                star.classList.remove('full', 'half');

                if (rating >= starValue) {
                    star.classList.add('full');
                } else if (rating > starValue - 1 && rating < starValue) {
                    star.classList.add('half');
                }
            });
        }

    }

    // 打开选课确认弹窗
    function openSelectModal(TR_auto) {
        const modal = document.getElementById("SelectModal");
        modal.style.display = "block";

        document.getElementById("confirm_select").onclick = function () {
            confirmSelect(TR_auto);
        };

        const span = document.getElementsByClassName("close")[0];
        span.onclick = function () {
            modal.style.display = "none";
        };
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        };
    }

    // 确认选课
    function confirmSelect(TR_auto) {
        const student_mobile = localStorage.getItem("student_mobile");
        const dataString = `${student_mobile},${TR_auto}`;

        fetch('http://8.130.139.193:5000/stu_choose', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ data: dataString })
        })
            .then(response => response.json())
            .then(data => {
                alert(data.res); // 显示后端返回的消息
                if (data.res.includes('成功')) {
                    location.reload(); // 选课成功后刷新页面
                }
            })
            .catch(error => {
                console.error("Error:", error);
                alert('选课失败: ' + error.message);
            });
    }



    //尝试个人信息浮窗
    function openInfoModal(item) {
        const existingModal = document.getElementById("InfoModal");
        if (existingModal) {
            existingModal.remove();
        }
        let modal = document.getElementById("InfoModal");
        modal = document.createElement('div');
        modal.id = "InfoModal";
        modal.classList.add('info_modal');
        modal.innerHTML = `
                <div class="info_modal-content">
                    <span class="close">&times;</span>
                    <div class="info_modal-main">
                        <div class="imgbox">
                            <img id="avatar_${item.TR_id}" src="" alt="用户头像" class="img_form">
                        </div>
                        <div class="infobox">
                            <div class="info-form-group">
                                <label for="id">联系方式：</label>
                                <span id="modal_contact"></span>
                            </div>
                            <div class="info-form-group">
                                <label for="name">姓&emsp;&emsp;名：</label>
                                <span id="modal_name"></span>
                            </div>
                            <div class="info-form-group">
                                <label for="sex">性&emsp;&emsp;别：</label>
                                <span id="modal_sex"></span>
                            </div>
                            <div class="info-form-group">
                                <label for="school">学&emsp;&emsp;校：</label>
                                <span id="modal_school"></span>
                            </div>
                            <div class="info-form-group">
                                <label for="subject">教学科目：</label>
                                <span id="modal_subject"></span>
                            </div>
                            <div class="info-form-group">
                                <label for="mail">邮&emsp;&emsp;箱：</label>
                                <span id="modal_mail"></span>
                            </div>
                            <div class="info-form-group">
                                <label for="address">地&emsp;&emsp;址：</label>
                                <span id="modal_address"></span>
                            </div>
                        </div>
                        <div class="info_title">教师信息</div>
                        <div class="introduce_box" id="modal_intro"></div>
                        <div class="introduce_title">自我介绍</div>
                    </div>
                </div>
            `;
        document.body.appendChild(modal);
        document.getElementById("modal_contact").textContent = item.TR_contact;
        document.getElementById("modal_name").textContent = item.TR_name;
        document.getElementById("modal_sex").textContent = item.TR_sex;
        document.getElementById("modal_school").textContent = item.TR_school;
        document.getElementById("modal_subject").textContent = item.Tea_subject;
        document.getElementById("modal_mail").textContent = item.Tea_email;
        document.getElementById("modal_address").textContent = item.Tea_addr;
        document.getElementById("modal_intro").textContent = item.TR_desc;

        modal.style.display = "block";

        const span = modal.getElementsByClassName("close")[0];
        span.onclick = function () {
            modal.style.display = "none";
        };
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        };
        fetchTeacherAvatar(item.TR_id);

        function fetchTeacherAvatar(teacherId) {
            fetch(`http://8.130.139.193:5000/tea_img?mobile=${teacherId}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.blob();
                })
                .then(blob => {
                    const url = URL.createObjectURL(blob);
                    const avatarElement = document.querySelector(`#avatar_${teacherId}`);
                    if (avatarElement) {
                        avatarElement.src = url;
                    }
                })
                .catch(error => {
                    console.error("Error fetching teacher avatar:", error);
                    alert('获取教师头像失败: ' + error.message);
                });
        }
    }

});
