//----------------------------------------- nivel 1 ------------------------------------------------------
var problemas = [
    ['Cual es la respuesta de 1/4 + 1/2', '3/4', '2/8','1/2','1/4'],
    ['Cual es la respuesta de 1/8 + 1/4', '3/8', '5/8','1/4','6/8'],
    ['Cual es la respuesta de 3/10 + 1/5', '5/10', '8/10','3/5','4/10']
  ];
  //console.log(problemas[0][0]); // 1
  //console.log("-----------------------------------------------------------------------"); // 1
  //console.log(problemas);
var promLength = problemas.length
console.log("-----------------" + promLength + "-----------------");
var azar = Math.floor(Math.random() * promLength);

  console.log(problemas[azar][0]);
  console.log(problemas[azar][1]);
  console.log(problemas[azar][2]);
  console.log(problemas[azar][3]);
  console.log(problemas[azar][4]);