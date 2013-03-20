
final PERSONAJE_ARRIBA = 2;
final PERSONAJE_ABAJO = 2;
final PERSONAJE_IZQUIERDA = 2;
final PERSONAJE_DERECHA = 2;
final COMIDA = 16;
final PACMIN = 1;
final ESPACIO = 32;


final BOTON_ARRIBA = 1;
final BOTON_ABAJO = 2;
final BOTON_IZQUIERDA = 4;
final BOTON_DERECHA = 8;
final BOTON_ESPACIO = 64;


final MIN_X = 0;
final MAX_X = 31;
final MIN_Y = 1;
final MAX_Y = 23;


final ARRIBA = 1;
final ABAJO = 2;
final IZQUIERDA = 3;
final DERECHA = 4;

final ATACA = 1;
final DEFIENDE = 2;

final MAX_DIST_COMIDA = 12;

final PUNTOS_NUEVA_VIDA = 10;


var xPersonaje;
var yPersonaje;
var dirPersonaje;

var xComida;   // columna
var yComida;   // renglon

var pacmins;

var puntos;

var vidas;

dibujaPersonaje() {
  switch (dirPersonaje) {
    case ARRIBA:
      putAt(PERSONAJE_ARRIBA, xPersonaje, yPersonaje);
      break;
    
    case ABAJO:
      putAt(PERSONAJE_ABAJO, xPersonaje, yPersonaje);
      break;
    
    case IZQUIERDA:
      putAt(PERSONAJE_IZQUIERDA, xPersonaje, yPersonaje);
      break;
      
    case DERECHA:
      putAt(PERSONAJE_DERECHA, xPersonaje, yPersonaje);
      break;
  }
}

borraPersonaje() {
  putAt(ESPACIO, xPersonaje, yPersonaje);
}

actualizaDireccion(boton) {
  if (boton == BOTON_ARRIBA)
    dirPersonaje = ARRIBA;
  if (boton == BOTON_ABAJO)
    dirPersonaje = ABAJO;
  if (boton == BOTON_IZQUIERDA)
    dirPersonaje = IZQUIERDA;
  if (boton == BOTON_DERECHA)
    dirPersonaje = DERECHA;
}

muevePersonaje(boton) {
  actualizaDireccion(boton);
  switch (dirPersonaje) {
    case ARRIBA:
      if (yPersonaje > MIN_Y)
        yPersonaje--;
      break;
      
    case ABAJO:
      if (yPersonaje < MAX_Y)
        yPersonaje++;
      break;
    
    case IZQUIERDA:
      if (xPersonaje > MIN_X)
        xPersonaje--;
      break;
    
    case DERECHA:
      if (xPersonaje < MAX_X)
        xPersonaje++;
      break;
  }
}

nuevaPosicionPersonaje() {
  xPersonaje = random(32);
  yPersonaje = random(MAX_Y - MIN_Y) + MIN_Y;
}

personajeComioComida() {
  return xPersonaje == xComida && yPersonaje == yComida;
}

dibujaComida() {
  putAt(COMIDA, xComida, yComida);
}

nuevaPosicionComida() {
  xComida = random(32);
  yComida = random(MAX_Y - MIN_Y) + MIN_Y;
}

dibujaEnemigos() {
  for (var i = 0; i < length(pacmins); i++)
    putAt(PACMIN, pacmins[i].x, pacmins[i].y);
}

borraEnemigos() {
  for (var i = 0; i < length(pacmins); i++)
    putAt(ESPACIO, pacmins[i].x, pacmins[i].y);
}

hayEnemigoEn(x, y) {
  for (var i = 0; i < length(pacmins); i++)
    if (pacmins[i].x == x && pacmins[i].y == y)
      return true;
  return false;
}

pacminComioPersonaje() {
  return hayEnemigoEn(xPersonaje, yPersonaje);
}

abs(n) {
  if (n < 0)
    return -n;
  return n;
}

sign(n) {
  if (n < 0)
    return -1;
  if (n > 0)
    return 1;
  return 0;
}

ataca(pacmin) {
  var dx = xPersonaje - pacmin.x;
  var dy = yPersonaje - pacmin.y;
  if (abs(dx) > abs(dy)) {
    var xNueva = pacmin.x + sign(dx);
    if (!hayEnemigoEn(xNueva, pacmin.y))
      pacmin.x = xNueva;
  } else {
    var yNueva = pacmin.y + sign(dy);
    if (!hayEnemigoEn(pacmin.x, yNueva))
      pacmin.y = yNueva;
  }
}

defiende(pacmin) {
  var dx = xComida - pacmin.x;
  var dy = yComida - pacmin.y;
  if (abs(dx) + abs(dy) > MAX_DIST_COMIDA) {
    if (abs(dx) > abs(dy)) {
      var xNueva = pacmin.x + sign(dx);
      if (!hayEnemigoEn(xNueva, pacmin.y))
        pacmin.x = xNueva;
    } else {
      var yNueva = pacmin.y + sign(dy);
      if (!hayEnemigoEn(pacmin.x, yNueva))
        pacmin.y = yNueva;
    }
  } else
    ataca(pacmin);
}

mueveEnemigos() {
  for (var i = 0; i < length(pacmins); i++) {
    if (random(100) > pacmins[i].velocidad)
      continue;
    switch (pacmins[i].tipo) {
      case ATACA:
        ataca(pacmins[i]);
        break;
      
      case DEFIENDE:
        defiende(pacmins[i]);
        break;
    }
  }
}

muestraPuntos() {
  showAt("Puntos: " + puntos, 20, 0);
}

muestraVidas() {
  showAt("Vidas: " + vidas, 0, 0);
}

muestraInstrucciones() {
  clear();
  showAt("LA VENGANZA DE LOS PACMIN", 3, 1);
  showAt("Usa las flechas del teclado para", 0, 3);
  showAt("cambiar la direccion de BUU", 1, 4);
  showAt("Cada trevol vale un punto", 1, 6);
  showAt("Evita que te coman los pacmin!", 1, 8);
  showAt("Nueva vida cada " + PUNTOS_NUEVA_VIDA + " puntos.",
         1, 10);
  
  showAt("Buu:", 8, 12);
  putAt(PERSONAJE_DERECHA, 17, 12);
  
  showAt("Comida:", 8, 14);
  putAt(COMIDA, 17, 14);
  
  showAt("Pacmin:", 8, 16);
  putAt(PACMIN, 17, 16);
  
  showAt("Presiona la barra de", 10, 20);
  showAt("espacio para empezar", 10, 21);
  
  while (readCtrlOne() != BOTON_ESPACIO)
    ;
}

init() {
  xPersonaje = 16;
  yPersonaje = 12;
  dirPersonaje = DERECHA;
  nuevaPosicionComida();
  pacmins = [
     {tipo: ATACA, velocidad: 40, x: MAX_X, y: MAX_Y},
     {tipo: ATACA, velocidad: 40, x: MIN_X, y: MAX_Y},
     {tipo: ATACA, velocidad: 40, x: MAX_X, y: MAX_Y},
     {tipo: ATACA, velocidad: 40, x: MIN_X, y: MAX_Y}, 
     {tipo: ATACA, velocidad: 40, x: MAX_X, y: MAX_Y},
     {tipo: ATACA, velocidad: 40, x: MIN_X, y: MAX_Y},
     {tipo: ATACA, velocidad: 40, x: MAX_X, y: MAX_Y},
     {tipo: ATACA, velocidad: 40, x: MIN_X, y: MAX_Y}, 
     {tipo: ATACA, velocidad: 40, x: MAX_X, y: MAX_Y},
     {tipo: ATACA, velocidad: 40, x: MIN_X, y: MAX_Y},
     {tipo: ATACA, velocidad: 40, x: MAX_X, y: MAX_Y},
     {tipo: ATACA, velocidad: 40, x: MIN_X, y: MAX_Y}, 
     {tipo: ATACA, velocidad: 40, x: MAX_X, y: MAX_Y},
     {tipo: ATACA, velocidad: 40, x: MIN_X, y: MAX_Y},
     {tipo: ATACA, velocidad: 40, x: MAX_X, y: MAX_Y},
     {tipo: ATACA, velocidad: 40, x: MIN_X, y: MAX_Y},                 
     {tipo: DEFIENDE, velocidad: 40, x: MAX_X, y: MIN_Y},
     {tipo: DEFIENDE, velocidad: 40, x: MIN_X, y: MIN_Y},
     {tipo: DEFIENDE, velocidad: 40, x: MAX_X, y: MIN_Y},
     {tipo: DEFIENDE, velocidad: 40, x: MIN_X, y: MIN_Y},
     {tipo: DEFIENDE, velocidad: 40, x: MAX_X, y: MIN_Y},
     {tipo: DEFIENDE, velocidad: 40, x: MIN_X, y: MIN_Y}                    
  ];
  puntos = 0;
  vidas = 3;
  clear();
  muestraPuntos();
  muestraVidas();
}

juega() {
  init();
  while (vidas > 0) {
    dibujaPersonaje();
    dibujaComida();
    dibujaEnemigos();
    pause(0.1);
    borraPersonaje();
    borraEnemigos();
    var boton = readCtrlOne();
    muevePersonaje(boton);
    if (personajeComioComida()) {
      nuevaPosicionComida();
      puntos = puntos + 1;
      muestraPuntos();
      if (puntos % PUNTOS_NUEVA_VIDA == 0) {
        vidas = vidas + 1;
        muestraVidas();
        note("C5");
      } else
        note("C6");
    }
    mueveEnemigos();
    if (pacminComioPersonaje()) {
      nuevaPosicionPersonaje();
      vidas = vidas - 1;
      muestraVidas();
      note("E2");
    }
  }
  showAt("FIN DEL JUEGO", 12, 9);
  showAt("PRESIONA BARRA ESPACIADORA ", 5, 11);
  showAt("PARA JUGAR DE NUEVO ", 5, 13);
  pause(3);
}


var tilesData = readTilesFile("tilesproyecto.tmap");

for (var i = 0; i < 16; i++)
  setTileColor(i, tilesData.colors[i].red,
                  tilesData.colors[i].green,
                  tilesData.colors[i].blue);

setTilePixels(PERSONAJE_ARRIBA,
              tilesData.pixels[PERSONAJE_ARRIBA]);
setTilePixels(PERSONAJE_ABAJO,
              tilesData.pixels[PERSONAJE_ABAJO]);
setTilePixels(PERSONAJE_DERECHA,
              tilesData.pixels[PERSONAJE_DERECHA]);
setTilePixels(PERSONAJE_IZQUIERDA,
              tilesData.pixels[PERSONAJE_IZQUIERDA]);
setTilePixels(COMIDA,
              tilesData.pixels[COMIDA]);
setTilePixels(PACMIN,
              tilesData.pixels[PACMIN]);


while (true) {
  muestraInstrucciones();
  juega();
}
