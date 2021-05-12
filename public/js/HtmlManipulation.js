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
        }, 4000);
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
        }, 5000);
    }

    static showHtmlElement(element)
    {
        element.classList.remove("noVisible");
        element.classList.add("visible");
    }

    static hideHtmlElement(element)
    {
        element.classList.remove("visible");
        element.classList.add("noVisible");
    }

    static removeChilds(element)
    {
        element.removeChild(element.firstChild);
    }

    static changeChild(element, text)
    {
        this.removeChilds(element);
        element.appendChild(document.createTextNode(text));
    }

    static refreshDataGame(data)
    {
        const numberRound = document.getElementById("game_data_number_round");
        const totalCorrects = document.getElementById('game_data_corrects');
        const totalErrors = document.getElementById('game_data_errors');
        const question = document.getElementById('question');
        const answerA = document.getElementById('answerA');
        const answerB = document.getElementById('answerB');
        const answerC = document.getElementById('answerC');
        const answerD = document.getElementById('answerD');

        this.changeChild(numberRound, data.current_round)
        this.changeChild(totalCorrects, data.total_correct)
        this.changeChild(totalErrors, data.total_errors)
        this.changeChild(question, data.new_question.question)
        this.changeChild(answerA, data.new_question.answerA)
        this.changeChild(answerB, data.new_question.answerB)
        this.changeChild(answerC, data.new_question.answerC)
        this.changeChild(answerD, data.new_question.answerD)
        
    }
    // obj = {current_round: 1, id_game: 1, topic_game: "matematicas",
    // total_correct: null, total_errors: null, username: "joaquin"}

}
