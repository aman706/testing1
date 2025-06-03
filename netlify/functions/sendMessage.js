const fetch = require("node-fetch"); // needed in Netlify Functions

exports.handler = async (event) => {
  const { name, email, message } = JSON.parse(event.body);

  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  const text = `📩 *New Website Message*\n\n👤 *Name:* ${name}\n📧 *Email:* ${email}\n📝 *Message:* ${message}`;

  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: "Markdown" })
    });

    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, data })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: error.message })
    };
  }
};

