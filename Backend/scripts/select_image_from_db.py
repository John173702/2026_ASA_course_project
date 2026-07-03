import pymysql

def write_file(data, filename):
    """将二进制数据写入文件"""
    with open(filename, 'wb') as file:
        file.write(data)

def fetch_image_from_database(connection):
    cursor = connection.cursor()

    # SQL查询语句，假设表中有一个id列用于识别记录
    sql_select_query = "SELECT Tea_image FROM Teacher WHERE Tea_name=\"gjh2\""
    print(sql_select_query)
    try:
        cursor.execute(sql_select_query)
        result = cursor.fetchone()
        
        if result and result['Tea_image']:
            image_data = result['Tea_image']
            return image_data
        else:
            print("未找到指定的记录或记录中没有图片数据")
            return None
    except pymysql.Error as error:
        print(f"从数据库中检索图片时出错: {error}")
        return None
    finally:
        cursor.close()

def main():
    # 连接到MySQL数据库
    connection = pymysql.connect(
        host='127.0.0.1',
        user='root',
        password='380988118GUOjh!',
        port=3306,
        database='SE',
        charset='utf8mb4',
        cursorclass=pymysql.cursors.DictCursor
    )

    try:
        record_id = 1  # 需要检索的记录的ID
        image_data = fetch_image_from_database(connection, record_id)
        
        if image_data:
            output_filename = 'retrieved_image.jpg'
            write_file(image_data, output_filename)
            print(f"图片已保存到 {output_filename}")
    finally:
        connection.close()
        print("MySQL连接已关闭")

if __name__ == "__main__":
    main()
