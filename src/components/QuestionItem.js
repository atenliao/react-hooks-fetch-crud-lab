import React from "react";

function QuestionItem({ question, onDeleteQuestion, onUpdateQuestion }) {
  const { id, prompt, answers, correctIndex } = question;
  // const [isCorrectIndex, setIsCorrectIndex] = useState(correctIndex)
  // const [isDelete, setIsDelete] = useState(false)
  function handleDeleteClick(){
    fetch(`http://localhost:4000/questions/${question.id}`,{
      method:'DELETE',
    })
    .then(res=> res.json())
    .then(()=> onDeleteQuestion(question))
  }

  function handleUpdate(event){
    fetch(`http://localhost:4000/questions/${question.id}`,{
      method:'PATCH',
      headers:{
        "Content-Type": "application/json"
      },
      body:JSON.stringify({
        correctIndex: event.target.value
      })
    })
    .then(res=> res.json())
    .then((question) => onUpdateQuestion(question))
  }

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={handleUpdate}>{options}</select>
      </label>
      <button onClick={handleDeleteClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
