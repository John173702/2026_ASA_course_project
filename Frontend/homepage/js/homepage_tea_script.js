$(document).ready(function() {
    const teacher_mobile = localStorage.getItem("teacher_mobile");

    // 获取教师已发布信息
    fetch(`http://8.130.139.193:5000/tea_search?mobile=${teacher_mobile}`)
        .then(response => response.json())
        .then(data => {
            displayPublishedInfo(data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            alert('获取数据失败: ' + error.message);
        });

    // 显示已发布信息
    function displayPublishedInfo(data) {
        const tableBody = document.getElementById('data-table').getElementsByTagName('tbody')[0];
        
        // 清空表格内容
        tableBody.innerHTML = "";

        // 遍历数据并生成表格行
        data.forEach(item => {
            const row = tableBody.insertRow();
    
            // 创建包含卡片的单元格
            const cell = row.insertCell();
            cell.colSpan = 10; // 设置单元格跨越整行
    
            // 创建卡片元素
            const cardDiv = document.createElement('div');
            cardDiv.classList.add('card');
    
            const cardBodyDiv = document.createElement('div');
            cardBodyDiv.classList.add('card-body');
    
            const cardCircleDiv = document.createElement('div');
            cardCircleDiv.classList.add('card-circle');
            cardCircleDiv.innerHTML = '<div class="circle">O</div>';
    
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

            const cellOption = document.createElement('div');
            cellOption.classList.add('card_option');

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "删除";
            deleteButton.className = "delete-button"; // 添加样式类
            deleteButton.addEventListener("click", function() {
                deletePublishedInfo(item.TR_auto);
            });
            cellOption.appendChild(deleteButton);

            // 将所有元素添加到卡片主体
            cardBodyDiv.appendChild(cardCircleDiv);
            cardBodyDiv.appendChild(cardStageDiv);
            cardBodyDiv.appendChild(cardSubjectDiv);
            cardBodyDiv.appendChild(cardTsDiv);
            cardBodyDiv.appendChild(cardTeDiv);
            cardBodyDiv.appendChild(cellOption);
    
            // 将卡片主体添加到卡片容器
            cardDiv.appendChild(cardBodyDiv);
    
            // 将卡片容器添加到表格单元格
            cell.appendChild(cardDiv);
        });
    }

    // 删除已发布信息
    function deletePublishedInfo(id) {
        fetch(`http://8.130.139.193:5000/tea_reocrd_del?auto=${id}`, {
            method: 'POST'
        })
        .then(response => response.json())
        .then(data => {
            alert(data.res); // 显示后端返回的消息
            if (data.res.includes('成功')) {
                location.reload(); // 删除成功后刷新页面
            }
        })
        .catch(error => {
            console.error('Error deleting data:', error);
            alert('删除数据失败: ' + error.message);
        });
    }

    // 获取待确认信息
    fetch(`http://8.130.139.193:5000/tea_chosen?mobile=${teacher_mobile}`)
        .then(response => response.json())
        .then(data => {
            // alert(data);
            displayUnconfirmedInfo(data);
            displayDoingInfo(data)
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            alert('获取数据失败了: ' + error.message);
        });

    function displayUnconfirmedInfo(data) {
        const tableBody = document.getElementById('unconfirm-data-table').getElementsByTagName('tbody')[0];
        
        // 清空表格内容
        tableBody.innerHTML = "";

        // 遍历数据并生成表格行
        data.forEach(item => {
            const row = tableBody.insertRow();
    
            // 创建包含卡片的单元格
            const cell = row.insertCell();
            cell.colSpan = 10; // 设置单元格跨越整行
    
            // 创建卡片元素
            if (item.Bi_Tea_ok == '0' && item.Bi_over == '0')
            {
                const cardDiv = document.createElement('div');
                cardDiv.classList.add('card');
        
                const cardBodyDiv = document.createElement('div');
                cardBodyDiv.classList.add('card-body');
        
                const cardCircleDiv = document.createElement('div');
                cardCircleDiv.classList.add('card-circle');
                cardCircleDiv.innerHTML = '<div class="circle">O</div>';
                

                const cardContactDiv = document.createElement('div');
                cardContactDiv.classList.add('card_contact');
                cardContactDiv.textContent = item.Stu_id;
        
                const cardNameDiv = document.createElement('div');
                cardNameDiv.classList.add('card_name');
                cardNameDiv.textContent = item.Stu_name;
        
                const cardStageDiv = document.createElement('div');
                cardStageDiv.classList.add('card_stage');
                cardStageDiv.textContent = item.TR_stage;
        
                const cardSubjectDiv = document.createElement('div');
                cardSubjectDiv.classList.add('card_subject');
                cardSubjectDiv.textContent = item.TR_subject;
        
                const cardTimeDiv = document.createElement('div');
                cardTimeDiv.classList.add('card_time');
                cardTimeDiv.textContent = item.TR_s;
                // todo 这里用课程开始时间？

                const cellOption = document.createElement('div');
                cellOption.classList.add('card_option');

                const confirmButton = document.createElement("button");
                confirmButton.textContent = "确认";
                confirmButton.className = "confirm-button"; // 添加样式类
                confirmButton.addEventListener("click", function() {
                    confirmStudent(item.Bi_id, item.Bi_Tea_id, item.Bi_record_id);
                });
                cellOption.appendChild(confirmButton);

                // 将所有元素添加到卡片主体
                cardBodyDiv.appendChild(cardCircleDiv);
                cardBodyDiv.appendChild(cardContactDiv);
                cardBodyDiv.appendChild(cardNameDiv);
                cardBodyDiv.appendChild(cardStageDiv);
                cardBodyDiv.appendChild(cardSubjectDiv);
                cardBodyDiv.appendChild(cardTimeDiv);
                cardBodyDiv.appendChild(cellOption);
        
                // 将卡片主体添加到卡片容器
                cardDiv.appendChild(cardBodyDiv);
        
                // 将卡片容器添加到表格单元格
                cell.appendChild(cardDiv);
            }
            
        });
    }

    function confirmStudent(Bi_id, Bi_Tea_id, Bi_record_id) {
        fetch(`http://8.130.139.193:5000/tea_choose?Bi_id=${Bi_id}&Bi_Tea_id=${Bi_Tea_id}&Bi_record_id=${Bi_record_id}`, {
            method: 'POST'
        })
        .then(response => response.json())
        .then(data => {
            alert(data.res); // 显示后端返回的消息
            if (data.res.includes('成功')) {
                location.reload(); // 确认成功后刷新页面
            }
        })
        .catch(error => {
            console.error('Error confirming student:', error);
            alert('确认学生失败: ' + error.message);
        });
    }

    // 获取正在上课信息
    // fetch(`http://8.130.139.193:5000/tea_doing?mobile=${teacher_mobile}`)
    //     .then(response => response.json())
    //     .then(data => {
    //         displayDoingInfo(data);
    //     })
    //     .catch(error => {
    //         console.error('Error fetching data:', error);
    //         alert('获取数据失败: ' + error.message);
    //     });

    function displayDoingInfo(data) {
        const tableBody = document.getElementById('doing-data-table').getElementsByTagName('tbody')[0];
        
        // 清空表格内容
        tableBody.innerHTML = "";

        // 遍历数据并生成表格行
        data.forEach(item => {
            const row = tableBody.insertRow();
    
            // 创建包含卡片的单元格
            const cell = row.insertCell();
            cell.colSpan = 10; // 设置单元格跨越整行
            if (item.Bi_Tea_ok == '1' && item.Bi_over == '0')
            {
                // 创建卡片元素
                const cardDiv = document.createElement('div');
                cardDiv.classList.add('card');
        
                const cardBodyDiv = document.createElement('div');
                cardBodyDiv.classList.add('card-body');
        
                const cardCircleDiv = document.createElement('div');
                cardCircleDiv.classList.add('card-circle');
                cardCircleDiv.innerHTML = '<div class="circle">O</div>';
        
                const cardContactDiv = document.createElement('div');
                cardContactDiv.classList.add('card_contact');
                cardContactDiv.textContent = item.Stu_id;
        
                const cardNameDiv = document.createElement('div');
                cardNameDiv.classList.add('card_name');
                cardNameDiv.textContent = item.Stu_name;
        
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
        
                // 将所有元素添加到卡片主体
                cardBodyDiv.appendChild(cardCircleDiv);
                cardBodyDiv.appendChild(cardContactDiv);
                cardBodyDiv.appendChild(cardNameDiv);
                cardBodyDiv.appendChild(cardStageDiv);
                cardBodyDiv.appendChild(cardSubjectDiv);
                cardBodyDiv.appendChild(cardTsDiv);
                cardBodyDiv.appendChild(cardTeDiv);
        
                // 将卡片主体添加到卡片容器
                cardDiv.appendChild(cardBodyDiv);
        
                // 将卡片容器添加到表格单元格
                cell.appendChild(cardDiv);
            }
        });
    }
});
