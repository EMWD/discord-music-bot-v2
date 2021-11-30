const ru = require('convert-layout/ru');

class LangHelper {
    static get_all_vars(letters) {
        var full_set = letters;
        letters.forEach(letter => {
            full_set.push(ru.fromEn(letter));
        });
        return full_set;
    }
}

module.exports = LangHelper
