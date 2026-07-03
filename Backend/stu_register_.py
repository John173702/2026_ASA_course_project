import pymysql
from insert_ import insert
from MD5 import md5_hash

def stu_register(values):
    res = "注册成功"
    # 手机号，姓名，性别，密码
    try:
        insert("Student", values[0:3], 3)
        insert("Student_login", [values[0]] + [md5_hash(values[-1])], 2)
    except Exception as e:
        # 捕捉所有其他异常
        print(f"学生注册失败: {e}")
        if str(e)[1:5] == "1062":
            res = "重复注册"
        else:
            res = "格式错误"
            
    return res



if __name__ == '__main__':
    values = ["22222222222", "cyh", 'F', "123456abc"]
    stu_register(values)