let elementi = ["<img height ='70px' width='70px'src='img/c.png'>","<img height ='70px' width='70px'src='img/p.png'>","<img height ='70px' width='70px'src='img/v.png'>", "<img height ='70px' width='70px'src='img/s.png'>","<img height ='70px' width='70px'src='img/r.png'>"];

var matrice = [[], [], [], [], []];

var row1, row2, col1, col2;

//contatori per la generazione della matrice
let numero, numero_precedente;
let carta, secco, plastica, vetro;

let cnt = 0;

//Controlli per il radiattivo
let dropsFatti = 0
let dropTraIRad = 4
let rAttivi = false

//variabili per cercare le combo
let cons_riga = 0;
let cons_colonna = 0;

//Debug
let DevOptions = true
let GeneraDropButton = document.getElementById("GeneraDropButton")
let GeneraDropInputRighe = document.getElementById("GeneraDropInputRighe")
let GeneraDropInputColonne = document.getElementById("GeneraDropInputColonne")
let RadSwitchInput = document.getElementById("RadSwitchInput")
let RadSwitchText = document.getElementById("RadSwitchText")


//funzione per generare il contenuto dei div della matrice
function generaNumero(i, j, max) {

    //Rendi possibile la caduta di un rad
    if(rAttivi && dropsFatti > dropTraIRad){
        max = 5;
        dropsFatti = 0;
    }
    else{
        max = 4;
    }

    let n = Math.floor(Math.random() * max); // Genera un numero casuale da 0 a 4

    //Controlla i numeri alla colonna 0
    if (i >= 1 && j == 0) {
        while (n == matrice[i - 1][j]) {
            n = Math.floor(Math.random() * max);
        }
    }

    //Controlla i numeri alla riga 0
    if (j >= 1 && i == 0) {
        while (n == matrice[i][j - 1]) {
            n = Math.floor(Math.random() * max);
        }
    }

    //Controlla i numeri negli altri casi
    if (j >= 1 && i >= 1) {
        while (n == matrice[i][j - 1] || n == matrice[i - 1][j]) {
            n = Math.floor(Math.random() * max);
        }
    }

    return (n)
}

function genera_drop(righe, colonne) {
    let max = 4 //Massimo numero generabile
    
    for (let i = 0; i < righe; i++) {
        for (let j = 0; j < colonne; j++) {
            matrice[i][j] = generaNumero(i, j, max)

            //Counter per i drop radiattivi
            if(rAttivi){
                dropsFatti++
            }
        }
    }
    console.log(matrice);
}

genera_drop(5, 5);

function div_transform(){

}

//variabili per lo scabio delle celle
let prima_cella = null;
let seconda_cella = null;

function swap_div() {
    if (prima_cella && seconda_cella) {
        // Effettua lo scambio solo se entrambi i div sono stati cliccati
        console.log(prima_cella.textContent);
        console.log(seconda_cella.textContent);
        matrice[row2][col2] = prima_cella.innerHTML;
        matrice[row1][col1] = seconda_cella.innerHTML;

        console.log(matrice);


        const temp = prima_cella.innerHTML;
        prima_cella.innerHTML = seconda_cella.innerHTML;
        seconda_cella.innerHTML = temp;

        cerca(row2, col2, matrice);
        console.log("Combo riga = " + cons_riga + "Combo colonna = " + cons_colonna)
        if (cons_riga == 3) {
            console.log('combo 3 riga');
            triplo_orizzontale(matrice);
        }
        else if (cons_colonna == 3) {
            console.log('combo 3 colonna');
            triplo_verticale();
        }
        else if (cons_riga == 4) {
            console.log('combo 4 riga');
            quaduplo_orizzontale();
        }
        else if (cons_colonna == 4) {
            console.log('combo 4 colonna');
            quaduplo_verticale();
        }
        else if (cons_riga == 5) {
            console.log('combo 5 riga');
            quintuplo_orizzontale();
        }
        else if (cons_colonna == 5) {
            console.log('combo 5 colonna');
            quintuplo_verticale();
        }
        else {
            setTimeout(() => {
                scambio_perdita();
            }, 500);
        }


        setTimeout(() => {
            prima_cella.style.backgroundColor = '';
            seconda_cella.style.backgroundColor = '';

            // Resetta le variabili delle coordinate
            prima_cella = null;
            seconda_cella = null;
        }, 500);
    }
}


let divs = container.getElementsByTagName('div');

console.log(divs);

//funzione per stampare i div in base ai contenuti della matrice
function stampa_matrice(matrice) {

    console.log("Matrice nella" + matrice);
    let container = document.getElementById("container");
    container.innerHTML = "";
    for (let i = 0; i < matrice.length; i++) {
        for (let j = 0; j < matrice[i].length; j++) {
            // creazione del div
            let div = document.createElement("div");
            div.className = "matrice-div";
            div.innerHTML = elementi[matrice[i][j]];
            matrice[i][j] = div.innerHTML;

            if (matrice[i][j] == "c.png") {
                div.style.backgroundColor = 'lightyellow'
            }
            if (matrice[i][j] == "p.png") {
                div.style.backgroundColor = 'lightblue'
            }
            if (matrice[i][j] == "v.png") {
                div.style.backgroundColor = 'lightgreen'
            }
            if (matrice[i][j] == "s.png") {
                div.style.backgroundColor = 'purple'
            }

            //assegnazione della funzione click ai div
            //gestione di quali div vengono cliccati
            div.addEventListener('click', function () {
                if (!prima_cella) {
                    let index = Array.from(divs).indexOf(this);

                    // Calcola la riga e la colonna corrispondenti all'indice
                    row1 = Math.floor(index / 5);
                    col1 = index % 5;
                    console.log("prima riga" + row1 + "prima colonna" + col1);

                    console.log(div);

                    // Se il primo div non è stato cliccato, memorizza il riferimento
                    prima_cella = div;
                    prima_cella.style.backgroundColor = 'lightgreen'; // Opzionale: evidenzia il primo div cliccato
                } else if (prima_cella === div) {
                    // Se il primo div è cliccato di nuovo, deselezionalo
                    prima_cella.style.backgroundColor = '';
                    prima_cella = null;
                } else {
                    let index = Array.from(divs).indexOf(this);

                    // Calcola la riga e la colonna corrispondenti all'indice
                    row2 = Math.floor(index / 5);
                    col2 = index % 5;
                    console.log("seconda riga" + row2 + "seconda colonna" + col2);

                    console.log(div);

                    // Se il secondo div è cliccato, memorizza il riferimento e scambia
                    seconda_cella = div;
                    seconda_cella.style.backgroundColor = 'lightgreen'; // Opzionale: evidenzia il secondo div cliccato
                    if (verifica_spostamento(row1, col1, row2, col2)) {
                        swap_div();
                    } else {
                        setTimeout(() => {
                            prima_cella.style.backgroundColor = '';
                            seconda_cella.style.backgroundColor = '';

                            // Resetta le variabili delle coordinate
                            prima_cella = null;
                            seconda_cella = null;
                        }, 500);
                    }
                }
            });


            container.appendChild(div);
        }
    }
}

stampa_matrice(matrice);

function stampa_matrice_secondo(matrice) {

    console.log("Matrice nella" + matrice);
    let container = document.getElementById("container");
    container.innerHTML = "";
    for (let i = 0; i < matrice.length; i++) {
        for (let j = 0; j < matrice[i].length; j++) {
            // creazione del div
            let div = document.createElement("div");
            div.className = "matrice-div";
            div.innerHTML = matrice[i][j];

            //assegnazione della funzione click ai div
            //gestione di quali div vengono cliccati
            div.addEventListener('click', function () {
                if (!prima_cella) {
                    let index = Array.from(divs).indexOf(this);

                    // Calcola la riga e la colonna corrispondenti all'indice
                    row1 = Math.floor(index / 5);
                    col1 = index % 5;
                    console.log("prima riga" + row1 + "prima colonna" + col1);

                    console.log(div);

                    // Se il primo div non è stato cliccato, memorizza il riferimento
                    prima_cella = div;
                    prima_cella.style.backgroundColor = 'lightgreen'; // Opzionale: evidenzia il primo div cliccato
                } else if (prima_cella === div) {
                    // Se il primo div è cliccato di nuovo, deselezionalo
                    prima_cella.style.backgroundColor = '';
                    prima_cella = null;
                } else {
                    let index = Array.from(divs).indexOf(this);

                    // Calcola la riga e la colonna corrispondenti all'indice
                    row2 = Math.floor(index / 5);
                    col2 = index % 5;
                    console.log("seconda riga" + row2 + "seconda colonna" + col2);

                    console.log(div);

                    // Se il secondo div è cliccato, memorizza il riferimento e scambia
                    seconda_cella = div;
                    seconda_cella.style.backgroundColor = 'lightgreen'; // Opzionale: evidenzia il secondo div cliccato
                    if (verifica_spostamento(row1, col1, row2, col2)) {
                        swap_div();
                    } else {
                        setTimeout(() => {
                            prima_cella.style.backgroundColor = '';
                            seconda_cella.style.backgroundColor = '';

                            // Resetta le variabili delle coordinate
                            prima_cella = null;
                            seconda_cella = null;
                        }, 500);
                    }
                }
            });


            container.appendChild(div);
        }
    }
}

function verifica_spostamento(row1, col1, row2, col2) {
    if (row2 == row1 - 1 && col1 == col2) {
        return true;
    }
    else if (row2 == row1 + 1 && col1 == col2) {
        return true;
    }
    else if (row2 == row1 && col2 == col1 + 1) {
        return true;
    }
    else if (row2 == row1 && col2 == col1 - 1) {
        return true;
    }
    else {
        return false;
    }
}



//funzione per controllare se ci sono cons
function verifica_consecutivi(matrice) {

    for (j = 0; j < matrice.length; j++) {
        for (i = 0; i < matrice.length - 1; i++) {
            do {
                numero = Math.floor(Math.random() * 4);
                matrice[i][j] = elementi[numero];
            } while (
                matrice[i + 1][j] === matrice[i][j]
            );

        }
    }

    for (i = 0; i < matrice.length; i++) {
        for (j = 0; j < matrice.length - 1; j++) {
            do {
                numero = Math.floor(Math.random() * 4);
                matrice[i][j] = elementi[numero];
            } while (
                matrice[i][j + 1] === matrice[i][j]
            );

        }
    }
}



var dati_riga;
var dati_colonna;


//funzione per cercare se sono presenti combo da tre, quattro e cinque

function cerca(riga, colonna, matrice) {
    //variabili per la posizione degli elementi consecutivi
    dati_riga = {
        cons_riga: 1,
        posizione: []
    };

    dati_colonna = {
        cons_colonna: 1,
        posizione: []
    };

    cons_colonna = 1;
    cons_riga = 1;

    console.log(riga);
    console.log(colonna);

    for (let m = 0; m < matrice.length - 1; m++) {
        if (matrice[m][colonna] === matrice[m + 1][colonna]) {
            cons_colonna++;
            dati_colonna.cons_colonna++;
            dati_colonna.posizione.push({ riga: m, colonna });
        }
        else {
            if (cons_colonna != 1) {
                if(cons_colonna >= 3){
                    dati_colonna.posizione.push({ riga: m, colonna });
                }
                break;
            }
        }     
    }

    

    for (let l = 0; l < matrice.length - 1; l++) {
        if (matrice[riga][l + 1] === matrice[riga][l]) {
            cons_riga++;
            dati_riga.cons_riga++;
            dati_riga.posizione.push({ riga, colonna: l });
        }
        else {
            if (cons_riga != 1) {
                if(cons_riga >= 3){
                    dati_riga.posizione.push({ riga, colonna : l});
                }
                break;
            }
        }
    }

    

    console.log(dati_colonna);
    console.log(dati_riga);


}

function scambio_perdita(){
    matrice[row2][col2] = prima_cella.innerHTML;
    matrice[row1][col1] = seconda_cella.innerHTML;

    console.log(matrice);


    const temp = prima_cella.innerHTML;
    prima_cella.innerHTML = seconda_cella.innerHTML;
    seconda_cella.innerHTML = temp;
}

//funzione per implementare la discesa degli elementi in caso verticale
function triplo_verticale() {
    dati_colonna.posizione.reverse();
    dati_colonna.posizione.forEach(function(element) {
        console.log("Valore riga: " + element.riga + ", Valore colonna: " + element.colonna);
        for(i = element.riga; i > 0; i--){
            matrice[i][element.colonna] = matrice[i -1][element.colonna];
        } 
        matrice[i][element.colonna] = elementi[generaNumero(0,element.colonna)]; 
    });   
}

//funzione per implementare la discesa degli elementi in caso orizzontale
function triplo_orizzontale(matrice) {
    dati_riga.posizione.forEach(function(element) {
        console.log("Valore riga: " + element.riga + ", Valore colonna: " + element.colonna);
        for(i = element.riga; i > 0; i--){
                matrice[i][element.colonna] = matrice[i -1][element.colonna];
        }  
        matrice[0][element.colonna] = elementi[generaNumero(0,element.colonna)]; 
        
    });
    console.log(matrice);
    console.log("matrice dopo il triplo" + matrice);

    stampa_matrice_secondo(matrice);
 

}

//funzione per implementare la discesa degli elementi in caso verticale
function quaduplo_verticale() {

}

//funzione per implementare la discesa degli elementi in caso orizzontale
function quaduplo_orizzontale() {
    dati_riga.posizione.forEach(function(element) {
        console.log("Valore riga: " + element.riga + ", Valore colonna: " + element.colonna);
        for(i = element.riga; i > 0; i--){
                matrice[i][element.colonna] = matrice[i -1][element.colonna];
        }  
        matrice[0][element.colonna] = elementi[generaNumero(0,element.colonna)]; 
    });
}

//funzione per implementare la discesa degli elementi in caso verticale
function quintuplo_verticale() {

}

//funzione per implementare la discesa degli elementi in caso orizzontale
function quintuplo_orizzontale() {
    dati_riga.posizione.forEach(function(element) {
        console.log("Valore riga: " + element.riga + ", Valore colonna: " + element.colonna);
        for(i = element.riga; i > 0; i--){
                matrice[i][element.colonna] = matrice[i -1][element.colonna];
        }  
        matrice[0][element.colonna] = elementi[generaNumero(0,element.colonna)]; 
    });
}

//Debug

//Prova stampa matrice
GeneraDropButton.addEventListener("click", function(){
    if(GeneraDropInputRighe.value > 0 && GeneraDropInputRighe.value < 6 && GeneraDropInputColonne.value > 0 && GeneraDropInputColonne.value < 6){
        genera_drop(GeneraDropInputRighe.value, GeneraDropInputColonne.value);
        stampa_matrice(matrice);
    }
})

//Switch rad
RadSwitchInput.addEventListener("click", function(){
    if(rAttivi == true){
        rAttivi = false
    }
    else{
        rAttivi = true
    }
    RadSwitchText.innerText="Rad: " + rAttivi
    console.log(rAttivi)
})
