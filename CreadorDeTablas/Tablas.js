var conteo, conteolog, conteoencabezado = 0, conteodark = 0, casilla = {Columna:0,Fila:0}, evitarRepeticiones, borradoinicio, borradofin, modocolumna, sensitivity, caseS = false, accent = false, tablaconencabezado, tablasinencabezado, infiniteLoopColSpanRowSpan;
var listaceldas, celdasCache, listaconteo, listaceldasignoradas, listaCeldasAgregarRowSpan, listaCeldasBorrarRowSpan, listaCeldasBorrarColSpan, widthform, heightform, textotabla, enlazarColumna, enlazarFila, enlaceinicio, enlacefin, ignorarinicioenlace, ignorarfinenlace, separadorc, colbreak, rowbreak, atributeNameDivider, atributesDivider, linebreak, rowsofheader, markdownify, CustomCSSCampo, estilizarTextoOCelda, widthAuto, heightAuto;
var tabla, thead, tbody, trh, trb, td, th, div, divc;
var ejecutaragregarenlaces, ejecutarenlazarpalabras;
var actualizarCeldasID = '', CeldasLogElement;

//Definiciónes

document.addEventListener("DOMContentLoaded", (event) => {
// Page has loaded
CustomCSSCampo = document.getElementById('CustomCSS');
CeldasLogElement = document.getElementById("numberofcells")
var storageCSS = localStorage.getItem(localStorage.getItem('lastCSS'));
document.querySelector("#textoarray").placeholder = document.querySelector("#textoarray").placeholder.replaceAll('\\n', '\n')
 if (storageCSS != '' && storageCSS !== null) {
  CustomCSSCampo.value = storageCSS;
 }
 if (localStorage.getItem('lastCSS') !== null) {
  document.getElementById('CSSSaveButton').value = `Guardar a ${localStorage.getItem('lastCSS').slice(3)}`;
 }
eventlisteners();
LimpiarURL();
definirvariables(false);
});
function LimpiarURL() {
var queryURL = document.location.search.slice(1);
queryURL = queryURL.split('&');
queryURL.forEach(ele => {
var idYvalor = ele.split('='),elemento=document.getElementById(idYvalor[0]);
 if (elemento !== null && elemento.type == 'text' || elemento !== null && elemento.type == 'textarea') {
  elemento.value = decodeURIComponent(idYvalor[1]);
 }
 else if (elemento !== null && elemento.tagName == 'SELECT') {
  elemento.selectedIndex = idYvalor[1];
 }
 else if (elemento !== null && elemento.type == 'checkbox') {
  elemento.checked = (idYvalor[1] == 'true');
 }
});
history.replaceState(null, "", document.location.pathname);
}

function CrearURL() {
var allInputs = document.querySelectorAll('form[name="tableproperties"] input[type="text"], form[name="tableproperties"] textarea, form[name="tableproperties"] select, form[name="tableproperties"] input[type="checkbox"]'),
inputsConTexto = []
basePath = document.location.origin + document.location.pathname,
parametros = '?',
final='';
 allInputs.forEach(input => {
  if (input.value != '' && input.id != 'textotabla') {
   inputsConTexto.push(input);
   if (input.type == 'checkbox') {
    parametros = `${parametros}${input.id}=${input.checked}&`;
   }
   else if (input.tagName == 'SELECT') {
    if (input.selectedIndex != 0) {
     parametros = `${parametros}${input.id}=${input.selectedIndex}&`;
    }
   }
   else {
    if (input.id != 'CustomCSS' || input.id == 'CustomCSS' && checked('CSSinURL')) {
     parametros = `${parametros}${input.id}=${encodeURIComponent(input.value)}&`;
    }
   }
  }
 });
final = basePath + parametros.slice(0,-1);
return final;
}

function cambiarPropiedad(propiedad) {
var textoCampoDeTexto = vloph(propiedad.id);
 if (propiedad.datatype == 'list') {
  if (textoCampoDeTexto.indexOf(separadorc) == 0) {
   textoCampoDeTexto = textoCampoDeTexto.replace(separadorc, '${commadivider}')
  }
  propiedad.value = textoCampoDeTexto.split(separadorc);
  var indiceSeparador = propiedad.value.indexOf('${commadivider}');
  if (indiceSeparador != -1) {
   propiedad.value[indiceSeparador] = propiedad.value[indiceSeparador].replace('${commadivider}', separadorc)
  }
  if (propiedad.type == 'number') {
   var conteo = 0;
   propiedad.value.forEach(elemento => {
    propiedad.value[conteo] = Number(elemento)+propiedad.modificador;
    conteo++;
   });
  }
  while (propiedad.value.indexOf('') != -1) {
   propiedad.value.splice(propiedad.value.indexOf(''),1);
  }
 }
 else {
  propiedad.value = textoCampoDeTexto;
  if (propiedad.type == 'number') {
   propiedad.value = Number(propiedad.value)+propiedad.modificador
  }
 }
}

function definirvariables() {
modocolumna = checked('modocolumna');
sensitivity = [];
separadorc = vloph('separadorc');
 if (vloph('widthform') == 'auto') {
  widthAuto = true;
  widthform = vloph('minWidth');
 }
 else {
  widthAuto = false;
  widthform = Number(vloph('widthform'));
 }
 if (vloph('heigthform') == 'auto') {
  heightAuto = true;
  heightform = vloph('minHeight');
 }
 else {
  heightform = Number(vloph('heigthform'));
  heightAuto = false;
 }
 for (var objeto in propiedades) {
  if (propiedades.hasOwnProperty(objeto)) {
   cambiarPropiedad(propiedades[objeto]);
  }
 }
enlaceinicio = vloph('enlaceinicio');
enlacefin = vloph('enlacefin');
ignorarinicioenlace = vloph('ignorarinicioenlace');
ignorarfinenlace = vloph('ignorarfinenlace');
colbreak = vloph('colbreak');
rowbreak = vloph('rowbreak');
alineamiento = vloph('alineamiento');
atributeNameDivider = vloph('separadorentreatributoynombre');
atributesDivider = vloph('separadordeatributos');
markdownify = checked('markdownify');
linebreak = vloph('linebreakcommand');
rowsofheader = Number(vloph('rowsofheader'));
estilizarTextoOCelda = vloph('textoocelda');
atributosfilaycolumna = vloph('atributosfilaycolumna').split(atributesDivider);
textotabla = document.getElementById('textotabla');
celdasCache = [];
listaconteo = [];
listaceldasignoradas = [];
listaCeldasAgregarRowSpan = [];
listaCeldasBorrarRowSpan = [];
listaCeldasBorrarColSpan = [];
evitarRepeticiones = {agregarceldasCSS: false, ColSpanRowSpanColumMode: false, postAgregarCeldas: false};
determinarenlace();
 if (propiedades.enlazarpalabras.value.length == 1 && propiedades.enlazarpalabras.value[0] == '') {
  ejecutarenlazarpalabras = false;
 }
 else {
  ejecutarenlazarpalabras = true;
  aplanarpalabras();
 }
tomartexto();
creartabla();
}

//Sección de tablas

function creartabla() {
 if (document.querySelector('table') !== null ) {
  document.querySelector('table').remove();
 }
tabla = document.createElement('table');
thead = document.createElement('thead');
tbody = document.createElement('tbody');
trh = document.createElement('tr');
//Crear celdas
th = document.createElement('th');
div = document.createElement('div');
th.appendChild(div);
trb = document.createElement('tr');
td = document.createElement('td');
divc = document.createElement('div');
td.appendChild(divc);
 for (var conteoDIV = 0; conteoDIV < widthform; conteoDIV++) {
  trh.appendChild(th.cloneNode(true));
  trb.appendChild(td.cloneNode(true));
 }
//Crear tabla
 for (var conteoTREncabezado = 0; conteoTREncabezado < rowsofheader; conteoTREncabezado++) {
  if (conteoTREncabezado >= heightform) {
   break;
  }
  thead.appendChild(trh.cloneNode(true));
 }
 for (var conteoTRcuerpo = 0; conteoTRcuerpo < heightform-rowsofheader; conteoTRcuerpo++) {
  tbody.appendChild(trb.cloneNode(true));
 }
tabla.appendChild(thead);
tabla.appendChild(tbody);
document.body.appendChild(tabla);
var atributostabla = vloph(tableatributes)
atributostabla = atributostabla.split(atributesDivider);
atributostabla.forEach(ele => {
var atributo = ele.split(atributeNameDivider);
if (atributo.length > 1) {
 document.querySelector('table').setAttribute(atributo[0],atributo[1])
}
});
estilizarFilasYColumnas();
agregarceldas();
document.body.appendChild(linkbox);
}

function estilizarFilasYColumnas() {
estilizarTextoOCelda = vloph('textoocelda');
atributosfilaycolumna = vloph('atributosfilaycolumna').split(atributesDivider);
cambiarPropiedad(propiedades.estilizarColumna);
cambiarPropiedad(propiedades.estilizarFila);
/*estilizar filas*/
 propiedades.estilizarFila.value.forEach(Fila => {
  if (Fila <= widthform && Fila >= 0) {
   if (tabla.querySelectorAll('tr')[Fila]!=undefined) {
    tabla.querySelectorAll('tr')[Fila].querySelectorAll('*:not(div)').forEach(elemento => {
     var celda = elemento;
     if (estilizarTextoOCelda == 'text') {
      celda = celda.firstElementChild;
     }
     agregarListaDeAtributos(celda,atributosfilaycolumna);
    });
   }
  }
 });
/*estilizar columnas*/
 propiedades.estilizarColumna.value.forEach(Columna => {
  if (Columna <= heightform && Columna >= 0) {
   tabla.querySelectorAll('tr').forEach(elemento => {
    var celda = elemento.children[Columna];
    if (celda != undefined) {
     if (estilizarTextoOCelda == 'text') {
      celda = celda.firstElementChild;
     }
     agregarListaDeAtributos(celda,atributosfilaycolumna);
    }
   });
  }
 });
}

function agregarceldas() {
 function colocarTexto() {
  element = element.firstElementChild;
  if (conteo > listaceldas.length-1) {
   return 'endOfList'
  }
  indiceAtributoCell = listaceldas[conteo].indexOf('{cell');
  if (indiceAtributoCell != -1) {
   var indiceAtributoCellFin = listaceldas[conteo].indexOf(']}', indiceAtributoCell);
   agregarAtributos(element, conteo, indiceAtributoCell, indiceAtributoCellFin);
  }
  indiceAtributoText = listaceldas[conteo].indexOf('{text');
  if (indiceAtributoText != -1) {
   var indiceAtributoTextFin = listaceldas[conteo].indexOf(']}', indiceAtributoCell);
   agregarAtributos(element, conteo, indiceAtributoText, indiceAtributoTextFin);
  }
  if (ejecutaragregarenlaces) {
   Enlazar();
  }
  if (ejecutarenlazarpalabras) {
   enlazarPalabras();
  }
  celda = listaceldas[conteo];
  conteo++;
  if (alineamiento != 'Nada' && element.style.textAlign == '') {
   var align = `text-align: ${alineamiento};`, currentstyle = element.style.cssText;
   element.style = currentstyle + align;
  }
  element.innerText = celda;
  element.innerHTML = element.innerHTML.replaceAll(linebreak,'<br>');
  if (markdownify) {
   agregarMarkdown(element);
  }
 }
 function saltarCeldas() {
 var Salto = listaceldasignoradas.find(elemento => elemento.celda == `row${casilla.Fila}col${casilla.Columna}`);
  if (Salto !== undefined) {
   var parte1 = Salto.action.slice(0,Salto.action.indexOf('+')), parte2 = Number(Salto.action.slice(Salto.action.indexOf('+')+1));
   casilla[parte1] = casilla[parte1] + parte2;
   saltarCeldas();
  }
 }
 function ColAndRowBreak() {
  var rb = 0;
  while (listaceldas[conteo] == colbreak || listaceldas[conteo] == rowbreak) {
   if (listaceldas[conteo] == rowbreak) {
    var modificadorColumna = 0, modificadorFila = 0;
    if (modocolumna) {
     modificadorColumna = 0;
     modificadorFila = -1;
     if (heightform == 1 && casilla.Fila == 0) {
      modificadorFila=0;
     }
    }
    for (count = casilla.Columna; count < widthform;count++) {
     listaceldasignoradas.push(`row${casilla.Fila+modificadorFila}col${count}`);
    }
   }
   if (listaceldas[conteo] == colbreak) {
    var modificadorColumna = -1, modificadorFila = 1;
     if (casilla.Columna+modificadorColumna == -1) {
      modificadorColumna=0;
     }
     if (!modocolumna && widthform == 1 && casilla.Fila == 1) {
      modificadorFila=0;
     }
    if (modocolumna) {
     modificadorColumna = 0;
     modificadorFila = 0;
    }
    for (count = casilla.Fila+modificadorFila; count < heightform;count++) {
     listaceldasignoradas.push(`row${count}col${casilla.Columna+modificadorColumna}`);
    }
   }
   listaceldas.splice(conteo,1)
rb++;
if (rb > 20) {
console.log('8')
 break;
}
  }
 }
 function ignorarCelda() {
  if (listaceldasignoradas.indexOf(`row${casilla.Fila}col${casilla.Columna}`) != -1) {
   return true;
  }
 return false;
 }
 function ordenarDerechaAIzquierda(celda1, celda2) {
  return celda2.col - celda1.col;
 }
function ColSpanAndRowSpanColumnMode() {
listaCeldasBorrarRowSpan.sort(ordenarDerechaAIzquierda);
 listaCeldasBorrarRowSpan.forEach(o => {
  if (trs[o.row] !== undefined) {
   if (trs[o.row].children[o.col] !== undefined) {
    trs[o.row].children[o.col].remove();
   }
  }
 });
 listaCeldasBorrarColSpan.forEach(o => {
  if (trs[o.row] !== undefined) {
   if (trs[o.row].children[o.col] !== undefined) {
    trs[o.row].children[o.col].remove();
   }
  }
 });
 listaCeldasAgregarRowSpan.forEach(o => {
  if (o.row-1 > rowsofheader-1) {
   for (var col = o.col-1; col >= 0; col--) {
    for (var row = o.row-1; row > rowsofheader-1; row--) {
     var busqueda = listaCeldasAgregarRowSpan.find(obj => obj.row == row && obj.col == col);
     if (busqueda !== undefined && Number(busqueda.rowspan) + row > o.row) {
      o.col = o.col-(trs[busqueda.row].children[busqueda.col].colSpan);
     }
    }
   }
  }
  trs[o.row].children[o.col].setAttribute('rowspan',o.rowspan);
 });
}
 function seguirRepitiendo() {
  if (listaconteo.length >= 15) {
   var valoresYaRevisados = [];
   for (var conteo = 0; conteo < listaconteo.length; conteo++) {
    function yaRevisado(element) {
    return element == elemento;
    }
    var elemento = listaconteo[conteo];
    if (!valoresYaRevisados.some(yaRevisado)) {
     if (listaconteo.filter(elementoEnFilter => elementoEnFilter == elemento).length >= 15) {
      return false;
     }
    valoresYaRevisados.push(elemento);
    }
   }
  }
  return true;
 }
 function expandirtabla() {
  if (widthAuto) {
   widthform++;
  }
  if (heightAuto) {
   heightform++;
  }
  listaceldasignoradas = [];
  listaCeldasAgregarRowSpan = [];
  listaCeldasBorrarRowSpan = [];
  listaCeldasBorrarColSpan = [];
 }
 if (evitarRepeticiones.agregarceldasCSS == false) {
  CSSpersonalizado.textContent = CustomCSSCampo.value;
  evitarRepeticiones.agregarceldasCSS = true;
 }
var conteoarray = 0, indiceAtributoCell, indiceAtributoText, element;
listaceldas.forEach(elemento => {
  while (borrar(listaceldas[conteoarray].charAt(0))) {
    listaceldas[conteoarray] = listaceldas[conteoarray].slice(1,listaceldas[conteoarray].length)
  }
  conteoarray++;
});
conteo = 0;
conteolog = 0;
 if (!modocolumna) {
  var trs = tabla.querySelectorAll('tr');
  for (casilla.Fila = 0; casilla.Fila < heightform; casilla.Fila++) {
   for (casilla.Columna = 0; casilla.Columna < widthform; casilla.Columna++) {
    ColAndRowBreak()
    var element = trs[casilla.Fila].children[casilla.Columna];
    if (element !== undefined && !ignorarCelda()) {
     if (colocarTexto() == 'endOfList') {
      break;
     }
    }
   }
  }
  listaconteo.push(conteo)
  if ((widthAuto || heightAuto) && conteo < listaceldas.length) {
   if (seguirRepitiendo()) {
    expandirtabla();
    tomartexto("cache");
    creartabla();
   }
  }
 }
 if (modocolumna) {
  var trs = tabla.querySelectorAll('tr');
  for (casilla.Columna = 0; casilla.Columna < widthform; casilla.Columna++) {
   for (casilla.Fila = 0; casilla.Fila < heightform; casilla.Fila++) {
    ColAndRowBreak()
    saltarCeldas();
    if (casilla.Fila < heightform) {
     element = trs[casilla.Fila].children[casilla.Columna];
     if (element !== undefined && !ignorarCelda()) {
      if (colocarTexto() == 'endOfList') {
       break;
      }
     }
    }
   }
  }
  listaconteo.push(conteo)
  if ((widthAuto || heightAuto) && conteo < listaceldas.length) {
   if (seguirRepitiendo()) {
    expandirtabla();
    tomartexto("cache");
    creartabla();
   }
  }
  if (evitarRepeticiones.ColSpanRowSpanColumMode == false) {
   ColSpanAndRowSpanColumnMode();
   evitarRepeticiones.ColSpanRowSpanColumMode = true;
  }
 }
 if (evitarRepeticiones.postAgregarCeldas == false) {
  textotabla.value = document.querySelector('table').outerHTML.replaceAll('>', '>\n').replaceAll('</div>', '\n</div>');
  textotabla.style = 'width:400px;height:250px;';
  conteoencabezado = 0;
  document.getElementById("tabledimensions").textContent=`Dimensiones de la tabla:${widthform}x${heightform}`
  console.log('Agregadas',conteo,'celdas de',listaceldas.length,'disponibles');
  tablaconencabezado = '';
  tablasinencabezado = '';
  actualizarCantidadDeCeldas();
  localStorage.setItem(`CSSCustom`,CustomCSSCampo.value);
  if (localStorage.getItem('lastCSS') === null) {
   localStorage.setItem('lastCSS',`CSSCustom`);
  }
  evitarRepeticiones.postAgregarCeldas = true;
 }
}

function quitarencabezado() {
 if (conteoencabezado == 0) {
  if (tablaconencabezado == '') {
   tablaconencabezado = textotabla.value;
   textotabla.value = textotabla.value.replaceAll('\n</th>\n</tr>\n</thead>\n<tbody>','\n</td>\n</tr>').replaceAll('\n<thead>','\n<tbody>').replaceAll('\n</th>\n<th','\n</td>\n<td').replaceAll('\n<tr>\n<th','\n<tr>\n<td');
   tablasinencabezado = textotabla.value;
  }
  else {
   textotabla.value = tablasinencabezado;
  }
  document.querySelector("#encabezado").value = 'Añadir Encabezado';
  conteoencabezado++;
 }
 else {
  document.querySelector("#encabezado").value = 'Quitar Encabezado'
  textotabla.value = tablaconencabezado;
  conteoencabezado = 0;
 }
document.querySelector('table').outerHTML = textotabla.value;
}

//Seccion de enlaces

function crearEnlace(array,indice,puntoinicio,palabra) {
/*
Log util para ver el funcionamiento de los enlaces
console.log('array[indice]',array[indice],'pi',puntoinicio,'p',palabra,'bi',borradoinicio,'bf',borradofin)
*/
return array[indice].slice(0,puntoinicio+borradoinicio)+
enlaceinicio+
array[indice].slice(puntoinicio+borradoinicio,puntoinicio+palabra-borradofin)+
enlacefin+
array[indice].slice(puntoinicio+palabra-borradofin);
}

function Enlazar(indice = conteo) {
 if (enlazarColumna) {
  if(propiedades.columnaEnlazada.value.some((x) => x == casilla.Columna)) {
   borradoInicioE(listaceldas,indice,listaceldas[indice],0);
   borradoFinE(listaceldas,indice,listaceldas[indice],0);
   listaceldas[indice] = crearEnlace(listaceldas,indice,0,listaceldas[indice].length);
  }
 }
 if (enlazarFila) {
  if (propiedades.filaEnlazada.value.some((x) => x == casilla.Fila)) {
   borradoInicioE(listaceldas,indice,listaceldas[indice],0);
   borradoFinE(listaceldas,indice,listaceldas[indice],0);
   if (listaceldas[indice].slice(0,enlaceinicio.length) != enlaceinicio) {
    listaceldas[indice] = crearEnlace(listaceldas,indice,0,listaceldas[indice].length);
   }
  }
 }
}

function borradoInicioE(array,indice,palabra,puntoinicio) {
borradoinicio = 0;
var arin = array[indice].slice(puntoinicio,puntoinicio+palabra.length);
 while (arin.charAt(0) == ignorarinicioenlace) {
  borradoinicio++;
  arin = arin.slice(1);
  if (borradoinicio > 800) {
   console.log(arin,'inimal');
   break;
  }
 }
}

function borradoFinE(array,indice,palabra,puntoinicio) {
borradofin = 0;
var arin = array[indice].slice(puntoinicio,puntoinicio+palabra.length);
 while (arin.charAt(arin.length-1) == ignorarfinenlace) {
  borradofin++;
  arin = arin.slice(0,-1);
  if (borradofin > 800) {
   console.log(arin,'finmal');
   break;
  }
 }
}

function determinarenlace() {
 if (propiedades.filaEnlazada.value.some((x) => isNaN(x))) {
  enlazarFila = false;
 }
 else {
  enlazarFila = true;
 }
 if (propiedades.columnaEnlazada.value.some((x) => isNaN(x))) {
  enlazarColumna = false;
 }
 else {
  enlazarColumna = true;
 }
 if (enlazarFila || enlazarColumna) {
  ejecutaragregarenlaces = true;
 }
 else {
  ejecutaragregarenlaces = false;
 }
}

function aplanarpalabras() {
var conteopal = 0;
  propiedades.enlazarpalabras.value.forEach(palabra => {
  var cini = palabra.indexOf('['), cfin = palabra.indexOf(']');
  caseS = false, accent = false;
  if (cini != -1 && cfin != -1) {
   var corchetes = palabra.slice(cini,cfin+1);
   sensitivity.push(corchetes);
   determinarSensibilidad(corchetes);
  }
  else {
   sensitivity.push('[]');
   cini = palabra.length;
  }
  propiedades.enlazarpalabras.value[conteopal] = aplanartexto(palabra, caseS, accent);
  var temp = propiedades.enlazarpalabras.value[conteopal].slice(0,cini);
  if (temp.charAt(temp.length-1) == ' ') {
   propiedades.enlazarpalabras.value[conteopal] = temp.slice(0,-1);
  }
  else {
   propiedades.enlazarpalabras.value[conteopal] = temp;
  }
  conteopal++;
 });
}

function enlazarPalabras(indice = conteo, array = listaceldas, listapalabras = propiedades.enlazarpalabras.value) {
var conteo = 0; 
listapalabras.forEach(palabra => {
 caseS = false, accent = false;
 determinarSensibilidad(sensitivity[conteo]);
 arin = aplanartexto(array[indice], caseS, accent);
 conteo++;
 var indexOfFirst = 0, offset = enlaceinicio.length, conteoinfinito = 0;
   while (indexOfFirst != -1 && palabra != '') {
    indexOfFirst = arin.indexOf(palabra, indexOfFirst);
     if (indexOfFirst == -1) {
      break;
     }
     else {
      borradoInicioE(array,indice,palabra,indexOfFirst);
      borradoFinE(array,indice,palabra,indexOfFirst);
      array[indice] = crearEnlace(array,indice,indexOfFirst,palabra.length);
      arin = aplanartexto(array[indice]);
     }
    indexOfFirst = indexOfFirst + palabra.length + offset +1;
    conteoinfinito++;
    if (conteoinfinito > 1500) {
     document.querySelector("summary").innerText = 'infinite loop (more than 1500 iterations)';
     document.querySelector("summary").style = 'font-size: 25px;';
     break;
    }
   }
 });
}

//Sección de Manipulación HTML

function agregarMarkdown(elemento, outer) {
function remplazoMarkdown(marketiqueta, etiqueta) {
  if (conteobarra == 0) {
   conteobarra++;
   barra = '';
  }
  else {
   conteobarra = 0;
   barra = `/`;
  }
  outer = outer.replace(`${marketiqueta}`, `<${barra}${etiqueta}>`);
  if (conteobarra == 1) {
   remplazoMarkdown(marketiqueta, etiqueta);
  }
}
outer = elemento.innerHTML;
var conteobarra = 0, barra = '';
  while (outer.indexOf('**') != outer.lastIndexOf('**')) {
   remplazoMarkdown('**', 'strong');
  }
  while (outer.indexOf('__') != outer.lastIndexOf('__')) {
   remplazoMarkdown('__', 'strong')
  }
  while (outer.indexOf('~~') != outer.lastIndexOf('~~')) {
   remplazoMarkdown('~~', 'del')
  }
  while (outer.indexOf('*') != outer.lastIndexOf('*')) {
   remplazoMarkdown('*', 'em')
  }
  while (outer.indexOf('_') != outer.lastIndexOf('_')) {
   remplazoMarkdown('_', 'em')
  }
elemento.innerHTML = outer;
}

function agregarAtributos(elemento, indice = conteo, puntoinicio, puntofin) {
var arin = listaceldas[indice].slice(puntoinicio, puntofin);
 if (arin.indexOf('{cell') == 0) {
  arin = arin.slice('cell'.length+2)
  elemento = elemento.parentElement
 }
 if (arin.indexOf('{text') == 0) {
  arin = arin.slice('text'.length+2)
 }
 agregarListaDeAtributos(elemento, arin.split(atributesDivider));

listaceldas[indice] = listaceldas[indice].slice('0',puntoinicio) + listaceldas[indice].slice(puntofin+2);
}

function agregarListaDeAtributos(elemento, listaDeAtributos) {
 function arreglarColSpan(elemento) {
  var tr = elemento.parentElement, repeticiones = elemento.colSpan-1, fila = casilla.Fila, columna = casilla.Columna, columnaBase = casilla.Columna+1;
  for (var count = 0; count < repeticiones;count++) {
   if (!modocolumna) {
    tr.lastElementChild.remove();
   }
   if (modocolumna) {
    columna++;
    listaceldasignoradas.push(`row${fila+modificadorBorrarFilaColSpan}col${columna}`)
    listaCeldasBorrarColSpan.push({row:`${fila+modificadorBorrarFilaColSpan}`,col:`${columnaBase}`})
   }
  }
 }
 function arreglarRowSpan(elemento, modificador = 0, sumarFilaYAgregarEnLista = true) {
  var tr = elemento.parentElement, repeticiones = Number(elemento.rowSpan)-1;
  modificadorBorrarFilaColSpan = 0 - (Number(elemento.rowSpan)-1)
  if (!modocolumna) {
   for (var count = 0; count < repeticiones;count++) {
    if (tr !== null) {
     tr = tr.nextElementSibling;
    }
    if (tr !== null) {
     tr.lastElementChild.remove();
    }
   }
  }
   if (modocolumna && elemento.rowSpan > 1) {
    var fila = casilla.Fila, columna = casilla.Columna+modificador, modificadorLimiteColumnaRowspanYColspan = 1;
    if (casilla.Columna == 0) {
     modificadorLimiteColumnaRowspanYColspan = 0;
    }
    if (!sumarFilaYAgregarEnLista) {
     fila = fila - (Number(elemento.rowSpan)-1);
    }
    if (sumarFilaYAgregarEnLista) {
     listaCeldasAgregarRowSpan.push({row:`${fila}`,col:`${columna}`,rowspan:elemento.rowSpan});
     casilla.Fila = casilla.Fila + (Number(elemento.rowSpan)-1);
    }
    if (!sumarFilaYAgregarEnLista) {
     for (var conteo = columna; conteo < elemento.colSpan+modificadorLimiteColumnaRowspanYColspan; conteo++) {
      listaceldasignoradas.push({celda:`row${fila}col${conteo}`,action:`Fila+${elemento.rowSpan}`})
     }
    }
    for (var conteo = 0; conteo < Number(elemento.rowSpan)-1; conteo++) {
     fila++;
     listaCeldasBorrarRowSpan.push({row:`${fila}`,col:`${columna}`})
    }
   }
 }
 function ArreglarColspanYRowSpan(elemento) {
  if (!modocolumna) {
   for (var countColSpanAndRowSpan = 0; countColSpanAndRowSpan < elemento.colSpan-1;countColSpanAndRowSpan++) {
    arreglarRowSpan(elemento);
   }
  }
  if (modocolumna) {
   if (elemento.colSpan > 1 && elemento.rowSpan > 1) {
    for (var countColSpanAndRowSpan = 1; countColSpanAndRowSpan < elemento.colSpan;countColSpanAndRowSpan++) {
     arreglarRowSpan(elemento,countColSpanAndRowSpan,false);
    }
   }
  }
 }
var modificadorBorrarFilaColSpan = 0, modificadorLimiteColumnaRowspanYColspan = 0, countInfiniteLoopColSpanRowSpan = 0;
 listaDeAtributos.forEach(ele => {
  var atributo = ele.split(atributeNameDivider);
  if (atributo.length > 1) {
   var inicio = atributo[1].indexOf('${width');
   if (inicio != -1) {
    var fin = atributo[1].indexOf('}',inicio);
    var sinEspacios = atributo[1].slice(inicio,fin+1).replaceAll(' ','')
    var SEinicio = sinEspacios.indexOf('${width'), SEfin = sinEspacios.indexOf('}',inicio), parte2 = 0;
    if (sinEspacios.indexOf('+') != -1) {
     parte2 = sinEspacios.slice(sinEspacios.indexOf('+')+1,SEfin);
    }
    if (sinEspacios.indexOf('-') != -1) {
     parte2 = `-${sinEspacios.slice(sinEspacios.indexOf('-')+1,SEfin)}`;
    }
    atributo[1] = atributo[1].slice(0,inicio) + `${widthform+Number(parte2)}` + atributo[1].slice(fin+1)
   }
   var inicio = atributo[1].indexOf('${height');
   if (inicio != -1) {
    var fin = atributo[1].indexOf('}',inicio);
    var sinEspacios = atributo[1].slice(inicio,fin+1).replaceAll(' ','')
    var SEinicio = sinEspacios.indexOf('${height'), SEfin = sinEspacios.indexOf('}',inicio), parte2 = 0;
    if (sinEspacios.indexOf('+') != -1) {
     parte2 = sinEspacios.slice(sinEspacios.indexOf('+')+1,SEfin);
     suma = true;
    }
    if (sinEspacios.indexOf('-') != -1) {
     parte2 = `-${sinEspacios.slice(sinEspacios.indexOf('-')+1,SEfin)}`;
     resta = true;
    }
    atributo[1] = atributo[1].slice(0,inicio) + `${heightform+Number(parte2)}` + atributo[1].slice(fin+1)
   }
   elemento.setAttribute(atributo[0], atributo[1]);
  }
  var tagName = elemento.tagName;
  if (atributo[0].toLowerCase() == 'colspan' && (tagName == 'TH' || tagName == 'TD')) {
   if (atributo[1] == '0') {
    atributo[1] = widthform;
   }
   if (Number(atributo[1]) >= widthform) {
    atributo[1] = widthform - casilla.Columna;
   }
   elemento.setAttribute(atributo[0], atributo[1]);
   arreglarColSpan(elemento);
   ArreglarColspanYRowSpan(elemento);
  }
  if (atributo[0].toLowerCase() == 'rowspan' && (tagName == 'TH' || tagName == 'TD')) {
   if (atributo[1] == '0') {
    atributo[1] = heightform;
   }
   if (Number(atributo[1]) >= heightform) {
    atributo[1] = heightform - casilla.Fila;
   }
   elemento.setAttribute(atributo[0], atributo[1]);
   arreglarRowSpan(elemento);
   ArreglarColspanYRowSpan(elemento);
  }
 });
 if (modocolumna) {
  elemento.rowSpan = 1;
 }
 if (countInfiniteLoopColSpanRowSpan >= 2) {
  infiniteLoopColSpanRowSpan = true;
 }
}

function eventlisteners() {
function AgregarListaDeCSS(lista) {
var optionGenerico = document.createElement('option'),
opcioneslista = lista.options.length;
 for (var conteo = 1; conteo < opcioneslista; conteo++) {
  lista.options[1].remove();
 }
 for (var keyname in localStorage) {
  if (`${keyname}`.slice(0,3) == 'CSS') {
   var optionEspecifico = optionGenerico.cloneNode();
   optionEspecifico.text = keyname;
   optionEspecifico.value = keyname;
   lista.appendChild(optionEspecifico);
   console.log(keyname);
  }
 }
}
 ["separacion", "separadorc"].forEach(elemento => {
  document.getElementById(elemento).addEventListener("keyup", () => {
   setTimeout(() => {
    actualizarCantidadDeCeldas()
   }, 125);
  });
 });
const textoarray = document.getElementById("textoarray");
 textoarray.addEventListener("keyup", () => {
  clearTimeout(actualizarCeldasID);
  if (CeldasLogElement.textContent.lastIndexOf('.') - CeldasLogElement.textContent.indexOf('.')  < 2) {
   CeldasLogElement.textContent += '.';
  }
  else {
   CeldasLogElement.textContent = CeldasLogElement.textContent.slice(0,CeldasLogElement.textContent.length-3);
  }
  actualizarCeldasID = setTimeout(() => {
   actualizarCantidadDeCeldas()
  }, 750);
 });

const modoFila = document.getElementById("modoFila");
 modoFila.addEventListener("mouseup", () => {
  document.getElementById("modocolumna").checked = false;
  definirvariables();
 });
const modoColumna = document.getElementById("modoColumna");
 modoColumna.addEventListener("mouseup", () => {
  document.getElementById("modocolumna").checked = true;
  definirvariables();
 });
const estilizarButton = document.getElementById("estilizarButton");
 estilizarButton.addEventListener("mouseup", () => {
  estilizarFilasYColumnas();
 });

const dark = document.getElementById("darkmode");
 dark.addEventListener("mouseup", () => {
  darkchange();
 });
const CSSSaveButton = document.getElementById("CSSSaveButton");
 CSSSaveButton.addEventListener("mouseup", () => {
  GuardarPerfilCSS(localStorage.getItem('lastCSS').slice(3))
 });
const giradores = document.querySelectorAll(".girar");
 giradores.forEach(button => {
  button.addEventListener("mouseup", () => {
   girar(document.getElementById(button.getAttribute('input1')), document.getElementById(button.getAttribute('input2')));
  });
 });
const closedialogbuttons = document.querySelectorAll('button[closedialog]');
 closedialogbuttons.forEach(button => {
  button.addEventListener("click", () => {
   document.getElementById(button.getAttribute('closedialog')).close();
  });
 });
const opendialogbuttons = document.querySelectorAll('input[opendialog]');
 opendialogbuttons.forEach(button => {
  button.addEventListener("click", () => {
   document.getElementById(button.getAttribute('opendialog')).showModal();
   if (button.getAttribute('listCSS') !== null) {
    AgregarListaDeCSS(document.getElementById(button.getAttribute('listCSS')));
   }
  });
 });
const sepac = document.getElementById("separadorc");
 sepac.addEventListener("keyup", () => {
  separadorc = vloph('separadorc');
  document.querySelectorAll('[commadivided]').forEach(etiqueta => {
   etiqueta.textContent = cambiaretiqueta(etiqueta.getAttribute('ao'), etiqueta.textContent.slice(0,etiqueta.textContent.indexOf('(')-1))
  });
 });
const copybuttons = document.querySelectorAll('.copybutton');
 copybuttons.forEach(
  button => {button.addEventListener("mouseup", () => {
   writeClipboardText(document.getElementById(button.getAttribute('inputcopiar')).value);
  });
 });
const copiaropciones = document.getElementById("copiaropciones");
 copiaropciones.addEventListener("mouseup", () => {
  writeClipboardText(CrearURL());
 });
const CSSSaveAsForm = document.querySelector('#saveAsCSS');
 CSSSaveAsForm.addEventListener("submit", (ev) => {
  ev.preventDefault();
  const Nombre = document.getElementById('CSSSaveName').value
  if (Nombre.length > 0) {
   if (localStorage.getItem(`CSS${Nombre}`) === null) {
    GuardarPerfilCSS(Nombre);
    document.getElementById('saveAsCSS').close();
   }
   else if (window.confirm(`${Nombre} ya existe ¿desea reemplazarlo?`)) {
    GuardarPerfilCSS(Nombre);
    document.getElementById('saveAsCSS').close();
   }
  }
  else {
  window.alert('No hay nombre') 
  }
 });
const manageCSS = document.querySelector('#manageCSS');
 manageCSS.addEventListener("submit", (ev) => {
  ev.preventDefault();
  var lista = document.getElementById('manageCSSPresets');
  const indiceSeleccionado = lista.selectedIndex;
  if (indiceSeleccionado != 0) {
   if (window.confirm(`¿desea borrar el perfil ${lista.options[indiceSeleccionado].value}?`)) {
    localStorage.removeItem(lista.options[indiceSeleccionado].value);
    document.getElementById('manageCSS').close();
   }
  }
  else {
  window.alert('Selecciona un perfil para borrarlo') 
  }
 });
const loadCSS = document.querySelector('#loadCSS');
 loadCSS.addEventListener("submit", (ev) => {
  ev.preventDefault();
  var lista = document.getElementById('loadCSSPresets');
  const indiceSeleccionado = lista.selectedIndex;
  if (indiceSeleccionado != 0) {
   if (window.confirm(`¿desea cargar el perfil ${lista.options[indiceSeleccionado].value}?`)) {
    CustomCSSCampo.value = localStorage.getItem(lista.options[indiceSeleccionado].value);
    updateLastCSS(lista.options[indiceSeleccionado].value);
    CSSpersonalizado.textContent = CustomCSSCampo.value;
    document.getElementById('loadCSS').close();
   }
  }
  else {
  window.alert('Selecciona un perfil para cargarlo') 
  }
 });
}

function updateLastCSS(keyname) {
localStorage.setItem('lastCSS',keyname);
document.getElementById('CSSSaveButton').value = `Guardar a ${localStorage.getItem('lastCSS').slice(3)}`;
}


async function GuardarPerfilCSS(nombre) {
 try {
  document.querySelector('.save').style.bottom='2em';
  await localStorage.setItem(`CSS${nombre}`,CustomCSSCampo.value);
  document.querySelector('.save p').textContent='Datos guardados exitosamente';
 }
 catch (error) {
  console.log(error.message);
  document.querySelector('.save p').textContent='Error al guardar datos';
 }
 finally {
  updateLastCSS(`CSS${nombre}`)
  setTimeout(() => {ocultaraviso(document.querySelector('.save'));}, 1500);
 }
}

async function writeClipboardText(text) {
 try {
  document.querySelector('.copy').style.bottom='2em';
  await navigator.clipboard.writeText(text);
  document.querySelector('.copy p').textContent='Texto copiado exitosamente';
 }
 catch (error) {
  console.log(error.message);
  document.querySelector('.copy p').textContent='Error al copiar el texto';
 }
 finally {
  setTimeout(() => {ocultaraviso(document.querySelector('.copy'));}, 1500);
 }
}

function ocultaraviso(elemento) {
elemento.style.bottom='-3em';
}

function cambiaretiqueta(ao, inicio) {
return `${inicio} (separad${ao}s por "${separadorc}")`
}

function girar(el1,el2,el3) {
el3 = vloph(el2);
el2.value = vloph(el1);
el1.value = el3;
}

function darkchange(conversion, boton) {
boton = document.querySelector("#darkmode > svg > path");
 if (conteodark == 0) {
  conversion = document.querySelector('.oscuro');
   conversion.className = 'claro';
  boton.setAttribute('d',imgcla);
  conteodark++;
 }
 else {
  conversion = document.querySelector('.claro');
  conversion.className = 'oscuro';
  boton.setAttribute('d',imgdrk);
  conteodark = 0;
 }
}

function actualizarCantidadDeCeldas() {
cambiarPropiedad(propiedades.separacion);
CeldasLogElement.textContent = `Celdas:${tomartexto("log")}`;
}

function tomartexto(modo) {
 if (modo == "cache") {
  listaceldas = celdasCache.slice();
 }
 else {
  var separacion = propiedades.separacion.value,
  texto = vloph('textoarray');
  if (propiedades.separacion.value.indexOf('\\n') != -1) {
   propiedades.separacion.value[propiedades.separacion.value.indexOf('\\n')] = '\n';
  }
  else if (propiedades.separacion.value.indexOf('\n') == -1) {
   texto = texto.replaceAll('\n','')
  }
  for (var conteo = 0;conteo < propiedades.separacion.value.length-1;conteo++) {
   texto = texto.replaceAll(propiedades.separacion.value[conteo+1],propiedades.separacion.value[0]);
  }
  if (modo == "log") {
   return texto.split(propiedades.separacion.value[0]).length;
  }
  else {
   listaceldas = texto.split(propiedades.separacion.value[0]);
   celdasCache = listaceldas.slice();
   if (listaceldas[listaceldas.length-1] == '') {
    listaceldas.splice(listaceldas.length-1, 1);
   }
  }
 }
}

function determinarSensibilidad(corchetesS){
 if (corchetesS.indexOf('s') != -1) {
  caseS = true;
 }
 if (corchetesS.indexOf('a') != -1) {
  accent = true;
 }
}

function vloph(campoDeTexto) {
 //checks if the parameter is an html element if not get the element by that id 
 if (campoDeTexto instanceof HTMLElement != true) {
  campoDeTexto = document.getElementById(campoDeTexto);
 }
 if (campoDeTexto !== null) {
  if (campoDeTexto.value == '') {
   return campoDeTexto.placeholder;
  }
  else {
   return campoDeTexto.value;
  }
 }
}

function checked(caja) {
 //checks if the parameter is an html element if not get the element by that id 
 if (caja instanceof HTMLElement != true) {
  caja = document.getElementById(caja);
 }
return caja.checked;
}

//Sección de manipulación de texto

function borrar(textorevisar, arrayrevisar = propiedades.borrarinicio.value) {
 if (arrayrevisar.indexOf(textorevisar) != -1 && arrayrevisar[arrayrevisar.indexOf(textorevisar)].length > 0) {
  return true;
 }
 else {
  return false;
 }
}

function aplanartexto(TextoaAplanar, caseS = false, accent = false, Textoaplanado = TextoaAplanar) {
 if (!accent) {
//thanks for this code to Niall Maher (https://www.codu.co/articles/remove-accents-from-a-javascript-string-skgp1inb)
  Textoaplanado = TextoaAplanar.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
 }
 if (!caseS) {
  Textoaplanado = Textoaplanado.toLowerCase();
 }
return Textoaplanado;
}

const linkbox = document.createElement('div');
linkbox.className = 'container';
linkbox.style = "display:inline-block"

const creditos = document.createElement('a');
creditos.innerText = 'Creditos';
creditos.href = 'creditos.html';
linkbox.appendChild(creditos);

const spaceial = document.createElement('p');
spaceial.textContent='|';
spaceial.style="margin: 0 0.5em;font-size:20px;display:inline-block;"
linkbox.appendChild(spaceial.cloneNode(true));

const ejemplos = document.createElement('a');
ejemplos.innerText = 'Ejemplos/Funcionalidades Extra';
ejemplos.href = 'ejemplos.html';
linkbox.appendChild(ejemplos);

const CSSpersonalizado = document.createElement('style');
document.head.appendChild(CSSpersonalizado)

const imgcla = "M12 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z";
const imgdrk = "M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z";

listaceldas = [];
const propiedades = {
enlazarpalabras: {value:'', id:'enlazarpalabras', datatype:'list'},
borrarinicio: {value:'', id:'borrar', datatype:'list'},
estilizarColumna: {value:'', id:'estilizarcolumna', type:'number', modificador:-1, datatype:'list'},
estilizarFila: {value:'', id:'estilizarfila', type:'number', modificador:-1, datatype:'list'},
columnaEnlazada: {value:'', id:'enlazarcol', type:'number', modificador:-1, datatype:'list'},
filaEnlazada: {value:'', id:'enlazarfil', type:'number', modificador:-1, datatype:'list'},
separacion: {value:'', id:'separacion', datatype:'list'}
}

