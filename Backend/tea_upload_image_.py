import pymysql
from insert_ import insert
from update_ import update_tea_upload_image
from select_ import select_one

def tea_upload_image(tea_id, file_data):
    res = "头像上传成功"

    try:
        update_tea_upload_image(file_data, "Tea_id = \'" + str(tea_id)+"\'")

    except Exception as e:
        # 捕捉所有其他异常
        print(f"头像上传失败: {e}")
    
    print(res)
    return res

if __name__ == '__main__':
    values = ["13030700111", "cyh2", 'M', "hit", "123456abc"]
    tea_register(values)