import "./mainmenu.scss";
import NavigationMenu from "D:/Web dev/client/src/components/NavigationMenu/NavigationMenu.jsx";
import CentralDisplay from "D:/Web dev/client/src/components/CentralDisplay/CentralDisplay";
import AdditionalPopUp from "D:/Web dev/client/src/components/AdditionalPopUp/AdditionalPopUp";

const MainMenu = () => (
  <div className="main-menu">
    <NavigationMenu />
    <CentralDisplay imageUrl="https://images.unsplash.com/photo-1651440204227-a9a5b9d19712?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
    <AdditionalPopUp />
  </div>
);

export default MainMenu;
