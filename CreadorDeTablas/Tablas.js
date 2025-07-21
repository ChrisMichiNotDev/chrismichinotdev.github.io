var conteo, conteolog, conteoencabezado = 0, conteodark = 0, borradoinicio, borradofin, modocolumna, enlazarfilm1xw, enlazarfilxw;
var listaceldas, widthform, heightform, enlazarcol, enlazarfil, separacion, borrarr, textotabla, enlaceporcol, enlaceporfila, enlaceinicio, enlacefin, ignorarinicioenlace, ignorarfinenlace, enlazarpalabras;
var tabla, thead, tbody, trh, trb, td, th, div;

document.addEventListener("DOMContentLoaded", (event) => {
// Page has loaded
document.querySelector("#textoarray").placeholder = document.querySelector("#textoarray").placeholder.replaceAll('\\n', '\n')
definirvariables(false);
const dark = document.getElementById("darkmode");
 dark.addEventListener("mouseup", () => {
  darkchange();
  });
const giro = document.getElementById("girartabla");
 giro.addEventListener("mouseup", () => {
  girar(document.getElementById('widthform'), document.getElementById('heigthform'));
 });
const giro2 = document.getElementById("girarenlaces");
 giro2.addEventListener("mouseup", () => {
  girar(document.getElementById('enlazarcol'), document.getElementById('enlazarfil'));
 });
});

function girar(el1,el2,el3) {
el3 = vloph(el2);
el2.value = vloph(el1);
el1.value = el3;
}

function darkchange(conversion, boton) {
boton = document.querySelector("#darkmode > svg > path");
 if (conteodark == 0) {
  conversion = document.querySelectorAll('.oscuro');
   conversion.forEach(elementoactual => {
    elementoactual.className = 'claro';
   });
  boton.setAttribute('d',imgcla);
  conteodark++;
 }
 else {
  conversion = document.querySelectorAll('.claro');
  conversion.forEach(elementoactual => {
  elementoactual.className = 'oscuro';
  });
  boton.setAttribute('d',imgdrk);
  conteodark = 0;
 }
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
tabla = document.createElement('table');
thead = document.createElement('thead');
tbody = document.createElement('tbody');
trh = document.createElement('tr');
widthform = Number(vloph('widthform'));
heightform = Number(vloph('heigthform'));
enlazarcol = Number(vloph('enlazarcol'))-1;
enlazarfil = Number(vloph('enlazarfil'));
enlaceinicio = vloph('enlaceinicio');
enlacefin = vloph('enlacefin');
ignorarinicioenlace = vloph('ignorarinicioenlace');
ignorarfinenlace = vloph('ignorarfinenlace');
enlazarpalabras = vloph('enlazarpalabras').split(',');
borrarr = vloph('borrar').split(',');
alineamiento = vloph('alineamiento');
textotabla = document.getElementById('textotabla');
determinarenlace();
aplanarpalabras();
tomartexto();
creartabla();
}

function tomartexto(conteo) {
conteo = 0;
separacion = vloph('separacion');
 if (separacion == '\\n') {
  separacion='\n'
 }
listaceldas = vloph('textoarray').split(separacion);
 listaceldas.forEach(ele => {
  listaceldas[conteo] = listaceldas[conteo].replaceAll('\n', '');
  conteo++;
 });
 while (listaceldas.length < widthform * heightform) {
console.log('añadirrelleno')
  listaceldas.push('')
 }
}

function aplanarpalabras() {
var conteopal = 0;
  enlazarpalabras.forEach(palabra => {
  enlazarpalabras[conteopal] = aplanartexto(palabra);
  conteopal++;
 });
}

function determinarenlace() {
 if (isNaN(enlazarfil)) {
  enlaceporfila = false;
 }
 else {
  enlaceporfila = true;
 }
 if (isNaN(enlazarcol)) {
  enlaceporcol = false;
 }
 else {
  enlaceporcol = true;
 }
}

function aplanartexto(TextoaAplanar, Textoaplanado = TextoaAplanar) {
//thanks for this code to Niall Maher (https://www.codu.co/articles/remove-accents-from-a-javascript-string-skgp1inb)
Textoaplanado = TextoaAplanar.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
Textoaplanado = Textoaplanado.toLowerCase();
return Textoaplanado;
}

function enlazarPalabras(indice = conteo, array = listaceldas, listapalabras = enlazarpalabras) {
arin = aplanartexto(array[indice]);
 listapalabras.forEach(palabra => {
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


function vloph(campoDeTexto) {
campoDeTexto = document.getElementById(campoDeTexto);
 if (campoDeTexto.value == '') {
  return campoDeTexto.placeholder;
 }
 else {
  return campoDeTexto.value;
 }
}


function creartabla() {
// gracias a mozilla por el concepto general
//(https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Traversing_an_HTML_table_with_JavaScript_and_DOM_Interfaces)
//Crear encabezado
 for (var conteodivenc = 0; conteodivenc < widthform; conteodivenc++) {
  th = document.createElement('th');
  div = document.createElement('div');
  th.appendChild(div);
  trh.appendChild(th);
 }
thead.appendChild(trh);
//crear cuerpo
 for (var conteotrcue = 0; conteotrcue < heightform-1; conteotrcue++) {
  trb = document.createElement('tr');
  for (var conteotd = 0; conteotd < widthform; conteotd++) {
   td = document.createElement('td');
   div = document.createElement('div');
   td.appendChild(div);
   trb.appendChild(td);
  }
  tbody.appendChild(trb);
 }
tabla.appendChild(thead);
tabla.appendChild(tbody);
document.body.appendChild(tabla);
agregarceldas();
document.body.appendChild(creditos);
}


function borrar(textorevisar, arrayrevisar = borrarr) {
if (arrayrevisar.indexOf(textorevisar) != -1 && arrayrevisar[arrayrevisar.indexOf(textorevisar)].length > 0) {
  return true;
}
else {
  return false;
}
}

function agregarceldas() {
var sumaaltura = 0, rsaltura = -1, conteoarray = 0, conteodiv = 0;

listaceldas.forEach(elemento => {
  while (borrar(listaceldas[conteoarray].charAt(0))) {
    listaceldas[conteoarray] = String(listaceldas[conteoarray]).slice(1,listaceldas[conteoarray].length)
  }
  conteoarray++;
});
conteo = 0;
conteolog = 0;
enlazarfilm1xw = (enlazarfil-1) * widthform;
enlazarfilxw = enlazarfil * widthform;
const divs = document.querySelectorAll('div:not(.container)');
 if (!modocolumna) {
  divs.forEach(element => {
   Enlazar(enlaceporcol,enlaceporfila,listaceldas,conteo,conteolog,widthform,enlazarcol,enlazarfilm1xw,enlazarfilxw,enlaceinicio,enlacefin);
   enlazarPalabras();
   if (alineamiento != 'Nada') {
    element.style = `text-align: ${alineamiento};`;
   }
   conteolog++;
   celda = listaceldas[conteo];
   conteo++;
   element.innerText = celda;
  });
 }
 if (modocolumna) {
  divs.forEach(element => {
   if (conteodiv != 0) {
    conteocol = conteo+sumaaltura+rsaltura;
    Enlazar(enlaceporcol,enlaceporfila,listaceldas,conteocol,conteolog,widthform,enlazarcol,enlazarfilm1xw,enlazarfilxw,enlaceinicio,enlacefin);
    enlazarPalabras(conteocol);
    celda = listaceldas[conteocol];
   }
   else if (conteodiv == 0) {
    Enlazar(enlaceporcol,enlaceporfila,listaceldas,conteo,conteolog,widthform,enlazarcol,enlazarfilm1xw,enlazarfilxw,enlaceinicio,enlacefin);
    enlazarPalabras();
    celda = listaceldas[conteo];
    rsaltura++;
   }
   if (alineamiento != 'Nada') {
    element.style = `text-align: ${alineamiento};`;
   }
   element.innerText = celda;
   sumaaltura = sumaaltura + heightform;
   conteodiv++;
   conteolog++;
   if (conteodiv % widthform == 0 && conteodiv != 0) {
    conteo++;
    conteodiv = 0;
    sumaaltura = 0;
    rsaltura = -1;
   } 
  });
 }
textotabla.value = document.querySelector('table').outerHTML.replaceAll('>', '>\n').replaceAll('</div>', '\n</div>');
textotabla.style = 'width:400px;height:250px;';
console.log('Busqueda realizada en',divs.length,'Divs. Agregadas',conteolog,'celdas de',listaceldas.length,'disponibles');
}

function crearEnlace(array,indice,puntoinicio,palabra) {
console.log('array[indice]',array[indice],'pi',puntoinicio,'p',palabra,'bi',borradoinicio,'bf',borradofin)
return array[indice].slice(0,puntoinicio+borradoinicio)+
enlaceinicio+
array[indice].slice(puntoinicio+borradoinicio,puntoinicio+palabra-borradofin)+
enlacefin+
array[indice].slice(puntoinicio+palabra-borradofin);
}
function Enlazar(Columna,Fila,array,indice,cuenta,ope1,ope2,ope3,ope4,inicio,final,ignorarinicio,ignorarfin) {
 if (Columna) {
//formula: indice del array dividido entre la longitud de la tabla sobrante igual columna a enlazar-1
  if(cuenta % ope1 == ope2) {
   borradoInicioE(array,indice,array[indice],0);
   borradoFinE(array,indice,array[indice],0);
   array[indice] = crearEnlace(array,indice,0,array[indice].length);
  }
 }
 if (Fila) {
  if (cuenta >= ope3 && cuenta < ope4 && String(array[indice]).slice(-final.length) != final && String(array[indice]).slice(0,inicio.length) != inicio) {
   borradoInicioE(array,indice,array[indice],0);
   borradoFinE(array,indice,array[indice],0);
   if (String(array[indice]).slice(0,inicio.length) != inicio) {
    array[indice] = crearEnlace(array,indice,0,array[indice].length);
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
  if (borradoinicio > 8) {
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
  if (borradofin > 8) {
console.log(arin,'finmal');
break
}
 }
}

function quitarencabezado() {
 if (conteoencabezado == 0) {
  textotabla.value = textotabla.value.replaceAll('\n<tbody>', '').replaceAll('\n<thead>', '\n<tbody>').replaceAll('\n</thead>', '').replaceAll('<th>', '<td>').replaceAll('</th>', '</td>');
  document.querySelector('table').outerHTML = textotabla.value;
  conteoencabezado++;
  document.querySelector("#encabezado").value = 'Añadir Encabezado'
 }
 else {
  document.querySelector("#encabezado").value = 'Quitar Encabezado'
  definirvariables(false);
  conteoencabezado = 0;
 }
}
const creditos = document.createElement('a');
creditos.innerText = 'Creditos';
creditos.href = 'creditos.html';
creditos.className = 'oscuro';
const imgcla = "M12 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z";
const imgdrk = "M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z";
listaceldas = [];
