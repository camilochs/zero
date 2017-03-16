/**

Autor: Camilo Chacón Sartori. 2015

**/
var functionToSpanish =
{
	"rex.jumpMove();": "saltar();",
	"rex.rightMove();": "derecha();",
	"rex.leftMove();": "izquierda();",
	"rex.attackMove();":"ataque();",
	"rex.attackToBoxMove();":"saltarDestruirCaja();",
	"rex.setJumpPower(\"low\");": "fuerzaSalto(\"debil\");",
	"rex.setJumpPower(\"normal\");": "fuerzaSalto(\"normal\");",
	"rex.setJumpPower(\"hard\");": "fuerzaSalto(\"fuerte\");",
	"rex.setSpeedPower(\"slow\");": "velocidad(\"baja\");",
	"rex.setSpeedPower(\"normal\");": "velocidad(\"normal\");",
	"rex.setSpeedPower(\"fast\");": "velocidad(\"fuerte\");",
}

var translateToFunctions = 
{
	"estoy_frente_a_una_caja": "rex.checkFrontBox()"
}