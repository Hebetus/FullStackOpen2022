export default Course

function Course(props){
    const parts = props.course.parts;
  
      return (
      <div>
        <h2>{props.course.name}</h2>
        <Content parts={parts} />
      </div>
    );
  }
  
  function Content(props){
    let content = [];
    props.parts.forEach(part => content.push(<Part name={part.name} amount={part.exercises} />));
  
    const total = props.parts.reduce( (sum, order) => {
      return sum + order.exercises
    }, 0)
  
    return (
      <div>
        {content}
        <p>total of {total} exercises</p>
      </div>
    );
  }
  
  function Part(props){
      return <p>{props.name} {props.amount}</p>;
  }