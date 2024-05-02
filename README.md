# 개발자 가이드

## 저장소
- HTML페이지 Clone url 
    - VDI : http://10.41.101.134/ui-ux/kyobo_html.git [개발자]
    - 외부 : http://tca.kyobo.co.kr/ui-ux/kyobo_html.git [퍼블리셔]
- HTML페이지 보기
    - VDI  : http://tca.kyobo.co.kr/ui/  (김동수 수석)
    - 외부 : http://kyobo.devtree.co.kr/static/  (신용섭 수석)
    - 로컬 : http://localhost:9000/static/

- - - 
<br>

## live-server 사용법
- https://www.npmjs.com/package/live-server
``` bash
# live-server 설치
C://workspace/kyobo_html>  npm install -g live-server

# live-server 실행
C://workspace/kyobo_html>  live-server --port=9000 --browser=chrome

# 부라우저 접속
http://localhost:9000/
```

- - - 
<br>

# ui.js 사용법

## ui.alert( [메시지] );  - 알럿창 띄우기
``` js
ui.alert("알럿창입니다.",{ // 알럿 옵션들
    tit:"타이틀",
    ycb:function(){
        console.log("알럿확인결과");
    },
    ybt:"확인" // 기본값 "확인"
});
```
<br>

## ui.confirm( [메시지] , [옵션] ); - 컨펌창 띄우기

``` js
ui.confirm("컨펌창 입니다.",{ // 컨펌 창 옵션들
    tit:"타이틀",
    ycb:function(){
        console.log("컨펌확인결과");
    },
    ncb:function(){
        console.log("컨펌취소결과");
    },
    ybt:"확인", // 기본값 "확인"
    nbt:"취소"  // 기본값 "취소"
});
```

<br>

  
### ui.popup.open( [id] , [옵션] ); - 레이어팝업 열기,닫기

``` js
ui.popup.open("pop-sample1",{ // 팝업열기 콜백
    ocb:function(){
        console.log("pop-sample1 열림");
    },
    ccb:function(){
        console.log("pop-sample1 닫힘");
        //  팝업이 닫힐 때 열었던 버튼으로  포커스를 이동시켜 주셔야합니다.
        $("#btn-popup").focus();
    },
    zIndex:1000    // 레이어팝업 z-index 값, default는 1000
});

ui.popup.close("pop-sample1",{ // 팝업닫기 콜백
    ccb:function(){
        console.log("pop-sample1 닫힘");
        //  팝업이 닫힐 때 열었던 버튼으로  포커스를 이동시켜 주셔야합니다.
        $("#btn-popup").focus();
    }
});

```
<br>

  
## ui.loading.show(); - 로딩열기,닫기

``` js
ui.loading.show(); // 로딩열기
ui.loading.hide(); // 로딩닫기
```

<br>


## ui.update(); - 사용법 
#### 동적으로 HTML 변경 후 UI적용 방법
``` js
var html = 
    '<span class="select a">'+
    '    <label class="lb" for="select-1">Label</label>'+
    '    <select name="select-1" id="select-1">'+
    '        <option>선택 하세요</option>'+
    '        <option>선택1</option>'+
    '        <option>선택2</option>'+
    '        <option>선택3</option>'+
    '   </select>'+
    '</span>';

$("#html_box").append(html);  //  HTML 그리기
ui.update(); // HTML 그린후 실행
```
#### select 옵션 바꿀때
``` js
$("[name='select-4'] option[value='s-2']").prop("selected",true);
ui.update();
```
#### 입력텍스트에 value 값 넣기
``` js
$("#adr_id3").val("서울시 중구 13길");
ui.update();
```

<br>


## Form요소에 label for="" 값과 input id="" 값 마춰주기
``` html
<span class="input a">
    <label class="lb" for="input-123">Label</label>
    <input type="text" placeholder="입력하세요" id="input-123">
</span>

<span class="select a">
    <label class="lb" for="select-4">은행</label>
    <select name="select-4" id="select-4">
        <option>국민은행</option>
        <option>우리은행</option>
        <option>남의은행</option>
    </select>
</span>
```
<br>


## 버튼 비활성화 상태 
``` html
<button type="button" class="btn lg rd a" id="btn-001">버튼</button>
<button type="button" class="btn lg rd a" id="btn-001" disabled>버튼</button>

<a href="javascript:;" class="btn lg rd a" id="btn-001">링크</a>
<a href="javascript:;" class="btn lg rd a disabled" id="btn-001">링크</a>
```
``` js
$("#btn-001").prop("disabled",true);  // button  버튼일경우
$("a#btn-001").addClass("disabled");  // a 링크일경우
```
<br>


## 퍼블작업상태 '완료' 후 변경 된 HTML 주석처리 방법
``` html
<!-- [D] 2022-01-16 클래스.sam 추가,문구변경 -->
<li class="sam">
    <span class="input a"><input type="text" placeholder="입력하세요"></span>
</li>
```


<br>


## jQuery-ui - datepicker 재설정 
``` html
<span class="input a ut-date">
    <label class="lb" for="datepick_99">기간제한시키기 예제</label>
    <input type="tel" placeholder="YYYY.MM.DD" class="datepicker" id="datepick_99" >
</span>
```
-  https://api.jqueryui.com/datepicker/
``` js
$("#datepick_99").datepicker("destroy");  //  기본 datepicker 설정 뽀개기
ui.datepick.set({                         //  datepciker 설정 변경 . 날짜선택기간 제한 두기
    id:"datepick_99",
    minDate: new Date('2022-01-09'),
    maxDate: new Date('2022-02-20'),
    onSelect :function(date){
        console.log("datepick_99",date);
    },
});
```
<br>



## 레이어팝업 X 버튼 비활성화방법
``` html
<!-- 레이어 팝업 내에 있는 btn-pop-close 를 클릭하면 무조건 팝업이 닫히게 기본셋팅돼어 있는데.
      이걸  안먹게 하려면  btn-pop-close 에 no-close 추가 하면 비활성화 됩니다.   -->
<article class="pop-layer a pop-sample1" id="pop-sample1">
    <div class="pbd">
        <div class="phd">...</div>
        <div class="pct">...</div>
        <div class="pbt">...</div>
        <button type="button" class="btn-pop-close no-close"><i class="blind">닫기</i></button>
    </div>
</article>
```

<br>


