import { ProjectInput } from "./component/project-input";
import { ProjectList } from "./component/project-list";

const projectInput = new ProjectInput();
const activeProjectList = new ProjectList('active');
const finishedProjectList = new ProjectList('finished');

// run `npm  start` for development 