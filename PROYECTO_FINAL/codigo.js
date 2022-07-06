let nodes = [];
let selectedNode = null;
let arcos = [];
// validación
function getNodeAt(x, y, nodes) {
  for (let index = 0; index < nodes.length; index++) {
    const node = nodes[index];
    const a = x - node.x;
    const b = y - node.y;

    const c = Math.sqrt(a * a + b * b);

    if (c < 90) {
      return node;
    }
  }
  return null;
}

//función para dibujar los vertices
function drawNodes(ctx, nodes, corte) {
  for (let index = 1; index < nodes.length; index++) {
    const node = nodes[index];
  //condición de if para que cuando partición sea invocado, este seleccione el vértice inicial de un color diferente, haciendo referencia a que la partición se llevará a cabo desde ese punto hasta el que el usuario seleccione
  if (corte == false){
      if (node === selectedNode) {
        ctx.strokeStyle = "#FF0000";
      } else {
        ctx.strokeStyle = "#000000";
      }
  
      ctx.beginPath();
      ctx.lineWidth = 4;
      ctx.fillStyle = "#FFFFFF";
      ctx.arc(node.x, node.y, 35, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.fill();
  
      if (node === selectedNode) {
        ctx.fillStyle = "#FF0000";
      } else {
        ctx.fillStyle = "#000000";
      }
  
      ctx.font = "30px Arial";
      ctx.fillText(index, node.x - 5, node.y + 5);
  // de lo contrario, seguirá su proceso normal de dirección de aristas por selección de vertices con color verde 
     }else{
      if (node === selectedNode) {
        ctx.strokeStyle = "#008000";
      } else {
        ctx.strokeStyle = "#000000";
      }
  
      ctx.beginPath();
      ctx.lineWidth = 4;
      ctx.fillStyle = "#FFFFFF";
      ctx.arc(node.x, node.y, 35, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.fill();
  
      if (node === selectedNode) {
        ctx.fillStyle = "#008000";
      } else {
        ctx.fillStyle = "#000000";
      }
  
      ctx.font = "30px Arial";
      ctx.fillText(index, node.x - 5, node.y + 5);
    }
  }
}

//función para dibujar las aristas
function drawArcos(ctx, arcos,corte) {
  // if(corte == false){//Se busca que con esta condición de if, cuando partición sea invocado y su valor sea false, este, tape, elimine o separe el grafo con una linea del color del fondo que tape a la anterior
  //   ctx.moveTo(node1.x, node1.y);
  //   ctx.lineTo(node2.x, node2.y);
  //   ctx.strokeStyle = "#D3D3D3";
  //   ctx.stroke();
  // }else{ // de lo contrario, seguirá su procesos con el color predeterminado
    for (let i = 0; i < arcos.length; i++) {
      const arco = arcos[i]; 
      ctx.moveTo(arco.node1.x, arco.node1.y);
      ctx.lineTo(arco.node2.x, arco.node2.y);
      ctx.strokeStyle = "#000000";
      ctx.stroke();
    }
  }
// }

// PANTALLA INTERACTIVA
window.onload = async () => {
  var canvas = document.getElementById("PantallaGrafos");
  var context = canvas.getContext("2d");
  var corte = document.getElementById("particionbtn");
  var dibujar = document.getElementById('dibujarbtn');

  dibujar.addEventListener('click', _ =>{
    corte=true;
    canvas.addEventListener("click", (e) => {
      let x = e.clientX - canvas.offsetLeft;
      let y = e.clientY - canvas.offsetTop;
  
      let tempNode = getNodeAt(x, y, nodes);
  
      if (selectedNode !== null && tempNode === null) {
        selectedNode = tempNode;
        tempNode = null;
      }
  
      if (selectedNode === null) {
        selectedNode = tempNode;
        tempNode = null;
      }
  
      if (selectedNode === null) {
        nodes.push({ x, y });
      }
  
      context.clearRect(0, 0, canvas.width, canvas.height);
  
      if (selectedNode !== null && tempNode !== null) {
        arcos.push({ node1: selectedNode, node2: tempNode });
        selectedNode = null;
        tempNode = null;
      }
      drawArcos(context, arcos, corte);
      drawNodes(context, nodes, corte);    
    });
  });
  corte.addEventListener('click', _ =>{
    corte=false;
  });
};
// PANTALLA ESTÁTICA
window.addEventListener('load', () => {
  var canvas2 = document.getElementById("PantallaGrafos2");
  var ctx = canvas2.getContext("2d");
  var aplicar = document.getElementById("Aplicarbtn");
aplicar.addEventListener('click', _ =>{
      ctx.font = "30px Arial";
      ctx.fillText("Grafo Total", 500, 80);
      /////////////////////////////////////////// LINEAS
    // LINEA 1 A 2
      ctx.moveTo(96, 95);
      ctx.lineTo(96, 450);
      ctx.stroke();
    //
    // LINEA 2 A 3
      ctx.moveTo(96, 450);
      ctx.lineTo(400, 250);
      ctx.stroke();
    //
    // LINEA 1 A 3
      ctx.moveTo(96, 95);
      ctx.lineTo(400, 250);
      ctx.stroke();
    //
    // LINEA 3 A 4
      ctx.moveTo(400, 250);
      ctx.lineTo(750, 100);
      ctx.stroke();
    //
    // LINEA 4 A 5
      ctx.moveTo(750, 100);
      ctx.lineTo(750, 450);
      ctx.stroke();
    //
    // LINEA 4 A 5
      ctx.moveTo(750, 450);
      ctx.lineTo(1105, 250);
      ctx.stroke();
    //
    // LINEA 4 A 5
      ctx.moveTo(750, 100);
      ctx.lineTo(1105, 250);
      ctx.stroke();
    //
  ///////////////////////////////////////// CIRCULOS
    // CIRCULO 1
      ctx.font = "30px Arial";
      ctx.fillText("1", 87, 105);
      ctx.beginPath();
      ctx.arc(95, 100, 35, 0, 2 * Math.PI);
      ctx.stroke();
    //
    // CIRCULO 2
      ctx.font = "30px Arial";
      ctx.fillText("2", 87, 455);
      ctx.beginPath();
      ctx.arc(95, 450, 35, 0, 2 * Math.PI);
      ctx.stroke();
    //
    // CIRCULO 3
      ctx.font = "30px Arial";
      ctx.fillText("3", 390, 257);
      ctx.beginPath();
      ctx.arc(400, 250, 35, 0, 2 * Math.PI);
      ctx.stroke();
    //
    // CIRCULO 4
      ctx.font = "30px Arial";
      ctx.fillText("4", 742, 106);
      ctx.beginPath();
      ctx.arc(750, 100, 35, 0, 2 * Math.PI);
      ctx.stroke();
    //
    // CIRCULO 5
      ctx.font = "30px Arial";
      ctx.fillText("5", 742, 460);
      ctx.beginPath();
      ctx.arc(750, 450, 35, 0, 2 * Math.PI);
      ctx.stroke();
    //
    // CIRCULO 6
    ctx.font = "30px Arial";
    ctx.fillText("6", 1095, 258);
    ctx.beginPath();
    ctx.arc(1105, 250, 35, 0, 2 * Math.PI);
    ctx.stroke();
    //
    // FIN PANTALLA
});

var particion = document.getElementById("particionbtn2");
particion.addEventListener('click', _ =>{
      

      //
        ctx.font = "30px Arial";
        ctx.fillText("Grafo 1", 160, 258);
      // LINEA 1 A 2
        ctx.beginPath();
        ctx.strokeStyle = "#FF0000";
        ctx.moveTo(96, 95);
        ctx.lineTo(96, 450);
        ctx.stroke();
      //
      // LINEA 2 A 3
        ctx.moveTo(96, 450);
        ctx.lineTo(400, 250);
        ctx.stroke();
      //
      // LINEA 1 A 3
        ctx.moveTo(96, 95);
        ctx.lineTo(400, 250);
        ctx.stroke();
      //
      // CIRCULO 1
        ctx.font = "30px Arial";
        ctx.fillText("1", 87, 105);
        ctx.beginPath();
        ctx.arc(95, 100, 35, 0, 2 * Math.PI);
        ctx.stroke();
      //
      // CIRCULO 2
        ctx.font = "30px Arial";
        ctx.fillText("2", 87, 455);
        ctx.beginPath();
        ctx.arc(95, 450, 35, 0, 2 * Math.PI);
        ctx.stroke();
      //
      // CIRCULO 3
        ctx.font = "30px Arial";
        ctx.fillText("3", 390, 257);
        ctx.beginPath();
        ctx.arc(400, 250, 35, 0, 2 * Math.PI);
        ctx.stroke();
      //
      // LINEA 3 A 4
        // ctx.beginPath();
        // ctx.strokeStyle = "#D3D3D3";
        // ctx.moveTo(400, 250);
        // ctx.lineTo(750, 100);
        // ctx.stroke();
      //
      ///////////////////////////////         GRAFO 2 PARTIDO
      //TEXTO GRAFO
        ctx.font = "30px Arial";
        ctx.fillText("Grafo 2", 850, 258);
      // LINEA 4 A 5
        ctx.beginPath();
        ctx.strokeStyle = "#008000";
        ctx.moveTo(750, 100);
        ctx.lineTo(750, 450);
        ctx.stroke();
      //
      // LINEA 5 A 6
        ctx.moveTo(750, 450);
        ctx.lineTo(1105, 250);
        ctx.stroke();
      //
      // LINEA 4 A 6
        ctx.moveTo(750, 100);
        ctx.lineTo(1105, 250);
        ctx.stroke();
      //
      // CIRCULO 4
        ctx.font = "30px Arial";
        ctx.fillText("4", 742, 106);
        ctx.beginPath();
        ctx.arc(750, 100, 35, 0, 2 * Math.PI);
        ctx.stroke();
      //
      // CIRCULO 5
        ctx.font = "30px Arial";
        ctx.fillText("5", 742, 460);
        ctx.beginPath();
        ctx.arc(750, 450, 35, 0, 2 * Math.PI);
        ctx.stroke();
      //
      // CIRCULO 6
        ctx.font = "30px Arial";
        ctx.fillText("6", 1095, 258);
        ctx.beginPath();
        ctx.arc(1105, 250, 35, 0, 2 * Math.PI);
        ctx.stroke();
      //
      // FIN PANTALLA
  });
});

// REFRESCA LA PAGINA PARA HACER OTRO GRAFO
let refresh = document.getElementById('refresh');
refresh.addEventListener('click', _ => {
            location.reload();
})
// 

// REFRESCA LA PAGINA PARA HACER OTRO GRAFO
let refresh2 = document.getElementById('refresh2');
refresh2.addEventListener('click', _ => {
            location.reload();
})




    


