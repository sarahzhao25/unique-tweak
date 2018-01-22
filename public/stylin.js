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

const nameButton = document.getElementById('nav-bar-name');

nameButton.addEventListener('click', () => {
  $('#nameModal').modal('show');
})

const input = document.getElementById('submitNameInput');

input.addEventListener('keyup', (e) => {
  if (e.keyCode === 13) {
    $('#nameModal').modal('hide');
  }
})

let sidebarButton = document.getElementById('nav-bar-sidebar');

// sidebarButton.addEventListener('click', () => {
//   $('.ui.vertical').sidebar({overlay: true}).sidebar('toggle');
// })
