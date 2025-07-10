var listaceldas, conteo, conteoencabezado = 0, conteolog, widthform, heightform, enlazar, separacion, borrarr, textotabla, tabla, thead, tbody, trh, trb, td, th, div, conteodark = 0, imgcla, imgdrk;
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
if (document.querySelector('table') !== null ) {
document.querySelector('table').remove();
}
tabla = document.createElement('table');
thead = document.createElement('thead');
tbody = document.createElement('tbody');
trh = document.createElement('tr');
widthform = Number(vloph(document.getElementById('widthform')));
heightform = Number(vloph(document.getElementById('heigthform')));
enlazar	= Number(vloph(document.getElementById('enlazar')))-1;
separacion = vloph(document.getElementById('separacion'));
borrarr = vloph(document.getElementById('borrar')).split(',');
alineamiento = vloph(document.getElementById('alineamiento'));
listaceldas = vloph(document.getElementById('textoarray')).replaceAll('\n', '').split(String(separacion));
textotabla = document.getElementById('textotabla');
creartabla(col);
}


function vloph(campoDeTexto) {
 if (campoDeTexto.value == '') {
  return campoDeTexto.placeholder;
 }
 else {
  return campoDeTexto.value;
 }
}


function creartabla(col) {
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
agregarceldas(col);
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

function agregarceldas(modocolumna = false) {
var sumaaltura = 0, rsaltura = -1, conteoarray = 0, conteodiv = 0;

listaceldas.forEach(elemento => {
  while (borrar(listaceldas[conteoarray].charAt(0))) {
    listaceldas[conteoarray] = String(listaceldas[conteoarray]).slice(1,listaceldas[conteoarray].length)
  }
  conteoarray++;
});
conteo = 0;
conteolog = 0;
const divs = document.querySelectorAll('div:not(.container)');
 if (!modocolumna) {
  divs.forEach(element => {
//formula: indice del array dividido entre longitud tabla sobrante igual columna enlazada -1
    if(conteo % widthform == enlazar) {
     if (String(listaceldas[conteo]).slice(-1) == '*') {
      listaceldas[conteo] = '[[' + String(listaceldas[conteo]).slice(0,-1) + ']]' + '*';
     }
     else {
      listaceldas[conteo] = '[[' + String(listaceldas[conteo]) + ']]';
     }
    }
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
     var conteodivi = conteo+sumaaltura+rsaltura;
     if(conteolog % widthform == enlazar) {
      if (String(listaceldas[conteo+sumaaltura+rsaltura]).slice(-1) == '*') {
       listaceldas[conteo+sumaaltura+rsaltura] = '[[' + String([conteo+sumaaltura+rsaltura]).slice(0,-1) + ']]' + '*';
      }
      else {
       listaceldas[conteo+sumaaltura+rsaltura] = '[[' + String(listaceldas[conteo+sumaaltura+rsaltura]) + ']]';
      }
     }
     celda = listaceldas[conteo+sumaaltura+rsaltura];
    }
    else if (conteodiv == 0){
     if(conteolog % widthform == enlazar) {
      if (String(listaceldas[conteo]).slice(-1) == '*') {
       listaceldas[conteo] = '[[' + String(listaceldas[conteo]).slice(0,-1) + ']]' + '*';
      }
      else {
       listaceldas[conteo] = '[[' + String(listaceldas[conteo]) + ']]';
      }
     }
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
console.log('Busqueda realizada en',conteo,'Divs. Agregadas',conteolog,'celdas de',listaceldas.length,'disponibles');
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
imgcla = "M12 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z";
imgdrk = "M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z";
listaceldas = [];
