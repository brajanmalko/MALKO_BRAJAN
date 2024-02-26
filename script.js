let elementi = ["c.png","p.png","v.png","s.png","r.png","pdr.png","a.png","animazione1.gif","animazione.gif"];

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

//Contatori per il numero di elementi eliminati
let numero_carta = 0;
let numero_plastica = 0;
let numero_vetro = 0;
let numero_secco = 0;

//Contatore dei punti
let punti_totale = 0;
const punti_carta = 2;
const punti_plastica = 3;
const punti_vetro = 5;
const punti_secco = 1;

/*Storage*/
let SettingsSaves = {
    "MusicVolume": 1,
    "SFXVolume": 0.2,
    "Classifica": {},
    "CurrentPlayer": "",
    "CurrentScore": 0
}

if (localStorage.getItem('EcoRushSettings')) {
    let TempLoad = localStorage.getItem('EcoRushSettings');
    SettingsSaves = JSON.parse(TempLoad)
    /*
    if (SettingsSaves.MusicVolume == 1) {
        SettingsMusicCheckbox.src = "Assets/CheckboxOn.png"
    }
    else {
        SettingsMusicCheckbox.src = "Assets/CheckboxOff.png"
    }

    if (SettingsSaves.SFXVolume == 0.2) {
        SettingsSFXCheckbox.src = "Assets/CheckboxOn.png"
    }
    else {
        SettingsSFXCheckbox.src = "Assets/CheckboxOff.png"
    }
    if (SettingsSaves.CurrentPlayer != undefined && SettingsSaves.CurrentPlayer != 0 && SettingsSaves.CurrentPlayer != "") {
        NameInput.value = SettingsSaves.CurrentPlayer
    }*/
}

console.log(SettingsSaves.CurrentPlayer)


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

//variabili per lo scabio delle celle
let prima_cella = null;
let seconda_cella = null;

function swap_div() {
    if (prima_cella && seconda_cella) {
        // Effettua lo scambio solo se entrambi i div sono stati cliccati
        console.log(prima_cella.textContent);
        console.log(seconda_cella.textContent);
        console.log(matrice[row2][col2]);
        console.log(matrice[row1][col1]);

        
            let temp = matrice[row2][col2];
            matrice[row2][col2] = matrice[row1][col1];
            matrice[row1][col1] = temp;

            stampa_matrice(matrice);

            console.log(matrice);

        if(matrice[row2][col2] == 5 || matrice[row1][col1] == 5){
            setTimeout(() => {
                scambio_perdita();

            }, 500);

            setTimeout(() => {
                if(matrice[row2][col2] == 5){
                        potere_del_riciclo(row2,col2);
                }else{               
                        potere_del_riciclo(row1, col1);
                } 
            }, 1000);    
        }else if(matrice[row2][col2] == 6 || matrice[row1][col1] == 6){
            setTimeout(() => {
                scambio_perdita();

            }, 500);

            setTimeout(() => {
            if(matrice[row2][col2] == 6){
                    amore_della_natura(row2,col2);
            }else{
                    amore_della_natura(row1, col1);
            }

            }, 1000);  
        }else if(matrice[row2][col2] == 4 || matrice[row1][col1] == 4){
            scambio_perdita();
        }else{
            cerca(row2, col2, matrice);
            combo(cons_riga, cons_colonna);
            console.log("Primo cliccato rig" + cons_riga + "Primo cliccato col" + cons_colonna)
            if(valore == false){
                cerca(row1, col1, matrice);
                combo(cons_riga, cons_colonna);
                console.log("secondo cliccato rig" + cons_riga + "secondo cliccato col" + cons_colonna)

                if(valore == false){
                    setTimeout(() => {
                        scambio_perdita();

                    }, 500);
                }
            }
            

            

            console.log("Combo riga = " + cons_riga + "Combo colonna = " + cons_colonna)
        }
        
            setTimeout(() => {
                prima_cella.style.backgroundColor = '';
                seconda_cella.style.backgroundColor = '';

                // Resetta le variabili delle coordinate
                prima_cella = null;
                seconda_cella = null;
            }, 500);

            controllo_swap(matrice);
        }
        
       
}


//funzione per far partire le combo

var valore;

function combo(cons_riga, cons_colonna){
    valore = true;
    if (cons_riga == 5) {
        console.log('combo 5 riga');
        quintuplo_orizzontale(matrice);
    }
    else if (cons_colonna == 5) {
        console.log('combo 5 colonna');
        quintuplo_verticale(matrice);
    }
    else if (cons_riga == 4) {
        console.log('combo 4 riga');
        quaduplo_orizzontale(matrice);
    }
    else if (cons_colonna == 4) {
        console.log('combo 4 colonna');
        quaduplo_verticale(matrice);
    }
    else if (cons_riga == 3) {
        let tipo = true;
        verifica_combo_speciale(tipo);
            if(combo_speciale == true){
                return
            }else{
                console.log('combo 3 riga');
                triplo_orizzontale(matrice);      
            }
    }
    else if (cons_colonna == 3) {
        let tipo = false;
        verifica_combo_speciale(tipo);
            if(combo_speciale == true){
                return;
            }else{
                console.log('combo 3 colonna');
                    triplo_verticale(matrice);
            }            
    }else {
        valore = false;
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
            div.innerHTML = "<img height ='70px' width='70px'src='img/" + elementi[matrice[i][j]] + "'></img>";

            if (matrice[i][j] == 0) {
                div.style.backgroundColor = '#faca77'
            }
            if (matrice[i][j] == 1) {
                div.style.backgroundColor = 'lightblue'
            }
            if (matrice[i][j] == 2) {
                div.style.backgroundColor = 'lightgreen'
            }
            if (matrice[i][j] == 3) {
                div.style.backgroundColor = '#c99ee6'
            }
            if (matrice[i][j] == 4) {
                div.style.backgroundColor = '#b7bcb3'
            }
            if (matrice[i][j] == 5) {
                div.style.backgroundColor = '#F5EBA1'
            }
            if (matrice[i][j] == 6) {
                div.style.backgroundColor = '#F5C6C7'
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

    for (let m = 0; m < matrice.length -1; m++) {
            if(matrice[m+1][colonna] != undefined && matrice[m + 1][colonna] === matrice[m][colonna]){
                cons_colonna++;
                dati_colonna.cons_colonna++;
                dati_colonna.posizione.push({ riga: m, colonna });

                if(m == 3){
                    dati_colonna.posizione.push({ riga: m + 1, colonna });
                }
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
        

    

    for (let l = 0; l < matrice.length ; l++) {

        if(matrice[riga][l+1] != undefined && matrice[riga][l + 1] === matrice[riga][l]){
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

/*
//funzione per cercare le combo in altre combo
var dati_riga_doppio
var dati_colonna_doppio;

let posizione;

function cerca_doppio(tipo){

    dati_riga_doppio = {
        cons_riga: 1,
        posizione: []
    };

    dati_colonna_doppio = {
        cons_colonna: 1,
        posizione: []
    };

    let cons_colonna_doppio = 0;

    if(tipo == true){
        dati_riga.posizione.forEach(function(element) {
            if(matrice[element.riga -2][element.colonna] != undefined){
                for(let i = element.riga - 2; i < element.riga; i++){
                    let colonna = element.colonna;
                    if(matrice[i+1][colonna] != undefined && matrice[i + 1][colonna] === matrice[i][colonna]){
                        cons_colonna_doppio++;
                        dati_colonna_doppio.cons_colonna_doppio++;
                        dati_colonna_doppio.posizione.push({ riga: i, colonna });
        
                        if(i == 3){
                            dati_colonna_doppio.posizione.push({ riga: i + 1, colonna });
                        }
                    }
                    else {
                        if (cons_colonna_doppio != 1) {
                            if(cons_colonna_doppio >= 3){
                                dati_colonna_doppio.posizione.push({ riga: i, colonna });
                            }
                            break;
                        }
                    } 
                }
                if(cons_colonna_doppio == 3){
                    posizione = "sopra"
                    return true
                }
            }

            dati_riga_doppio = {
                cons_riga: 1,
                posizione: []
            };
        
            dati_colonna_doppio = {
                cons_colonna: 1,
                posizione: []
            };
            

            if(matrice[element.riga +2][element.colonna] != undefined){
                for(let i = element.riga + 2; i < element.riga; i++){
                    let colonna = element.colonna;
                    if(matrice[i+1][colonna] != undefined && matrice[i + 1][colonna] === matrice[i][colonna]){
                        cons_colonna_doppio++;
                        dati_colonna_doppio.cons_colonna_doppio++;
                        dati_colonna_doppio.posizione.push({ riga: i, colonna });
        
                        if(i == 3){
                            dati_colonna_doppio.posizione.push({ riga: i + 1, colonna });
                        }
                    }
                    else {
                        if (cons_colonna_doppio != 1) {
                            if(cons_colonna_doppio >= 3){
                                dati_colonna_doppio.posizione.push({ riga: i, colonna });
                            }
                            break;
                        }
                    } 
                }
                if(cons_colonna_doppio == 3){
                    posizione = "sotto"
                    return true
                }
            }
        });
    }
}
*/
var combo_speciale = false;

function verifica_combo_speciale(tipo){
    if(tipo == true){
        dati_riga.posizione.forEach(function(element) {
            cerca(element.riga, element.colonna, matrice);
            if(dati_colonna.posizione.length === 3){
                riga_i = dati_colonna.posizione[0].riga;
                riga_f = dati_colonna.posizione[2].riga;
        
                if(matrice[riga_f][element.colonna] == matrice[element.riga][element.colonna]){
                    combo_speciale = true;
                    quintuplo_croce_sopra();
                }else if(matrice[riga_i][element.colonna] == matrice[element.riga][element.colonna]){
                    combo_speciale = true;
                    quintuplo_croce_sotto();
                }
            }
        });
    }else{
        let cnt  = 0;
        dati_colonna.posizione.forEach(function(element) {
            cerca(element.riga, element.colonna, matrice);
            if(dati_riga.posizione.length == 3){
                colonna_i = dati_riga.posizione[0].riga;
                colonna_f = dati_riga.posizione[2].riga;
        
                if(matrice[element.riga][colonna_f] == matrice[element.riga][element.colonna] || matrice[element.riga][colonna_i] == matrice[element.riga][element.colonna]){
                    if(cnt == 0){
                        combo_speciale = true;
                        quintuplo_croce_sopra();
                    }else if(cnt == 2){
                        combo_speciale = true;
                        quintuplo_croce_sotto();
                    }
                }
            }
            cnt++;
        });
    }

    if(dati_colonna.posizione.length != 3 || dati_riga.posizione.length != 3){
        combo_speciale = false;
    }
    
}

//funzione per verificare se ci sono combo nella matrice dopo gli swap

function controllo_swap(matrice){
    for(i = 0; i<matrice.length; i++){
        for(j = 0; j<matrice.length; j++){
            cerca(i, j, matrice);
            combo(cons_riga, cons_colonna)
        }
    }
}

function scambio_perdita(){
    let temp = matrice[row2][col2]
    matrice[row2][col2] = matrice[row1][col1];
    matrice[row1][col1] = temp;

    console.log(matrice);

    stampa_matrice(matrice);
}

//funzione per implementare la discesa degli elementi in caso verticale
function triplo_verticale() {
    dati_colonna.posizione.reverse();
    let riga = dati_colonna.posizione[0].riga;
    let colonna = dati_colonna.posizione[0].colonna;

    let combo = 3;
    assegna_punti(riga, colonna, combo);
    
        console.log("Valore riga: " + riga + ", Valore colonna: " + colonna);
        for(i = riga; i > 0; i--){

            console.log("Elemento riga = " + i);

                if(i == 4){
                    matrice[i][colonna] = matrice[i - 3][colonna];
                    matrice[i - 3][colonna] = generaNumero(i,colonna);
                }
                else if(i == 3){
                    matrice[i][colonna] = matrice[i - 3][colonna];
                    matrice[i - 3][colonna] = generaNumero(i,colonna);
                }
                else{
                    matrice[i][colonna] = generaNumero(i,colonna);
                }
                
            } 

    matrice[0][colonna] = generaNumero(0,colonna);

    stampa_matrice(matrice);
    
}

//funzione per implementare la discesa degli elementi in caso orizzontale
function triplo_orizzontale(matrice) {
    let riga = dati_riga.posizione[0].riga;
    let colonna = dati_riga.posizione[0].colonna;

    let combo = 3;
    assegna_punti(riga, colonna, combo);

    dati_riga.posizione.forEach(function(element) {
        console.log("Valore riga: " + element.riga + ", Valore colonna: " + element.colonna);
        for(i = element.riga; i > 0; i--){
            
                matrice[i][element.colonna] = matrice[i -1][element.colonna];
                setTimeout(() => {
                    stampa_matrice(matrice);
                }, 400);
        }  
        matrice[0][element.colonna] = generaNumero(0,element.colonna); 
        
    });
    console.log(matrice);
    console.log("matrice dopo il triplo" + matrice);
    
    stampa_matrice(matrice);

}

//funzione per implementare la discesa degli elementi in caso verticale
function quaduplo_verticale() {
    dati_colonna.posizione.reverse();
    let riga = dati_colonna.posizione[0].riga;
    let colonna = dati_colonna.posizione[0].colonna;

    let combo = 4;
    assegna_punti(riga, colonna, combo);

        console.log("Valore riga: " + riga + ", Valore colonna: " + colonna);
        for(i = riga; i > 0; i--){

            console.log("Elemento riga = " + i);

                if(i == 4){
                    matrice[i][colonna] = matrice[i - 4][colonna];
                    matrice[0][colonna] = generaNumero(i,colonna);
                }
                else{
                    matrice[i][colonna] = generaNumero(i,colonna);
                }
                
        } 
        matrice[riga][colonna] = 5;

        matrice[0][colonna] = generaNumero(0,colonna);
    
    stampa_matrice(matrice);

}

//funzione per implementare la discesa degli elementi in caso orizzontale
function quaduplo_orizzontale() {

    let riga_punti = dati_riga.posizione[0].riga;
    let colonna = dati_riga.posizione[0].colonna;

    let combo = 4;
    assegna_punti(riga_punti, colonna, combo);

    ultimo = dati_riga.posizione.pop();
    riga = dati_riga.posizione[0].riga;
    dati_riga.posizione.forEach(function(element) {
        console.log("Valore riga: " + element.riga + ", Valore colonna: " + element.colonna);
        for(i = element.riga; i > 0; i--){
                matrice[i][element.colonna] = matrice[i -1][element.colonna];
        }     
    });

    matrice[riga][ultimo.colonna] = 5; 
    console.log(matrice);
    console.log("matrice dopo il triplo" + matrice);

    stampa_matrice(matrice);

}

//funzione per implementare la discesa degli elementi in caso verticale
function quintuplo_verticale() {
    dati_colonna.posizione.reverse();
    let riga = dati_colonna.posizione[0].riga;
    let colonna = dati_colonna.posizione[0].colonna;

    let combo = 5;
    assegna_punti(riga, colonna, combo);

        console.log("Valore riga: " + riga + ", Valore colonna: " + colonna);
        for(i = riga; i > 0; i--){

            console.log("Elemento riga = " + i);

                    matrice[i][colonna] = generaNumero(i,colonna);
                
        } 
        matrice[riga][colonna] = 6;
        matrice[0][colonna] = generaNumero(0,colonna);
    
    stampa_matrice(matrice);

}

//funzione per implementare la discesa degli elementi in caso orizzontale
function quintuplo_orizzontale() {
    let riga_punti = dati_riga.posizione[0].riga;
    let colonna = dati_riga.posizione[0].colonna;

    let combo = 5;
    assegna_punti(riga_punti, colonna, combo);

    ultimo = dati_riga.posizione.pop();
    riga = dati_riga.posizione[0].riga;
    dati_riga.posizione.forEach(function(element) {
        console.log("Valore riga: " + element.riga + ", Valore colonna: " + element.colonna);
        for(i = element.riga; i > 0; i--){
                matrice[i][element.colonna] = matrice[i -1][element.colonna];
        }     
    });

    matrice[riga][ultimo.colonna] = 6; 
    console.log(matrice);
    console.log("matrice dopo il triplo" + matrice);

    stampa_matrice(matrice);
}

//funzione per far partire la combo ad L se trovata

function quintuplo_croce_sopra(){
    console.log("COMBO CROCE sopra");
    triplo_orizzontale(matrice);
    dati_colonna.posizione.reverse();
    dati_colonna.posizione.unshift();
    let riga = dati_colonna.posizione[0].riga;
    let colonna = dati_colonna.posizione[0].colonna;

    riga++;
    

    console.log("Valore riga: " + riga + ", Valore colonna: " + colonna);
        for(i = riga; i > 0; i--){

            console.log("Elemento riga = " + i);

                if(i == 4 || i== 2 || i==3){
                    matrice[i][colonna] = matrice[i - 2][colonna];
                    matrice[i - 2][colonna] = generaNumero(i,colonna);
                }else{
                    matrice[i][colonna] = generaNumero(i,colonna);
                }
                
            } 

    matrice[0][colonna] = generaNumero(0,colonna);
    
    stampa_matrice(matrice);
}

function quintuplo_croce_sotto(){
    console.log("COMBO CROCE sotto");
    triplo_orizzontale(matrice);
    dati_colonna.posizione.reverse();
    dati_colonna.posizione.pop();
    let riga = dati_colonna.posizione[0].riga;
    let colonna = dati_colonna.posizione[0].colonna;

    

    console.log("Valore riga: " + riga + ", Valore colonna: " + colonna);
        for(i = riga; i > 0; i--){

            console.log("Elemento riga = " + i);

                if(i == 4 || i== 2 || i==3){
                    matrice[i][colonna] = matrice[i - 2][colonna];
                    matrice[i - 2][colonna] = generaNumero(i,colonna);
                }else{
                    matrice[i][colonna] = generaNumero(i,colonna);
                }
                
            } 

    matrice[0][colonna] = generaNumero(0,colonna);
    
    stampa_matrice(matrice);
}
//funzione per attivare il potere del riciclo se cliccato
function potere_del_riciclo(riga, colonna){
        let combo = 1

        if(matrice[riga -1][colonna] != undefined){
            assegna_punti(riga -1, colonna, combo);
        }
        else if(matrice[riga +1][colonna] != undefined){
            assegna_punti(riga +1, colonna, combo);
        }
        else if(matrice[riga][colonna -1] != undefined){
            assegna_punti(riga, colonna -1, combo);
        }
        else if(matrice[riga][colonna +1] != undefined){
            assegna_punti(riga, colonna +1, combo);
        }
        
        

        for(i = riga + 1; i > 0; i--){

            console.log("Elemento riga = " + i);
            if(i == matrice.length){
                i--;
            }
                if(i == 4){
                    matrice[i][colonna] = matrice[i - 3][colonna];
                    matrice[i - 3][colonna] = generaNumero(i,colonna);
                    stampa_matrice(matrice)
                }
                else if(i == 3){
                    matrice[i][colonna] = matrice[i - 3][colonna];
                    matrice[i - 3][colonna] = generaNumero(i,colonna);
                    stampa_matrice(matrice)
                }
                else{
                    matrice[i][colonna] = generaNumero(i,colonna);
                    stampa_matrice(matrice)
                }
                
        }

        matrice[0][colonna] = generaNumero(0,colonna);
            
            for(n = riga; n > 0; n--){
                if(matrice[n][colonna -1] != undefined){
                    matrice[n][colonna - 1] = matrice[n -1][colonna -1];

                    matrice[0][colonna - 1] = generaNumero(0,colonna - 1); 
                    setTimeout(() => {
                        stampa_matrice(matrice);
                     }, 1000);
                }  
            }  

            for(m = riga; m > 0; m--){
                if(matrice[n][colonna + 1] != undefined){
                    matrice[m][colonna + 1] = matrice[m -1][colonna +1];

                    matrice[0][colonna + 1] = generaNumero(0,colonna + 1); 
                    setTimeout(() => {
                        stampa_matrice(matrice);
                    }, 1000);
                }
            }  

        
       
        console.log(matrice);
    
        stampa_matrice(matrice);

        controllo_swap(matrice);
}

//funzione per attivare l'amore della natura se cliccato
function amore_della_natura(riga, colonna){

    let combo = 1
    if(matrice[riga -1][colonna] != undefined){
        assegna_punti(riga -1, colonna, combo);
    }
    else if(matrice[riga +1][colonna] != undefined){
        assegna_punti(riga +1, colonna, combo);
    }
    else if(matrice[riga][colonna -1] != undefined){
        assegna_punti(riga, colonna -1, combo);
    }
    else if(matrice[riga][colonna +1] != undefined){
        assegna_punti(riga, colonna +1, combo);
    }
    
    else if(matrice[riga -1][colonna +1] != undefined){
        assegna_punti(riga -1, colonna +1, combo);
    }
    else if(matrice[riga -1][colonna -1] != undefined){
        assegna_punti(riga -1, colonna -1, combo);
    }
    else if(matrice[riga +1][colonna -1] != undefined){
        assegna_punti(riga +1, colonna -1, combo);
    }
    else if(matrice[riga +1][colonna +1] != undefined){
        assegna_punti(riga +1, colonna +1, combo);
    }

        for(i = riga + 1; i > 0; i--){

            console.log("Elemento riga = " + i);
            if(i == matrice.length){
                i--;
            }
                if(i == 4){
                    matrice[i][colonna] = matrice[i - 3][colonna];
                    matrice[i - 3][colonna] = generaNumero(i,colonna);
                }
                else if(i == 3){
                    matrice[i][colonna] = matrice[i - 3][colonna];
                    matrice[i - 3][colonna] = generaNumero(i,colonna);
                }
                else{
                    matrice[i][colonna] = generaNumero(i,colonna);
                }
                
        } 

        matrice[0][colonna] = generaNumero(0,colonna);

        for(let n = riga + 1; n > 0; n--){

            console.log("Elemento riga = " + n);

            if(n == matrice.length){
                n--;
            }
            
            if(matrice[n][colonna - 1] != undefined){
                if(n == 4){
                    matrice[n][colonna - 1] = matrice[n - 3][colonna - 1];
                    matrice[n - 3][colonna - 1] = generaNumero(n,colonna - 1);
                }
                else if(n == 3){
                    matrice[n][colonna - 1] = matrice[n - 3][colonna - 1];
                    matrice[n - 3][colonna - 1] = generaNumero(n,colonna - 1);
                }
                else{
                    matrice[n][colonna - 1] = generaNumero(n,colonna - 1);
                }
            }
            
            matrice[0][colonna] = generaNumero(0,colonna - 1);

        } 

        
        for(let m = riga + 1; m > 0; m--){

            console.log("Elemento riga = " + m);

            if(m == matrice.length){
                m--;
            }

            if(matrice[m][colonna + 1] != undefined){
                if(m == 4){
                    matrice[m][colonna + 1] = matrice[m - 3][colonna + 1];
                    matrice[m - 3][colonna + 1] = generaNumero(m,colonna + 1);
                }
                else if(m == 3){
                    matrice[m][colonna + 1] = matrice[m - 3][colonna + 1];
                    matrice[m - 3][colonna + 1] = generaNumero(m,colonna + 1);
                }
                else{
                    matrice[m][colonna + 1] = generaNumero(m,colonna + 1);
                }
            }
            matrice[0][colonna] = generaNumero(0,colonna + 1);
        } 

        
    
    stampa_matrice(matrice);
    
    controllo_swap(matrice);

}

function assegna_punti(riga, colonna, combo){
    if(matrice[riga][colonna] != undefined){
        if(matrice[riga][colonna] == 0){
            punti_totale += punti_carta * combo;
            numero_carta += combo;
        }
        else if(matrice[riga][colonna] == 1){
            punti_totale += punti_plastica * combo;
            numero_plastica += combo;
        }
        else if(matrice[riga][colonna] == 2){
            punti_totale += punti_vetro* combo;
            numero_vetro += combo;
        }
        else if(matrice[riga][colonna] == 3){
            punti_totale += punti_secco * combo;
            numero_secco += combo;
        }
    }

    console.log("PUNTI= " + punti_totale);
    SettingsSaves.Classifica[SettingsSaves.CurrentPlayer] = punti_totale;
    localStorage.setItem('EcoRushSettings', JSON.stringify(SettingsSaves));
}

//funzione per animazione prima di effettuare la combo
function animazione_orizz(){
    dati_riga.posizione.forEach(function(element) {
        console.log("Valore riga: " + element.riga + ", Valore colonna: " + element.colonna);
        matrice[element.riga][element.colonna] = 7;  
    });
}

function animazione_vert(){
    dati_colonna.posizione.forEach(function(element) {
        console.log("Valore riga: " + element.riga + ", Valore colonna: " + element.colonna);
        matrice[element.riga][element.colonna] = 7;  
    });
}


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
