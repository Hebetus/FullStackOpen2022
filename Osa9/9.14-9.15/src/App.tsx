const courseName = "Half Stack application development";

interface Description {
  value: string;
}

interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface CourseNormalPart extends CoursePartBase {
  type: "normal";
  description: Description;
}

interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CoursePartBase {
  type: "submission";
  description: Description;
  exerciseSubmissionLink: string;
}

interface CourseSpecialPart extends CoursePartBase {
  type: "special";
  description: Description;
  requirements: Array<string>;
}

type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;

const courseParts: CoursePart[] = [
  {
    name: "Fundamentals",
    exerciseCount: 10,
    description: {
      value: "This is the easy course part"
    },
    type: "normal"
  },
  {
    name: "Advanced",
    exerciseCount: 7,
    description: {
      value: "This is the hard course part"
    },
    type: "normal"
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7,
    groupProjectCount: 3,
    type: "groupProject"
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14,
    description: {
      value: "Confusing description"
    },
    exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
    type: "submission"
  },
  {
    name: "Backend development",
    exerciseCount: 21,
    description: {
      value: "Typing the backend"
    },
    requirements: ["nodejs", "jest"],
    type: "special"
  }
];

const Part = ({ index }: { index: number }) => {
  const part = courseParts[index];
  switch(part.type) {
    case "normal":
      return (
        <div>
          <p>{part.name} {part.exerciseCount}</p>
          <p>{part.description.value}</p>
        </div>
      )
    case "groupProject":
      return (
        <div>
          <p>{part.name} {part.exerciseCount}</p>
          <p>Project excercises: {part.groupProjectCount}</p>
        </div>
      )
    case "submission":
      return (
        <div>
          <p>{part.name} {part.exerciseCount}</p>
          <p>{part.description.value}</p>
          <p>submit to {part.exerciseSubmissionLink}</p>
        </div>
      )
    case "special":
      return (
        <div>
          <p>{part.name} {part.exerciseCount}</p>
          <p>{part.description.value}</p>
          <p>required skills: {part.requirements}</p>
        </div>
      )
    default:
      throw Error('Wrong index!');
  }
}

const Header = () => {
  return (
    <div>
      <h1>{courseName}</h1>
    </div>
  )
};

const Content = () => {
  return (
    <div>
      <Part index={0} />
      <Part index={1} />
      <Part index={2} />
      <Part index={3} />
      <Part index={4} />
      
    </div>
  )
};

const Total = () => {
  return (
    <div>
      <p>
        Number of exercises{" "}
        {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    </div>
  )
};

function App() {
  return (
    <div className="App">
      <Header />
      <Content />
      <Total />
    </div>
  );
}

export default App;
