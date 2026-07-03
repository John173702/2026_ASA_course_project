import pymysql
from select_ import select_for_tea_search

def tea_search(id):
    res = ""
    # 手机号,密码

    result = select_for_tea_search(id)
    print("查询结果:", result)
    
    if result == None:
        res = "暂未发布任何信息"
        return res
    else:
        res = result
        for dict in res:
            dict["TR_s"] = dict["TR_s"].strftime("%Y-%m-%d %H:%M:%S")
            dict["TR_e"] = dict["TR_e"].strftime("%Y-%m-%d %H:%M:%S")
    return res


if __name__ == '__main__':
    pass