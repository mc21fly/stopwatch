import { useEffect } from 'react';
import anime from 'animejs/lib/anime.es';
import './Buttons.scss';

const Buttons = ({ children }) => {
  return <div className="buttons">{children}</div>;
};

const Button = ({ id, show, role, callback }) => {
  useEffect(() => {
    if (show) {
      anime({
        targets: '#button1',
        translateX: '-10%',
      });
      anime({
        targets: '#button2',
        translateX: '10%',
        opacity: 1,
      });
    } else {
      anime({
        targets: '#button1',
        translateX: '50%',
        opacity: 1,
      });
      anime({
        targets: '#button2',
        translateX: '-50%',
        opacity: 0,
      });
    }
  }, [show]);

  return (
    <button
      className={`button ${role ? `button__${role}` : ''}`}
      id={`button${id}`}
      onClick={callback}>
      {role.toUpperCase()}
    </button>
  );
};

Buttons.Button = Button;
export default Buttons;
