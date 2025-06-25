import "./PromoModal.scss";

const PromoModal = ({ promo, onClose }) => {
  if (!promo) return null; // Do not render if no promo is selected

  return (
    <div className="promo-modal">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>✖</button>
        <h2>{promo.title}</h2>
        <p>{promo.text}</p>
        <img src={promo.image} alt={promo.title} />
      </div>
    </div>
  );
};

export default PromoModal;
