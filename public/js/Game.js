class Game {
    
    static async init(jsonGameObject) {
        console.log("empieza el juego")
        const question = await this.getNewQuestion(jsonGameObject.id_game);
        
    }

    static async sendAnswer() {
        let answer = undefined;
        if (document.getElementById("answerA").checked) answer = "A"
        else if (document.getElementById("answerB").checked) answer = "B"
        else if (document.getElementById("answerC").checked) answer = "C"
        else if (document.getElementById("answerD").checked) answer = "D"
        
        const idGame = JSON.parse(sessionStorage.getItem("actual_game")).id_game;
        const resp = await (await fetch(`/answer_question_id_game_${idGame}_answer_${answer}`)).json();

        if (resp.status){ 
            // save the updated game object:
            sessionStorage.setItem("actual_game", JSON.stringify(resp.game));
            // and refrest data in Html:
            HtmlManipulation.refreshDataGame(resp.game);
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

//Flask: return json.dumps({ "status": True, "result": result, "game": new_game }, ensure_ascii= False)

    static async getNewQuestion(idGame) {
        const resp = await (await fetch(`/get_new_question_id_${idGame}`)).json();
        if (resp.status) {
            return resp.question;
        } else {
            HtmlManipulation.showErrorAlert(resp.message);
        }
    }
    
}