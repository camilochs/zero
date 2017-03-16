/*
    this.setState({ buttonText : "Reiniciar" });
    this.setState({ color : "btn btn-primary btn-lg pull-left" });
    this.setState({ icon : "glyphicon glyphicon-repeat" });

  },
  changeToButtonPlay: function(){
    this.setState({ buttonText : "Iniciar" });
    this.setState({ color : "btn btn-success btn-lg pull-left" });
    this.setState({ icon : "glyphicon glyphicon-play" });




*/

function changeToButtonRestart(btnObject){
    btnObject.html("<i class='glyphicon glyphicon-repeat'></i> Reiniciar");
    btnObject.attr("class", "btn btn-primary btn-lg pull-left");
} 
function changeToButtonPlay(btnObject){
    
    btnObject.html("<i class='glyphicon glyphicon-play'></i> Iniciar");
    btnObject.attr("class", "btn btn-success btn-lg pull-left");
    
} 

function compile(commands, level){
    var arr = commands.split("\n").filter(n => n != "" && n.indexOf("highlightBlock") == -1),
        hlBlocks = commands.split("\n").filter(n => n != "" && n.indexOf("highlightBlock") != -1),
        command = "",
        i = 0,
        milliseconds = 1000,
        numberOriginalElement = arr.length + 1,
        currentObj = this;
      //Cambia el nombre de la funciones de ingles a español
      var checkKey = function(v){
        for (var key in functionToSpanish) {
          if(v == functionToSpanish[key]){
            return key;
          }
        }
        return false;
      }

      let translateToFunctionKeys = Object.keys(translateToFunctions);
      //traduce a las funciones js los metodos en español
      for(let i = 0; i  < arr.length; i++){
        if(arr[i].indexOf(";") != -1 && arr[i].indexOf("highlightBlock") == -1 ){ //es un metodo
            arr[i] = checkKey(arr[i].replace(/\s/g, ""));
            
        }else{
            for(let j = 0; j < translateToFunctionKeys.length; j++){
                if(arr[i].indexOf(translateToFunctionKeys[j]) != -1){
                    arr[i] = arr[i].replace(translateToFunctionKeys[j], 
                                translateToFunctions[translateToFunctionKeys[j]]);
                    break;
                }
            }
        }
      }
      //Maneja las condicionales, if, while, etc
      //Junta varios elemento a solo uno, por ej:
      //["if(){", "test();", "}"] a   ["if(){test();}"]
      let indexToRemove = [];
      let cmd = "";
        let internalMillisecond = 1000;
        let ctmethod = 0;
        let cthlBlock = 0;
      for(let i = 0; i  < arr.length; i++){
          if(arr[i].indexOf("if(") != -1 ){//existe
            let conditional = arr[i];

            hlBlocks[cthlBlock] = hlBlocks[cthlBlock] + "\\n"; 
            cmd += " commandsTimeout.push(setTimeout(function(){  " +
                    " myInterpreter = new Interpreter(\"" + hlBlocks[cthlBlock] + "\", initApi); stepCode(); " + 
                    arr[i] + " ";
            cthlBlock++;
            for(let j = i + 1; j < arr.length; j++){
                indexToRemove.push(j);
                if(arr[j].indexOf("}") != -1 ){// existe
                    
                    cmd += "}"; 
                    conditional += "}";
                    arr[i] = conditional;
                    i = j +1;
                }else if(arr[j].indexOf("if(") != -1){ //if anidado
                    
                    cmd += " myInterpreter = new Interpreter(\"" + hlBlocks[cthlBlock] + "\", initApi); stepCode(); " + 
                             arr[j];

                    cthlBlock++;
                    //internalMillisecond = 0;

                }else {

                    hlBlocks[cthlBlock] = hlBlocks[cthlBlock] + "\\n";
                    cmd += " commandsTimeout.push(setTimeout(function(){  " + arr[j] + 
                    " myInterpreter = new Interpreter(\"" + hlBlocks[cthlBlock] + "\", initApi); stepCode();" + 
                    " }, " + internalMillisecond + ") );   ";
                    conditional += arr[j];
                    internalMillisecond += 1000;
                    ctmethod++;
                    cthlBlock++;
                }
            }
            internalMillisecond = 1000;
            cmd += " }, " + milliseconds + "));   ";
          }else if (arr[i].indexOf(";") != -1 && arr[i].indexOf("highlightBlock") == -1 ){//es un metodo

            hlBlocks[cthlBlock] = hlBlocks[cthlBlock] + "\\n";
            cmd += " commandsTimeout.push(setTimeout(function(){  " + arr[i] + 
                    " myInterpreter = new Interpreter(\"" + hlBlocks[cthlBlock] + "\", initApi); stepCode();" + 
                    "   }, " + milliseconds + ")  );   ";
            cthlBlock++;

          }else{
              
          }
          milliseconds += 1000;
      }
      cmd += " commandsTimeout.push(setTimeout(function(){  currentObj.checkIsWin(level); }, " + 
                    ((ctmethod * 1000)  + milliseconds)  + "));   ";
      //Elimina campos que no utilizare
      //Borra "test();" y "}" segun el ejemplo anterior
      for(let i = 0, j = 0; i < indexToRemove.length; i++){
          arr.splice(indexToRemove[i]-j, 1);
          j++;
      }
      //Se agrega un evento en caso de que se logre el objetivo antes de terminar todas las acciones
      //esto permite ganar inmediamente antes de esperar que se ejecute todo.
      globalVar = () => {
          currentObj.checkIsWin(level);
      }

      //Se agrega la validación una vez termine todas las acciones
      /*
      commandsTimeout.push(setTimeout(function(){
          currentObj.checkIsWin(level);
      }, numberOriginalElement * milliseconds));
      */
      //Comienza el proceso
      //console.log(cmd)
      eval(cmd);

  }

function restart(level){
    highlightStep.forEach(function(o){
        clearTimeout(o);
    });
    commandsTimeout.forEach(function(o){
        clearTimeout(o);
    });
    commandsTimeout = [];

    Q.stageScene(level);
}
function checkIsWin(level){
      if(commandsTimeout.pop() == "win"){
          $("#codeAreaWin").text(codeTextArea["visualization"]);

      }else{
          changeToButtonPlay($("#btnInit"));
          $('#ModalLose').modal('show');
          Q.clearStages();
          Q.stageScene(level);
      }
     
      highlightStep = [];

}
function start(level){
    parseCode(true);
    compile(codeTextArea["raw"], level);
}
function startGame(e, level){
        if(workspace.topBlocks_.length == 0 ){
        //    return;
        }
        let btnObject = $(e);
        let btnText = $(e).text().replace(/\s/g, "");
        if(btnText == "Iniciar"){
            changeToButtonRestart(btnObject);
            start(level);
        }else{
            changeToButtonPlay(btnObject);
            restart(level);
        }
}
$(document).ready(function(){

   
    
    var anno1 = new Anno(
    [{
    target: '.blocklyToolboxDiv',
    position:'right',
    content: "Haz click en Atributo o Acciones para crear los movimientos de tu personaje",
    buttons: [AnnoButton.NextButton]
    },
    /*{
    target: '#blocklyDiv',
    position:'right',
    content: "Arrastra los bloques hacia aqui :O",
    buttons: [AnnoButton.BackButton, AnnoButton.NextButton]
    },*/
    {
    target: '#game',
    position:'left',
    content: "Este es tu personaje!! Un Dinosaurio :)",
    buttons: [AnnoButton.BackButton, AnnoButton.NextButton]
    }, {
    target: '#btnStart',
    position:'bottom',
    content: "Puedes presionar el botón Iniciar para que tu Dinosaurio realice sus acciones",
    buttons: {
        text:'Hecho',
        click: function(){  $('#ModalInstruction').modal('show'); this.hide(); }
    }
    }]);
    //anno1.show();

});
