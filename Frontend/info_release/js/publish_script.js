$(function() {
    // 确保结束时间不早于开始时间
    $("#start-time").on("change", function() {
        var startTime = $(this).val();
        $("#end-time").attr("min", startTime);
    });

    $("form :input").blur(function() {
        var $parent = $(this).parent();
        $parent.find(".msg").hide(); // 隐藏之前的提示信息

        // 验证阶段
        if ($(this).is("#stage")) {
            var stageVal = $.trim(this.value);
            var validStages = ["小学", "初中", "高中", "大学"];
            if (stageVal == "" || !validStages.includes(stageVal)) {
                $parent.find(".msg").text("请输入有效的阶段（小学，初中，高中，大学）").css("color", "red").show();
            }
        }
    }).keyup(function() {
        $(this).triggerHandler("blur");
    }).focus(function() {
        $(this).triggerHandler("blur");
    });

    $("#btnSubmit").click(function(event) {
        $("form .required:input").trigger("blur");
        var numError = $("form .onError").length;
        if (numError) {
            return false;
        }

        var emptyFields = [];
        if ($("#subject").val() == "") {
            emptyFields.push("科目");
            $("#subject").parent().find(".msg").text("科目不能为空").css("color", "red").show();
        } else {
            $("#subject").parent().find(".msg").hide();
        }
        if ($("#stage").val() == "") {
            emptyFields.push("阶段");
            $("#stage").parent().find(".msg").text("阶段不能为空").css("color", "red").show();
        } else {
            $("#stage").parent().find(".msg").hide();
        }
        if ($("#start-time").val() == "") {
            emptyFields.push("开始时间");
            $("#start-time").parent().find(".msg").text("开始时间不能为空").css("color", "red").show();
        } else {
            $("#start-time").parent().find(".msg").hide();
        }
        if ($("#end-time").val() == "") {
            emptyFields.push("结束时间");
            $("#end-time").parent().find(".msg").text("结束时间不能为空").css("color", "red").show();
        } else {
            $("#end-time").parent().find(".msg").hide();
        }

        if (emptyFields.length > 0) {
            return false;
        }

        submitForm(event);
    });
});

function submitForm(event) {
    event.preventDefault();

    // 获取表单数据
    const subject = $("#subject").val();
    const stage = $("#stage").val();
    const startTime = $("#start-time").val().replace('T', ' ') + ":00";
    const endTime = $("#end-time").val().replace('T', ' ') + ":00";
    const introduce_self = $('#introduce-self').val();
    const teacher_mobile = localStorage.getItem("teacher_mobile");
    const dataString = `${teacher_mobile},${subject},${stage},${startTime},${endTime},${introduce_self}`;

    console.log("Sending data to Flask:", dataString);

    fetch('http://8.130.139.193:5000/tea_record', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data: dataString })
    })
    .then(response => response.json())
    .then(data => {
        console.log("Success:", data);
        alert(data.res); // 显示后端返回的消息
        displayDataOnScreen(data);
    })
    .catch(error => {
        console.error("Error:", error);
        alert('发布失败: ' + error.message);
    });
}

function displayDataOnScreen(data) {
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
}
