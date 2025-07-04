// Simple 30 fruit info extractor

function extractValue(text, regex, groupIndex = 1) {
  const match = text.match(regex);
  return match && match[groupIndex] ? match[groupIndex].trim() : '';
}

function extractFruitInfo(text) {
  const data = {
    env: {
      name: '',
      gender: '',
      age: '',
      phone: '',
      address: '',
      job: '',
      health: '',
      plan: '',
      time: '',
      economic: '',
      etc: ''
    },
    faith: {
      religion: '',
      years: '',
      status: '',
      church: '',
      family: '',
      position: '',
      type: '',
      interest: '',
      plan: '',
      friends: '',
      questions: ''
    },
    person: {
      character: '',
      mbti: '',
      hometown: '',
      complex: '',
      worry: '',
      interest: '',
      family: '',
      hobby: '',
      prefer: '',
      etc: ''
    }
  };

  const nameGender = text.match(/1\.\s*이름\/?성별\s*[:\-]?\s*([^\n]*)/i);
  if (nameGender) {
    const parts = nameGender[1].split('/');
    data.env.name = parts[0] ? parts[0].trim() : '';
    data.env.gender = parts[1] ? parts[1].trim() : '';
  }

  data.env.age = extractValue(text, /2\.\s*나이\s*[:\-]?\s*([^\n]+)/i);
  data.env.phone = extractValue(text, /3\.\s*(?:전화|전화번호)\s*[:\-]?\s*([^\n]+)/i);
  data.env.address = extractValue(text, /4\.\s*주소\s*[:\-]?\s*([^\n]+)/i);
  data.env.job = extractValue(text, /5\.\s*하는일\s*[:\-]?\s*([^\n]+)/i);
  data.env.health = extractValue(text, /6\.\s*건강.*?[:\-]?\s*([^\n]+)/i);
  data.env.plan = extractValue(text, /7\.\s*앞으로의 계획\s*[:\-]?\s*([^\n]+)/i);
  data.env.time = extractValue(text, /8\.\s*복음방 가능 시간대\s*[:\-]?\s*([^\n]+)/i);
  data.env.economic = extractValue(text, /9\.\s*경제력\s*[:\-]?\s*([^\n]+)/i);
  data.env.etc = extractValue(text, /10\.\s*기타\s*[:\-]?\s*([^\n]+)/i);

  data.faith.religion = extractValue(text, /종교\s*[:\-]?\s*([^\/\n]+)/i);
  data.faith.years = extractValue(text, /신앙년수\s*[:\-]?\s*([^\n]+)/i);
  data.faith.status = extractValue(text, /현재 신앙상태\s*[:\-]?\s*([^\n]+)/i);
  data.faith.church = extractValue(text, /교회명\s*[:\-]?\s*([^\n]+)/i);
  data.faith.family = extractValue(text, /가족신앙여부\s*[:\-]?\s*([^\n]+)/i);
  data.faith.position = extractValue(text, /직분\s*[:\-]?\s*([^\n]+)/i);
  data.faith.type = extractValue(text, /신앙유형\s*[:\-]?\s*([^\n]+)/i);
  data.faith.interest = extractValue(text, /관심분야\s*[:\-]?\s*([^\n]+)/i);
  data.faith.plan = extractValue(text, /신앙계획\s*[:\-]?\s*([^\n]+)/i);
  data.faith.friends = extractValue(text, /교회 내 친분자\s*[:\-]?\s*([^\n]+)/i);
  data.faith.questions = extractValue(text, /신앙적궁금증\s*[:\-]?\s*([^\n]+)/i);

  data.person.character = extractValue(text, /성격\/?성향\s*[:\-]?\s*([^\n]+)/i);
  data.person.mbti = extractValue(text, /MBTI\/?에니어\s*[:\-]?\s*([^\n]+)/i);
  data.person.hometown = extractValue(text, /고향\s*[:\-]?\s*([^\n]+)/i);
  data.person.complex = extractValue(text, /콤플렉스\s*[:\-]?\s*([^\n]+)/i);
  data.person.worry = extractValue(text, /고민\s*[:\-]?\s*([^\n]+)/i);
  data.person.interest = extractValue(text, /관심사\s*[:\-]?\s*([^\n]+)/i);
  data.person.family = extractValue(text, /가족관계\s*[:\-]?\s*([^\n]+)/i);
  data.person.hobby = extractValue(text, /취미\/?특기\s*[:\-]?\s*([^\n]+)/i);
  data.person.prefer = extractValue(text, /선호하는 유형\s*[:\-]?\s*([^\n]+)/i);
  data.person.etc = extractValue(text, /기타\s*[:\-]?\s*([^\n]+)/i);

  return data;
}

function displayResult(data) {
  const output = document.getElementById('output');
  output.textContent = JSON.stringify(data, null, 2);
}

document.getElementById('extract-btn').addEventListener('click', () => {
  const text = document.getElementById('text-input').value;
  const info = extractFruitInfo(text);
  displayResult(info);
});

