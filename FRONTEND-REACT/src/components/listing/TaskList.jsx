import { Trash2 } from 'feather-icons-react';
import PropTypes from 'prop-types';

function TaskList({ tasks, onEdit, onDelete }) {

  const handleClickComplete = (ev) => {
    const taskId = parseInt(ev.currentTarget.id);

    const taskClicked = tasks.find(t => t.id === taskId )

    const taskText = taskClicked?.text;
    const taskCompleted = !taskClicked.completed;

    onEdit(taskId, taskText, taskCompleted);
  }

  const handleClickTrash = (ev) => {
    const taskId = parseInt(ev.currentTarget.id);

    onDelete(taskId);
  }

  const htmlList = tasks.map((t) => (
    <li key={t.id} className={t.completed ? "tachado" : null}>
      <input id={t.id} type="checkbox" checked={t.completed} onChange={handleClickComplete} />
      {t.text}
      <Trash2 id={t.id} size="16" onClick={handleClickTrash} />
    </li>
  ));

  return (
    <>
      {tasks.length ? (
        <ul className='task-list'>{htmlList}</ul>
      ) : (
        <p>No hay tareas para mostrar</p>
      )}
    </>
  );
}

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      completed: PropTypes.bool
    })
  ),
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default TaskList;
