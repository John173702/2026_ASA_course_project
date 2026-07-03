$(function() {
    $("#btnSubmit").click(function() {
        const student_mobile = localStorage.getItem("student_mobile");
        const subject = $("#subject").val();
        const stage = $("#stage").val();
        const time = $("#time").val();
        const gender = $("#gender").val();

        const searchParams = {
            subject: subject,
            stage: stage,
            time: time,
            gender: gender,
            mobile: student_mobile
        };

        // 保存搜索参数到 localStorage
        localStorage.setItem('searchParams', JSON.stringify(searchParams));

        // 跳转到查询结果页面
        window.location.href = '../../info_release/templates/info_release_stu.html';
    });
});

function displaySearchResults(data) {
    // 处理查询结果
    console.log("Search Results:", data);
    // 根据需求显示在页面上
}
