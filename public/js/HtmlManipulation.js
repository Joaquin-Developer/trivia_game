class HtmlManipulation
{
    static showSuccessAlert(messageAlert, callback = ()=> { return null })
    {
        const alertElem = document.querySelector("#successAlert");
        if (alertElem.firstChild) alertElem.removeChild(alertElem.firstChild);
        
        alertElem.appendChild(document.createTextNode(messageAlert));
        this.showHtmlElement(alertElem);
        // HtmlManipulation.showHtmlElement(alertElem);
        setTimeout(() => {
            this.hideHtmlElement(alertElem);
            callback();
        }, 5000);
    }

    static showErrorAlert(messageAlert, callback = ()=> { return null })
    {
        const alertElem = document.querySelector("#errorAlert");
        if (alertElem.firstChild) alertElem.removeChild(alertElem.firstChild);
        
        alertElem.appendChild(document.createTextNode(messageAlert));
        this.showHtmlElement(alertElem);
        // HtmlManipulation.showHtmlElement(alertElem);
        setTimeout(() => {
            this.hideHtmlElement(alertElem);
            callback();
        }, 6000);
    }

    static showHtmlElement(element)
    {
        element.classList.remove("noVisible");
        element.classList.add("visible");
    }

    static hideHtmlElement(element) {
        element.classList.remove("visible");
        element.classList.add("noVisible");
    }

}
