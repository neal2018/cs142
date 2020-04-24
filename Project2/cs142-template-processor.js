function Cs142TemplateProcessor(template) {
    this.template = template;
}

Cs142TemplateProcessor.prototype.fillIn = function (dictionary) {
    return this.template.replace(/{{(.*?)}}/g, function (_, word) {

        if (word in dictionary) {
            return dictionary[word];
        } else {
            return "";
        }
        
    });
};
