`use strict`;

const prefectures = ['北海道','青森県','岩手県','宮城県','秋田県','山形県','福島県','茨城県','栃木県','群馬県','埼玉県','千葉県','東京都','神奈川県','新潟県','富山県','石川県','福井県','山梨県','長野県','岐阜県','静岡県','愛知県','三重県','滋賀県','京都府','大阪府','兵庫県','奈良県','和歌山県','鳥取県','島根県','岡山県','広島県','山口県','徳島県','香川県','愛媛県','高知県','福岡県','佐賀県','長崎県','熊本県','大分県','宮崎県','鹿児島県','沖縄県']
const gourmets = ['ジンギスカン','せんべい汁','わんこそば','牛タン焼き','きりたんぽ鍋','芋煮','喜多方ラーメン','あんこう鍋',' 宇都宮餃子','ひもかわうどん','みそポテト','なめろう','もんじゃ焼き','よこすか海軍カレー','へぎそば','富山ブラックラーメン','金沢カレー','ソースカツ丼','ほうとう','信州そば','飛騨牛の朴葉味噌焼き','富士宮やきそば','ひつまぶし','伊勢うどん','近江牛ステーキ','おばんざい','たこ焼き','明石焼き','柿の葉寿司','和歌山ラーメン','鳥取牛骨ラーメン','出雲そば','デミカツ丼','広島風お好み焼き','瓦そば','徳島ラーメン','讃岐うどん','宇和島鯛めし','鰹のたたき','博多ラーメン','呼子のイカ活き造り','ちゃんぽん','馬刺し','とり天','チキン南蛮','黒豚しゃぶしゃぶ','沖縄そば']
const size = prefectures.length;

const viewDivision = document.getElementById('view-area');
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const answerDivision = document.getElementById('answer-area');

let accessIndexs = [];
let userName;
let h;

function reset() {
  document.getElementById('first-area').innerText = '';
  viewDivision.innerText = '';
  answerDivision.innerText = '';
  for(let i = 0; i < size; i++) {
    accessIndexs.push(i);
  }

  // シャッフル
  for(let i = 0; i < size; i++) {
    const r = Math.floor(Math.random() * size);
    const t = accessIndexs[r];
    accessIndexs[r] = accessIndexs[i];
    accessIndexs[i] = t;
  }
}

function view() {
  if (accessIndexs.length === 1) {
    viewAnser();
    return;
  }

  let actives = [];
  let inactives = [];

  for(let i = 0; i < accessIndexs.length; i ++) {
    if(i % 2 == 0) {
      actives.push(accessIndexs[i]);
    } else {
      inactives.push(accessIndexs[i]);
    }
  }

  viewDivision.innerText = "";

  const titleElement = document.createElement('h1');
  titleElement.setAttribute('class','text-center');
  titleElement.textContent = '調査中...';
  viewDivision.append(titleElement);

  const rowElement = document.createElement('div');
  rowElement.setAttribute('class','row');

  for(let i = 0; i < actives.length; i++) {
    const index = actives[i];
    const prefecture = prefectures[index];
    const gourmet = gourmets[index];

    const colElement = document.createElement('div');
    colElement.setAttribute('class','col-sm-2');

    const cardElement = document.createElement('div');
    cardElement.setAttribute('class','card');

    const headerElement = document.createElement('div');
    headerElement.setAttribute('class','card-header text-bg-primary text-center');
    headerElement.textContent = '候補' + (i + 1);
    cardElement.append(headerElement);

    const cardBodyElement = document.createElement('div');
    cardBodyElement.setAttribute('class','card-body');

    const prefectureElement = document.createElement('p');
    prefectureElement.setAttribute('class','card-text text-center');
    prefectureElement.textContent = prefecture;
    cardBodyElement.append(prefectureElement);

    cardElement.append(cardBodyElement)
    colElement.append(cardElement);
    rowElement.append(colElement);
    viewDivision.append(rowElement);
  }
  
  const dFlexElement = document.createElement('div');
  dFlexElement.setAttribute('class','d-flex justify-content-center');

  const trueBtnElement = document.createElement('button');
  trueBtnElement.setAttribute('class','btn btn-outline-success');
  trueBtnElement.textContent = 'この中にある！';
  trueBtnElement.addEventListener('click',() => {
    accessIndexs = actives;
    view();
})
  dFlexElement.append(trueBtnElement);

  const falseButElement = document.createElement('button');
  falseButElement.setAttribute('class','btn btn-outline-danger');
  falseButElement.textContent = 'この中にない！';
  falseButElement.addEventListener('click',() => {
    accessIndexs = inactives;
  view();
})
  dFlexElement.append(falseButElement);
  
  viewDivision.appendChild(dFlexElement);
}

function viewAnser() {
  viewDivision.innerText = "";
  const titleElement = document.createElement('h1');
  titleElement.setAttribute('class','text-center');
  titleElement.textContent = userName + 'の出身地は...';
  answerDivision.append(titleElement);

  const dFlexElement = document.createElement('div');
  dFlexElement.setAttribute('class','d-flex justify-content-center');

  const anserBtn = document.createElement('button');
  anserBtn.setAttribute('class','btn btn-outline-success');
  anserBtn.textContent = '見る';
  anserBtn.addEventListener('click',() => {
    answerDivision.innerText = '';
    dFlexElement.innerText = '';
    const titleElement = document.createElement('h1');
    titleElement.setAttribute('class','text-center');
    titleElement.textContent = userName + 'の出身地は...';
    answerDivision.append(titleElement);

    const prefectureElement = document.createElement('h2');
    const index = accessIndexs[0];
    prefectureElement.textContent = prefectures[index] + 'だ！';
    prefectureElement.setAttribute('class','text-center');
    answerDivision.append(prefectureElement);

    const gourmentElement = document.createElement('h2');
    gourmentElement.textContent = gourmets[index] + ' 美味しいですよね！'
    gourmentElement.setAttribute('class','text-center');
    answerDivision.append(gourmentElement);

    const moreBtnElement = document.createElement('button');
    moreBtnElement.setAttribute('class','btn btn-outline-secondary');
    moreBtnElement.textContent = 'もう一度';
    moreBtnElement.addEventListener('click',() => {
      reset();
      view();
    })
    dFlexElement.append(moreBtnElement);
    answerDivision.append(dFlexElement);
  })
  dFlexElement.append(anserBtn);
  answerDivision.append(dFlexElement);
}

assessmentButton.addEventListener('click',() => {
  userName = userNameInput.value;
  if (userName.length == 0) {
    return;
  }
  reset();
  view();
})