// section3 -26. Node 서버 생성

const http = require("http"); // Node.js는 전역으로 노출하는 특성이 있어서 Node.js로 실행하는 모든 파일에서 기본으로 require이라는 키워드를 사용할 수 있음
// # require() : 파일을 불러 옴, 다른 파일로의 경로나 JavaScipt 파일을 불러올 수 있음. 또한 파일의 경로를 모른다고 하더라도 http같은 코어 모듈을 불러올 수도 있음
//  파일경로는 절대경로 혹은 상대경로를 반드시 표시해주어야 하며 .js 는 적지 않아도 됨

//  function rqListener(req, res) {}  // 첫번째 인수(req): 요청에 대한 데이터, 두번째 인수(res): 응답에 사용됨

//  http.createServer(rqListener);  // rqListener() vs rqListener  -> rqListener라는 이름을 가진 함수를 찾아서 들어오는 모든 요청에 따라 실행하게 됨
//  rqListener는 서버에 도달하는 모든 요청에 따라 실행되며 createServer로 부터 시작이 됨.
// createServer() : 서버 생성 시 필요한 메서드. requestListener를 인수로 가짐/ requestListener:들어오는 모든 요청을 실행하는 기능

// * 익명 함수를 사용하는 경우
// http.createServer(function(req, res) {});  //Server에 요청이 들어올 때마다 노드가 익명 함수를 실행함. 이게 바로 Node.js의 주된 Event Driven Architecture(EDA)

// # createServer 콜백 함수 : 서버에 요청이 들어올 때마다 Node.js가 호출하게 됨.

// * arrow function
const server = http.createServer((req, res) => {
  //  console.log(req.url, req.method, req.headers); // console.log함수에 req(요청 객체)를 넣어서 안에 뭐가 들어있는 지 확인하기
  // process.exit(); // -27. process.exit() 함수를 실행시키면 console이 정리됨. (대개는 서버를 중지하지 않기 때문에 이것을 호출할 일은 잘 없음.. )
  //  Node.js가 더 이상의 작업이 없다고 판단하였기 때문에 프로그램을 종료하고 다시 Terminal이 제어하도록 한 것임

  const url = req.url;
  if (url === "/") {
    res.write("<html>"); //write 로 res를 여러 라인에 걸쳐 작성~
    res.write("<head><title>Enter Message</title></head>");
    res.write(
      "<body><form action='/message' method='POST'><input type='text'> <button type='submit'>click!</button></form></body>"
    );
    res.write("</html>");
    res.end(); // 응답 끝
  }
  res.setHeader("Content-Type", "text/html"); //  setHeader() : 새로운 헤더 설정하기.
  // Content-Type : 브라우저가 알고 이해하며 받아들이는 디폴트(default)헤더
  // text.html : 두번째 인수에는 setHeader 안에 이 헤더 키에 대응하는 값을 설정...즉 text/html에 전송하거나 설정할 수 있음
  //  응답의 일부가 될 콘텐츠 유형은 HTML이라는 일련의 메타정보를 전달하게 됨.. 그리고 HTML코드 작성하셈~
  res.write("<html>"); //write 로 res를 여러 라인에 걸쳐 작성~
  res.write("<head><title>My First Page</title></head>");
  res.write("<body><h1>Hello from my Node.js Server! </h1></body>");
  res.write("</html>");
  res.end(); // 응답 끝
});

// console로 확인하려면 서버를 구축해야하는데 이 때 3000port를 사용하는 것임 ...
server.listen(3000); //listen은 Node.js가 스크립트를 바로 종료하지 않고 계속 실행되면서 듣도록 함
//  # listen에 넣을 수 있는 여러가지 인수들 중 -1. 듣고자하는 port (실무에서는 대개 포트 인자를 입력하지x, 기본적으로 포트 번호 80이 사용됨)
//  local Machine의 host name -> localhost 따라서 localhost:3000
// ----------------------------------------------------

// section3 -27. Node의 lifeCycle 및 event Loop

// Node.js가 관리하는 이벤트 루프는 작업이 남아있는 한 계속해서 작동하는 루프 프로세스로 이벤트 리스너가 있는 한 계속 작동함. 이 때 console.log 아랫줄에 process.exit() 를 실행시켜서 작동을 끝낼 수 있다.

// -------------------------------------------

// section3 -29. 요청의 이해

//  log 에 있는 요청 객체 이해하기!!
//  이 때 req는 localhost:3000 page에 들어갔을 때 들어오는 요청에 있는 모든 데이터를 통해 Node.js가 대신 생성해 준 요청 객임
//  log() 안에 .url .method .headers 넣어서 3가지 정보만 출력
// #1. req.url : url 은 호스트 다음에 붙는 모든 주소 ('/ ' 뒤에 붙는 주소)
// #2. req.method : GET 방식으로 출력
// #3. req.headers : {} 안에 적힌 내용들..

// -------------------------------------------

// section3 -30. 응답 전송
// #1. res.setHeader()
// #2. res.write()
// #3. res.end()
//  express.js framework 로 간단하게 작성가능함

// --------------------------------------------

//  section3 -32. 라우터 요청
