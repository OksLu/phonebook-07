import PropTypes from 'prop-types';
import { CiUser, CiSquareRemove } from 'react-icons/ci';
import css from './Contact.module.css';
import { useDispatch } from 'react-redux';
import { deleteContactThunk } from 'services/api';

export const Contact = ({ id, name, phone }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteContactThunk(id));
  };

  return (
    <div className={css.contact}>
      <h3 className={css.name}>
        <CiUser />
        {name}
      </h3>
      <p className={css.number}>{phone}</p>
      <CiSquareRemove className={css.close} onClick={handleDelete} />
    </div>
  );
};

Contact.prototype = {
  currentId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  deleteContact: PropTypes.func.isRequired,
};
