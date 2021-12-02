// import { render } from "ejs";
// import {acc1_btn_close} from '../js/test';


// const userDataUrl ='https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot?$top=30&$format=JSON';

// axios.get(userDataUrl).then(function(response){

//   console.log(response.data);
//   userData = response.data.data;
//   render();
// })

// try {
//   fetch('http://sloan.syspower.com.tw/SecuredLoan/base_data?kind=base_data&custID=4010-091000')
// } catch (err) {
//   console.error(err);
// }


let userData = [
  {
    a1: "2000000",
    a2: "1900000",
    a3: "100000",
    a4: "184.21",
    a5: "3.00",
    custID: "4010-091000",
    name: "王大明"
  },
  {
    a1: "3000000",
    a2: "2500000",
    a3: "500000",
    a4: "174.21",
    a5: "2.00",
    custID: "4010-091001",
    name: "王曉明"
  }

];

//登入
// let login_btn = document.getElementById('user-login');
// if(login_btn){
//   login_btn.addEventListener('click', userLogin ,false);
// }

// function userLogin  (event) {
//   let userAcc = document.getElementById('user-account');
//   let userPsd = document.getElementById('user-password');
//   let userId = userData.some(x => x.custID == userAcc.value);

//   // console.log(userId);
//   if (userId){
//     if (userPsd.value.length >=4){
//       window.location.href = 'ioan.html';
//     }else{
//       userPsd.value="";
//       alert('密碼重新輸入')
//     }
//   }else{
//     userAcc.value="";
//     userPsd.value="";
//     alert('請重新輸入')
//   }

// }
let login_btn = document.getElementById('user-login');
if (login_btn) {
  login_btn.addEventListener('click', userLogin, false);
}
function userLogin() {
  let userAcc = document.getElementById('user-account');
  let userPsd = document.getElementById('user-password');
  let userId = userData.findIndex(x => x.custID === userAcc.value);

  if (userId >= 0) {
    let user = userData[userId].custID;
    localStorage.setItem("userid", user);
    // console.log(user)
    if (userPsd.value.length >= 4) {
      window.location.href = 'ioan.html';
    } else {
      userPsd.value = "";
      alert('密碼重新輸入')
    }
    return user;
  } else {
    userAcc.value = "";
    userPsd.value = "";
    alert('請重新輸入')
  }
}
let login_user = localStorage.getItem("userid");

//借款申請使用者資料代入
if (window.location.pathname == '/ioan.html') {

  let user_index = userData.findIndex(x => x.custID === login_user)
  // console.log(user_index);
  let userAccInfo = document.getElementById('user-accountInfo');
  let userName = document.getElementById('user-name');
  let user_a1 = document.getElementById('a1');
  let user_a2 = document.getElementById('a2');
  let user_a3 = document.getElementById('a3')
  let user_a4 = document.getElementById('a4')

  //網頁載入時即帶入使用者資料
  //document.addEventListener("DOMContentLoaded", function(){
  //dom is fully loaded, but maybe waiting on images & css files
  userAccInfo.value = userData[user_index].custID;
  userName.value = userData[user_index].name;
  user_a1.value = userData[user_index].a1.split('.')[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  user_a2.value = userData[user_index].a2.split('.')[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  user_a3.value = userData[user_index].a3.split('.')[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  user_a4.value = `${userData[user_index].a4}%`;

  //});



  //查詢時間
  let searchTime = document.getElementById('time');
  let now = new Date();
  let today = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes());
  if (searchTime) {
    searchTime.value = `${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()}  ${today.getHours()}:${today.getMinutes()}`

  }

  //借款金額and目的設定
  let ioanNum = document.getElementById('ioanNum');
  // console.log(parseInt(ioanNum));
  let ioanReason = document.getElementById('ioanReason');
  // console.log(ioanReason) r1
  let clean_btn = document.getElementById('ioan-btn-clean');
  let ioan_btn = document.getElementById('ioan-btn-submit');

  //清除按鈕設定
  if (clean_btn) {
    clean_btn.addEventListener('click', function () {
      ioanNum.value = '';
      ioanReason.selectedIndex = 0;
    })
  }
  //申請按鈕設定
  if (ioan_btn) {
    ioan_btn.addEventListener('click', ioanSubmit, false);
  }
  // console.log(user_a1.value)
  //a1,a2從字串100,000,000轉回數字100000
  let data_a1 = parseInt(user_a1.value.split(',').join(''));
  let data_a2 = parseInt(user_a2.value.split(',').join(''));
  // console.log(typeof data_a1)
  // console.log(typeof data_ioan)

  //借款申請判斷
  function ioanSubmit() {
    let data_ioanNum = parseInt(ioanNum.value);
    localStorage.setItem("ioanNum", data_ioanNum.toString());
    localStorage.setItem("ioanReason", ioanReason.value)
    if (data_a1 - data_a2 >= data_ioanNum && data_ioanNum >= 10000) {
      window.location.href = 'acc_info.html';
    } else if (data_a1 - data_a2 < data_ioanNum) {
      window.location.href = 'index.html';
    } else {
      alert('wrong')
      ioanNum.value = '';
    }
  }

}
//按鈕關閉acc1,acc2
// let acc1_btn_close = document.getElementById('acc1-btn-close');
// let acc2_btn_close = document.getElementById('acc2-btn-close');
// console.log(acc1_btn_close)
// function close_accInfo () {
//   let acc1_info =document.getElementById('acc1-info');
//   let acc2_info =document.getElementById('acc2-info');
//   // console.log(this.currentTarget);
//   console.log(this.target);

//   // if(e.target == acc1_btn_close){acc1_info.style.display ='none'}; 
//   // if(e.target == acc2_btn_close){acc2_info.style.display ='none'}; 
// }
// acc1_btn_close.addEventListener('click', function(){
//   console.log('fff')

//   // return false;
// });
//表格內資料代入
let s_ioanNum = localStorage.getItem('ioanNum');
let s_ioanReason = localStorage.getItem('ioanReason');
let acc_ioanNum = document.querySelectorAll('[name="acc-ioanNum"]');
let acc_ioanReason = document.getElementsByName('acc-ioanReason');
let acc_a5 = document.getElementsByName('a5');

// console.log(acc_ioanNum);
// console.log(acc_ioanReason);
// console.log(acc_a5);
// acc_ioanNum.textContent = s_ioanNum;
for (let iN of acc_ioanNum) {
  iN.textContent = s_ioanNum;
}
for (let iR of acc_ioanReason) {
  iR.textContent = s_ioanReason;
}

let user_index = userData.findIndex(x => x.custID === login_user);

let acc1_btn_close = document.getElementById('acc1-btn-close');
acc1_btn_close.addEventListener('click', function () {
  console.log('fff')
});