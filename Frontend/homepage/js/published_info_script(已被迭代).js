$(function() {
    $("#btnSearch").click(function() {
        const teacher_mobile = localStorage.getItem("teacher_mobile");

        fetch(`http://8.130.139.193:5000/tea_search?mobile=${teacher_mobile}`) // 替换为你的后端URL
        .then(response => response.json())
        .then(data => {
            // 获取表格的主体部分
            const tableBody = document.getElementById('data-table').getElementsByTagName('tbody')[0];
            // 遍历数据并生成表格行
            data.forEach(item => {
                const row = tableBody.insertRow();
                // 根据你的数据库表的字段名创建单元格并填充数据
                const cellId = row.insertCell(0);
                const cellName = row.insertCell(1);
                const cellSex = row.insertCell(2);
                const cellSchool = row.insertCell(3);
                const cellStage = row.insertCell(4);
                const cellSubject = row.insertCell(5);
                const cellTs = row.insertCell(6);
                const cellTe = row.insertCell(7);

                cellId.textContent = item.TR_id;
                cellName.textContent = item.TR_name;
                cellSex.textContent = item.TR_sex;
                cellSchool.textContent = item.TR_school;
                cellStage.textContent = item.TR_stage;
                cellSubject.textContent = item.TR_subject;
                cellTs.textContent = item.TR_s;
                cellTe.textContent = item.TR_e;
                // 如果有更多字段，继续创建单元格
            });
        })
        .catch(error => console.error('Error fetching data:', error));
    });
});

function displayPublishedInfo(data) {
    const tableBody = document.getElementById('data-table').getElementsByTagName('tbody')[0];

    // 遍历数据并生成表格行
    data.forEach(item => {
        const row = tableBody.insertRow();

        // 根据你的数据库表的字段名创建单元格并填充数据
        const cellId = row.insertCell(0);
        const cellName = row.insertCell(1);
        const cellAge = row.insertCell(2);

        cellId.textContent = item.id;
        cellName.textContent = item.name;
        cellAge.textContent = item.age;

        // 如果有更多字段，继续创建单元格
    });

    /*
    alert("1");
    data = JSON.parse(data);
    alert(data.res);
    const publishedInfoDiv = document.getElementById('published_info');
    publishedInfoDiv.innerHTML = data.map(item => `<div>${item}</div>`).join('');
    */
}
