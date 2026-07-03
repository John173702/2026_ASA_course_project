import pymysql
from select_ import select_one
from update_ import update

def stu_eval(Bi_id, score):
    res = "评分成功"

    try:
        tea_id = select_one("BiDirection", "Bi_Tea_id", "Bi_id=" + str(Bi_id))['Bi_Tea_id'] 
        res_sel = select_one("Teacher", "Tea_mean_scores,Tea_num_scores", "Tea_id=" + str(tea_id))
        total_score = float(res_sel['Tea_mean_scores']) * int(res_sel['Tea_num_scores'] )+ float(score)
        print(total_score)
        mean_score = total_score/(int(res_sel['Tea_num_scores']) + 1)
        update("Teacher", "Tea_mean_scores=" + str(mean_score) + ",Tea_num_scores=" + str(int(res_sel['Tea_num_scores'] + 1)), "Tea_id=" + str(tea_id))
        print("update 1")
        update("BiDirection", "Bi_over=True", "Bi_id=" + str(Bi_id) )
        print("update 2")
    except Exception as e:
        print(f"评分失败: {e}")

            
    return res



if __name__ == '__main__':
    values = ["22222222222", "cyh", 'F', "123456abc"]
    stu_register(values)