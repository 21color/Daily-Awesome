// 간결/ 예측 가능한url
/**
 * url을 명사로 작성 추천
 * 하위문서를 나타낼 땐 /
 * 파일확장자(.html..)사용하지 않기
 * 띄어쓰기는 대시-이용
 * 자료 하나당 하나의 url
 */

// express 호출
const express = require('express');
const app = express();
const path = require('path');
app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.urlencoded({ extended: true }));
let db;
const MongoClient = require('mongodb').MongoClient;
app.set('view engine', 'pug');
app.set('views','./views');

MongoClient.connect(
	'mongodb+srv://admin:fjqlddb1993!@cluster0.nddtc.mongodb.net/?retryWrites=true&w=majority',
	(error, client) => {
		//연결되면 ? = >
		if (error) return console.log(error);
		db = client.db('testdb');
		app.post('/login', (req, res) => {
		
			res.send(console.log('완료'));
			const title = req.body.title;
			const textarea = req.body.textarea;
			db.collection('post').insertOne({ title: title, textarea: textarea }, (error, result) => {
				console.log(`title: ${title}, textarea: ${textarea}`);
			});
			app.get('/login', (req, res)=> {
				res.render('login', {title: title, textarea: textarea});
			})
		});
		app.listen(8080, () => {
			console.log('listening on 8080');
		}); // lishten ==> server open (8080 port)
	}
);

// login.html 에 방문하게되면 ?
// app.get('경로', function(요청, 응답){
//응답.send(인자);
//});
app.get('/login', (req, res) => {
	res.send('로그인되었습니다.');
});

app.get('/logout', (req, res) => {
	res.send('로그아웃되었습니다.');
});

app.get('/test', (req, res) => {
	console.log('this is test page');
	res.sendFile(path.join(__dirname, '../html', 'test.html'));
});

// app.post('/login', (req, res)=> {
// 	res.sendFile(path.join(__dirname, '../html', 'login.html'));
// 	console.log(req.body);
// })
