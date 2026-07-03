import pymysql
from insert_ import insert
from MD5 import md5_hash

def tea_register(values):
    res = "注册成功"
    # 手机号，姓名，性别，学校，密码
    try:
        insert("Teacher", values[0:4] + ["0","0","","","NULL",""], 10)
        insert("Teacher_login", [values[0]] + [md5_hash(values[-1])], 2)
    except Exception as e:
        # 捕捉所有其他异常
        print(f"老师注册失败: {e}")
        if str(e)[1:5] == "1062":
            res = "重复注册"
        else:
            res = "格式错误"
            
    return res

if __name__ == '__main__':
    values = ["13030700111", "cyh2", 'M', "hit", "123456abc"]
    tea_register(values)