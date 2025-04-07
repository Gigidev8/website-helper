/**
 * Class for handling a Dropdown menu
 * @param {string} menuItemsElmId - ID of the HTML element with the items of the menu
 * @param {string} menuTitleElmId - ID of the HTML element with the title of the menu
 * @param {string} showCssClass - Name of a class to be assigned to the HTML element with the items of the menu when displayed
 */
export default class DropdownMenuControl {

    /**
     * Constructor for initializing the dropdown menu
     * @param {string} menuItemsElmId - The ID of the menu items element
     * @param {string} menuTitleElmId - The ID of the menu title element
     * @param {string} showCssClass - The class to toggle for showing/hiding the menu
     */
    constructor(menuItemsElmId, menuTitleElmId, showCssClass) {
        this.menuItemsElm = document.getElementById(menuItemsElmId); // Get the menu items element
        this.menuTitleElm = document.getElementById(menuTitleElmId); // Get the menu title element
        this.showCssClass = showCssClass; // The CSS class used to show the menu

        // This selector allows us to check whether the click happened within the menu
        this.menuSelector = `#${menuItemsElmId},#${menuTitleElmId}`;

        // Event listener to close the menu if a click happens outside of the menu
        document.addEventListener("click", (event) => this.hideMenu(event));

        // Event listener to toggle the menu visibility when the title is clicked
        this.menuTitleElm.addEventListener("click", (event) => this.displayOrHideMenu(event));
    }

    /**
     * Displays or hides the menu
     */
    displayOrHideMenu() {
        this.menuItemsElm.classList.toggle(this.showCssClass); // Toggle visibility using the specified CSS class
    }

    /**
     * Hides the menu if the click happens outside the menu or title
     * @param {Event} event - The click event object
     */
    hideMenu(event) {
        // If the click is outside the menu and the title, hide the menu
        if (!event.target.matches(this.menuSelector)) {
            const menuClElmCList = this.menuItemsElm.classList;
            if (menuClElmCList.contains(this.showCssClass)) {
                menuClElmCList.remove(this.showCssClass);
            }
        }
    }
}
