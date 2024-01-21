let sportsmen = [];
let playerHero;
let enemyHero;

function createSportsman() {
  const name = document.getElementById("name").value;
  const strength = parseInt(document.getElementById("strength").value);
  const endurance = parseInt(document.getElementById("endurance").value);
  const speed = parseInt(document.getElementById("speed").value);

  playerHero = {
    name,
    attributes: {
      str: strength,
      end: endurance,
      spd: speed,
    },
  };

  sportsmen.push(playerHero);
  document.getElementById("fightButton").removeAttribute("disabled");
}

function fetchRandomOpponent() {
  fetch("https://api-code.practicum-team.ru/heroes")
    .then((response) => response.json())
    .then((data) => {
      const randomEnemy = data[Math.floor(Math.random() * data.length)];
      enemyHero = {
        name: randomEnemy.title,
        attributes: {
          str: randomEnemy.str,
          end: randomEnemy.int,
          spd: randomEnemy.agi,
        },
      };

      displayOpponent();
    })
    .catch((error) => console.error("Error fetching random opponent:", error));
}

function displayOpponent() {
  const opponentCard = document.getElementById("opponentCard");
  opponentCard.innerHTML = `
        <p>Имя: ${enemyHero.name}</p>
        <p>Сила: ${enemyHero.attributes.str}</p>
        <p>Ловкость: ${enemyHero.attributes.end}</p>
        <p>Скорость: ${enemyHero.attributes.spd}</p>
    `;
}

function fight() {
  const userAvg =
    (playerHero.attributes.str +
      playerHero.attributes.end +
      playerHero.attributes.spd) /
    3;
  const enemyAvg =
    (enemyHero.attributes.str +
      enemyHero.attributes.end +
      enemyHero.attributes.spd) /
    3;

  const result = `Результат: Вы ${
    userAvg > enemyAvg 
      ? "победили и доказали всем своё превосходство"
      : "проиграли, противник оказался сильнее.."
  }!`;

  const resultDiv = document.getElementById("result");
  resultDiv.innerText = result;
  console.log(result);
}

// У Семёна найдётся всё - даже ошибки в коде.
