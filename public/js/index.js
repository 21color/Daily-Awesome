// express 호출
const { log } = require('console');
const { publicDecrypt } = require('crypto');
const express = require('express');
const app = express();
const path = require('path')
app.use(express.static(path.join(__dirname, '../../public')));

app.listen(8080, () => {
	console.log('listening on 8080');
}); // lishten ==> server open (8080 port)

// login.html 에 방문하게되면 ?
// app.get('경로', function(요청, 응답){
//응답.send(인자);
//});

app.get('/login', function (req, rep) {
	rep.send('로그인되었습니다.');
});

app.get('/logout', function (res, rep) {
	rep.send('로그아웃되었습니다.');
});

app.get('/', function (res, rep) {
	console.log();
	rep.sendFile(path.join(__dirname, "../html", "test.html"));
});
