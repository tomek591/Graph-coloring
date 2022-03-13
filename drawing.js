let graph;
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

let colors = 0;
ctx.font = "30px Arial";
const draw = (timeStamp) => {
  console.log(graph);

  for (let i = 0; i < graph.length; i++) {
    for (let j = 1; j < graph[i].length; j++) {
      ctx.beginPath();
      ctx.moveTo(graph[i][0].x, graph[i][0].y);
      ctx.strokeStyle = `rgb(255,255,255)`;
      ctx.lineTo(graph[graph[i][j]][0].x, graph[graph[i][j]][0].y);
      ctx.closePath();
      ctx.stroke();
    }
  }

  for (let i = 0; i < graph.length; i++) {
    ctx.beginPath();
    ctx.arc(graph[i][0].x, graph[i][0].y, 24, 0, 2 * Math.PI);
    ctx.fillStyle = `rgb(${
      (255 / colors) * graph[i][0].color * (graph[i][0].color % 3)
    },${(255 / colors) * graph[i][0].color * ((graph[i][0].color + 1) % 3)},${
      (255 / colors) * graph[i][0].color * ((graph[i][0].color + 2) % 3)
    })`;
    ctx.fill();
    ctx.closePath();
    ctx.fillStyle = "black";
    ctx.fillText("" + graph[i][0].color, graph[i][0].x - 8, graph[i][0].y + 10);
  }
  //   window.requestAnimationFrame(draw);
};

fetch("graph.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => (graph = JSON.parse(data)))
  .then(() => {
    startGraph();
  })
  .catch((err) => console.error(`Fetch problem: ${err.message}`));

const startGraph = () => {
  for (let i = 0; i < graph.length; i++) {
    let temp = graph[i][0];
    graph[i][0] = {
      color: temp,
      x: 600 + 380 * Math.sin((Math.PI * 2 * i) / graph.length),
      y: 450 + 380 * Math.cos((Math.PI * 2 * i) / graph.length),
    };

    if (graph[i][0].color > colors) colors = graph[i][0].color;
  }

  window.requestAnimationFrame(draw);
};