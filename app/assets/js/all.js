// import { render } from "ejs";
// import {acc1_btn_close} from '../js/test';


// const userData ='https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot?$top=30&$format=JSON';

// axios.get(userData).then(function(response){

//   console.log(response.data);
//   userData = response.data.data;
//   render();
// })

// try {
//   fetch('http://sloan.syspower.com.tw/SecuredLoan/base_data?kind=base_data&custID=4010-091000')
// } catch (err) {
//   console.error(err);
// }



// const userAccData ='http://sloan.syspower.com.tw/SecuredLoan/base_data?kind=acc_data&custID=4010-091000';

// axios.get(userAccData).then(function(response){

//   console.log(response.data);
//   userAccData = response.data.data;
//   render();
// })
// function ajaxCallJsonp1() {

//   $("#msg").html('新增中...');

//   $.ajax({//http://localhost:8080/SecuredLoanWeb/loanservlet ?username=05067113test&password=12345&dstaddr=0937205071&smbody=haha
//     url: 'http://sloan.syspower.com.tw/SecuredLoan/base_data',
//     type: 'post',
//     async: false,
//     data: { kind: 'base_data', custID: '4010-091000' },
//     success: function (rtn) {
//       console.log(' success ' + JSON.stringify(rtn));
//     },
//     error: function (rtn) {
//       console.log('errors' + JSON.stringify(rtn));
//     }
//   })

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

let userAccData = [
  {
    custID: "4010-091000",
    c1name: "中國信託銀行西松分行",
    c1: "822-1234567890",
    c2: "822-734061234567"
  },
  {
    custID: "4010-091001",
    c1name: "中國信託銀行三重分行",
    c1: "822-1234567888",
    c2: "822-734061234588"
  }

];

let userStockData = [
  {
    num: 2,
    stocks: [
      {
        ableLoanQty: "300000",
        custID: "4010-091000",
        transDate: "20211126",
        stockID: "2330"
      },
      {
        ableLoanQty: "300000",
        custID: "4010-091000",
        transDate: "20211126",
        stockID: "2885"
      }
    ]
  }

]


//登入
let login_btn = document.getElementById('user-login');
if (login_btn) {
  login_btn.addEventListener('click', userLogin, false);
}
function userLogin() {
  let userAcc = document.getElementById('user-account');
  let userPsd = document.getElementById('user-password');
  let userId = userData.findIndex(x => x.custID === userAcc.value);
  //   let userId = userData.some(x => x.custID == userAcc.value);

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
//透過localstorage存的帳號找到是userData哪筆資料(index)
let login_user = localStorage.getItem("userid");
let user_index = userData.findIndex(x => x.custID === login_user)
// console.log(user_index);
//借款申請使用者資料代入
if (window.location.pathname == '/ioan.html') {

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
      // alert('超出可借金額');
      window.location.href = 'acc_overioan.html';
    } else {
      alert('wrong')
      ioanNum.value = '';
    }
  }

}

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
for (let a5 of acc_a5) {
  a5.textContent = `${userData[user_index].a5}%`;
}

//帳戶資料代入
let acc_index = userAccData.findIndex(x => x.custID === login_user)
// console.log(acc_index);

if (window.location.pathname == '/acc_info.html') {
  let user_acc1 = document.getElementById('user-acc1');
  let user_acc2 = document.getElementById('user-acc2');

  user_acc1.textContent = userAccData[acc_index].c1;
  user_acc2.textContent = userAccData[acc_index].c2;

}



let over_ioanNum = document.getElementById('ioanNum-over');
// console.log(over_ioanNum.innerHTML);
if (window.location.pathname == '/acc_overioan.html') {
  over_ioanNum.innerText = s_ioanNum;

}