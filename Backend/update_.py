import pymysql

def update(table_name, set, limit):

    conn = pymysql.connect(
        host='127.0.0.1',
        user='root',
        password='380988118GUOjh!',
        port=3306,
        database='SE'
    )

    cursor = conn.cursor(pymysql.cursors.DictCursor)

    sql_update = 'update '+ table_name +' set ' + str(set) + ' WHERE ' + str(limit)

    print(sql_update[0:100])
    print(sql_update[-100:])

    cursor.execute(sql_update)

    conn.commit()


def update_tea_upload_image(file_data, limit):

    conn = pymysql.connect(
        host='127.0.0.1',
        user='root',
        password='380988118GUOjh!',
        port=3306,
        database='SE'
    )

    cursor = conn.cursor(pymysql.cursors.DictCursor)
    # print(limit)
    sql_update = """update Teacher set Tea_image = %s""" + "WHERE " + limit

    cursor.execute(sql_update, (file_data, ))

    conn.commit()
