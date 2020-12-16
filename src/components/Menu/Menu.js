import './Menu.scss';

const Menu = () => {
  return (
    <div className="menu">
      <Item name="CONTROLS">
        To control stopwatch you can use this keys:
        <br />
        <Key self="S" />
        Start/Stop
        <br />
        <Key self="L" />
        Lap <br />
        <Key self="R" />
        Reset
      </Item>
      <Item name="ABOUT">To jest opis</Item>
    </div>
  );
};

const Item = ({ name, children: description }) => {
  return (
    <div className="menu__item">
      {name.toUpperCase()}
      <div className="menu__item--description">{description}</div>
    </div>
  );
};

const Key = ({ self }) => {
  return <div className="key">{self.toUpperCase()}</div>;
};

export default Menu;
