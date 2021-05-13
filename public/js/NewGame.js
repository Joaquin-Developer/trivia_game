
const inputUsername = document.querySelector("#inputUsername");
const btnNewGame = document.querySelector("#btnNewGame")
const divNewGame = document.querySelector("#new_game")

addEventListener('load', (event) => {

    if ((sessionStorage.getItem("actual_game")) != null || 
        sessionStorage.getItem("actual_username") != null)
    {
        HtmlManipulation.hideHtmlElement(document.querySelector("#new_game"))
        HtmlManipulation.showHtmlElement(document.querySelector("#game"))
        const actualGame = JSON.parse(sessionStorage.getItem("actual_game"));
        const actualQuestion = JSON.parse(sessionStorage.getItem("actual_question"));
        HtmlManipulation.refreshDataGame(actualGame, actualQuestion);
    }
});

btnNewGame.addEventListener('click', async (event) => {
    event.preventDefault();
    if (inputUsername.value) {
        const resp = await (await fetch(`/new_game_${inputUsername.value}_topic_${selectTopicGame.value}`)).json();

        if (resp.status) {  // todo ok
            HtmlManipulation.showSuccessAlert(resp.message, async () => {
                await newGame(resp.game, inputUsername.value);
            });
        } else {
            HtmlManipulation.showErrorAlert(resp.message)
        }

    } else {
        HtmlManipulation.showErrorAlert("Error: Debe ingresar un nombre de usuario", () => {
            clearInputUsername();
        });
        
    }
});

function saveNewGameJSON(jsonGameObject, username) {
    sessionStorage.setItem("actual_game", JSON.stringify(jsonGameObject));
    sessionStorage.setItem("actual_username", username)
}

const clearInputUsername = ()=> { inputUsername.value = ""; }

async function newGame(jsonGameObject, username) {
    saveNewGameJSON(jsonGameObject, username);
    clearInputUsername();

    HtmlManipulation.hideHtmlElement(divNewGame);
    HtmlManipulation.showHtmlElement(document.querySelector("#game"))
    await Game.init();
}

document.querySelector("#btnAnswer").addEventListener("click", async (event) => {
    event.preventDefault();
    await Game.sendAnswer();
    // const newQuestion = await Game.getNewQuestion();
    // console.log(newQuestion);
    // HtmlManipulation.refreshDataGame(newQuestion);

});