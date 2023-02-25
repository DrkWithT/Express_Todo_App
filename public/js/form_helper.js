/**
 * @file form_helper.js
 * @brief Adjusts form constraints based on the form action selected: 1 for fetch task, 2 for insert task, 3 for delete task by ID or title.
 * @author Derek Tan
 * @note Fixed bug where form script set the wrong length for the title input on delete mode, and the script now runs on load.
 */

const FormActions = {
    FETCH_TODO: 1,
    INSERT_TODO: 2,
    DELETE_TODO: 3
};

(function(doc) {
    /** @type {HTMLInputElement} */
    let ActionInput = doc.querySelector('input#action-input');

    /** @type {HTMLInputElement} */
    let TitleIDInput = doc.querySelector('input#title-input');

    /** @type {HTMLInputElement} */
    let DescInput = doc.querySelector('textarea#description-input');

    function modifyRequiredState(choiceAction) {
        // reset all input attrs
        TitleIDInput.removeAttribute('required');
        TitleIDInput.setAttribute('minlength', '8');
        DescInput.removeAttribute('required');

        // set only the necessary inputs to required, etc.
        switch (choiceAction) {
            case FormActions.FETCH_TODO:
                TitleIDInput.toggleAttribute('required');
                break;
            case FormActions.INSERT_TODO:
                TitleIDInput.toggleAttribute('required');
                DescInput.toggleAttribute('required');
                break;
            case FormActions.DELETE_TODO:
                TitleIDInput.toggleAttribute('required');
                TitleIDInput.setAttribute('minlength', '1');
                break;
            default:
                break;
        }
    }

    /// set listeners on script load
    ActionInput.addEventListener('input', () => {
        modifyRequiredState(parseInt(ActionInput.value));
    });

    // default form mode to "read"
    modifyRequiredState(FormActions.FETCH_TODO);

})(document)