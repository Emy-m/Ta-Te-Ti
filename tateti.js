//Definiciones de clases
class Casilla {
    static JUGADOR_VACIO = 0;
    static JUGADOR_UNO = 1;
    static JUGADOR_DOS = 2;

    static ESTADO_OCUPADO = "ocupado";
    static ESTADO_LIBRE = "libre";

    estado;
    jugador;
    fila;
    columna;

    constructor(columna, fila){
        this.estado = Casilla.ESTADO_LIBRE;
        this.jugador = Casilla.JUGADOR_VACIO;
        this.columna = columna;
        this.fila = fila;
    }

    devolverPosicion(){ //Devuelve vector con la columna y la fila
        return [this.columna, this.fila];
    }

    estaOcupada(){
        let resultado = false;

        if(this.estado == Casilla.ESTADO_OCUPADO){
            resultado = true;
        }

        return resultado;
    }

    estaLibre(){
        let resultado = false;

        if(this.estado == Casilla.ESTADO_LIBRE){
            resultado = true;
        }

        return resultado;
    }

    devolverJugador(){
        return this.jugador;
    }

    asignarJugador(jugador){
        this.jugador = jugador;
    }

    liberarCasilla(){
        this.estado = Casilla.ESTADO_LIBRE;
    }

    ocuparCasilla(){
        this.estado = Casilla.ESTADO_OCUPADO;
    }

}

class Tablero {
    tablero;
    casillasOcupadas;

    constructor(){
        this.tablero = [
            [new Casilla(0, 0), new Casilla(1, 0), new Casilla(2, 0)], 
            [new Casilla(0, 1), new Casilla(1, 1), new Casilla(2, 1)], 
            [new Casilla(0, 2), new Casilla(1, 2), new Casilla(2, 2)]
        ];

        this.casillasOcupadas = 0;
    }

    reiniciarTablero(){
        this.casillasOcupadas = 0;
        this.tablero = [
            [new Casilla(0, 0), new Casilla(1, 0), new Casilla(2, 0)], 
            [new Casilla(0, 1), new Casilla(1, 1), new Casilla(2, 1)], 
            [new Casilla(0, 2), new Casilla(1, 2), new Casilla(2, 2)]
        ];

        let tableroCanvas = document.getElementById("tablero");
        let nodo, nueve = 0, numFila = 0;
        
        while(tableroCanvas.hasChildNodes()){
            tableroCanvas.removeChild(tablero.firstChild);	
        }

        for(nueve = 0; nueve < 9; nueve++){
            nodo = document.createElement("canvas");
            nodo.width = 200;
            nodo.height = 150;

            if(nueve < 3){
                nodo.setAttribute("onclick", "jugarTurno(" + 0 + ", " + numFila + ")");
                nodo.setAttribute("id", "canvas" + 0 + numFila);
            }
            else if(nueve < 6){
                nodo.setAttribute("onclick", "jugarTurno(" + 1 + ", " + numFila + ")");
                nodo.setAttribute("id", "canvas" + 1 + numFila);
            }
            else{
                nodo.setAttribute("onclick", "jugarTurno(" + 2 + ", " + numFila + ")");
                nodo.setAttribute("id", "canvas" + 2 + numFila);
            }

            if(numFila == 2){
                numFila = 0;
            }
            else{
                numFila++;
            }

            tableroCanvas.appendChild(nodo);
            tableroCanvas.appendChild(document.createTextNode("\u00A0"));
        }
    }

    devolverCasilla(columna, fila){
        return this.tablero[columna][fila];
    }

    tableroLleno(){
        let resultado = false;

        if(this.casillasOcupadas == 9){
            resultado = true;
        }

        return resultado;
    }

    pintarCasilla(columna, fila, jugador){
        let canvas = document.getElementById("canvas" + columna + fila);
        let contexto = canvas.getContext("2d");

        if(jugador == 1){ //dibuja un cuadrado
            contexto.fillStyle = "blue";
            contexto.fillRect(50, 25, 100, 100);
        }
        else{ //dibuja un circulo
            contexto.fillStyle = "red";
            contexto.arc(100, 75, 50, 0, 2 * Math.PI);
            contexto.fill();
        }
    }

    comprobarArray(array){ //Si retorna 0, no hay ganador. Si retorna 1, gano jugador 1. Si retorna 2, gano jugador 2
        let contadorUno = 0;
        let contadorDos = 0;
        let resultado = 0;
        let lugar;

        for(lugar = 0; lugar < 3; lugar++){
            if(array[lugar].estaOcupada()){
                if(array[lugar].devolverJugador() == Casilla.JUGADOR_UNO){
                    contadorUno++;
                }
                else{
                    contadorDos++;
                }
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

    comprobarGanador(){
        let columna = 0, fila = 0, ganador = 0, diagonal = 0;
    
        while(columna < 3 && ganador == 0){
            ganador = this.comprobarArray(this.tablero[columna]);
            columna++;
        }
    
        while(fila < 3 && ganador == 0){
            ganador = this.comprobarArray([this.tablero[0][fila], this.tablero[1][fila], this.tablero[2][fila]]);
            fila++;
        }

        while(diagonal < 2 && ganador == 0){
            if(diagonal == 0){
                ganador = this.comprobarArray([this.tablero[0][0], this.tablero[1][1], this.tablero[2][2]]);
            }
            else if(diagonal == 1){
                ganador = this.comprobarArray([this.tablero[0][2], this.tablero[1][1], this.tablero[2][0]]);
            }

            diagonal++;
        }
        
        return ganador;
    }

    jugada(columna, fila, jugador){
        let casilla = this.devolverCasilla(columna, fila);
        let jugadaValida = false;

        if(casilla.estaOcupada() == false){
            this.casillasOcupadas++;
            casilla.asignarJugador(jugador);
            casilla.ocuparCasilla();
            this.pintarCasilla(columna, fila, jugador);
            jugadaValida = true;
        }

        return jugadaValida;
    }
    
}

class Juego {
    static JUGADOR_1 = 1;
    static JUGADOR_2 = 2;

    turnoJugador;
    ganador;
    nombreJugador1;
    nombreJugador2;
    victoriasJugador1;
    victoriasJugador2;
    partidas;
    tablero;

    constructor(nombre1, nombre2){
        this.nombreJugador1 = nombre1;
        this.nombreJugador2 = nombre2;
        this.partidas = 0;
        this.turnoJugador = Juego.JUGADOR_1;
        this.tablero = new Tablero();
        this.ganador = null;
    }

    jugar(columna, fila){
        this.tablero.jugada(columna, fila, this.turnoJugador)
    }

    cambiarTurno(){
        if(this.turnoJugador == Juego.JUGADOR_1){
            this.turnoJugador = Juego.JUGADOR_2;
        }
        else{
            this.turnoJugador = Juego.JUGADOR_1;
        }
    }

    actualizarGanador(ganador){
        this.ganador = ganador;
    }

    hayGanador(){
        let resultado = false;

        if(ganador){
            resultado = true;
        }
        
        return resultado;
    }

    devolverTablero(){
        return this.tablero;
    }

    devolverGanador(){
        return this.ganador;
    }

    devolverNombreGanador1(){
        return this.nombreJugador1;
    }

    devolverNombreGanador2(){
        return this.nombreJugador2;
    }

    turnoAcutal(){
        return this.turnoJugador;
    }

    devolverVictorias1(){
        return this.victoriasJugador1
    }

    devolverVictorias2(){
        return this.victoriasJugador2
    }

    cantidadPartidas(){
        return this.partidas;
    }

    jugadaValida(columna, fila){
        let casilla = this.tablero.devolverCasilla(columna, fila)
        return casilla.estaLibre();
    }

}

//inicia el codigo
const juego = new Juego();
var validoInput1 = false;
var validoInput2 = false;
var nombre1, nombre2;
var inputJugador1 = document.getElementById("inputJugador1");
var inputJugador2 = document.getElementById("inputJugador2");
var inicio = document.getElementById("inicio");
var datos = document.getElementById("datos");
var tableroId = document.getElementById("tablero");
var contenedor = document.getElementById("contenedor");
var partidas = document.querySelector("#partidas span");
var turno = document.querySelector("#turno span");
var victoriasJugador1 = document.querySelector("#victorias1 span")
var victoriasJugador2 = document.querySelector("#victorias2 span")

window.addEventListener("load", () => {
    //localStorage.clear();
});

document.addEventListener("keyup", () => {
    validoInput1 = inputJugador1.checkValidity();
    validoInput2 = inputJugador2.checkValidity();
});

function empezar(){
    if(validoInput1 && validoInput2){
        nombre1 = inputJugador1.value;
        nombre2 = inputJugador2.value;
        inicio.setAttribute("style", "display: none");
        document.querySelector("#jugador1 p span").innerHTML = nombre1;
        document.querySelector("#jugador2 p span").innerHTML = nombre2;
        datos.classList.remove("oculto");
        tableroId.classList.remove("oculto");
        partidas.innerHTML++;
        turno.innerHTML = "Jugador " + Juego.JUGADOR_1 + " (Cuadrado)";
    }
}

function jugarTurno(columna, fila){
    let tablero = juego.devolverTablero();
    let valida = juego.jugadaValida(columna, fila);
    juego.jugar(columna, fila);
    let ganador;

    setTimeout(() => {
        ganador = tablero.comprobarGanador();

        if(ganador != 0){ //hay ganador
            tablero.reiniciarTablero();
            partidas.innerHTML++;
        
            if(ganador == 1){ //gano jugador1
                victoriasJugador1.innerHTML++;
                //efecto
            }
            else{
                victoriasJugador2.innerHTML++;
                //efecto
            }
        }
        else if(valida){
            juego.cambiarTurno();
            if(tablero.tableroLleno()){
                //empate
                tablero.reiniciarTablero();
                partidas.innerHTML++;
            }
            else{
                if(turno.innerHTML.includes("(Cuadrado)")){
                    turno.innerHTML = "Jugador " + Juego.JUGADOR_2 + " (Circulo)";
                }
                else{
                    turno.innerHTML = "Jugador " + Juego.JUGADOR_1 + " (Cuadrado)";
                }
            }
        }
    }, 100);
}