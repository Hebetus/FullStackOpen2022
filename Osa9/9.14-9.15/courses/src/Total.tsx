interface CoursePartBase {
    name: string;
    exerciseCount: number;
}
  
interface Something extends CoursePartBase {
    description: string;
}
  
interface CoursePartBasic extends Something {
    kind: "basic"
}
  
interface CoursePartGroup extends CoursePartBase {
    groupProjectCount: number;
    kind: "group"
}
  
interface CoursePartBackground extends Something {
    backgroundMaterial: string;
    kind: "background"
}
  
interface CoursePartSpecial extends Something {
    requirements: string[];
    kind: "special"
}
  
type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;

interface ContentProps {
    courseParts: CoursePart[];
}

const Total = (props: ContentProps) => {
    return (
        <p>
            Number of exercises{" "}
            {props.courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
        </p>
    );
};

export default Total;