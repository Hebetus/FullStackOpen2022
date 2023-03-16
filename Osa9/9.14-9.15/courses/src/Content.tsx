import Part from './Part';

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

const Content = (props: ContentProps) => {
    return (
        <div>
            {props.courseParts.map(part => <Part coursePart={part} key={0}/>)}
        </div>
    );
};

export default Content;