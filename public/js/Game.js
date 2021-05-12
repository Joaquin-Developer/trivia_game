class Game {
    
    static async init(jsonGameObject) {
        console.log("empieza el juego")
        const question = await this.getNewQuestion(jsonGameObject.id_game);

    }

    static sendAnswer(idGame, idQuestion, answer) {
        // fetch().
    }

    static async getNewQuestion(idGame) {
        const resp = await (await fetch(`/get_new_question_id_${idGame}`)).json();
        if (resp.status) {
            return resp.question;
        } else {
            HtmlManipulation.showErrorAlert(resp.message);
        }
    }
    
}