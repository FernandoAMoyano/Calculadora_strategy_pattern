interface IOperacion {
  calcular(...operandos: number[]): number;
}

//STRATEGYS

class Suma implements IOperacion {
  calcular(...operandos: number[]): number {
    if (operandos.length === 0) {
      return 0;
    } else {
      return operandos.reduce((acc, curr) => acc + curr, 0);
    }
  }
}

class Resta implements IOperacion {
  calcular(...operandos: number[]): number {
    if (operandos.length === 0) {
      return 0;
    } else {
      return operandos.reduce((acc, curr) => acc - curr);
    }
  }
}

class Multiplicacion implements IOperacion {
  calcular(...operandos: number[]): number {
    if (operandos.length === 0) return 0;
    return operandos.reduce((acc, curr) => {
      if (curr === 0) {
        return 0;
      }
      return acc * curr;
    });
  }
}

class Division implements IOperacion {
  calcular(...operandos: number[]): number {
    if (operandos.length === 0) return 0;
    return operandos.reduce((acc, curr) => {
      if (curr === 0) {
        console.log("no se puede dividir por 0");
      }
      return acc / curr;
    });
  }
}

class Display {
  private valorActual: string = "";

  mostrarValor(valor: string): void {
    this.valorActual = valor;
    console.log("Display :", this.valorActual);
  }

  mostrarResultado(resultado: number): void {
    this.valorActual = resultado.toString();
    console.log("Resultado :", this.valorActual);
  }

  mostrarError(mensaje: string): void {
    this.valorActual = mensaje;
    console.log("Error :", this.valorActual);
  }
}

//Contexto que contiene referencia a una estrategia
class Calculadora {
  private operacion: IOperacion;
  private display: Display;

  constructor(operacion: IOperacion, display: Display) {
    this.operacion = operacion;
    this.display = display;
  }

  setOperacion(operacion: IOperacion): void {
    this.operacion = operacion;
  }

  calcular(...operandos: number[]) {
    try {
      const resultado = this.operacion.calcular(...operandos);
      this.display.mostrarResultado(resultado);
    } catch (error) {
      this.display.mostrarError("Error en el calculo");
    }
  }
}

//Clase Principal
class Program {
  public static Main(): void {
    const display = new Display();

    const calculadora = new Calculadora(new Suma(), display);
    calculadora.calcular(10, 20, 30);

    calculadora.setOperacion(new Resta());
    calculadora.calcular(50, 20, 10);

    calculadora.setOperacion(new Multiplicacion());
    calculadora.calcular(30, 20);
  }
}

Program.Main();
