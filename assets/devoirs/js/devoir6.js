function syllabes(){}
function analyserPoeme(){
     // Récupération du texte du poème
    const poemeTexte = document.getElementById("poeme").value;

    // Tri des mots pour pouvoir les compter puis compte des occurences 
    const mots = poemeTexte.match(/\b\w+\b/g);
    const motsExclus = mots.filter(mot => !["le", "la", "les", "de", "des", "du", "au", "aux", "un", "une", "et", "ou", "est", "à", "je", "tu", "il", "elle", "nous", "vous", "ils", "elles"].includes(mot.toLowerCase()));
    const occurencesMots = motsExclus.reduce((acc, mot) => {
        acc[mot] = (acc[mot] || 0) + 1;
        return acc;
    }, {});
    const motsTries = Object.entries(occurencesMots).sort((a, b) => b[1] - a[1]);
    const dixMotsFrequents = motsTries.slice(0, 10);

    // Calcul de la richesse lexicale
    const richesseLexicale = (Object.keys(occurencesMots).length / motsExclus.length) * 100;

    // Décompte du nombre de phrases
    const nombrePhrases = poemeTexte.split(/[.!?]/).length - 1;

    // Calcul de la longueur moyenne des mots par phrase
    const longueurMoyenneMotParPhrase = motsExclus.length / nombrePhrases;

    // Analyse des strophes
    const strophes = poemeTexte.split("\n\n");
    const nombreTotalStrophes = strophes.length;
    const classificationStrophes = {};
    strophes.forEach((strophe, index) => {
        const nombreVers = strophe.split("\n").length;
        if (classificationStrophes[nombreVers]) {
            classificationStrophes[nombreVers]++;
        } else {
            classificationStrophes[nombreVers] = 1;
        }
    });

    // Analyse des vers
    const vers = poemeTexte.split("\n").filter(line => line.trim() !== "");
    const syllabesParVers = vers.map(vers => syllabes(vers));
    const classificationVers = {};
    syllabesParVers.forEach(syllabes => {
        if (classificationVers[syllabes]) {
            classificationVers[syllabes]++;
        } else {
            classificationVers[syllabes] = 1;
        }
    });



    // Affichage des résultats
    let resultat = "";
    resultat += `<h2>${poemeTexte.split("\n")[0]}</h2>`;
    resultat += `<p>Dix mots les plus fréquents (titre exclu): ${dixMotsFrequents.join(", ")}</p>`;
    resultat += `<p>Richesse lexicale: ${richesseLexicale.toFixed(2)}%</p>`;
    resultat += `<p>Nombre de phrases: ${nombrePhrases}</p>`;
    resultat += `<p>Longueur moyenne des mots par phrase: ${longueurMoyenneMotParPhrase.toFixed(2)}</p>`;
    resultat += `<p>Typologie des strophes: ${classificationStrophes}</p>`;
    resultat += `<p>Typologie des vers: ${classificationStrophes}</p>`;
    document.getElementById("resultats").innerHTML = resultat;
}

