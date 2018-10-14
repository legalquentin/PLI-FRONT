import { Component, OnInit, Input } from '@angular/core';

interface MessageTemplate {
  HEADER: string;
  BODY: string;
  FOOTER: string;
}

@Component({
  selector: 'app-cb-message-template',
  templateUrl: './cb-message-template.component.html',
  styleUrls: ['./cb-message-template.component.css']
})
export class CbMessageTemplateComponent implements OnInit {
  @Input() MESSAGE: MessageTemplate;

  constructor() { }

  ngOnInit() {

  }

}
