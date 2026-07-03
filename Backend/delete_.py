
import pymysql

def delete(table_name, conditions):
    # 建立数据库连接
    conn = pymysql.connect(
        host='127.0.0.1',
        user='root',
        password='380988118GUOjh!',
        port=3306,
        database='SE'
    )

    cursor = conn.cursor(pymysql.cursors.DictCursor)

    # 构建SQL删除语句
    sql_delete = f"DELETE FROM {table_name} WHERE {conditions};"
    print(sql_delete)

    # 执行SQL语句
    cursor.execute(sql_delete)

    # 提交更改
    conn.commit()
    
    # 关闭数据库连接
    conn.close()
