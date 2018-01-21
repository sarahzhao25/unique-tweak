const ruleButton = document.getElementById('nav-bar-rules');

ruleButton.addEventListener('click', showModal);

function showModal() {
  $('#rulesModal').modal('show');
}

const resultDiv = document.getElementsByClassName('resultDiv')[0];

resultDiv.addEventListener('onchange', (e) => {
  $('#winModal').modal('show');
})

const learnButton = document.getElementById('nav-bar-learn');

learnButton.addEventListener('click', showLearnModal);

function showLearnModal() {
  $('#learnMoreModal').modal('show');
}
