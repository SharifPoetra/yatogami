module.exports = {
    encode: (StringResolveable) => {
            return Buffer.from(StringResolveable).toString('base64');
         },
    decode: (Base64Resolveable) => {
       return Buffer.from(Base64Resolveable, 'base64').toString();
         }
}