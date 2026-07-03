import pymysql

def insert(table_name, values, length):

    conn = pymysql.connect(
        host='127.0.0.1',
        user='root',
        password='380988118GUOjh!',
        port=3306,
        database='SE'
    )

    cursor = conn.cursor(pymysql.cursors.DictCursor)

    sql_insert = 'insert into '+ table_name +' values ' + ' ( '
    for i in range(length):
        if i < len(values):
            value = values[i]
        else:
            value = "Null"
        sql_insert += "'" + value + "',"
    sql_insert = sql_insert[0:-1]  + " );"
    print(sql_insert)

    cursor.execute(sql_insert)

    conn.commit()

def insert_for_tea_record(table_name, values, length):

    conn = pymysql.connect(
        host='127.0.0.1',
        user='root',
        password='380988118GUOjh!',
        port=3306,
        database='SE'
    )

    cursor = conn.cursor(pymysql.cursors.DictCursor)

    sql_insert = 'insert into '+ table_name +' (TR_id, TR_name, TR_sex, TR_school, TR_subject, TR_stage, TR_s, TR_e, TR_desc) values ' + ' ( '
    for i in range(length):
        if i < len(values):
            value = values[i]
        else:
            value = "Null"
        sql_insert += "'" + value + "',"
    sql_insert = sql_insert[0:-1]  + " );"
    print(sql_insert)

    cursor.execute(sql_insert)

    conn.commit()



def insert_for_BiDirection(values, length):

    conn = pymysql.connect(
        host='127.0.0.1',
        user='root',
        password='380988118GUOjh!',
        port=3306,
        database='SE'
    )

    cursor = conn.cursor(pymysql.cursors.DictCursor)

    sql_insert = 'insert into '+ "BiDirection" +' (Bi_record_id, Bi_Tea_id, Bi_Tea_ok, Bi_Stu_id, Bi_over) values ' + ' ( '
    for i in range(length):
        if i < len(values):
            value = values[i]
        else:
            value = "Null"
        sql_insert += "'" + value + "',"
    sql_insert = sql_insert[0:-1]  + " );"
    print(sql_insert)

    cursor.execute(sql_insert)

    conn.commit()