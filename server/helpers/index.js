

module.exports = {
    validateImage: (val) => {
        const isTrue = (element) => element === true;
        let supportedExt = ['.jpg', '.png', '.jfif', '.gif'];
        let isValidImgExtension = supportedExt.map(ext => val.endsWith(ext)).some(isTrue);
        urlRegex = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
        return urlRegex.test(val) && isValidImgExtension;
    }
}