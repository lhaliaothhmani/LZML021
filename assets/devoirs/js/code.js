window.onload = function() {
  let fileInput = document.getElementById('fileInput');
  let fileDisplayArea = document.getElementById('fileDisplayArea');

  // On "écoute" si le fichier donné a été modifié.
  // Si on a donné un nouveau fichier, on essaie de le lire.
  fileInput.addEventListener('change', function(e) {
      // Dans le HTML (ligne 22), fileInput est un élément de tag "input" avec un attribut type="file".
      // On peut récupérer les fichiers données avec le champs ".files" au niveau du javascript.
      // On peut potentiellement donner plusieurs fichiers,
      // mais ici on n'en lit qu'un seul, le premier, donc indice 0.
      let file = fileInput.files[0];
      // on utilise cette expression régulière pour vérifier qu'on a bien un fichier texte.
      let textType = new RegExp("text.*");

      if (file.type.match(textType)) { // on vérifie qu'on a bien un fichier texte
          // lecture du fichier. D'abord, on crée un objet qui sait lire un fichier.
          var reader = new FileReader();

          // on dit au lecteur de fichier de placer le résultat de la lecture
          // dans la zone d'affichage du texte.
          reader.onload = function(e) {
              fileDisplayArea.innerText = reader.result;
          }

          // on lit concrètement le fichier.
          // Cette lecture lancera automatiquement la fonction "onload" juste au-dessus.
          reader.readAsText(file);    

          document.getElementById("logger").innerHTML = '<span class="infolog">Fichier chargé avec succès</span>';
      } else { // pas un fichier texte : message d'erreur.
          fileDisplayArea.innerText = "";
          document.getElementById("logger").innerHTML = '<span class="errorlog">Type de fichier non supporté !</span>';
      }
  });
}


function sort_words() {

  // récupération du contenu du fichier texte
  const output = document.getElementById("fileDisplayArea").innerText;
  
  //balise pour écriture des résultats
  let result =  document.getElementById("page-analysis");
  
  //récupération des délimiteurs de mots
  let delimiters = document.getElementById("delimID").value;
  
  
  //Corrections de la liste de délimiteurs pour éviter des erreurs dans l'expression régulière
  delim2 = delimiters.replace("-", "\\-") ; //échappement du tiret, comme il entouré d'autres caractères iol sera considéré comme marquant un intervalle comme dans [4-9]
  delim2 = delim2.replace("[", "\\[") ; // échappement des crochets ouverts
  delim2 = delim2.replace("]", "\\]") ; // échappement des crochets fermants
  delim2 = delim2 + "—"; //facultatif: ajout des tirets longs
  delim2 = delim2 + "\\s" ;//a jout de tous les symboles d'espacement
  
  
  //Construction de l'expression régulière pour découper les mots
  
  let word_regex = new RegExp ( "[" + //crochet ouvert pour signifier l'alternative 
                              delim2 +                      
                              "]" , 'g'); // pour enlever plusieurs délimiteurs 
  
  
  
  all_words = output.split(word_regex);
  
  cleaned_words = all_words.filter(x => x.trim() != '') // pour ne garder que les tokens non vides 
  
  let dic_length={};
  
  for (let word of cleaned_words){
      if (word.length in dic_length){
          dic_length[word.length]["freq"] += 1;
          if (dic_length[word.length] ["elements"].includes(word.toLowerCase())) {
             
          }
          else{
              dic_length[word.length] ["elements"].push(word.toLowerCase());
          }
        
      }
      else {
           dic_length[word.length]= {}
           dic_length[word.length]["freq"] = 1;
           dic_length[word.length] ["elements"]= [word.toLowerCase()]   ;   
  
      }
  }
  
  let table = document.createElement("table");
  table.style.margin = "auto";
  let head = table.appendChild(document.createElement("tr"));
  head.innerHTML = "<th>Nombre de caractères</th><th>Nombre d'occurrences</th><th>Formes(s) unique(s)</th>";
  
  ordered = Object.keys(dic_length).sort((a, b) => a - b);
  
  for (let elem of ordered){
      let row = table.appendChild(document.createElement("tr"));
      let cell_length = row.appendChild(document.createElement("td"));
      let cell_total = row.appendChild(document.createElement("td"));
      let cell_details = row.appendChild(document.createElement("td"));
      cell_length.innerHTML = elem;
      cell_total.innerHTML = dic_length[elem]["freq"];
      cell_details.innerHTML = dic_length[elem]["elements"].sort().join(', ') +' ('+ dic_length[elem]["elements"].length +')';
      
  
  }
  
  result.innerHTML =`<p>Le  texte contient au total ${cleaned_words.length} mots.<p/>`;
  result.append(table);
  
  }
// fonction pour prévenir qu'aucun fichier n'est sélectionné//
  function messagealert(){
	alert("Aucun fichier sélectionné");
}
  //on ajoute une documentation des différentes fonctionnalités de la page 
function aide() {
	var div = document.getElementById("messageaide");
	var std = document.getElementById("textbutton").innerHTML;
  		if (div.style.display === "none") {
   			div.style.display = "block";

   			// remplacement du mot "Afficher" par "Masquer" lorsque l'aide est ouverte avec une boucle if else//
	  		var txt = std.replace("Afficher","Masquer");
	  		document.getElementById("textbutton").innerHTML = txt;
}

		else {
			div.style.display = "none";
			var txt = std.replace("Masquer","Afficher");
	    	document.getElementById("textbutton").innerHTML = txt;
  }
}

function graphiqueBarres() {
// on rajoute une fonction pour afficher un graphique en barre des résultats avec la librairie chartist 
let size_chars = [];

for (let elem of ordered) {size_chars.push(dic_length[elem]);}

    let data = {
        labels: [ordered],
        series: [[elem]] 
    };

    let options = {
        width: 800,
        height: 450,
        horizontalBars: true
    };

    document.getElementById('page-analysis').innerHTML = '';
    new Chartist.Bar("#page-analysis", data, options);
}




  
