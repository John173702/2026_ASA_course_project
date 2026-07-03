import pymysql
from select_ import select_for_chosen, select_one

def stu_chosen(id):
    res = ""

    result = select_for_chosen("Stu", id)
    print("1阶段 查询结果:", result)

    new_res = []
    for dict in result:
        
        record_id = dict['Bi_record_id']
        # print(record_id)
        dict2 = select_one("Teacher_record", "*", "TR_auto=" + str(record_id) )
        # print("dict2")
        # print(dict2)
        dict.update(dict2)
        # print(dict)
        dict["TR_s"] = dict["TR_s"].strftime("%Y-%m-%d %H:%M:%S")
        dict["TR_e"] = dict["TR_e"].strftime("%Y-%m-%d %H:%M:%S")

        stu_id = dict["Bi_Stu_id"]
        dict3 = select_one("Student", "*", "Stu_id=" + str(stu_id) )
        dict.update(dict3)

        if dict["Bi_Tea_ok"] == "1" or dict["Bi_Tea_ok"] == "True":
            new_res.append(dict)


    
    print("2阶段 查询结果:", new_res)

    return new_res


if __name__ == '__main__':
    pass