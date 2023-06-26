require("dotenv").config();
const md5 = require("md5");
const axios = require("axios");
const apiUrl = "http://api.fanyi.baidu.com/api/trans/vip/translate";
const appid = process.env.APPID;
const secret = process.env.SECRET;
const queryContent = process.argv[2];

const requestTranslate = (q) => {
  const salt = Math.random();
  const sign = md5(appid + q + salt + secret);
  const [from, to] = isChinese(q) ? ["zh", "en"] : ["en", "zh"];
  const params = {
    q,
    from,
    to,
    salt,
    appid,
    sign,
  };
  return axios.get(apiUrl, {
    params,
  });
};

function isChinese(text) {
  // 使用正则表达式匹配中文字符
  const regex = /^[\u4e00-\u9fa5]+$/;
  return regex.test(text);
}

requestTranslate(queryContent).then((v) => {
  console.log(v.data.trans_result);
});
