import pymysql
from select_ import select_one
from update_ import update


def normalize_score(score):
    value = float(score)
    if value < 1 or value > 5:
        raise ValueError("评分必须在 1 到 5 之间")
    return value


def stu_eval(Bi_id, score):
    res = "评分成功"

    try:
        score_value = normalize_score(score)
        tea_id = select_one("BiDirection", "Bi_Tea_id", "Bi_id=" + str(Bi_id))['Bi_Tea_id']
        res_sel = select_one("Teacher", "Tea_mean_scores,Tea_num_scores", "Tea_id=" + str(tea_id))
        old_count = int(res_sel['Tea_num_scores'])
        total_score = float(res_sel['Tea_mean_scores']) * old_count + score_value
        print(total_score)
        mean_score = total_score / (old_count + 1)
        update(
            "Teacher",
            "Tea_mean_scores=" + str(mean_score) + ",Tea_num_scores=" + str(old_count + 1),
            "Tea_id=" + str(tea_id),
        )
        print("update 1")
        update("BiDirection", "Bi_over=True", "Bi_id=" + str(Bi_id))
        print("update 2")
    except Exception as e:
        print(f"评分失败: {e}")
        res = "评分失败: " + str(e)

    return res


if __name__ == '__main__':
    stu_eval(1, 5)
