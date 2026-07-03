import pymysql
from insert_ import insert
from update_ import update
from select_ import select_one
from delete_ import delete

def tea_choose(Bi_id):
    res = "教师确认成功"
    # 手机号，姓名，性别，学校，密码
    try:
        TR_auto = select_one("BiDirection", "*", "Bi_id=" + str(Bi_id))['Bi_record_id']
        update("BiDirection", "Bi_Tea_ok=\'1\'", "Bi_id=" + str(Bi_id))
        print("update 1")
        update("Teacher_record", "TR_decided=1", "TR_auto=" + str(TR_auto))
        print("update 2")
        delete("BiDirection", "Bi_record_id=\'" + str(TR_auto) +
               "\' AND " + " Bi_Tea_ok=\'0\'")
    except Exception as e:
        # 捕捉所有其他异常
        print(f"教师确认失败: {e}")
            
    return res

if __name__ == '__main__':
    values = ["13030700111", "cyh2", 'M', "hit", "123456abc"]
    tea_register(values)