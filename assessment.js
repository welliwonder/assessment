'use strict';

const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultAreaDiv = document.getElementById('result-area');
const tweetAreaDiv = document.getElementById('tweet-area');

const answers = [
  '{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
  '{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
  '{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
  '{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
  '{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
  '{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
  '{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
  '{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
  '{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
  '{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
  '{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
  '{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
  '{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
  '{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
  '{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
  '{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。'
]

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザーの名前
 * @returns {string} 診断結果
 */
function assessment(userName) {
  // TODO: 診断処理
  const userNameAsArray = userName.split('');
  const result = userNameAsArray.map(u => u.charCodeAt(0)).reduce((a, b) => a + b);
  const index = result % answers.length;
  return answers[index].replace(/\{userName\}/g, userName);
}

/**
 * 引数の子要素を全削除する
 * @param {HTMLElement} element
 */
function removeAllChildren(element) {
  while(element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

const submitFunc = (event) => {
  const userName = userNameInput.value;
  if (userName.length === 0) {
    // 何も入力がない場合は何もしない
    return;
  }

  removeAllChildren(resultAreaDiv);
  removeAllChildren(tweetAreaDiv);

  // 診断結果を表示
  const header = document.createElement('h3');
  header.innerText = '診断結果';
  resultAreaDiv.appendChild(header);

  const paragraph = document.createElement('p');
  const result = assessment(userName)
  paragraph.innerText = result;
  resultAreaDiv.appendChild(paragraph);

  // ツイートボタンを作成
  const anchor = document.createElement('a');
  const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag=' + 
  encodeURIComponent('あなたのいいところ') +
  '&ref_src=twsrc%5Etfw';
  anchor.setAttribute('href', hrefValue);
  anchor.classList.add('twitter-hashtag-button');
  anchor.setAttribute('data-text', result);
  anchor.innerText = 'Tweet #あなたのいいところ';

  const script = document.createElement('script');
  const scriptSrc = 'https://platform.twitter.com/widgets.js';
  script.setAttribute('src', scriptSrc);

  tweetAreaDiv.appendChild(anchor);
  tweetAreaDiv.appendChild(script);
}

assessmentButton.addEventListener('click', submitFunc);

userNameInput.addEventListener('keydown', event => {
  if (event.keyCode === 13) {
    console.log('非推奨');
    submitFunc();
  }
});