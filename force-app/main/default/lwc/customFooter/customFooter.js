import { LightningElement, api } from 'lwc';
import {
    FlowNavigationNextEvent,
    FlowNavigationBackEvent,
    FlowNavigationFinishEvent,
    FlowAttributeChangeEvent
} from 'lightning/flowSupport';

export default class CustomFooter extends LightningElement {
    @api availableActions = [];
    @api outputValue;
    @api footerMode;

    get isContactScreen() {
        return this.footerMode === 'contact';
    }

    get isOpportunityScreen() {
        return this.footerMode === 'opportunity';
    }

    handleCancelClick() {
        this.outputValue = 'cancel';
        this.dispatchFlowValueChange();
        this.navigateFlow('NEXT');
    }

    handleSaveClick() {
        this.outputValue = 'save';
        this.dispatchFlowValueChange();
        this.navigateFlow('NEXT');
    }

    handleNextClick() {
        this.outputValue = 'saveNext';
        this.dispatchFlowValueChange();
        this.navigateFlow('NEXT');
    }

    handlePreviousClick() {
        this.outputValue = 'back';
        this.dispatchFlowValueChange();
        this.navigateFlow('NEXT');
    }

    handleSaveAndFinishClick() {
        this.outputValue = 'saveFinish';
        this.dispatchFlowValueChange();
        this.navigateFlow('NEXT');
    }

    dispatchFlowValueChange() {
        const attributeChangeEvent = new FlowAttributeChangeEvent(
            'outputValue',
            this.outputValue
        );
        this.dispatchEvent(attributeChangeEvent);
    }

    navigateFlow(action) {
        if (this.availableActions.includes(action)) {
            let navigateEvent;
            if (action === 'NEXT') {
                navigateEvent = new FlowNavigationNextEvent();
            } else if (action === 'BACK') {
                navigateEvent = new FlowNavigationBackEvent();
            } else if (action === 'FINISH') {
                navigateEvent = new FlowNavigationFinishEvent();
            }
           
            if (navigateEvent) {
                this.dispatchEvent(navigateEvent);
            }
        }
    }
}
