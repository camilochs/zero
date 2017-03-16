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


var InitButtonStart = React.createClass({
 getInitialState: function(){
              return {
                buttonText: "Iniciar",
                color: "btn btn-success btn-lg pull-left",
                icon: "glyphicon glyphicon-play",
                modalHeaderText: "",
                varTimeout: []
              }
            },

  render: function(){
    return (  
        <ButtonStart  onChangeButtonStartText={ this.handleThatEvent } 
                      buttonText={ this.state.buttonText }
                      color = { this.state.color }
                      icon = { this.state.icon } />
      )
  },
  handleThatEvent: function(e){

     if(workspace.topBlocks_.length == 0 ){
        return;
     }
     if(this.state.buttonText == "Iniciar"){
         this.changeToButtonRestart();
         this.startGame();
      }else{
         this.changeToButtonPlay();
         this.restartGame();
      }
  },
  changeToButtonRestart: function(){
    this.setState({ buttonText : "Reiniciar" });
    this.setState({ color : "btn btn-primary btn-lg pull-left" });
    this.setState({ icon : "glyphicon glyphicon-repeat" });

  },
  changeToButtonPlay: function(){
    this.setState({ buttonText : "Iniciar" });
    this.setState({ color : "btn btn-success btn-lg pull-left" });
    this.setState({ icon : "glyphicon glyphicon-play" });


  },
  checkIsWin: function(){
      console.log(commandsTimeout);
      if(commandsTimeout.pop() == "win"){
          $("#codeAreaWin").text($("#codeArea").text());

      }else{
          Q.stageScene("level1");
          $('#ModalLose').modal('show');

          Q.stageScene("level1");
      }
      highlightStep = [];
      this.changeToButtonPlay();


  },
    startGame: function(e){
        parseCode(true);
        this.compile($("#codeArea").text());
      },
    restartGame: function(e){
        highlightStep.forEach(function(o){
            clearTimeout(o);
        });
        commandsTimeout.forEach(function(o){
            clearTimeout(o);
        });
        commandsTimeout = [];

        Q.stageScene("level1");
    },
  compile: function(commands){

    var arr = commands.split("\n"),
        command = "",
        i = 0,
        milliseconds = 1000,
        currentObj = this;


      //Se agrega un evento en caso de que se logre el objetivo antes de terminar todas las acciones
      //esto permite ganar inmediamente antes de esperar que se ejecute todo.
      globalVar = () => {
          currentObj.checkIsWin();
      }

      //Se agrega la validación una vez termine todas las acciones
      commandsTimeout.push(setTimeout(function(){
          currentObj.checkIsWin();
      }, arr.length * milliseconds));

      //Cambia el nombre de la funciones de ingles a español
      var checkKey = function(v){
        for (var key in functionToSpanish) {
          if(v == functionToSpanish[key]){
            return key;
          }
        }
      }

      //Agrega un orden en tiempo para cada funciones se ejecute.
      for( ; i < arr.length; i++, milliseconds += 1000){

            if(arr[i] != ""){
                command += " commandsTimeout.push(setTimeout(function(){  " + checkKey(arr[i]) + "}, " + milliseconds + "));";
            }
      }
      //Comienza el proceso
      eval(command);

  }
});

var ButtonStart = React.createClass({
  render: function() {
    var buttonText = this.props.buttonText;
    return (
        <button type="button" id="btnStart" className= { this.props.color }
            onClick = { this.props.onChangeButtonStartText } >
          <i className = { this.props.icon }></i> { buttonText }
        </button>
    );
  }
          
});

var Modal = React.createClass({

  render: function(){
    return (
              <div>
               <ModalInstruction /> 
               <ModalInspiration />
               <ModalWinLevel1 />
               <ModalAboutMe />
               <ModalLose />
              </div>
           );

  }

});

var ModalInstruction = React.createClass({
    render: function(){
        return (
      <div>
        <div className="modal" id="ModalInstruction" tabIndex="-1" role="dialog"   data-backdrop="static" aria-labelledby="myModalLabel">
          <div className="modal-dialog ezCustTrans" role="document">

            <div className="modal-content">
              <div className="modal-header bg-info">
                <button type="button" className="close" data-dismiss="modal"  aria-label="Close">
                <span aria-hidden="true">&times;</span></button>
                 <h1 className="modal-title" id="myModalLabel"><i className="glyphicon glyphicon-info-sign "></i> Instrucciones</h1>
              </div>

              <div className="modal-body">

                <h1>Ayuda a tu personaje a alcanzar la moneda!</h1> 
                <h1>No te olvides de esto:</h1>
                <div className="row">
                  <div className="col-md-6">
                      <strong><h4>Atributos</h4></strong> 
                      <div className="row">
                        <div className="col-md-12"><h4>Las caracteristicas que permiten modificar movimientos de tu personaje.</h4></div>
                      </div>
                  </div>
                  <div className="col-md-6"> 
                      <strong><h4>Acciones</h4></strong>

                      <div className="row">  
                          <div className="col-md-12"><h4>Lo que puede realizar tu personaje.</h4></div>
                      </div>

                  </div>

                </div>

              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-info btn-lg" data-dismiss="modal">Cerrar</button>
              </div>
          
            </div>
          </div>
        </div>
        </div>
          );

    }
});

var ModalInspiration = React.createClass({
    render: function(){
        return (
           <div>
        <div className="modal" id="ModalInspiration" tabIndex="-1" role="dialog"  data-backdrop="static"  aria-labelledby="myModalLabel">
          <div className="modal-dialog ezCustTrans" role="document">

            <div className="modal-content">
              <div className="modal-header bg-info">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span></button>
                <h4 className="modal-title" id="myModalLabel"><i className="glyphicon glyphicon-hand-up"></i> Inspiración</h4>
              </div>

              <div className="modal-body">
              <p>Este proyecto nace inspirado por:</p>
                <div className="row">

                  <div className="col-md-4">
                    <a href="https://hourofcode.com/es"><img  className="img-responsive" src="images/logo-hoc.png" /></a>
                  </div>
                  <div className="col-md-4">

                    <a href="http://el.media.mit.edu/logo-foundation/"><img  className="img-responsive" src="images/logo-logo.gif" /></a>
                  </div>
                  <div className="col-md-4">

                    <a href="https://scratch.mit.edu/"><img  className="img-responsive" src="images/logo-scratch.jpg" /></a>
                  </div>
                </div>

              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-info btn-lg" data-dismiss="modal">Cerrar</button>
              </div>
          
            </div>
          </div>
        </div>
        </div>
          );

    }
});

var ModalAboutMe = React.createClass({
    render: function(){
        return (
           <div>
        <div className="modal" id="ModalAboutMe" tabIndex="-1" role="dialog"  data-backdrop="static"  aria-labelledby="myModalLabel">
          <div className="modal-dialog ezCustTrans" role="document">

            <div className="modal-content">
              <div className="modal-header bg-info">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span></button>
                <h4 className="modal-title" id="myModalLabel"><i className="glyphicon glyphicon-th-large"></i> Entorno de programación Zero</h4>
              </div>

              <div className="modal-body">
                <p>Zero nace como proyecto de tesis para enseñar a programar a niños.</p>
                <p>Actualmente se encuentra en una fase alfa.
                </p>
                <p>
                Dudas y/o sugerencias: camilochs@gmail.com
                </p>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-info btn-lg" data-dismiss="modal">Cerrar</button>
              </div>
          
            </div>
          </div>
        </div>
        </div>
          );

    }
});
var ModalLose = React.createClass({
    render: function(){
        return (
           <div>
              <div className="modal" id="ModalLose" tabIndex="-1" role="dialog"  data-backdrop="static"  aria-labelledby="myModalLabel">
                <div className="modal-dialog ezCustTrans" role="document">

                  <div className="modal-content">
                    <div className="modal-header bg-warning">
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span></button>
                      <h4 className="modal-title" id="myModalLabel">Ups!</h4>
                    </div>

                    <div className="modal-body">
                        <h4>No alcanzaste la moneda...</h4>
                        <p><strong>No te preocupes puedes volver a intentarlo :)</strong></p>

                    </div>

                    <div className="modal-footer">
                      <button type="button" className="btn btn-warning btn-lg" data-dismiss="modal">Cerrar</button>
                    </div>
                
                  </div>
                </div>
              </div>
          </div>
          );

    }
});
var ModalWinLevel1 = React.createClass({
    render: function(){
        return (
           <div>
              <div className="modal" id="ModalWinLevel1" tabIndex="-1" role="dialog"  data-backdrop="static" aria-labelledby="myModalLabel">
                <div className="modal-dialog ezCustTrans" role="document">

                  <div className="modal-content">
                    <div className="modal-header bg-success">
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span></button>
                      <h4 className="modal-title" id="myModalLabel"><i className="glyphicon glyphicon-star"></i> Excelente!</h4>
                    </div>

                    <div className="modal-body">

                         <div className="row">
                            <div className="col-md-12">
                              <h4>Felicitaciones!, haz conseguido la moneda </h4>
                            </div> 
                        </div> 
                      <div className="row">
                        <div className="col-md-12">
                          <p>Mira el código que acabas de crear:</p>

                        </div>

                      </div>
                       <div className="row">
                        
                           <div className="col-md-12">
                              
                              <textarea  className="col-md-12" id="codeAreaWin" rows="5"></textarea>
                           </div> 

                        </div>


                    </div>

                    <div className="modal-footer">
                        <button type="button"  className="btn btn-success btn-lg" data-dismiss="modal" disabled>Siguiente Nivel</button>
                    </div>
                
                  </div>
                </div>
              </div>
          </div>
          );

    }
});
ReactDOM.render(
  <Modal />,
  document.getElementById('modal')
);
ReactDOM.render(
  <InitButtonStart />,
  document.getElementById('colIniciar')
);
//$('#ModalInstruction').modal('show'); 


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
anno1.show();
