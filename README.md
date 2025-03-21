启动

`node app.js`

生成随机的 JWT 密钥

linux `openssl rand -hex 32`

windows `-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 64 | % {[char]$_})`

出现奇怪问题考虑是否有循环导入 `madge --circular .`