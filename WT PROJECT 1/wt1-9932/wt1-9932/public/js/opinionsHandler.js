export default class OpinionsHandler {
    constructor(opinionsFormElmId, opinionsListElmId) {
        this.opinions = [];
        this.opinionsListElm = document.getElementById(opinionsListElmId);
        this.opinionsFrmElm = document.getElementById(opinionsFormElmId);
    }

    init() {
        // Load opinions from localStorage if they exist
        if (localStorage.myTreesComments) {
            this.opinions = JSON.parse(localStorage.myTreesComments);
        }

        // Render the opinions list to HTML
        this.renderOpinions();

        // Add event listener to handle form submission
        this.opinionsFrmElm.addEventListener("submit", event => this.processOpnFrmData(event));
    }

    processOpnFrmData(event) {
        event.preventDefault();

        // Read data from the form
        const nopName = this.opinionsFrmElm.elements["nameElm"].value.trim();
        const nopOpn = this.opinionsFrmElm.elements["opnElm"].value.trim();
        const nopWillReturn = this.opinionsFrmElm.elements["willReturnElm"].checked;

        // Validate the form data
        if (nopName === "" || nopOpn === "") {
            alert("Please, enter both your name and opinion.");
            return;
        }

        // Create new opinion object
        const newOpinion = {
            name: nopName,
            comment: nopOpn,
            willReturn: nopWillReturn,
            created: new Date()
        };

        // Add new opinion and update localStorage
        this.opinions.push(newOpinion);
        localStorage.myTreesComments = JSON.stringify(this.opinions);

        // Re-render opinions
        this.renderOpinions();

        // Reset the form
        this.opinionsFrmElm.reset();
    }

    opinion2html(opinion, index) {
        return `
            <div class="opinion">
                <h3>${opinion.name}</h3>
                <p><strong>Comment:</strong> ${opinion.comment}</p>
                <p><strong>Will Return:</strong> ${opinion.willReturn ? "Yes" : "No"}</p>
                <p><small>Submitted on: ${new Date(opinion.created).toLocaleString()}</small></p>
                <button class="delete-btn" data-index="${index}">Delete</button>
            </div>
        `;
    }

    opinionArray2html(sourceData) {
        return sourceData.map((opinion, index) => this.opinion2html(opinion, index)).join('');
    }

    renderOpinions() {
        this.opinionsListElm.innerHTML = this.opinionArray2html(this.opinions);

        // Add event listeners for delete buttons
        const deleteBtns = this.opinionsListElm.querySelectorAll(".delete-btn");
        deleteBtns.forEach(button => {
            button.addEventListener("click", event => this.deleteOpinion(event));
        });
    }

    deleteOpinion(event) {
        const index = event.target.getAttribute("data-index");
        
        // Remove the opinion from the array
        this.opinions.splice(index, 1);

        // Update localStorage
        localStorage.myTreesComments = JSON.stringify(this.opinions);

        // Re-render the opinions
        this.renderOpinions();
    }
}
