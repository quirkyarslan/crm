import {
  getBoards,
  getTasks,
  getSubtasks,
  getComments,
} from "@/config/project-config";
import TaskBoard from "@/components/task-board";

const Kanban = async () => {
  const boards = await getBoards();
  const tasks = await getTasks();
  const subTasks = await getSubtasks();
  const comments = await getComments();
  return (
    <>
      <div className="px-10 py-10" >
        <TaskBoard
          boards={boards}
          tasks={tasks}
          subTasks={subTasks}
          comments={comments}
        />
      </div>
    </>
  );
};

export default Kanban;
