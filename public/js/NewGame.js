
const btnNewGame = document.querySelector("#btnNewGame")

btnNewGame.addEventListener('click', async (event) => {
    event.preventDefault();
    const inputUsername = document.querySelector("#inputUsername");
    if (inputUsername.value) {
        const resp = await (await fetch(`/new_game_${inputUsername.value}_topic_${selectTopicGame.value}`)).json();

        if (resp.status) {  // todo ok
            HtmlManipulation.showSuccessAlert(resp.message, () => {
                inputUsername.value = "";
                newGame();
            });
            saveNewGameJSON(resp.game, inputUsername.value);
        } else {
            HtmlManipulation.showErrorAlert(resp.message)
        }

    } else {
        HtmlManipulation.showErrorAlert("Error: Debe ingresar un nombre de usuario");
    }
});

function saveNewGameJSON(jsonObject, username) {
    sessionStorage.setItem("actual_game", JSON.stringify(jsonObject));
    sessionStorage.setItem("actual_username", JSON.stringify(username))
}

function newGame() {
    console.log("Bienvenido al juego")
}

