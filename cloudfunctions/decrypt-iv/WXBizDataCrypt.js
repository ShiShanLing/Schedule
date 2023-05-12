var crypto = require('crypto')

class WXBizDataCrypt {
  constructor(appId, sessionKey) {
    this.appId = appId;
    this.sessionKey = sessionKey;
  }
  decryptData(encryptedData, iv) {
    let decoded = '';
    console.log("this.sessionKey===", this.sessionKey);
    // base64 decode
    let sessionKey = Buffer.from(this.sessionKey, 'base64');
    encryptedData = Buffer.from(encryptedData, 'base64');
    iv = Buffer.from(iv, 'base64');

    try {
      // 解密
      let decipher = crypto.createDecipheriv('aes-128-cbc', sessionKey, iv);
      // 设置自动 padding 为 true，删除填充补位
      decipher.setAutoPadding(true);
      decoded = decipher.update(encryptedData, 'binary', 'utf8');
      decoded += decipher.final('utf8');
      decoded = JSON.parse(decoded);
      console.log("解密成功");
      
    } catch (err) {
      throw new Error('Illegal Buffer', err);
      console.log("解密失败");
    }

    if (decoded.watermark.appid !== this.appId) {
      throw new Error('Illegal Buffer');
    }

    return decoded;
  }
}

module.exports = WXBizDataCrypt
