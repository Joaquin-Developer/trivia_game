class Alerts 
{
    constructor() { }
    
    static showSuccessAlert()
    {
        const alertElem = document.querySelector("#successAlert");
        if (alertElem.firstChild) alertElem.removeChild(alertElem.firstChild);
        
        alertElem.appendChild(document.createTextNode(textAlert));
        HtmlManipulation.showHtmlElement(alertElem);
        setTimeout(() => {
            hideHtmlElement(alertElem);
        }, 6000);
    }

    static showErrorAlert()
    {
        const alertElem = document.querySelector("#errorAlert");
        if (alertElem.firstChild) alertElem.removeChild(alertElem.firstChild);
        
        alertElem.appendChild(document.createTextNode(textAlert));
        HtmlManipulation.showHtmlElement(alertElem);
        setTimeout(() => {
            hideHtmlElement(alertElem);
        }, 6000);
    }
}

class HtmlManipulation
{
    constructor() { }

    static showHtmlElement(element)
    {
        element.classList.remove("none");
        element.classList.add("block");
    }
}