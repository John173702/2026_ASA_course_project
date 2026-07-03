$(document).ready(function () {
    const student_mobile = localStorage.getItem("student_mobile");
    const searchParamsString = localStorage.getItem("searchParams");
    const searchParams = JSON.parse(searchParamsString);
    // alert(searchParams.subject);

    // 鑾峰彇鎺ㄨ崘鏁欏笀淇℃伅
    fetch(`http://8.130.139.193:5000/stu_search?mobile=${student_mobile}&subject=${searchParams.subject}&stage=${searchParams.stage}&time=${searchParams.time}&gender=${searchParams.gender}`)
        .then(response => response.json())
        .then(data => {
            if (data === "鏆傛棤婊¤冻鏉′欢鎴栨潯浠剁浉浼肩殑瀹舵暀") {
                alert(data)
            } else {
                displayRecommendations(data);
            }

        })
        .catch(error => {
            console.error('Error fetching data:', error);
            alert('鑾峰彇鏁版嵁澶辫触浜? ' + error.message);
        });



    // 鏄剧ず鎺ㄨ崘鏁欏笀淇℃伅
    function displayRecommendations(data) {

        const tableBody = document.getElementById('data-table').getElementsByTagName('tbody')[0];

        // 娓呯┖琛ㄦ牸鍐呭
        tableBody.innerHTML = "";

        // 閬嶅巻鏁版嵁骞剁敓鎴愯〃鏍艰
        data.forEach(item => {
            const row = tableBody.insertRow();
            // alert(item);
            // 鍒涘缓鍖呭惈鍗＄墖鐨勫崟鍏冩牸
            const cell = row.insertCell();
            cell.colSpan = 11; // 璁剧疆鍗曞厓鏍艰法瓒婃暣琛?
            // alert(item.TR_auto);
            // 鍒涘缓鍗＄墖鍏冪礌
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

            const pendingCount = Number(item.pending_count || item.TR_pending || 0);
            const cardCapacityDiv = document.createElement('div');
            cardCapacityDiv.classList.add('card_capacity');
            cardCapacityDiv.textContent = pendingCount >= 3 ? '名额已满' : `候选 /3`;

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
                cardOption.textContent = '绛夊緟纭';
            } else {
                const button = document.createElement('button');
                button.id = 'open_select';
                button.textContent = pendingCount >= 3 ? '不可选择' : '閫夎';
                button.disabled = pendingCount >= 3;
                cardOption.appendChild(button);
                button.addEventListener("click", function () {
                    openSelectModal(item.TR_auto);
                });
            }
            // 灏嗘墍鏈夊厓绱犳坊鍔犲埌鍗＄墖涓讳綋
            cardBodyDiv.appendChild(cardCircleDiv);
            cardBodyDiv.appendChild(cardIdDiv);
            cardBodyDiv.appendChild(cardNameDiv);
            cardBodyDiv.appendChild(cardSexDiv);
            cardBodyDiv.appendChild(cardSchoolDiv);
            cardBodyDiv.appendChild(cardStageDiv);
            cardBodyDiv.appendChild(cardSubjectDiv);
            cardBodyDiv.appendChild(cardTsDiv);
            cardBodyDiv.appendChild(cardTeDiv);
            cardBodyDiv.appendChild(cardCapacityDiv);
            cardBodyDiv.appendChild(ratingDiv);
            cardBodyDiv.appendChild(cardOption);
            // 灏嗗崱鐗囦富浣撴坊鍔犲埌鍗＄墖瀹瑰櫒
            cardDiv.appendChild(cardBodyDiv);

            // 灏嗗崱鐗囧鍣ㄦ坊鍔犲埌琛ㄦ牸鍗曞厓鏍?
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

    // 鎵撳紑閫夎纭寮圭獥
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

    // 纭閫夎
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
                alert(data.res); // 鏄剧ず鍚庣杩斿洖鐨勬秷鎭?
                if (data.res.includes('鎴愬姛')) {
                    location.reload(); // 閫夎鎴愬姛鍚庡埛鏂伴〉闈?
                }
            })
            .catch(error => {
                console.error("Error:", error);
                alert('閫夎澶辫触: ' + error.message);
            });
    }



    //灏濊瘯涓汉淇℃伅娴獥
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
                            <img id="avatar_${item.TR_id}" src="" alt="鐢ㄦ埛澶村儚" class="img_form">
                        </div>
                        <div class="infobox">
                            <div class="info-form-group">
                                <label for="id">鑱旂郴鏂瑰紡锛?/label>
                                <span id="modal_contact"></span>
                            </div>
                            <div class="info-form-group">
                                <label for="name">濮?emsp;&emsp;鍚嶏細</label>
                                <span id="modal_name"></span>
                            </div>
                            <div class="info-form-group">
                                <label for="sex">鎬?emsp;&emsp;鍒細</label>
                                <span id="modal_sex"></span>
                            </div>
                            <div class="info-form-group">
                                <label for="school">瀛?emsp;&emsp;鏍★細</label>
                                <span id="modal_school"></span>
                            </div>
                            <div class="info-form-group">
                                <label for="subject">鏁欏绉戠洰锛?/label>
                                <span id="modal_subject"></span>
                            </div>
                            <div class="info-form-group">
                                <label for="mail">閭?emsp;&emsp;绠憋細</label>
                                <span id="modal_mail"></span>
                            </div>
                            <div class="info-form-group">
                                <label for="address">鍦?emsp;&emsp;鍧€锛?/label>
                                <span id="modal_address"></span>
                            </div>
                        </div>
                        <div class="info_title">鏁欏笀淇℃伅</div>
                        <div class="introduce_box" id="modal_intro"></div>
                        <div class="introduce_title">鑷垜浠嬬粛</div>
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
                    alert('鑾峰彇鏁欏笀澶村儚澶辫触: ' + error.message);
                });
        }
    }

});

