/*
MIT License

Copyright (c) 2017 Camilo Chacón Sartori

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/

function changeToButtonRestart(btnObject){
    btnObject.html("<i class='glyphicon glyphicon-repeat'></i> Reiniciar");
    btnObject.attr("class", "btn btn-primary btn-lg pull-left");
} 
function changeToButtonPlay(btnObject){
    
    btnObject.html("<i class='glyphicon glyphicon-play'></i> Iniciar");
    btnObject.attr("class", "btn btn-success btn-lg pull-left");
    
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
      if(commandsTimeout.pop() != "win"){
          changeToButtonPlay($("#btnInit"));
          $('#ModalLose').modal('show');
          Q.clearStages();
          Q.stageScene(level);
      }
     
      highlightStep = [];
}
function start(level){
    parseCode(true);
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
