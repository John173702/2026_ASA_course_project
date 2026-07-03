import pymysql

def convert_to_binary_data(filename):
    """将文件转换为二进制数据"""
    with open(filename, 'rb') as file:
        binary_data = file.read()
        print(binary_data[0:50])
    return binary_data

def update_table_with_default_image(connection, default_image_path):
    cursor = connection.cursor()

    # 将默认图片转换为二进制数据
    default_image_blob = convert_to_binary_data(default_image_path)

    # SQL更新语句
    sql_update_query = """UPDATE Teacher SET Tea_image = %s"""
    


    try:
        # 更新所有记录
        # cursor.execute(sql_update_query, (default_image_blob,))
        sql_update_query = "UPDATE Teacher SET Tea_image = " + str(default_image_blob)[2:-1] + ";"

        print(sql_update_query[0:50])
        cursor.execute(sql_update_query)
        connection.commit()
        print(f"已更新 {cursor.rowcount} 条记录为默认图片")
    except pymysql.Error as error:
        print(f"更新记录时出错: {error}")
    finally:
        cursor.close()

def main():
    # 连接到MySQL数据库
    connection = pymysql.connect(
        host='127.0.0.1',
        user='root',
        password='380988118GUOjh!',
        port=3306,
        database='SE'
    )

    try:
        default_image_path = '/root/Downloads/test.jpg'
        update_table_with_default_image(connection, default_image_path)
    finally:
        connection.close()
        print("MySQL连接已关闭")

if __name__ == "__main__":
    main()
