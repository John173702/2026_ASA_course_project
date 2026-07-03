from flask import Flask, request, jsonify, send_file, render_template, send_from_directory
from flask_cors import CORS
import os
from collections import defaultdict
import datetime
import random
import json

from tea_register_ import tea_register
from stu_register_ import stu_register
from tea_login_ import tea_login
from stu_login_ import stu_login
from stu_search_ import stu_search
from tea_record_ import tea_record
from tea_search_ import tea_search
from tea_image_ import tea_image
from tea_message_ import tea_message
from tea_upload_image_ import tea_upload_image
from tea_chosen_ import tea_chosen
from tea_change_passwd_ import tea_change_passwd
from tea_update_msg_ import tea_update_msg
from tea_delete_ import tea_delete
from tea_record_delete_ import tea_record_delete
from stu_choose_ import stu_choose
from tea_choose_ import tea_choose
from stu_chosen_ import stu_chosen
from stu_eval_ import stu_eval

import logging



app = Flask(__name__)
CORS(app)

route_counter = defaultdict(int)
ip_counter = defaultdict(int)
traffic_stats = {'upload': 0, 'download': 0}

# 定义一个装饰器，用于统计路由访问次数
@app.before_request
def count_route():
    route = request.path
    ip = request.remote_addr
    route_counter[route] += 1
    ip_counter[ip] += 1


@app.route('/')
def hello_world():
    return send_from_directory('/root/sec-demo_new/login/templates', 'register.html')


@app.route('/tea_register', methods=['POST', 'GET'] )
def tea_reg():
    print("teacher register", flush=True)
    data = request.json.get('data')
    print(data, flush=True)
    data = data.split(',')
    res = tea_register(data)
    print(res, flush=True)
    return jsonify({"res": res})


@app.route('/stu_register', methods=['POST', 'GET'] )
def stu_reg():
    print("student register", flush=True)
    data = request.json.get('data')
    print(data, flush=True)
    data = data.split(',')
    res = stu_register(data)
    print(res, flush=True)
    return jsonify({"res": res})


@app.route('/tea_login', methods=['POST', 'GET'] )
def tea_log():
    print("teacher login", flush=True)
    data = request.json.get('data')
    print(data, flush=True)
    data = data.split(',')
    res = tea_login(data)
    print(res, flush=True)
    return jsonify({"res": res})


@app.route('/tea_change_passwd', methods=['POST', 'GET'] )
def tea_cha_psd():
    print("teacher login", flush=True)
    data = request.json.get('data')
    print(data, flush=True)
    data = data.split(',')
    res = tea_change_passwd(data)
    print(res, flush=True)
    return jsonify({"res": res})


@app.route('/stu_login', methods=['POST', 'GET'] )
def stu_log():
    print("student login", flush=True)
    data = request.json.get('data')
    print(data, flush=True)
    data = data.split(',')
    res = stu_login(data)
    print(res, flush=True)
    return jsonify({"res": res})


@app.route('/tea_record', methods=['POST'] )
def tea_rec():
    print("teacher record", flush=True)
    data = request.json.get('data')
    print(data, flush=True)
    data = data.split(',')
    res = tea_record(data)
    print(res, flush=True)
    return jsonify({"res": res})


@app.route('/stu_search', methods=['POST', 'GET'] )
def stu_sea():

    subject = request.args.get('subject')
    stage = request.args.get('stage')
    time = request.args.get('time')
    gender = request.args.get('gender')
    stu_id = request.args.get('mobile')

    print(subject)
    print(stage)
    print(time)
    print(gender)
    print(stu_id)

    if gender == 'male':
        gender = "M"
    elif gender == 'female':
        gender = "F"
    else:
        gender = "ok"

    res = stu_search(subject, stage, time, gender, stu_id)
    print("查询返回: ",res)

    return jsonify(res)


@app.route('/tea_search', methods=['POST', 'GET'] )
def tea_sea():

    id = request.args.get('mobile')
    res = tea_search(id)
    print("查询返回: ",res)


    return jsonify(res)


@app.route('/tea_del', methods=['POST', 'GET'] )
def tea_del():
    data = request.json.get('data')
    id = data.split(',')[0]
    # id = request.args.get('teacher_mobile')
    print(id)
    res = tea_delete(id)
    print("删除结果: ",res)


    return jsonify({"res": res})



@app.route('/tea_reocrd_del', methods=['POST', 'GET'] )
def tea_rec_del():

    TR_auto = request.args.get('auto')
    res = tea_record_delete(TR_auto)
    print("删除结果: ",res)


    return jsonify({"res": res})


@app.route('/tea_img', methods=['POST', 'GET'] )
def tea_ima():

    id = request.args.get('mobile')
    print("id", id)
    img_path = tea_image(id)
    if img_path == "错误,不存在此用户图片":
        print("该用户不存在,检查前端逻辑")
        img_path = "/root/Downloads/test.jpg"
    return send_file(img_path, mimetype='image/png')


@app.route('/tea_msg', methods=['POST', 'GET'] )
def tea_msg():
    
    id = request.args.get('mobile')
    res = tea_message(id)
    # print("查询返回: ",res)

    return jsonify(res)



@app.route('/tea_update_msg', methods=['POST', 'GET'] )
def tea_upd_msg():

    data = request.json.get('data')
    print(data)
    print(type(data))
    data = json.loads(data)
    id = data["id"]
    school = data["school"]
    subject = data["subject"]
    mail = data["mail"]
    address = data["address"]

    res = tea_update_msg(id, school, subject, mail, address)
    return jsonify({"res": res})


@app.route('/tea_upload_image', methods=['POST', 'GET'] )
def tea_upl_img():
    if 'avatar' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['avatar']
    id = request.form['mobile']

    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    random_number = random.randint(1, 1000) 
    if file:
        file_path = "/root/DB_tmp/" + str(random_number) + ".jpg"
        file.save(file_path)
    
    with open(file_path, 'rb') as file:
        file_data = file.read()


    tea_upload_image(id, file_data)

    return jsonify({"res": "ok"})


@app.route('/stu_choose', methods=['POST', 'GET'] )
def stu_cho():
    data = request.json.get('data')
    data = data.split(',')
    stu_id = data[0]
    TR_auto = data[1]
    res = stu_choose(stu_id, TR_auto)
    return jsonify({"res": res})


@app.route('/tea_choose', methods=['POST', 'GET'] )
def tea_cho():
    Bi_id = request.args.get('Bi_id')

    res = tea_choose(Bi_id)
    return jsonify({"res": res})


@app.route('/stu_chosen', methods=['POST', 'GET'] )
def stu_chn():
    id = request.args.get('stu_id')
    res = stu_chosen(id)
    # print(res)
    return jsonify(res)

@app.route('/tea_chosen', methods=['POST', 'GET'] )
def tea_chn():
    id = request.args.get('mobile')
    res = tea_chosen(id)

    return jsonify(res)



@app.route('/stu_eval', methods=['POST', 'GET'] )
def stu_eva():
    data = request.json.get('data')
    data = data.split(',')
    Bi_id = data[0]
    rating = data[1]
    # print(id)
    # print(rating)

    res = stu_eval(Bi_id, rating)
    return jsonify({"res": res})



@app.route('/stats')
def stats():
    try:
        route_stats = {route: count for route, count in route_counter.items()}
        unique_ips = len(ip_counter)
        return {'route_stats': route_stats, 'unique_visitors': unique_ips}
    except:
        return {'err': "err"}

    

@app.route('/stats_quire')
def stats_quire():
    res = {
        # 'stu_num':1000,
        # 'tea_num':367,
        # 'a1':65,
        # 'a2':54,
        # 'a3':78,
        # 'a4':90,
        # 'a5':87,
        # 'a6':100,
        # 'a7':110
        'stu_num':"100",
        'tea_num':"36",
        'a1':"65",
        'a2':"54",
        'a3':"78",
        'a4':"90",
        'a5':"87",
        'a6':"100",
        'a7':"110"
    }
    return jsonify({"res": res})



if __name__ == '__main__':
    app.debug = True
    app.logger.setLevel(logging.DEBUG)
    app.run(host='0.0.0.0', port=5000)
