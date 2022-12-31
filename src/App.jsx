import preguntas from "./preguntas";
import { useEffect, useState } from 'react';

function App() {

  const [ preguntaActual, setPreguntaActual ] = useState(0);
  const [ puntuacion, setPuntuacion ] = useState(0);
  const [ isFinished, setIsFinished ] = useState(false);
  const [ tiempoRestante, setTiempoRestante ] = useState(10);
  const [ disable, setDisable ] = useState(false);
  const [ answersShown, setAnswersShown ] = useState(false);

  const handleAnswerSubmit = (isCorrect, e) => {
    if (isCorrect) setPuntuacion(puntuacion + 1);

    e.target.classList.add(isCorrect ? "correct" : "incorrect");

    setTimeout(()=> {
      if(preguntaActual == preguntas.length - 1){
        setIsFinished(true);
      }else{
        setPreguntaActual(preguntaActual + 1);
      }
    }, 1500);
  }

  useEffect(() => {
    
    const intervalo = setInterval(() => {
      if(tiempoRestante > 0) setTiempoRestante(tiempoRestante - 1);
      if(tiempoRestante === 0) setDisable(true);
    }, 1000);

    return () => clearInterval(intervalo);
  }, [tiempoRestante]);

  if(isFinished) return (
    <main className="app">
      <div className="juego-terminado">
        <span>
          {" "}
          Obtuviste {puntuacion} de {preguntas.length}{" "}
        </span>
        <button onClick={() => {window.location.href="/quiz-app/"}}>Volver a jugar</button>
        <button onClick={() => {
          setIsFinished(false);
          setAnswersShown(true);
          setPreguntaActual(0);
        }}>Ver respuesta</button>
      </div>
    </main>
  );

  if(answersShown) return(
    <main className="app">
      <div classname="lado-izquierdo">
        <div classname="numero-pregunta">
        </div>
        <div classname="titulo-pregunta">
          <span>Pregunta {preguntaActual + 1} de</span> {preguntas.length}
        </div>
        <div classname="titulo-pregunta">
          {preguntas[preguntaActual].titulo}
        </div>
        <div>
          {preguntas[preguntaActual].opciones.filter((opcion) => opcion.isCorrect)[0].textoRespuesta}
        </div>
        <button onClick={()=>{
          if(preguntaActual == preguntas.length - 1){
            window.location.href = "/";
          }else{
            setPreguntaActual(preguntaActual + 1);
          }
        }}>
          {preguntaActual === preguntas.length - 1 ? 'Volver a jugar' : 'Continuar'}
        </button>
      </div>
    </main>
  );
  
  return (
    <main className="app">
      <div className="lado-izquierdo">
        <div className="numero-pregunta">
        </div>
        <div className="titulo-pregunta">
          <span>Pregunta {preguntaActual + 1} de</span> {preguntas.length}
        </div>
        <div className="titulo-pregunta">
          {preguntas[preguntaActual].titulo}
        </div>{!disable ? 
        (<span className="tiempo-restante">Tiempo restante: {tiempoRestante}</span>)
        :(<button onClick={()=>{
          setTiempoRestante(10) 
          setDisable(false)
          setPreguntaActual(preguntaActual + 1)
        }}>Continuar</button>)}
      </div>
      <div className="lado-derecho">
        {preguntas[preguntaActual].opciones.map((respuesta) =>
          <button
            disabled={disable}
            key={respuesta.textoRespuesta}
            onClick={(e) => handleAnswerSubmit(respuesta.isCorrect, e)}
          > 
            {respuesta.textoRespuesta}
          </button>
        )}
      </div>
    </main>
  )
}

export default App
