import hashlib

def md5_hash(string):
    # 创建一个MD5对象
    md5 = hashlib.md5()
    
    # 将字符串编码为字节并计算MD5摘要
    md5.update(string.encode('utf-8'))
    
    # 获取MD5摘要的十六进制表示
    md5_digest = md5.hexdigest()
    
    return md5_digest



if __name__ == '__main__':
    my_string = "3809"
    md5_result = md5_hash(my_string)
    print("MD5 加密结果:", md5_result)
