import PropTypes from 'prop-types';

function Filters({ text='', onInput, onSearch }) {

  const handleInput = (ev) => {
    onInput(ev.currentTarget.value);
  }

  const handleSubmit = (ev) => {
    ev.preventDefault();

    onSearch();
  }

  return (
    <form className='task-form' onSubmit={handleSubmit}>
      <input type='text' className='task-input' placeholder='Ejemplo: gim' value={text} onInput={handleInput} />
      <button className='add-task-btn' type="submit">Buscar</button>
    </form>
  );
}

Filters.propTypes = {
  text: PropTypes.string,
  onInput: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
};

export default Filters;
