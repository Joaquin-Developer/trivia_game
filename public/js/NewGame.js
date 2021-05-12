
const inputUsername = document.querySelector("#inputUsername");
const btnNewGame = document.querySelector("#btnNewGame")
const divNewGame = document.querySelector("#new_game")

btnNewGame.addEventListener('click', async (event) => {
    event.preventDefault();
    if (inputUsername.value) {
        const resp = await (await fetch(`/new_game_${inputUsername.value}_topic_${selectTopicGame.value}`)).json();

        if (resp.status) {  // todo ok
            HtmlManipulation.showSuccessAlert(resp.message, () => {
                newGame(resp.game, inputUsername.value);
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

function newGame(jsonGameObject, username) {
    saveNewGameJSON(jsonGameObject, username);
    clearInputUsername();

    console.log("Bienvenido al juego")

    HtmlManipulation.hideHtmlElement(divNewGame);
    HtmlManipulation.showHtmlElement(document.querySelector("#game"))

    /**
     * Show div-game ...
     */

}

