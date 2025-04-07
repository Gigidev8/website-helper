import DropdownMenuControl from "./dropdownMenuControl.js";
import OpinionsHandler from "./opinionsHandler.js";

// Check that dropdown elements exist before using them
const menuItems = document.getElementById("menuIts");
const menuTitle = document.getElementById("menuTitle");

if (menuItems && menuTitle) {
  window.drMenuCntrl = new DropdownMenuControl("menuIts", "menuTitle", "mnShow");
}

const opinionsHandler = new OpinionsHandler("opnFrm", "opinionsContainer");
opinionsHandler.init();
