var listaceldas, conteo, conteoarray, conteolog, conteodivisiones, widthform, heightform, enlazar, separacion, borrarr, textotabla, tabla, thead, tbody, trh, trb, td, th, div, conteodark = 0, imgcla, imgdrk;
document.addEventListener("DOMContentLoaded", (event) => {
  // Page has loaded
  document.querySelector("#textoarray").placeholder = document.querySelector("#textoarray").placeholder.replaceAll('\\n', '\n')
  definirvariables(true);
  const dark = document.querySelector("body > button");
  dark.addEventListener("mouseup", () => {
click();
});
});
function click(conversion, boton) {
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

function definirvariables(demo = false) {
if (document.querySelector('table') !== null ) {
document.querySelector('table').remove();
}
tabla = document.createElement('table');
thead = document.createElement('thead');
tbody = document.createElement('tbody');
trh = document.createElement('tr');
 if (demo) {
widthform = Number(document.getElementById('widthform').placeholder);
heightform = Number(document.getElementById('heigthform').placeholder);
enlazar	= Number(document.getElementById('enlazar').placeholder)-1;
separacion = document.getElementById('separacion').placeholder;
borrarr = document.getElementById('borrar').placeholder.split(',');
alineamiento = document.getElementById('alineamiento').value;
listaceldas = document.getElementById('textoarray').placeholder.replaceAll('\n', '').split(String(separacion));
textotabla = document.getElementById('textotabla');
 }
 else {
widthform = Number(document.getElementById('widthform').value);
heightform = Number(document.getElementById('heigthform').value);
enlazar	= Number(document.getElementById('enlazar').value)-1;
separacion = document.getElementById('separacion').value;
borrarr = document.getElementById('borrar').value.split(',');
alineamiento = document.getElementById('alineamiento').value;
listaceldas = document.getElementById('textoarray').value.replaceAll('\n', '').split(String(separacion));
textotabla = document.getElementById('textotabla');
 }
creartabla();
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
conteoarray = 0;
listaceldas.forEach(elemento => {
  while (borrar(listaceldas[conteoarray].charAt(0))) {
    listaceldas[conteoarray] = String(listaceldas[conteoarray]).slice(1,listaceldas[conteoarray].length)
  }
  conteoarray++;
});
conteo = 0;
conteolog = 0;
const elements = document.querySelectorAll('div'); 
elements.forEach(element => {
  conteo++;
conteodivisiones = conteo - 1;
//formula: indice del array dividido entre longitud tabla sobrante igual columna enlazada -1
 if(conteodivisiones % widthform == enlazar) {
  if (String(listaceldas[conteo-1]).slice(-1) == '*') {
   listaceldas[conteo-1] = '[[' + String(listaceldas[conteo-1]).slice(0,-1) + ']]' + '*';
  }
  else {
   listaceldas[conteo-1] = '[[' + String(listaceldas[conteo-1]) + ']]';
  }
 }
 if (alineamiento != 'Nada') {
  element.style = `text-align: ${alineamiento};`;
 }
conteolog++;
celda = listaceldas[conteo-1];
//console.log(listaceldas[conteo-1], element,conteolog);
var divtabla = element;
element.innerText = celda;
  
});
textotabla.value = document.querySelector('table').outerHTML.replaceAll('>', '>\n').replaceAll('</div>', '\n</div>');
textotabla.style = 'width:400px;height:250px;';
console.log('Busqueda realizada en',conteo,'Divs. Agregadas',conteolog,'celdas de',listaceldas.length,'disponibles');
}
imgcla = "M12 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z";
imgdrk = "M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z";
listaceldas = [];