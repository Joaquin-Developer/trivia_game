class Game {
    
    static async init() {
        console.log("empieza el juego")
        const question = await this.getNewQuestion();
        HtmlManipulation.refreshDataGame(JSON.parse(sessionStorage.getItem("actual_game")), question);
    }

    static async sendAnswer() {
        let answer = undefined;
        if (document.getElementById("answerA").checked) answer = "A"
        else if (document.getElementById("answerB").checked) answer = "B"
        else if (document.getElementById("answerC").checked) answer = "C"
        else if (document.getElementById("answerD").checked) answer = "D"
        
        const resp = await (await fetch(`/answer_question_id_game_${this.getIdGame()}_answer_${answer}`)).json();
        console.log(resp)
        
        if (resp.status){ 
            // save the updated game object:
            sessionStorage.setItem("actual_game", JSON.stringify(resp.game));
            // and refrest data in Html:
            const newQuestion = await this.getNewQuestion();
            HtmlManipulation.refreshDataGame(resp.game, newQuestion);

            if (resp.result) {
                HtmlManipulation.showSuccessAlert("CORRECTO!");
            } else {
                HtmlManipulation.showErrorAlert("EQUIVOCADO!");
            }

        } else {
            // Errors in API
            HtmlManipulation.showErrorAlert(resp.message);
        }
    }
    //Flask: ({ "status": True, "result": result, "game": new_game }, ensure_ascii= False)

    static async getNewQuestion() {

        const resp = await (await fetch(`/get_new_question_id_${this.getIdGame()}`)).json();
        console.log("nueva question");
        console.log(resp)

        if (resp.status) {
            // return resp.question;
            sessionStorage.setItem("actual_question", JSON.stringify(resp));
            return resp;
        } else {
            HtmlManipulation.showErrorAlert(resp.message);
        }
    }

    static getIdGame() {
        return JSON.parse(sessionStorage.getItem("actual_game")).id_game;
    }
    
}