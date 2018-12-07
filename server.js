const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = '664655265:AAFQaI5nQwThSu4bRPYtRrSIHp0kBpvxiFs';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

// CUSTOM CODE
const options = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [{ text: '⭐ MyEnglishLab', callback_data: 'stu_mel' }],
      [{ text: '📙 Islands', callback_data: 'isl' }]
    ]
  })
};
const optionsFormatting = {
  parse_mode: 'HTML'
};
const options3 = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [{ text: '⭐ MyEnglishLab', callback_data: 'mel' }],
      [{ text: '📙 Islands', callback_data: 'isl' }],
      [{ text: '📹 Video', callback_data: 'video' }]
    ]
  })
};

const optionsStuMel = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [{ text: '1️⃣ MEL. Як зареєструватися?', callback_data: 'mel_stu_register' }],
      [{ text: '2️⃣ MEL. Як відновити логін або пароль?', callback_data: 'mel_stu_forgot_login_credentials' }]
    ]
  })
};

const options2 = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [{ text: 'Я студент 🎓', callback_data: 'stu' }],
      [{ text: 'Я вчитель 👩‍🏫', callback_data: 'tea' }]
    ]
  }),
  parse_mode: 'HTML'
};
//

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"
  const resp2 = 'https://www.youtube.com/watch?v=jwzeBzfBvOo'; // the captured "whatever"
  console.log(msg);

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, msg.from.first_name + ', с каким продуктом у Вас возникли проблемы?', options);
});

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  // send a message to the chat acknowledging receipt of their message
  bot.sendMessage(chatId, msg.from.first_name + ', Ви:', options2);
});
bot.on('start', (msg) => {
  const chatId = msg.chat.id;

  // send a message to the chat acknowledging receipt of their message
  bot.sendMessage(chatId, 'Ви:', options2);
});
bot.on('callback_query', (msg) => {
  //const chatId = msg.chat.id;
  const chatId = msg.hasOwnProperty('chat') ? msg.chat.id : msg.from.id;
  console.log(msg);
  if (msg.data === 'stu') bot.sendMessage(chatId, 'Студент '+msg.from.first_name+', оберіть продукт:', options);
  if (msg.data === 'tea') bot.sendMessage(chatId, 'Вчитель '+msg.from.first_name+', оберіть продукт:', options3);
  if (msg.data === 'stu_mel') bot.sendMessage(chatId, 'Оберіть питання яке у Вас виникло:', optionsStuMel);
  if (msg.data === 'mel_stu_register') bot.sendMessage(chatId, 'https://youtu.be/T5cbkDHDUIg');
  if (msg.data === 'mel_stu_forgot_login_credentials') bot.sendMessage(chatId, 'Для відновлення логіну та паролю до Вашого акаунту скористайтесь формою за <strong>посиланням нижче</strong>: http://pearson-support.com/elt/', optionsFormatting);
  if (msg.data === 'isl') bot.sendMessage(chatId, 'http://www.ourdiscoveryisland.com/help.php?game=islands&lang=en');
  if (msg.data === 'video') bot.sendMessage(chatId, 'https://www.youtube.com/channel/UC5r0YcRSyZYcET0bmxfzPzg');
});
