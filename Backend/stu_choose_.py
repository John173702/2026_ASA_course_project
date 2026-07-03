import pymysql
from insert_ import insert_for_BiDirection
from select_ import select_one


def stu_choose(stu_id, record_auto_id):
    res = "选课成功"
    Tea_id = select_one("Teacher_record", "TR_id", "TR_auto=" + str(record_auto_id))['TR_id']
    IsChosen = select_one("BiDirection", "*", "Bi_record_id=" + str(record_auto_id) + 
                          " AND Bi_Stu_id=" + str(stu_id)  )
    print(IsChosen)
    if IsChosen != None:
        res = "重复选课"
    else:
        try:
            insert_for_BiDirection([str(record_auto_id)] + [str(Tea_id)] + ["0"] + [str(stu_id)] + ["0"], 5)
        except Exception as e:
            # 捕捉所有其他异常
            print(f"学生选课失败: {e}")

    return res



if __name__ == '__main__':
    stu_choose(14111111111, 10)