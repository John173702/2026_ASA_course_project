import pymysql
from update_ import update
from MD5 import md5_hash

def tea_update_msg(id, school, subject, mail, address):
    res = ""
    # 手机号,密码
    to_be_set = ""
    to_be_set += "Tea_school=" + "\'" + str(school) + "\'" + ","
    to_be_set += "Tea_subject=" + "\'" + str(subject) + "\'" + ","
    to_be_set += "Tea_email=" + "\'" + str(mail) + "\'" + ","
    to_be_set += "Tea_addr=" + "\'" + str(address) + "\'"

    try:
        res = "信息更新成功"
        update("Teacher", to_be_set , "Tea_id="+ "'" +str(id) + "'")
    except Exception as e:
        res = "信息更新失败"
        print(e)

    
    return res


if __name__ == '__main__':
    values = ["13030700999", "3809" ]
    res = tea_login(values)
    print(res)