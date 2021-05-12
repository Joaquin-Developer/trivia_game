class Game {
    
    static init() {
        console.log("empieza el juego")
    }

    static sendAnswer(idGame, idQuestion, answer) {
        // fetch()
    }

    static async getNewQuestion(idGame) {
        const resp = await (await fetch(`/get_new_question_id_${idGame}`)).json();
        if (resp.status) {
            return resp.question;
        } else {
            HtmlManipulation.showErrorAlert(resp.message);
        }
    }

    static refreshDataGame() {
        const x = document.getElementById("game_data_number_round");
        

    }

    


}