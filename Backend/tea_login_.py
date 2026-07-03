import pymysql
from select_ import select_one
from MD5 import md5_hash

def tea_login(values):
    res = ""
    # 手机号,密码

    id = values[0]
    passwd_input = values[1]

    result = select_one("Teacher_login", "*", "TL_id="+id)
    print(result)
    
    if result == None:
        res = "此手机号未注册"
        return res
    
    passwd_res = result["TL_passwd"]

    if md5_hash(passwd_input) == passwd_res:
        res = "登录成功"
    else:
        res = "密码错误"
    
    return res


if __name__ == '__main__':
    values = ["13030700999", "3809" ]
    res = tea_login(values)
    print(res)