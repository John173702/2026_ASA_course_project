import pymysql
from select_ import select_for_stu_search, select_one

def stu_search(subject, stage, time, gender, stu_id):
    res = ""
    # 手机号,密码

    result = select_for_stu_search(subject, stage, time, gender)
    print("查询结果:", result)
    
    if result == ():
        res = "无满足条件的家教,还有些其他推荐"
        result = []
        result += select_for_stu_search(subject, stage, None, gender)
        res = result
        print("中间查询",res)
        if len(result) == 0:
            result += select_for_stu_search(subject, stage, time, None)
            res = result
            print("中间查询",res)
            if len(result) == 0:
                result += select_for_stu_search(subject, stage, None, None)
                res = result
                print("中间查询",res)
                if len(result) == 0:
                    res = "暂无满足条件或条件相似的家教"
                else:
                    res = result

    else:
        res = result
    

    for dict in res:
        dict["TR_s"] = dict["TR_s"].strftime("%Y-%m-%d %H:%M:%S")
        dict["TR_e"] = dict["TR_e"].strftime("%Y-%m-%d %H:%M:%S")
        
        Tea_id = dict["TR_id"]
        Tea_dict = select_one("Teacher", "*", "Tea_id=" + str(Tea_id) )
        dict["Tea_num_scores"] = Tea_dict['Tea_num_scores']
        dict["Tea_mean_scores"] = Tea_dict['Tea_mean_scores']
        dict["Tea_addr"] = Tea_dict['Tea_addr']
        dict["Tea_email"] = Tea_dict['Tea_email']
        dict["Tea_subject"] = Tea_dict['Tea_subject']


        Bi_dict = select_one("BiDirection", "Bi_id", "Bi_record_id=" + str(dict["TR_auto"]) + " and " + "Bi_Stu_id=" + str(stu_id) )
        if Bi_dict != None:
            dict["TR_selected"] = 1
        else:
            dict["TR_selected"] = 0


    return res


if __name__ == '__main__':
    pass