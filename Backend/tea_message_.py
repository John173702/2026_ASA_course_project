import pymysql
from select_ import select_one

def tea_message(tea_id):
    res = ""
    # 手机号,密码
    print("tea_message")
    result = select_one("Teacher", "*", "Tea_id=" + str(tea_id))
    # print("查询结果:", result)
    
    if result == None:
        res = {a:"暂未发布任何信息"}
        return res
    else:
        res = result
        del res['Tea_image']
        # print("查询结果:", result)
        return res


if __name__ == '__main__':
    pass