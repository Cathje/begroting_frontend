import {Component} from 'angular2/core';


@Component({ //invoke with metadata object
    selector: 'test-container',
    template: '<h3>test</h3>'
})



export class TestComponent {
    title = 'Gemeente - Begrotingsvoorstel';
}

