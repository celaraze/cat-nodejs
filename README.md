启动

`node app.js`

数据库迁移

`node migrate.mjs up`

数据库回滚

`node migrate.mjs down`

生成随机的 JWT 密钥

linux `openssl rand -hex 32`

windows `-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 64 | % {[char]$_})`