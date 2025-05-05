import { api, LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class SuccessMessage extends LightningElement {
    @api title;
    @api message;
    @api variant; //  Type of toast'info', 'success', 'warning', ou 'error'
    @api delay; // Delay of the toast in milliseconds

    connectedCallback() {
        this.showToastMessage();
    }

    showToastMessage() {
        let toastMessage = {
            title: this.title,
            message: this.message,
            variant: this.variant
        };

        if (this.delay) {
            setTimeout(() => {
                this.fireToastMessage(toastMessage);
            }, this.delay);
        } else {
            this.fireToastMessage(toastMessage);
        }
    }

    fireToastMessage(toastMessage) {
        this.dispatchEvent(new ShowToastEvent(toastMessage));
    }
}
