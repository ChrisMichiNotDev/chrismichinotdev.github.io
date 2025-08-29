var conteo, conteolog, conteoencabezado = 0, conteodark = 0, borradoinicio, borradofin, modocolumna, enlazarFilaLimiteInferior, enlazarFilaLimiteSuperior, sensitivity, caseS = false, accent = false, tablaconencabezado, tablasinencabezado;
var listaceldas, widthform, heightform, columnaEnlazada, filaEnlazada, borrarr, textotabla, enlazarColumna, enlazarFila, enlaceinicio, enlacefin, ignorarinicioenlace, ignorarfinenlace, enlazarpalabras, separadorc, atributeNameDivider, atributesDivider, markdownify;
var tabla, thead, tbody, trh, trb, td, th, div, divc;
var ejecutaragregarenlaces, ejecutarenlazarpalabras;
//Definiciónes

document.addEventListener("DOMContentLoaded", (event) => {
// Page has loaded
var storageCSS = localStorage.getItem('CSSCustom');
document.querySelector("#textoarray").placeholder = document.querySelector("#textoarray").placeholder.replaceAll('\\n', '\n')
 if (storageCSS != '' || storageCSS !== null) {
  document.getElementById('CustomCSS').value = storageCSS
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
});
history.replaceState(null, "", document.location.pathname);
}

function CrearURL() {
var allInputs = document.querySelectorAll('input[type="text"], textarea'),
inputsConTexto = []
basePath = document.location.origin + document.location.pathname,
parametros = '?',
final='';
 allInputs.forEach(input => {
  if (input.value != '' && input.id != 'textotabla') {
   inputsConTexto.push(input);
   parametros = `${parametros}${input.id}=${encodeURIComponent(input.value)}&`;
  }
 });
final = basePath + parametros.slice(0,-1);
return final;
}

function definirvariables(col = false) {
 if (col) {
  modocolumna = true
 }
 else if (!col) {
  modocolumna = false;
 }
if (document.querySelector('table') !== null ) {
document.querySelector('table').remove();
}
sensitivity = []
separadorc = vloph('separadorc');
widthform = Number(vloph('widthform'));
heightform = Number(vloph('heigthform'));
columnaEnlazada = Number(vloph('enlazarcol'))-1;
filaEnlazada = Number(vloph('enlazarfil'));
enlaceinicio = vloph('enlaceinicio');
enlacefin = vloph('enlacefin');
ignorarinicioenlace = vloph('ignorarinicioenlace');
ignorarfinenlace = vloph('ignorarfinenlace');
enlazarpalabras = vloph('enlazarpalabras').split(separadorc);
borrarr = vloph('borrar').split(separadorc);
alineamiento = vloph('alineamiento');
atributeNameDivider = vloph('separadorentreatributoynombre');
atributesDivider = vloph('separadordeatributos');
markdownify = document.getElementById('markdownify').checked;
textotabla = document.getElementById('textotabla');
determinarenlace();
 if (enlazarpalabras.length == 1 && enlazarpalabras[0] == '') {
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
 for (var conteodivenc = 0; conteodivenc < widthform; conteodivenc++) {
  trh.appendChild(th.cloneNode(true));
  trb.appendChild(td.cloneNode(true));
 }
//Crear tabla
thead.appendChild(trh);
 for (var conteotrcue = 0; conteotrcue < heightform-1; conteotrcue++) {
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
agregarceldas();
document.body.appendChild(linkbox);
}

function agregarceldas() {
CSSpersonalizado.textContent = document.getElementById('CustomCSS').value;
var sumaaltura = 0, rsaltura = -1, conteoarray = 0, conteodiv = 0, indiceAtributoCell, indiceAtributoText;
listaceldas.forEach(elemento => {
  while (borrar(listaceldas[conteoarray].charAt(0))) {
    listaceldas[conteoarray] = listaceldas[conteoarray].slice(1,listaceldas[conteoarray].length)
  }
  conteoarray++;
});
conteo = 0;
conteolog = 0;
enlazarFilaLimiteInferior = (filaEnlazada-1) * widthform;
enlazarFilaLimiteSuperior = filaEnlazada * widthform;
const divs = document.querySelectorAll('div:not(.container)');
 if (!modocolumna) {
  divs.forEach(element => {
if (element.isConnected) {
   indiceAtributoCell = listaceldas[conteo].indexOf('{cell');
   if (indiceAtributoCell != -1) {
    var indiceAtributoCellFin = listaceldas[conteo].indexOf('}', indiceAtributoCell)
    agregarAtributos(element, conteo, indiceAtributoCell, indiceAtributoCellFin)
    listaceldas[conteo] = listaceldas[conteo].slice('0',indiceAtributoCell) + listaceldas[conteo].slice(indiceAtributoCellFin+1)
   }
   indiceAtributoText = listaceldas[conteo].indexOf('{text');
   if (indiceAtributoText != -1) {
    var indiceAtributoTextFin = listaceldas[conteo].indexOf('}', indiceAtributoCell)
    agregarAtributos(element, conteo, indiceAtributoText, indiceAtributoTextFin)
    listaceldas[conteo] = listaceldas[conteo].slice('0',indiceAtributoText) + listaceldas[conteo].slice(indiceAtributoTextFin+1)
   }
   if (ejecutaragregarenlaces) {
    Enlazar();
   }
   if (ejecutarenlazarpalabras) {
    enlazarPalabras();
   }
   if (alineamiento != 'Nada' && element.style.textAlign == '') {
    var align = `text-align: ${alineamiento};`, currentstyle = element.style.cssText;
    element.style = currentstyle + align;
   }
   conteolog++;
   celda = listaceldas[conteo];
   conteo++;
   element.innerText = celda;
   if (markdownify) {
    agregarMarkdown(element);
   }
}
  });
 }
 if (modocolumna) {
  divs.forEach(element => {
if (element.isConnected) {
   if (conteodiv != 0) {
    conteocol = conteo+sumaaltura+rsaltura;
    indiceAtributoCell = listaceldas[conteocol].indexOf('{cell');
    if (indiceAtributoCell != -1) {
     var indiceAtributoCellFin = listaceldas[conteocol].indexOf('}', indiceAtributoCell)
     agregarAtributos(element, conteocol, indiceAtributoCell, indiceAtributoCellFin)
     listaceldas[conteocol] = listaceldas[conteocol].slice('0',indiceAtributoCell) + listaceldas[conteocol].slice(indiceAtributoCellFin+1)
    }
    indiceAtributoText = listaceldas[conteocol].indexOf('{text');
    if (indiceAtributoText != -1) {
     var indiceAtributoTextFin = listaceldas[conteocol].indexOf('}', indiceAtributoCell)
     agregarAtributos(element, conteocol, indiceAtributoText, indiceAtributoTextFin)
     listaceldas[conteocol] = listaceldas[conteocol].slice('0',indiceAtributoText) + listaceldas[conteocol].slice(indiceAtributoTextFin+1)
    }
    if (ejecutaragregarenlaces) {
     Enlazar(conteocol);
    }
    if (ejecutarenlazarpalabras) {
     enlazarPalabras(conteocol);
    }
    celda = listaceldas[conteocol];
   }
   else if (conteodiv == 0) {
    indiceAtributoCell = listaceldas[conteo].indexOf('{cell');
    if (indiceAtributoCell != -1) {
     var indiceAtributoCellFin = listaceldas[conteo].indexOf('}', indiceAtributoCell)
     agregarAtributos(element, conteo, indiceAtributoCell, indiceAtributoCellFin)
     listaceldas[conteo] = listaceldas[conteo].slice('0',indiceAtributoCell) + listaceldas[conteo].slice(indiceAtributoCellFin+1)
    }
    indiceAtributoText = listaceldas[conteo].indexOf('{text');
    if (indiceAtributoText != -1) {
     var indiceAtributoTextFin = listaceldas[conteo].indexOf('}', indiceAtributoCell)
     agregarAtributos(element, conteo, indiceAtributoText, indiceAtributoTextFin)
     listaceldas[conteo] = listaceldas[conteo].slice('0',indiceAtributoText) + listaceldas[conteo].slice(indiceAtributoTextFin+1)
    }
    if (ejecutaragregarenlaces) {
     Enlazar();
    }
    if (ejecutarenlazarpalabras) {
     enlazarPalabras();
    }
    celda = listaceldas[conteo];
    rsaltura++;
   }
   if (alineamiento != 'Nada' && element.style.textAlign == '') {
    var align = `text-align: ${alineamiento};`, currentstyle = element.style.cssText;
    element.style = currentstyle + align;
   }
   element.innerText = celda;
   if (markdownify) {
    agregarMarkdown(element);
   }
   sumaaltura = sumaaltura + heightform;
   conteodiv++;
   conteolog++;
   if (conteodiv % widthform == 0 && conteodiv != 0) {
    conteo++;
    conteodiv = 0;
    sumaaltura = 0;
    rsaltura = -1;
   }
}
  });
 }
textotabla.value = document.querySelector('table').outerHTML.replaceAll('>', '>\n').replaceAll('</div>', '\n</div>');
textotabla.style = 'width:400px;height:250px;';
conteoencabezado = 0;
console.log('Busqueda realizada en',divs.length,'Divs. Agregadas',conteolog,'celdas de',listaceldas.length,'disponibles');
tablaconencabezado = '';
tablasinencabezado = '';
localStorage.setItem(`CSSCustom`,document.getElementById('CustomCSS').value)
}

function quitarencabezado() {
 if (conteoencabezado == 0) {
  if (tablaconencabezado == '') {
   tablaconencabezado = textotabla.value;
   textotabla.value = textotabla.value.replaceAll('\n<tbody>', '').replaceAll('\n<thead>', '\n<tbody>').replaceAll('\n</thead>', '').replaceAll('<th>', '<td>').replaceAll('</th>', '</td>');
   tablasinencabezado = textotabla.value
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
//       Enlazar(enlazarColumna,enlazarFila,listaceldas,conteo,conteolog,widthform,columnaEnlazada,enlazarFilaLimiteInferior,enlazarFilaLimiteSuperior,enlaceinicio,enlacefin);
function Enlazar(indice = conteo) {
 if (enlazarColumna) {
//formula: indice del listaceldas dividido entre la longitud de la tabla sobrante igual enlazarColumna a enlazar-1
  if(conteolog % widthform == columnaEnlazada) {
   borradoInicioE(listaceldas,indice,listaceldas[indice],0);
   borradoFinE(listaceldas,indice,listaceldas[indice],0);
   listaceldas[indice] = crearEnlace(listaceldas,indice,0,listaceldas[indice].length);
  }
 }
 if (enlazarFila) {
  if (conteolog >= enlazarFilaLimiteInferior && conteolog < enlazarFilaLimiteSuperior) {
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
break
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
break
}
 }
}

function determinarenlace() {
 if (isNaN(filaEnlazada)) {
  enlazarFila = false;
 }
 else {
  enlazarFila = true;
 }
 if (isNaN(columnaEnlazada)) {
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
  enlazarpalabras.forEach(palabra => {
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
  enlazarpalabras[conteopal] = aplanartexto(palabra, caseS, accent);
  var temp = enlazarpalabras[conteopal].slice(0,cini);
  if (temp.charAt(temp.length-1) == ' ') {
   enlazarpalabras[conteopal] = temp.slice(0,-1);
  }
  else {
   enlazarpalabras[conteopal] = temp;
  }
  conteopal++;
 });
}

function enlazarPalabras(indice = conteo, array = listaceldas, listapalabras = enlazarpalabras) {
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
}
outer = elemento.innerHTML;
var conteobarra = 0, barra = '';
 while (outer.indexOf('**') != -1) {
  remplazoMarkdown('**', 'strong');
 }
 conteobarra = 0;
 while (outer.indexOf('__') != -1) {
  remplazoMarkdown('__', 'strong')
 }
 conteobarra = 0;
 while (outer.indexOf('~~') != -1) {
  remplazoMarkdown('~~', 'del')
 }
 conteobarra = 0;
 while (outer.indexOf('*') != -1) {
  remplazoMarkdown('*', 'em')
 }
 conteobarra = 0;
 while (outer.indexOf('_') != -1) {
  remplazoMarkdown('_', 'em')
 }
elemento.innerHTML = outer;
}

function agregarAtributos(elemento, indice = conteo, puntoinicio, puntofin) {
arin = listaceldas[indice].slice(puntoinicio, puntofin-1);
 if (arin.indexOf('{cell') == 0) {
  arin = arin.slice('cell'.length+2)
  elemento = elemento.parentElement
 }
 if (arin.indexOf('{text') == 0) {
  arin = arin.slice('text'.length+2)
 }
arin = arin.split(atributesDivider);
 arin.forEach(ele => {
 var atributo = ele.split(atributeNameDivider);
 elemento.setAttribute(atributo[0],atributo[1]);
  if (atributo[0].toLowerCase() == 'colspan' && elemento.tagName != 'DIV') {
   var tr = elemento.parentElement, repeticiones = Number(atributo[1])-1;
   for (var count = 0; count < repeticiones;count++) {
    tr.lastElementChild.remove();
   }
  }
 });
}
function eventlisteners() {
const dark = document.getElementById("darkmode");
 dark.addEventListener("mouseup", () => {
  darkchange();
  });
const giradores = document.querySelectorAll(".girar");
 giradores.forEach(button => {
  button.addEventListener("mouseup", () => {
   girar(document.getElementById(button.getAttribute('input1')), document.getElementById(button.getAttribute('input2')));
  });
 });
const sepac = document.getElementById("separadorc");
 sepac.addEventListener("keyup", () => {
  separadorc = vloph('separadorc');
  document.querySelector('label[for="borrar"]').textContent = cambiaretiqueta('o', 'Caracteres a borrar del inicio')
  document.querySelector('label[for="enlazarpalabras"]').textContent = cambiaretiqueta('a', 'Palabras a enlazar')
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
  setTimeout(() => {ocultarcopia();}, 1500);
 }
}

function ocultarcopia() {
document.querySelector('.copy').style.bottom='-3em';
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

function tomartexto(conteo) {
conteo = 0;
var separacion = vloph('separacion');
 if (separacion == '\\n') {
  separacion='\n'
 }
listaceldas = vloph('textoarray').split(separacion);
 listaceldas.forEach(ele => {
  listaceldas[conteo] = listaceldas[conteo].replaceAll('\n', '');
  conteo++;
 });
rellenarcolumnasyfilas();
//Rellenar el array para que la tabla no diga 'undefined'
 if (listaceldas.length < widthform * heightform) {  
  var arrlo = listaceldas.length;
  listaceldas.length = widthform * heightform;
  listaceldas.fill('',arrlo,widthform * heightform);
  console.log('añadir Relleno',widthform * heightform - arrlo)
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

function rellenarcolumnasyfilas(parte1, parte2, longitudDeColumna, indicecorchetes, relleno, conteo=0, comando, heightOrWidth, invertidoHeightorwidth) {
var colbreak = vloph('colbreak'), rowbreak = vloph('rowbreak');
 while (true) {
//console.log('col',listaceldas.indexOf(colbreak),'row',listaceldas.indexOf(rowbreak));
//console.log('col',listaceldas[listaceldas.indexOf(colbreak)],'row',listaceldas[listaceldas.indexOf(rowbreak)]);
  if (listaceldas.indexOf(colbreak) < listaceldas.indexOf(rowbreak) && listaceldas.indexOf(colbreak) != -1|| listaceldas.indexOf(rowbreak) == -1) {
   comando = colbreak;
   heightorwidth = heightform;
   invertidoHeightOrWidth = widthform;
  }
  else {
   comando = rowbreak;
   heightorwidth = widthform;
   invertidoHeightOrWidth = heightform;
  }
  if (listaceldas.indexOf(colbreak) == -1 && listaceldas.indexOf(rowbreak) == -1) {
   break;
  }
  indicecorchetes = listaceldas.indexOf(comando);
  parte1 = listaceldas.slice(0, indicecorchetes);
  parte2 = listaceldas.slice(indicecorchetes+1);
  longitudDeColumna = parte1.length % heightorwidth;
  if (modocolumna && comando == rowbreak || !modocolumna && comando == colbreak) {
   var conteoRuptura = 0;
   listaceldas = parte1.concat(parte2);
   indicecorchetes = indicecorchetes-1;
   if (indicecorchetes < 0) {
    indicecorchetes = 0;
    listaceldas.splice(indicecorchetes, 0, 'rewiycol');
   }
   while (indicecorchetes+invertidoHeightOrWidth < heightform*widthform) {
    indicecorchetes = indicecorchetes + invertidoHeightOrWidth;
    if (conteoRuptura > heightform*widthform) {
     console.log('error fatal');
     break;
    }
    listaceldas.splice(indicecorchetes, 0, '');
conteoRuptura++;
   }
  }
  else {
   relleno = Array(heightorwidth - longitudDeColumna).fill('');
   listaceldas = parte1.concat(relleno,parte2);
  }
conteo++;
if (conteo > 9000) {
console.log('+',conteo);
break
}
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

//Sección de manipulación de texto

function borrar(textorevisar, arrayrevisar = borrarr) {
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
