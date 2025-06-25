import "./centraldisplay.scss";

const CentralDisplay = ({ imageUrl }) => (
  <div className="centraldisplay">
    <img src={imageUrl} alt="Promotional Display" className="central-image" />
  </div>
);

export default CentralDisplay;
