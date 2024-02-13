let elementi = ["c.png","p.png","v.png","s.png","r"];

var matrice = [[],[],[],[],[]];

var row1, row2, col1, col2;

//contatori per la generazione della matrice
let numero, numero_precedente;
let carta, secco, plastica, vetro;

let cnt = 0;

//variabili per cercare le combo
let cons_riga = 0;
let cons_colonna = 0;


//funzione per generare il contenuto dei dive della matrice
function genera_drop(righe,colonne){
    for(let i = 0; i <  righe; i++){
        for(let j = 0; j< colonne; j++){
            do {
                numero = Math.floor(Math.random()*4);
            } while(
                (j > 1 && numero === matrice[i][j - 1] && numero === matrice[i][j - 2]) ||
                (i > 1 && numero === matrice[i - 1][j] && numero === matrice[i - 2][j])  
            );

            matrice[i][j] = elementi[numero];
        }
    }
    console.log(matrice);


    verifica_consecutivi(matrice);
}

genera_drop(5,5);

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
            if(cons_riga == 3){
                console.log('combo 3 riga');
            }
            else if(cons_colonna == 3){
                console.log('combo 3 colonna');
            }
            if(cons_riga == 4){
                console.log('combo 4 riga');
            }
            else if(cons_colonna == 4){
                console.log('combo 4 colonna');
            }
            if(cons_riga == 5){
                console.log('combo 5 riga');
            }
            else if(cons_colonna == 5){
                console.log('combo 5 colonna');
            }
            else{
                console.log("Perso")
            }
        

        setTimeout(() =>{
             prima_cella.style.backgroundColor = '';
             seconda_cella.style.backgroundColor = '';

             // Resetta le variabili delle coordinate
             prima_cella = null;
             seconda_cella = null;
        },500);
    }
}

let container = document.getElementById("container");
let divs = container.getElementsByTagName('div');

console.log(divs);

//funzione per stampare i div in base ai contenuti della matrice
function stampa_matrice(matrice){
    container.innerHTML = "";
    for (let i = 0; i < matrice.length; i++) {
        for (let j = 0; j < matrice[i].length; j++) {
            // creazione del div
            let div = document.createElement("div");
            div.className = "matrice-div";
            div.innerHTML = "<img height ='70px' width='70px'src='img/" + matrice[i][j] + "'>";
            matrice[i][j] = div.innerHTML;

            if(matrice[i][j] == "c.png"){
                div.style.backgroundColor = 'lightyellow'
            }
            if(matrice[i][j] == "p.png"){
                div.style.backgroundColor = 'lightblue'
            }
            if(matrice[i][j] == "v.png"){
                div.style.backgroundColor = 'lightgreen'
            }
            if(matrice[i][j] == "s.png"){
                div.style.backgroundColor = 'purple'
            }

            //assegnazione della funzione click ai div
            //gestione di quali div vengono cliccati
            div.addEventListener('click', function() {
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
                    if(verifica_spostamento(row1, col1, row2, col2)){
                        swap_div();
                    } else{
                        setTimeout(() =>{
                            prima_cella.style.backgroundColor = '';
                            seconda_cella.style.backgroundColor = '';
               
                            // Resetta le variabili delle coordinate
                            prima_cella = null;
                            seconda_cella = null;
                       },500);
                    }        
                }
            });

           
            container.appendChild(div);
        }       
    }
}

stampa_matrice(matrice);

for(var i=0;i < divs.length; i++){

    

    
}

function verifica_spostamento(row1, col1, row2, col2){
    if(row2 == row1 - 1 && col1 == col2){
        return true;
    }
    else if(row2 == row1 + 1 && col1 == col2){
        return true;
    }
    else if(row2 == row1 && col2 == col1 + 1){
        return true;
    }
    else if(row2 == row1 && col2 == col1 - 1){
        return true;
    }
    else{
        return false;
    }
}



//funzione per controllare se ci sono cons
function verifica_consecutivi(matrice){

    for(j = 0; j < matrice.length; j++){
        for(i = 0; i< matrice.length -1; i++){
            do {
                numero = Math.floor(Math.random()*4);
                matrice[i][j] = elementi[numero];
            } while(
                matrice[i+1][j] === matrice[i][j]
            );

        }
    }

    for(i = 0; i < matrice.length; i++){
        for(j = 0; j< matrice.length -1; j++){
            do {
                numero = Math.floor(Math.random()*4);
                matrice[i][j] = elementi[numero];
            }while(
                matrice[i][j+1] === matrice[i][j]
            );

        }
    }
}


//funzione per cercare se sono presenti combo da tre, quattro e cinque

function cerca(riga, colonna, matrice){
    //variabili per la posizione degli elementi consecutivi
    let dati_riga = {
        cons_riga : 1,
        posizione : [] 
    };

    let dati_colonna = {
        cons_colonna : 1,
        posizione : [] 
    };

    cons_colonna = 1;
    cons_riga = 1;

    console.log(riga);
    console.log(colonna);

    for(let m = 0; m < matrice.length -1; m++){
        if(matrice[m][colonna] === matrice[m+1][colonna]){
            cons_colonna++;
            dati_colonna.cons_colonna++;
            dati_colonna.posizione.push({riga : m, colonna});
        }
        else{
            if(cons_colonna != 1){
                break;
            }
        }
    }

    for(let l = 0; l < matrice.length -1; l++){
        if(matrice[riga][l+1] === matrice[riga][l]){
            cons_riga++;
            dati_riga.cons_riga++;
            dati_riga.posizione.push({riga, colonna : l});
        }
        else{
             if(cons_riga != 1){
                break;
            }
        }
    }

    console.log(dati_colonna);
    console.log(dati_riga);


}

//funzione per implementare la discesa degli elementi in caso verticale
function triplo_verticale(){

}

//funzione per implementare la discesa degli elementi in caso orizzontale
function triplo_orizzontale(){

}


