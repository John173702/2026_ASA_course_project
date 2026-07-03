import pymysql
from delete_ import delete


def tea_record_delete(tea_rec_id):
    res = "记录删除成功"
    # 手机号，姓名，性别，学校，密码
    try:
        delete("Teacher_record", "TR_auto=" + str(tea_rec_id))
        delete("BiDirection", "Bi_record_id=" + str(tea_rec_id))
    except Exception as e:
        print(f"记录删除失败: {e}")
            
    return res

if __name__ == '__main__':
    values = ["13030700111", "cyh2", 'M', "hit", "123456abc"]
    tea_register(values)        