const select = document.querySelector(".select");
const options_list = document.querySelector(".options-list");
const options = document.querySelectorAll(".option");

// 切换语言菜单的显示和隐藏
select.addEventListener("click", () => {
    options_list.classList.toggle("active");
    select.querySelector(".fa-angle-down").classList.toggle("fa-angle-up");
});

// 切换语言
options.forEach((option) => {
    option.addEventListener("click", () => {
        options.forEach((option) => {
            option.classList.remove("selected");
        });
        select.querySelector("span").innerHTML = option.innerHTML;
        option.classList.add("selected");
        options_list.classList.remove("active");
        select.querySelector(".fa-angle-up").classList.toggle("fa-angle-up");
    });
});

// 确保点击菜单时 z-index 生效
document.addEventListener("click", (event) => {
    if (!select.contains(event.target) && options_list.classList.contains("active")) {
        options_list.classList.remove("active");
        select.querySelector(".fa-angle-up").classList.toggle("fa-angle-up");
    }
});

// 表单提交处理
document.getElementById("btnSubmit").addEventListener("click", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const mobile = document.getElementById("mobile").value;
    const password = document.getElementById("password").value;
    const identity = document.querySelector(".select span").innerText;
    const school = document.getElementById("school").value;
    const gender = document.querySelector('input[name="gender"]:checked').value;

    let dataString;
    let url;

    if (identity === "学生") {
        dataString = `${mobile},${name},${gender},${password}`;
        url = "http://8.130.139.193:5000/stu_register";
    } else if (identity === "家教") {
        dataString = `${mobile},${name},${gender},${school},${password}`;
        url = "http://8.130.139.193:5000/tea_register";
    } else {
        alert("请选择身份！");
        return;
    }

    console.log("Sending data to Flask:", dataString);

    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ data: dataString })
    })
    .then(response => response.json())
    .then(data => {
        console.log("Success:", data);
        if (data.res) {
            alert("注册成功！");
            if (identity === "学生") {
                localStorage.setItem("student_mobile", mobile);
                window.location.href = "../../homepage/templates/homepage_stu.html";
            } else if (identity === "家教") {
                localStorage.setItem("teacher_mobile", mobile);
                window.location.href = "../../homepage/templates/homepage_tea.html";
            }
        } else {
            alert("注册失败：" + data.message);
        }
    })
    .catch((error) => {
        console.error("Error:", error);
        alert("注册失败！");
    });
});
