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

interface PartProps {
    coursePart: CoursePart;
}

const Part = (props: PartProps) => {
    const part = props.coursePart;
    switch (part.kind) {
        case "basic":
            return <p>
                        {part.name} {part.exerciseCount}
                        {part.description}
                    </p>
        case "group":
            return <p>
                        {part.name} {part.exerciseCount}
                        project exercises {part.groupProjectCount}
                    </p>
        case "background":
            return <p>
                        {part.name} {part.exerciseCount}
                        {part.description}
                        background material: {part.backgroundMaterial}
                    </p>
        case "special":
            return <p>
                        {part.name} {part.exerciseCount}
                        required skills: {part.requirements.map(requirement => <p key={0}>{requirement}</p>)}
                    </p>
    }
};

export default Part;