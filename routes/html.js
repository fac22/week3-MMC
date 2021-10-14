'use strict';

function htmlBuilder(pageTitle, content) {
  return `
<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Mouldy Potatoes 🥔 Film Reviews - Potatoes know best">
    <link rel="stylesheet" href="styles.css">
    <title>Mouldy Potatoes 🥔 ${pageTitle}</title>
</head>
<body>
<main class="flex flex--center flex--column">
    ${content}
    </main>
</body>
</html>`;
}

module.exports = { htmlBuilder };
