class HtmlManipulation
{
    static showSuccessAlert()
    {
        const alertElem = document.querySelector("#successAlert");
        if (alertElem.firstChild) alertElem.removeChild(alertElem.firstChild);
        
        alertElem.appendChild(document.createTextNode(textAlert));
        this.showHtmlElement(alertElem);
        // HtmlManipulation.showHtmlElement(alertElem);
        setTimeout(() => {
            hideHtmlElement(alertElem);
        }, 6000);
    }

    static showErrorAlert()
    {
        const alertElem = document.querySelector("#errorAlert");
        if (alertElem.firstChild) alertElem.removeChild(alertElem.firstChild);
        
        alertElem.appendChild(document.createTextNode(textAlert));
        this.showHtmlElement(alertElem);
        // HtmlManipulation.showHtmlElement(alertElem);
        setTimeout(() => {
            hideHtmlElement(alertElem);
        }, 6000);
    }

    static showHtmlElement(element)
    {
        element.classList.remove("none");
        element.classList.add("block");
    }

}
