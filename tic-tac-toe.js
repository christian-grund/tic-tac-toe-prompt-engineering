let fields = [null, null, null, null, null, null, null, null, null];

function init() {
  render();
  generateAnimatedCircleSVG();
  generateAnimatedCrossSVG();
}

function render() {
  const contentDiv = document.getElementById('content');
  const table = document.createElement('table');

  for (let i = 0; i < 3; i++) {
    const row = table.insertRow();

    for (let j = 0; j < 3; j++) {
      const cell = row.insertCell();
      const index = i * 3 + j;
      const fieldValue = fields[index];

      cell.addEventListener('click', () => handleCellClick(cell, index));

      if (fieldValue === 'circle') {
        cell.innerHTML = generateAnimatedCircleSVG();
      } else if (fieldValue === 'cross') {
        cell.innerHTML = generateAnimatedCrossSVG();
      }
    }
  }

  contentDiv.innerHTML = ''; // Leere den Container, um eine Aktualisierung durchzuführen
  contentDiv.appendChild(table);
}

function handleCellClick(cell, index) {
  const currentPlayer =
    fields.filter((field) => field !== null).length % 2 === 0
      ? 'circle'
      : 'cross';

  if (fields[index] === null) {
    fields[index] = currentPlayer;
    cell.innerHTML =
      currentPlayer === 'circle'
        ? generateAnimatedCircleSVG()
        : generateAnimatedCrossSVG();
    cell.removeEventListener('click', () => handleCellClick(cell, index));

    // Hier kannst du weitere Logik hinzufügen, z.B. um den Gewinner zu überprüfen
  }
}

function generateAnimatedCircleSVG() {
  const svgCode = `
      <svg width="70" height="70" xmlns="http://www.w3.org/2000/svg">
        <circle cx="35" cy="35" r="30" fill="none" stroke="#00B0EF" stroke-width="5">
          <animate attributeName="r" values="0;30" dur=".3s" keyTimes="0;1" repeatCount="1" />
        </circle>
      </svg>
    `;
  return svgCode;
}

function generateAnimatedCrossSVG() {
  const crossHTML = `
      <svg width="70" height="70" xmlns="http://www.w3.org/2000/svg">
        <line x1="10" y1="10" x2="60" y2="60" stroke="#FFC000" stroke-width="5">
          <animate attributeName="x2" values="10;60" dur="0.3s" begin="0s" fill="freeze" />
          <animate attributeName="y2" values="10;60" dur="0.3s" begin="0s" fill="freeze" />
        </line>
        <line x1="60" y1="10" x2="10" y2="60" stroke="#FFC000" stroke-width="5">
          <animate attributeName="x2" values="60;10" dur="0.3s" begin="0s" fill="freeze" />
          <animate attributeName="y2" values="10;60" dur="0.3s" begin="0s" fill="freeze" />
        </line>
      </svg>
    `;

  return crossHTML;
}
