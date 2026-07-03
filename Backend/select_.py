import pymysql

def select_one(table_name,attrs,limit):

    conn = pymysql.connect(
        host='127.0.0.1',
        user='root',
        password='380988118GUOjh!',
        port=3306,
        database='SE'
    )

    cursor = conn.cursor(pymysql.cursors.DictCursor)

    sql = 'select ' + attrs + ' from '+ table_name +' where ' + limit + ";"
    # print("select one :", sql)
    try:
        cursor.execute(sql)

        result = cursor.fetchone()  # 返回一行数据

    except Exception as e:
        conn.rollback()
        print("select 查询报错",e)
        result = "暂无数据"

    finally:
        cursor.close()
        conn.close()
    
    # print(result)
    return result



def select_for_stu_search(subject, stage, time, gender):

    conn = pymysql.connect(
        host='127.0.0.1',
        user='root',
        password='380988118GUOjh!',
        port=3306,
        database='SE'
    )

    cursor = conn.cursor(pymysql.cursors.DictCursor)

    if time is not None and gender is not None:
        limit = "TR_subject='" + subject + "' and "
        limit += "TR_stage='" + stage + "' and "
        limit += "TR_sex='" + gender + "' and "
        limit += "'"+time+"'" + " BETWEEN TR_s AND TR_e"

    elif time is None and gender is not None:
        limit = "TR_subject='" + subject + "' and "
        limit += "TR_stage='" + stage + "' and "
        limit += "TR_sex='" + gender + "'"


    elif gender is None and time is not None:
        limit = "TR_subject='" + subject + "' and "
        limit += "TR_stage='" + stage + "' and "
        limit += "'"+time+"'" + " BETWEEN TR_s AND TR_e"

    else:
        limit = "TR_subject='" + subject + "' and "
        limit += "TR_stage='" + stage + "'"


    sql = 'select ' + "*" + ' from '+ "Teacher_record" +' where ' + limit + " AND TR_decided='0'" + ";"
    print(sql)

    try:
        cursor.execute(sql)
        result = cursor.fetchall()  

    except Exception as e:
        conn.rollback()
        print("select 查询报错",e)
        result = "暂无数据"

    finally:
        cursor.close()
        conn.close()
    

    return result





def select_for_tea_search(id):

    conn = pymysql.connect(
        host='127.0.0.1',
        user='root',
        password='380988118GUOjh!',
        port=3306,
        database='SE'
    )

    cursor = conn.cursor(pymysql.cursors.DictCursor)

    limit = "TR_id='" + id + "'" + " AND " + "TR_decided='0'"

    sql = 'select ' + "*" + ' from '+ "Teacher_record" +' where ' + limit + ";"
    print(sql)

    try:
        cursor.execute(sql)
        result = cursor.fetchall()  

    except Exception as e:
        conn.rollback()
        print("select 查询报错",e)

    finally:
        cursor.close()
        conn.close()
    
    return result



def select_for_chosen(identity, id_num):

    conn = pymysql.connect(
        host='127.0.0.1',
        user='root',
        password='380988118GUOjh!',
        port=3306,
        database='SE'
    )

    cursor = conn.cursor(pymysql.cursors.DictCursor)

    if identity == "Tea":
        limit = "Bi_Tea_id='" + str(id_num) + "'"
    elif identity == "Stu":
        limit = "Bi_Stu_id='" + str(id_num) + "'"

    sql = 'select ' + "*" + ' from '+ "BiDirection" +' where ' + limit + ";"
    print(sql)

    try:
        cursor.execute(sql)
        result = cursor.fetchall()  

    except Exception as e:
        conn.rollback()
        print("select 查询报错",e)

    finally:
        cursor.close()
        conn.close()
    
    return result



