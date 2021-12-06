// import { render } from "ejs";



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

let stockData = [
  {
    loanTOValue: "60",
    pettionUsedMoney: "0",
    stockName: "南　亞",
    ableLoanQty: "0",
    is50: true,
    pettionUsedQty: "0",
    riskRatio: "",
    num: "",
    tradeUnit: "1000",
    riskQty: "999",
    lastPrice: "85.60",
    stockID: "1303"
  },
  {
    loanTOValue: "60",
    pettionUsedMoney: "0",
    stockName: "台積電",
    ableLoanQty: "0",
    is50: true,
    pettionUsedQty: "0",
    riskRatio: "",
    num: "",
    tradeUnit: "1000",
    riskQty: "999",
    lastPrice: "612.00",
    stockID: "2330"
  },
  {
    loanTOValue: "60",
    pettionUsedMoney: "0",
    stockName: "泰茂",
    ableLoanQty: "500",
    is50: false,
    pettionUsedQty: "0",
    riskRatio: "",
    num: "",
    tradeUnit: "1000",
    riskQty: "30",
    lastPrice: "13.45",
    stockID: "2884"
  },
  {
    loanTOValue: "60",
    pettionUsedMoney: "0",
    stockName: "玉山金",
    ableLoanQty: "300",
    is50: true,
    pettionUsedQty: "0",
    riskRatio: "",
    num: "",
    tradeUnit: "1000",
    riskQty: "999",
    lastPrice: "27.40",
    stockID: "2230"
  }

]

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
        stockID: "1303"
      },

    ]
  },
  {
    num: 2,
    stocks: [
      {
        ableLoanQty: "500000",
        custID: "4010-091001",
        transDate: "20211126",
        stockID: "2230"
      },
      {
        ableLoanQty: "300000",
        custID: "4010-091001",
        transDate: "20211126",
        stockID: "2884"
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
    // let user = userData[userId].custID;
    // localStorage.setItem("userid", user);
    let user = userData[userId].custID;
    sessionStorage.setItem("userid", user);
    // console.log(user)
    if (userPsd.value.length >= 4) {
      window.location.href = 'loan.html';
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
// let login_user = localStorage.getItem("userid");
let login_user = sessionStorage.getItem("userid");
let user_index = userData.findIndex(x => x.custID === login_user)
// console.log(user_index);
//借款申請使用者資料代入
if (window.location.pathname == '/loan.html') {

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
  let clean_btn = document.getElementById('loan-btn-clean');
  let ioan_btn = document.getElementById('loan-btn-submit');

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
    // localStorage.setItem("ioanNum", data_ioanNum.toString());
    // localStorage.setItem("ioanReason", ioanReason.value)
    sessionStorage.setItem("ioanNum", data_ioanNum.toString());
    sessionStorage.setItem("ioanReason", ioanReason.value)
    if (data_a1 - data_a2 >= data_ioanNum && data_ioanNum >= 10000) {
      window.location.href = 'acc_info.html';
    } else if (data_a1 - data_a2 < data_ioanNum) {
      // alert('超出可借金額');
      window.location.href = 'acc_overloan.html';
    } else {
      alert('wrong')
      ioanNum.value = '';
    }
  }

}

//表格內資料代入
// let s_ioanNum = localStorage.getItem('ioanNum');
// let s_ioanReason = localStorage.getItem('ioanReason');
let s_ioanNum = sessionStorage.getItem('ioanNum');
let s_ioanReason = sessionStorage.getItem('ioanReason');
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
// let acc_index = userAccData.findIndex(x => x.custID === login_user)
// console.log(acc_index);

if (window.location.pathname == '/acc_info.html' || window.location.pathname == '/check_overloan.html') {
  let user_acc1 = document.getElementById('user-acc1');
  let user_acc2 = document.getElementById('user-acc2');

  user_acc1.textContent = userAccData[user_index].c1;
  user_acc2.textContent = userAccData[user_index].c2;

}



let over_ioanNum = document.getElementById('ioanNum-over');
// console.log(over_ioanNum.innerHTML);
if (window.location.pathname == '/acc_overloan.html') {
  over_ioanNum.innerText = s_ioanNum;

  //使用者股票資料代入

  let stock_list = document.getElementById('stock-list');
  let user_stock_arr = userStockData[user_index].stocks;
  let stock_len = userStockData[user_index].num;
  let stocklist_str = '';
  // for (let i = 0; i < stock_len; i++) {  
  for (let us_info in user_stock_arr) {
    // console.log(user_stock_arr[us_info])
    let stock_index = stockData.findIndex(x => x.stockID == user_stock_arr[us_info].stockID);
    // console.log(stock_index)

    // 要插入的字串
    let stocklist_content = `
      <tr>
      <td name="stock-id">${user_stock_arr[us_info].stockID}</td>
      <td>${stockData[stock_index].stockName}</td>
      <td name="stock-qty">${user_stock_arr[us_info].ableLoanQty / 1000}</td>
      <td name="loan-val">${stockData[stock_index].loanTOValue}%</td>
      <td><input type="text" name="qty" class="border-0"></td>
      </tr>
      `;
    stocklist_str += stocklist_content;
    // console.log(us_info.length)

  }
  stock_list.innerHTML = stocklist_str;
  
  //擔保品張數
  let qtys = document.getElementsByName('qty');
  let stock_id = document.getElementsByName('stock-id');
  let stock_ableqty = document.getElementsByName('stock-qty');

  let user_stockid_arr = [];
  let user_stockableqty_arr = [];
  let lp_arr = [];
  let lv_arr = [];
  let ln_arr = [];
  for (let i = 0; i < stock_len; i++) {
    let a = stock_id[i].innerText
    user_stockid_arr.push(a);
    let b = stockData.findIndex(x => x.stockID == user_stockid_arr[i]);
    let c = stock_ableqty[i].innerText
    user_stockableqty_arr.push(c);

    // console.log(b)
    lp_arr.push(stockData[b].lastPrice);
    lv_arr.push(stockData[b].loanTOValue);
    ln_arr.push(stockData[b].stockName);
  }
  // console.log(user_stockid_arr.length);
  // console.log(user_stockid_arr);
  // console.log(user_stockableqty_arr);
  let qty_arr = [];
  for (let i = 0; i < qtys.length; i++) {
    qty_arr.push(0);
  }
  let loan_quota = document.getElementById('loan-quota');
  let overloan_submit = document.getElementById('overloan-btn-submit');
  qtys.forEach((e) => {
    e.addEventListener('change', () => {
      const qtynodes_arr = Array.from(qtys);
      qty_arr[qtynodes_arr.indexOf(e)] = e.value;
      // console.log(typeof qty_arr[qtynodes_arr.indexOf(e)]);
      let user_stockNum = user_stockableqty_arr[qtynodes_arr.indexOf(e)];
      // console.log(typeof user_stockNum);
      if (parseInt(user_stockNum)< parseInt(qty_arr[qtynodes_arr.indexOf(e)])) {
        console.log(user_stockNum - qty_arr[qtynodes_arr.indexOf(e)])
        alert('超出庫存張數，請重新填寫')
        e.value = '';
      } else {
        // console.log(lp_arr);
        // console.log(lv_arr);
        //  console.log(e.value);
        // console.log(qty_arr)
        let loan_quota_total = 0;
        for (let i = 0; i < qty_arr.length; i++) {

          let ioan_sum = (lp_arr[i]) * (lv_arr[i]) / 100 * (qty_arr[i])*1000;
          loan_quota_total = loan_quota_total + ioan_sum;
          loan_quota.innerText = Math.round(loan_quota_total);
          let prduct_list  = {stockId:user_stockid_arr,stockName:ln_arr,productQty:qty_arr}
          // localStorage.setItem("userLoan",JSON.stringify(prduct_list));
          sessionStorage.setItem("userLoan",JSON.stringify(prduct_list));
        }
        // console.log(loan_quota.innerText)
        
        // localStorage.setItem("loan_quota_total", loan_quota_total);
        sessionStorage.setItem("loan_quota_total", loan_quota_total);
      }
      
    })
    
  })
  let loan_quota_total = sessionStorage.getItem('loan_quota_total');
  let ioanNum = sessionStorage.getItem('ioanNum')
  // let loan_quota_total = localStorage.getItem('loan_quota_total');
  // let ioanNum = localStorage.getItem('ioanNum')
  // console.log(s_ioanNum);
  console.log(loan_quota_total);
  // console.log(loan_quota_total < s_ioanNum)
  console.log((loan_quota.textContent));
  overloan_submit.addEventListener("click", () => {
    console.log(loan_quota_total-parseInt(ioanNum));
    console.log(parseInt(ioanNum));
    console.log(parseInt(s_ioanNum));
    if (loan_quota_total - parseInt(ioanNum) >= 0) {
      window.location.href = 'check_overloan.html'
    } else {
      console.log(loan_quota_total - s_ioanNum)
      alert('融通額度不足');
    }

  })
  // }

}  
if (window.location.pathname =='/check_overloan.html' || window.location.pathname =='/acc_overloan.html'){
  // let user_loan = JSON.parse(localStorage.getItem("userLoan"));
  let user_loan = JSON.parse(sessionStorage.getItem("userLoan"));
  
  let user_loan_list = document.getElementsByClassName('user-loan-list');
  let count_empty_qty = user_loan.productQty.filter(x => x=='' || x=='0' || x === 0).length
  let count_empty_index = user_loan.productQty.filter(x => x=='' || x=='0' || x === 0)
  console.log(count_empty_index);
  console.log(count_empty_index.indexOf(0,'0',''));
  let arrrr = [0,'aa','',22,'0'];
  console.log(arrrr.filter(x => x==0 || x=='0' || x==''));
  let loanlist_str ='';
  // console.log(user_loan.productQty.length)
  // console.log(count_empty_qty);
  
  
    if(count_empty_qty == 0){
      for(let i = 0 ; i < user_loan.productQty.length ; i++){
        
        let loanlist_content = `
        <tr>
        <td>${user_loan.stockId[i]}</td>
        <td>${user_loan.stockName[i]}</td>
        <td class="qty-num">${user_loan.productQty[i]}</td>
        </tr>
        `;
        loanlist_str += loanlist_content
        
      }
    
    }else{
      for(let i = 0 ; i < user_loan.productQty.length - count_empty_qty ; i++){
        
        let loanlist_content = `
        <tr>
        <td>${user_loan.stockId[i]}</td>
        <td>${user_loan.stockName[i]}</td>
        <td class="qty-num">${user_loan.productQty[i]}</td>
        </tr>
        `;
        loanlist_str += loanlist_content
        
      }
    }
    
    
    
  }  
  
   // back to change loan
   let check_back = document.getElementsByClassName('check-btn-back');
   sessionStorage.getItem('userLoan');
;    for (let i in check_back){
       check_back[i].onclick = () => {
           sessionStorage.removeItem('userLoan')
           // localStorage.removeItem('userLoan')
           window.location.href='/acc_overloan.html'
       }
   }
  // // console.log(loanlist_str);
  // for ( let el of user_loan_list){
  //   el.innerHTML = loanlist_str
  // }
  // // user_loan_list[0].innerHTML = loanlist_str
  // let qtyNum = document.getElementsByClassName('qty-num');
  // let qtys_sum = document.getElementsByClassName('product-total');
  // // console.log(user_loan.productQty.length);
  // let total_data = 0
  // for(let i = 0 ; i < user_loan.productQty.length ; i++){
  //   total_data = total_data + parseInt(qtyNum[i].innerText);
  //   // console.log(total_data)
  //   // qtyNum[i]++
  //   for(let c of qtys_sum){
  //     c.innerText = total_data;
  //   }
  // }
  // // for(let num in qtyNum){
  // //   console.log(num)
  // // }
