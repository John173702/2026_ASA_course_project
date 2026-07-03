import pymysql
from insert_ import insert_for_tea_record
from select_ import select_one

def tea_record(values):
    res = "发布成功"
    # id,科目,阶段（小学初中高中）,开始时间，结束时间
    id = values[0]
    result = select_one("Teacher", "*", "Tea_id="+id)
    # print(result)

    name = result['Tea_name']
    sex = result['Tea_sex']
    school = result['Tea_school']

    try:
        insert_for_tea_record("Teacher_record", [id] + [name] + [sex] + [school] + values[1:] + [values[-1]], 9)

    except Exception as e:
        # 捕捉所有其他异常
        print(f"老师信息发布失败: {e}")
        res = "格式错误"
            
    return res

if __name__ == '__main__':
    values = ["13030700111", "物理", '高中',
               "2024-06-03 11:11:11", "2024-06-10 11:11:12"]
    res = tea_record(values)
    print(res)