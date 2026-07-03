import pymysql
from select_ import select_one
import random


def write_file(data, filename):
    """将二进制数据写入文件"""
    with open(filename, 'wb') as file:
        file.write(data)

def tea_image(id):
    res = ""
    # 手机号,密码

    result = select_one("Teacher", "Tea_image", "Tea_id=" + str(id))
    # print("查询结果:", result)
    random_number = random.randint(1, 1000) 
    write_file(result['Tea_image'], "/root/DB_tmp/" + str(random_number) + ".jpg")

    # print(result)
    if result == {'Tea_image': b''}:
        print("错误,不存在此用户图片")
        res = "错误,不存在此用户图片"
        return res
    else:
        res = "/root/DB_tmp/" + str(random_number) + ".jpg"
        return res


if __name__ == '__main__':
    tea_image(13174457201)