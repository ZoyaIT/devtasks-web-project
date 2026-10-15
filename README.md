------------------DevTasks------------------- El projecte DevTasks és una aplicació web senzilla de gestió de tasques. L'aplicació permet: • crear tasques; • marcar-les com a completades; • eliminar-les; • filtrar-les; • visualitzar estadístiques; • persistir les dades mitjançant localStorage. El projecte s'ha desenvolupat utilitzant: • HTML • CSS • JavaScript • npm • Vitest ---------------Instal·lació les dependències.----------------

javaScript/Node.js: Listed in package.json

npm install

------------Tests------------ npm test

---------GitHub Actions----------- CI de Tests GitHub Pages Dependabot (dependabot.yml) .github/workflows/ci.yml

-------------Pull Requests--------------- [Branca main] ──> [Crear Branca] ──> [Commits] ──> [Obrir PR] ──> [Tests & Review] ──> [Merge a main]

-------------Deploy--------- https://zoyait.github.io/devtasks-web-project

------------Arquitectura------------ ------app.js-------- • Gestió de tasques: Permet als usuaris crear noves tasques vàlides, marcar-les com a completades o eliminar-les de la llista. • Renderització del DOM: Genera i actualitza dinàmicament elements HTML per mostrar la llista de tasques actives al navegador. • Filtratge per estat: Filtra els elements visibles a la pantalla segons el seu estat actual: pendents, completades o totes les tasques. • Estadístiques en temps real: Calcula i mostra a la part inferior els totals actualitzats a l'instant de les tasques pendents, completades i del total. • Persistència de dades: Desa i carrega automàticament la llista de tasques des de l'emmagatzematge local del navegador. ------taskManager.js--------

• Gestió de tarees: Genera objectes estructurats per a cada tarea amb un identificador únic basat en el temps, títol, descripció i estat inicial pendent. • Validació segura: Comprueba de forma estricta que els dades rebuts no sean nuls i que contenen un títol de text vàlid que no estigui buit. • Filtrado de dades: Classificació de col·leccions de tareas en subconjuntos específics segons el seu estat actual (completades, pendents o el llistat total). • Mètriques operatives: Calcula en temps real les estadístiques numèriques globals del projecte indicant el total d'elements, completats i pendents. • Arquitectura híbrida: Permet exportar la lògica de negoci purament matemàtica per executar proves amb Jest (Node.js) sense trencar la seva compatibilitat nativa en navegadors. --------tests/taskManger.test.js----------- • Garantia estructural: Verifica que el constructor generi correctament la identitat de cada tasca validant camps obligatoris, texts nets i el seu estat inactiu inicial. • Control d'entrades: Avalua la fiabilitat del validador rebutjant objectes buits, valors nuls o títols que només tinguin espais en blanc. • Segmentació de col·leccions: Confirma la precisió matemàtica dels filtres en aïllar vectors de tasques completades dels elements marcats com a pendents. • Integritat de mètriques: Assegura que els comptadors globals facin sumes i restes correctes sobre els conjunts de dades segons l'estat dels seus components. • Blindatge davant d'excepcions: Testeja casos límit per blindar el sistema davant de comportaments anòmals com el processament de llistes de dades buides o paràmetres desconeguts.

