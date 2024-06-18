import requests
import json

# 假设 sourceLang 和 targetLang 是已经定义好的变量
sourceLang = 'eng_Latn'  # 举例，根据实际情况设置
targetLang = 'zho_Hans'

def handle_translate(text):
    try:
        # 准备请求的参数
        params = {
            'text': text,
            'source': sourceLang,
            'target': targetLang,
        }

        # 发起 POST 请求到 FastAPI 后端
        response = requests.post('https://api-fashiai-2024-6-18-2.cpolar.cn/api/v3/translate',
                                   headers={'Content-Type': 'application/json'},
                                   data=json.dumps(params))

        # 检查响应状态
        if response.ok:
            # 解析响应为 JSON
            data = response.json()
            # 设置翻译文本
            return data['result']
        else:
            # 如果响应状态码不是 200，则抛出异常
            response.raise_for_status()

    except requests.exceptions.RequestException as error:
        # 错误处理，例如打印错误消息
        print('Translation error:', error)
        # 根据需要返回错误消息或者其他错误处理
        return 'Error translating text.'

# 使用示例
translated_text = handle_translate('Hello, world! hi hi')
print(translated_text)
