import { MdOutlinePhone } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import css from "./Contact.module.css";

const Contact = ({ data: { id, name, number }, onDelete }) => {
  return (
    <div className={css.contactCard}>
      <div className={css.contactInfo}>
        <p className={css.contactItem}><FaUser className={css.icon} /> {name}</p>
        <p className={css.contactItem}><MdOutlinePhone className={css.icon} /> {number}</p>
      </div>
      <button className={css.deleteButton} onClick={() => onDelete(id)}>
        Delete
      </button>
    </div>
  );
};

export default Contact;