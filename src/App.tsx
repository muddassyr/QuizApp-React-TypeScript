import React, { useEffect, useState } from 'react';
import './App.css';
import QuestionCard from './Components/QuestionCard';
import { getQuizDetails } from './services/quiz_services'
import { QuestionType} from './types/quiz_types'

function App() {

  let [quiz, setQuiz] = useState<QuestionType[]>([])
  let [currentStep, setCurrentStep] = useState(0)
  let [score, setScore] = useState(0)

  useEffect(() => {
    getQuizDetails(5, 'easy')

    async function fetchData() {
      const questions:QuestionType[] = await getQuizDetails(5, 'easy');
      setQuiz(questions)
    }
    fetchData()
  }, [])


  const handleSubmit = (e:React.FormEvent<EventTarget>, userAns:string)=>{
    const currentQuestion: QuestionType = quiz[currentStep]
    console.log('correct answ: '+ currentQuestion.answer + " -user Select Ans: " + userAns);

    if(userAns === currentQuestion.answer ){
      setScore(++score)
    }
    
    e.preventDefault();
    if(currentStep !== quiz.length-1)
    setCurrentStep(++currentStep)
    else{
      alert("Your Score is "+ score + " out of: " + quiz.length);
      setCurrentStep(0)
      setScore(0)
    }
  }

  if(!quiz.length) return <h4>Loading...</h4>

  return (
    <div className="App">
      <QuestionCard
        options={quiz[currentStep].option}
        question={quiz[currentStep].question}
        callback={handleSubmit}
      />
    </div>
  );
}

export default App;
