import PropTypes from 'prop-types';

function TaskCreate({ text='', onInput, onCreate }) {

  const handleInput = (ev) => {
    onInput(ev.currentTarget.value);
  }

  const handleSubmit = (ev) => {
    ev.preventDefault();

    onCreate();
  }

  return (
    <section className='container add' onSubmit={handleSubmit}>
      <form className='task-form-add'>
        <input type='text' className='task-input' placeholder='Nueva tarea' value={text} onInput={handleInput} />
        <button className='add-task-btn' type="submit">Agregar</button>
      </form>
    </section>
  );
}

TaskCreate.propTypes = {
  text: PropTypes.string,
  onInput: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
};

export default TaskCreate;
