import { useState } from "react";
import PromoModal from "D:/Web dev/client/src/components/Promo/PromoModal.jsx";
import "./additional-popup.scss";

const promos = [
  { text: "TRY IT TODAY", title: "MOST POPULAR BANNER", image: "D:/Web dev/client/resource/graphic/food1.jpg" },
  { text: "TRY IT TODAY", title: "MORE FUN MORE TASTE", image: "D:/Web dev/client/resource/graphic/food1.jpg" },
  { text: "LIMITED OFFER", title: "SPECIAL DISCOUNT", image: "D:/Web dev/client/resource/graphic/food1.jpg" },
  { text: "NEW FLAVOR", title: "TASTE THE DIFFERENCE", image: "D:/Web dev/client/resource/graphic/food1.jpg" },
  { text: "EXCLUSIVE", title: "VIP MEMBERS ONLY", image: "D:/Web dev/client/resource/graphic/food1.jpg" },
  { text: "HURRY UP!", title: "LAST CHANCE DEAL", image: "D:/Web dev/client/resource/graphic/food1.jpg" }
];


const AdditionalPopUp = () => {
  const [selectedPromo, setSelectedPromo] = useState(null);

  return (
    <div className="additionalpopup">
      {promos.map((promo, index) => (
        <div key={index} className="promo-item" onClick={() => setSelectedPromo(promo)}>
          <img src={promo.image} alt={promo.title} />
          <p className="promo-text">{promo.text}</p>
          <h3 className="promo-title">{promo.title}</h3>
        </div>
      ))}

      {/* Show Modal if promo is selected */}
      <PromoModal promo={selectedPromo} onClose={() => setSelectedPromo(null)} />
    </div>
  );
};


export default AdditionalPopUp;
