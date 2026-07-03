import pymysql
from update_ import update
from MD5 import md5_hash

def tea_change_passwd(values):
    res = ""
    # 手机号,密码

    id = values[0]
    passwd_new = values[1]
    tmp = md5_hash(passwd_new)
    print(tmp)
    try:
        res = "密码修改成功"
        update("Teacher_login", "Tl_passwd = " + "\'" + tmp + "\'", "Tl_id="+"\'" +str(id) + "\'")
    except Exception as e:
        res = "密码更新失败"
        print(f"密码更新失败: {e}")
    
    return res


if __name__ == '__main__':
    values = ["13030700999", "3809" ]
    res = tea_login(values)
    print(res)