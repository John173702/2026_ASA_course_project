import pymysql
from insert_ import insert_for_BiDirection
from select_ import select_count, select_one

MAX_PENDING_SELECTIONS_PER_RECORD = 3


def stu_choose(stu_id, record_auto_id):
    """Create a student-teacher selection request with basic capacity control."""
    res = "选课成功"
    record = select_one("Teacher_record", "TR_id", "TR_auto=" + str(record_auto_id))
    if record in (None, "暂无数据"):
        return "课程不存在"

    tea_id = record['TR_id']
    is_chosen = select_one(
        "BiDirection",
        "*",
        "Bi_record_id=" + str(record_auto_id) + " AND Bi_Stu_id=" + str(stu_id),
    )
    print(is_chosen)
    if is_chosen is not None:
        return "重复选课"

    pending_count = select_count(
        "BiDirection",
        "Bi_record_id=" + str(record_auto_id) + " AND Bi_over='0'",
    )
    if pending_count >= MAX_PENDING_SELECTIONS_PER_RECORD:
        return "候选人数已满，请选择其他教师课程"

    try:
        insert_for_BiDirection(
            [str(record_auto_id)] + [str(tea_id)] + ["0"] + [str(stu_id)] + ["0"],
            5,
        )
    except Exception as e:
        print(f"学生选课失败: {e}")
        res = "选课失败"

    return res


if __name__ == '__main__':
    stu_choose(14111111111, 10)
