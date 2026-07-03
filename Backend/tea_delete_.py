import pymysql
from insert_ import insert
from update_ import update
from select_ import select_one
from delete_ import delete
def tea_delete(tea_id):
    res = "教师删除成功"
    # 手机号，姓名，性别，学校，密码
    try:
        delete("Teacher", "Tea_id=" + str(tea_id))
        print("del ok 1")
        delete("Teacher_record", "TR_id=" + str(tea_id))
        print("del ok 2")
        delete("BiDirection", "Bi_Tea_id=" + str(tea_id))
        print("del ok 3")
        delete("Teacher_login", "Tl_id=" + str(tea_id))
    except Exception as e:
        # 捕捉所有其他异常
        print(f"教师删除失败: {e}")
            
    return res

if __name__ == '__main__':
    values = ["13030700111", "cyh2", 'M', "hit", "123456abc"]
    tea_register(values)