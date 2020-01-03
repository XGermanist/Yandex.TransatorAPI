var btn = document.querySelector("button");
btn.addEventListener("click", function (ev){
ev.preventDefault();

/* это благополучно забирает контент и класса "транслейт" и выводит его с доп. текстом в ХТМЛ
var io = document.querySelector(".translate").innerHTML;
io = "<p> Вы ввели текст, где сказано </p>" + io;
document.querySelector(".translate").innerHTML = io;
*/
  var sourceLang = document.querySelector(".source").value;
  var targetLang = document.querySelector(".target").value;
  var finaltext = document.querySelector('.translate');
  var fortranslate = document.querySelector('.translate').textContent;

  console.log(sourceLang);
  console.log(targetLang);

  // Создаем объект XMLHttpRequest, при помощи которого будем отправлять запрос
  var req = new XMLHttpRequest();

  // Сохраняем ключ API, полученный со страницы https://tech.yandex.ru/keys/get/?service=trnsl
  var API_KEY = 'trnsl.1.1.20200101T161722Z.b0b66725bb779746.53132036736ff9a77c3e128d56f7d760f88be73c';

  // Сохраняем адрес API
  var url = 'https://translate.yandex.net/api/v1.5/tr.json/translate';

  // Формируем полный адрес запроса:
  url += '?key=' + API_KEY; // добавляем к запросу ключ API
  url += '&text=' + fortranslate ; // текст для перевода
  url += '&lang=' + sourceLang + '-' + targetLang; // направление перевода: с русского на английский

  // Таким образом формируется строка вида:
  // https://translate.yandex.net/api/v1.5/tr.json/translate?key=example_api_key&text=кролики&lang=ru-en

  // Назначаем обработчик события load
  req.addEventListener('load', function () {
    console.log(req.response); // отображаем в консоли текст ответа сервера
    var response = JSON.parse(req.response); // парсим его из JSON-строки в JavaScript-объект

    // Проверяем статус-код, который прислал сервер
    // 200 — это ОК, остальные — ошибка или что-то другое
    if (response.code !== 200) {
      fortranslate.innerHTML = 'Произошла ошибка при получении ответа от сервера:\n\n' + response.message;
      return;
    }

    // Проверяем, найден ли перевод для данного слова
    if (response.text.length === 0) {
      fortranslate.innerHTML = 'К сожалению, перевод для данного слова не найден';
      return;
    }

    // Если все в порядке, то отображаем перевод на странице
    finaltext.innerHTML = response.text.join('<br>'); // вставляем его на страницу
  });

  // Обработчик готов, можно отправлять запрос
  // Открываем соединение и отправляем
  req.open('get', url);
  req.send();



//ниже только хвост обработчика, не убирать!
});
