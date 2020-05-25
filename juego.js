var tableroMatriz = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
var jugadorActual; //1: cuadrado, 2: circulo

function dibujarCirculo(x, y){
    let canvas = document.getElementById("canvas" + x + y);
    let contexto = canvas.getContext("2d");
    contexto.fillStyle = "red";
    contexto.arc(x + 100, y + 75, 50, 0, 2*Math.PI);
    contexto.fill();
}

function dibujarCuadrado(x, y){
    let canvas = document.getElementById("canvas" + x + y);
    let contexto = canvas.getContext("2d");
    contexto.fillStyle = "blue";
    contexto.fillRect(x + 50, y + 25, 100, 100);
}

function reiniciar(){
    tableroMatriz = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    let tablero = document.getElementById("tablero");
    let nodo, nueve = 0, numFila = 0;
    
    while(tablero.hasChildNodes()){
        tablero.removeChild(tablero.firstChild);	
    }

    for(nueve = 0; nueve < 9; nueve++){
        nodo = document.createElement("canvas");
        nodo.width = 200;
        nodo.height = 150;

        if(nueve < 3){
            nodo.setAttribute("onclick", "jugada(" + 0 + ", " + numFila + ")");
            nodo.setAttribute("id", "canvas" + 0 + numFila);
        }
        else if(nueve < 6){
            nodo.setAttribute("onclick", "jugada(" + 1 + ", " + numFila + ")");
            nodo.setAttribute("id", "canvas" + 1 + numFila);
        }
        else{
            nodo.setAttribute("onclick", "jugada(" + 2 + ", " + numFila + ")");
            nodo.setAttribute("id", "canvas" + 2 + numFila);
        }

        if(numFila == 2){
            numFila = 0;
        }
        else{
            numFila++;
        }

        tablero.appendChild(nodo);
        tablero.appendChild(document.createTextNode("\u00A0"));
    }
}

function comprobarArray(array){ //Si retorna 0, no hay ganador. Si retorna 1, gano jugador 1. Si retorna 2, gano jugador 2
    let contadorUno = 0;
    let contadorDos = 0;
    let resultado = 0;
    
    for(lugar in array){
        if(array[lugar] == 1){
            contadorUno++;
        }
        else if(array[lugar] == 2){
            contadorDos++;
        }
    }

    if(contadorUno == 3){
        resultado = 1;
    }
    else if(contadorDos == 3){
        resultado = 2;
    }

    return resultado;
}

function tableroLLeno(){
    let lugaresLibres = 0;
    let resultado = false;

    for(i = 0; i < 3; i++){
        for(j = 0; j < 3; j++){
            if(tableroMatriz[i][j] == 0){
                lugaresLibres++;
            }
        }
    }

    if(lugaresLibres == 0){
        resultado = true;
    }

    return resultado;
}

function comprobarGanador(){
    let columna = 0, fila = 0, ganador = 0;

    while(columna < 3 && ganador == 0){
        ganador = comprobarArray(tableroMatriz[columna]);
        columna++;
    }

    while(fila < 3 && ganador == 0){
        ganador = comprobarArray([tableroMatriz[0][fila], tableroMatriz[1][fila], tableroMatriz[2][fila]]);
        fila++;
    }
    
    if(ganador != 0){ //Cuando hay ganador se muestra cual es
        alert("Jugador " + ganador + " gano!");
        reiniciar();
    }
    else if(tableroLLeno()){ //Si no hay ganador y se lleno el tablero, empate
        alert("Empate!");
        reiniciar();
    }
}

function jugada(x, y){
    if(tableroMatriz[x][y] == 0){ //si no esta ocupado
        console.log("Jugo en la posicion: " + x + " - " + y);
        tableroMatriz[x][y] = jugadorActual;

        if(jugadorActual == 1){
            dibujarCuadrado(x, y);
            jugadorActual = 2;
        }
        else{
            dibujarCirculo(x, y);
            jugadorActual = 1;
        }

        comprobarGanador();
    }
    else{
        console.log("Posicion ocupada en: " + x + " - " + y);
    }
}

window.addEventListener("load", () => {
    jugadorActual = 1;
});