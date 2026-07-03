import pymysql
from select_ import select_one
from MD5 import md5_hash

def stu_login(values):
    res = ""
    # 手机号,密码

    id = values[0]
    passwd_input = values[1]

    result = select_one("Student_login", "*", "SL_id="+id)
    print(result)
    
    if result == None:
        res = "此手机号未注册"
        return res
    
    passwd_res = result["SL_passwd"]

    if md5_hash(passwd_input) == passwd_res:
        res = "登录成功"
    else:
        res = "密码错误"
    
    return res


if __name__ == '__main__':
    values = ["13174457209", "wwweee222333" ]
    res = stu_login(values)
    print(res)