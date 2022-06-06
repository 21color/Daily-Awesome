// 간결/ 예측 가능한url
/**
 * url을 명사로 작성 추천
 * 하위문서를 나타낼 땐 /
 * 파일확장자(.html..)사용하지 않기
 * 띄어쓰기는 대시-이용
 * 자료 하나당 하나의 url
 */

// express 호출
const { log } = require('console');
const express = require('express');
const app = express();
const path = require('path');
app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.urlencoded({ extended: true }));
let db;
const MongoClient = require('mongodb').MongoClient;
app.set('view engine', 'pug');
app.set('views', '../views');

MongoClient.connect(
	'mongodb+srv://admin:fjqlddb1993!@cluster0.nddtc.mongodb.net/?retryWrites=true&w=majority',
	(error, client) => {
		//연결되면 ? = >
		if (error) return console.log(error);
		db = client.db('testdb');

		// 작성

		app.post('/login', (req, res) => {
		  
			const title = req.body.title;
			const textarea = req.body.textarea;
			db.collection('counter').findOne({ name:'totalPost'}, (error, result)=>{
				let totalPost = result.totalPost; 

			db.collection('post').insertOne({ _id : totalPost + 1 , title: title, textarea: textarea }, (error, result) => { error ? console.log(`increse ${error}`) : console.log(result);

				db.collection('counter').updateOne({name: 'totalPost'},{ $inc:{totalPost: 1}}, (errer,result)=> errer ? console.log(errer) : console.log(result));
				//$set, $inc.. 연산자. $set은 바꿀것 
				res.redirect('http://localhost:8080/set');
			});
			});
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

//읽기기능
app.get('/set', (req, res) => {
	db.collection('post')
		.find()
		.toArray((error, result) => {
			error ? console.log(error) : console.log(result);
			res.render('login', {posts : result});
	console.log('login set');
		});
});

app.delete('/delete', (req, res) => {
	console.log(req.body._id);
	req.body._id = parseInt(req.body._id);

	db.collection('post').deleteOne(req.body, (error, result)=> {
		error ?	console.log(`delete error : ${error}`) :
		res.status(200).send({ message : '성공완 :)' });
	})
})