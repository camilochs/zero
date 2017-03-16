/**

Autor: Camilo Chacón Sartori. 2015

**/

  Blockly.Blocks['left'] = {
    init: function() {
      this.appendDummyInput()
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField("Mover a la izquierda");
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setColour(120);
      this.setTooltip('');
      this.setHelpUrl('http://www.example.com/');
    }
  };
  Blockly.JavaScript['left'] = function(block) {
    // TODO: Assemble JavaScript into code variable.
    var code = 'rex.leftMove();\n';
    return code;
  };
  Blockly.Blocks['right'] = {
    init: function() {
      this.appendDummyInput()
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField("Mover a la derecha");
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setColour(120);
      this.setTooltip('');
      this.setHelpUrl('http://www.example.com/');
    }
  };
  Blockly.JavaScript['right'] = function(block) {
    
    var code = 'rex.rightMove();\n';
    return code;
  };
  Blockly.Blocks['attack'] = {
    init: function() {
      this.appendDummyInput()
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField("Ataque");
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setColour(120);
      this.setTooltip('');
      this.setHelpUrl('http://www.example.com/');
    }
  };
  Blockly.JavaScript['attack'] = function(block) {
    
    var code = 'rex.attackMove();\n';
    return code;
  };
  Blockly.Blocks['attackToBox'] = {
    init: function() {
      this.appendDummyInput()
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField("Saltar y destruir la caja");
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setColour(120);
      this.setTooltip('');
      this.setHelpUrl('http://www.example.com/');
    }
  };
  Blockly.JavaScript['attackToBox'] = function(block) {
    
    var code = 'rex.attackToBoxMove();\n';
    return code;
  };
 Blockly.Blocks['jump'] = {
      init: function() {
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("Saltar");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(120);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
      }
    };
    Blockly.JavaScript['jump'] = function(block) {
      
      var code = 'rex.jumpMove();\n';
      return code;
    };

  Blockly.Blocks['attr_jump_power'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("Fuerza de Salto")
          .appendField(new Blockly.FieldDropdown([["Débil", "low"], ["Normal", "normal"], ["Fuerte", "hard"]]), "opciones_salto");
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setColour(210);
      this.setTooltip('');
      this.setHelpUrl('http://www.example.com/');
    }
  };

  Blockly.JavaScript['attr_jump_power'] = function(block) {
    var dropdown_opciones_salto = block.getFieldValue('opciones_salto');
    // TODO: Assemble JavaScript into code variable.
    var code = 'rex.setJumpPower("' + dropdown_opciones_salto + '");\n';
    return code;
  };
  
  
 



Blockly.Blocks['var_estoyfrenteaunacaja'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Crear variable")
        .appendField(new Blockly.FieldVariable("estoy frente a una caja"), "estoy_frente_a_una_caja")
        .appendField("con valor")
        .appendField(new Blockly.FieldDropdown([["Verdadero", "true"], ["Falso", "false"], ["", ""]]), "opciones");
    this.setInputsInline(true);
    this.setNextStatement(true, null);
    this.setColour(165);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};
var temporal = null;
Blockly.JavaScript['var_estoyfrenteaunacaja'] = function(block) {
  var variable_estoy_frente_a_una_caja = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('estoy_frente_a_una_caja'), Blockly.Variables.NAME_TYPE);
  var dropdown_opciones = block.getFieldValue('opciones');
  // TODO: Assemble JavaScript into code variable.
  var code = 'var ' + variable_estoy_frente_a_una_caja + ' = ' + dropdown_opciones.toString() + ';\n';
  temporal = dropdown_opciones;
  
  return code;
};

Blockly.Blocks['var_value_estoyfrenteaunacaja'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldVariable("estoy frente a una caja"), "estoy_frente_a_una_caja");
    this.setInputsInline(true);
    this.setOutput(true, "Boolean");
    this.setColour(165);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.JavaScript['var_value_estoyfrenteaunacaja'] = function(block) {
  var variable_estoy_frente_a_una_caja = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('estoy_frente_a_una_caja'), Blockly.Variables.NAME_TYPE);
  var code = variable_estoy_frente_a_una_caja;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};


  Blockly.Blocks['attr_speed_power'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("Velocidad")
          .appendField(new Blockly.FieldDropdown([["Lenta", "slow"], ["Normal", "normal"], ["Rápida", "fast"]]), "opciones_velocidad");
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setColour(210);
      this.setTooltip('');
      this.setHelpUrl('http://www.example.com/');
    }
  };
  Blockly.JavaScript['attr_speed_power'] = function(block) {
    var dropdown_opciones_velocidad = block.getFieldValue('opciones_velocidad');
    // TODO: Assemble JavaScript into code variable.
    var code = 'rex.setSpeedPower("' + dropdown_opciones_velocidad + '");\n';
    return code;
  };
