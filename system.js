`use strict`;

const prefectures = ['北海道','青森県','岩手県','宮城県','秋田県','山形県','福島県','茨城県','栃木県','群馬県','埼玉県','千葉県','東京都','神奈川県','新潟県','富山県','石川県','福井県','山梨県','長野県','岐阜県','静岡県','愛知県','三重県','滋賀県','京都府','大阪府','兵庫県','奈良県','和歌山県','鳥取県','島根県','岡山県','広島県','山口県','徳島県','香川県','愛媛県','高知県','福岡県','佐賀県','長崎県','熊本県','大分県','宮崎県','鹿児島県','沖縄県']
const gourmets = ['ジンギスカン','せんべい汁','わんこそば','牛タン焼き','きりたんぽ鍋','芋煮','喜多方ラーメン','あんこう鍋',' 宇都宮餃子','ひもかわうどん','みそポテト','なめろう','もんじゃ焼き','よこすか海軍カレー','へぎそば','富山ブラックラーメン','金沢カレー','ソースカツ丼','ほうとう','信州そば','飛騨牛の朴葉味噌焼き','富士宮やきそば','ひつまぶし','伊勢うどん','近江牛ステーキ','おばんざい','たこ焼き','明石焼き','柿の葉寿司','和歌山ラーメン','鳥取牛骨ラーメン','出雲そば','デミカツ丼','広島風お好み焼き','瓦そば','徳島ラーメン','讃岐うどん','宇和島鯛めし','鰹のたたき','博多ラーメン','呼子のイカ活き造り','ちゃんぽん','馬刺し','とり天','チキン南蛮','黒豚しゃぶしゃぶ','沖縄そば']
const size = prefectures.length;

const viewDivision = document.getElementById('view-area');
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');

let accessIndexs = [];
let userName;
let h;

function reset() {
  document.getElementById('first-area').innerText = '';
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
  if (h === 1) {
    viewAnser();
    return;
  }

  viewDivision.innerText = "";

  const titleElement = document.createElement('h1');
  titleElement.textContent = '候補';
  viewDivision.append(titleElement);

  const indexSize = accessIndexs.length - 1;
  h = Math.floor(indexSize / 2);

  for(let i = 0; i < h; i++) {
    const index = accessIndexs[i];
    const prefecture = prefectures[index];
    const gourmet = gourmets[index];

    const pElement = document.createElement('p');
    pElement.textContent = '候補' + (i + 1) + '：' + '都道府県：' + prefecture + ' 特産品：' + gourmet;
    viewDivision.append(pElement);
  }
  
  const trueBtnElement = document.createElement('button');
  trueBtnElement.textContent = 'この中にある！';
  trueBtnElement.addEventListener('click',() => {
    accessIndexs.splice(h + 1);
    view();
})
  viewDivision.appendChild(trueBtnElement);

  const falseButElement = document.createElement('button');
  falseButElement.textContent = 'この中にない！';
  falseButElement.addEventListener('click',() => {
    accessIndexs.splice(0,h);
  view();
})
  viewDivision.appendChild(falseButElement);
}

function viewAnser() {
  viewDivision.innerText = "";
  const titleElement = document.createElement('h1');
  titleElement.textContent = userName + 'の出身地は...';
  viewDivision.append(titleElement);

  const anserBtn = document.createElement('button');
  anserBtn.textContent = '見る';
  anserBtn.addEventListener('click',() => {
    viewDivision.innerText = "";
    const titleElement = document.createElement('h1');
    const index = accessIndexs[0];
    titleElement.textContent = userName + 'の出身地は、' + prefectures[index] + 'だ！';
    viewDivision.append(titleElement);

    const subTitleElement = document.createElement('h2');
    subTitleElement.textContent = gourmets[index] + ' 美味しいですよね！'
    viewDivision.append(subTitleElement);
  })
  viewDivision.append(anserBtn);
}

assessmentButton.addEventListener('click',() => {
  userName = userNameInput.value;
  if (userName.length == 0) {
    return;
  }
  reset();
  view();
})