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
        while (element.firstChild)
        {
            element.removeChild(element.firstChild);
        }
    }

    static changeChild(element, text)
    {
        this.removeChilds(element);
        element.appendChild(document.createTextNode(text));
    }

    static refreshDataGame(gameData, newQuestionData)
    {
        // console.log(gameData);
        const numberRound = document.getElementById("game_data_number_round");
        const totalCorrects = document.getElementById('game_data_corrects');
        const totalErrors = document.getElementById('game_data_errors');
        const question = document.getElementById('question');
        const answerA = document.getElementsByClassName("form-check-label")[0]
        const answerB = document.getElementsByClassName("form-check-label")[1]
        const answerC = document.getElementsByClassName("form-check-label")[2]
        const answerD = document.getElementsByClassName("form-check-label")[3]

        this.changeChild(numberRound, gameData.current_round)
        this.changeChild(totalCorrects, gameData.total_correct)
        this.changeChild(totalErrors, gameData.total_errors)
        this.changeChild(question, newQuestionData.question)
        this.changeChild(answerA, newQuestionData.answers[0])
        this.changeChild(answerB, newQuestionData.answers[1])
        this.changeChild(answerC, newQuestionData.answers[2])
        this.changeChild(answerD, newQuestionData.answers[3])
        
    }
    // 'status': True,
    //         'id_question': send_question.get("id_question"),
    //         'question': send_question.get("question"),
    //         'answers': send_question.get("answers")
    // obj = {current_round: 1, id_game: 1, topic_game: "matematicas",
    // total_correct: null, total_errors: null, username: "joaquin"}

}
