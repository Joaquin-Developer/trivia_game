
const btnNewGame = document.querySelector("#btnNewGame")

btnNewGame.addEventListener('click', async (event) => {
    event.preventDefault();
    const inputUsername = document.querySelector("#inputUsername");
    if (inputUsername.value) {
        const resp = await (await fetch(`/new_game_${inputUsername.value}_topic_${selectTopicGame.value}`)).json();
        console.log(resp);
        if (resp.status) {  // todo ok
            
        } else {

        }

    }
});

