import { Component, OnInit, Input } from '@angular/core';
import { Language, TranslationService, LocaleService } from 'angular-l10n';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CbApiService } from '../../../cb-services/cb-api.service';

@Component({
  selector: 'app-cb-widget-line-chart',
  templateUrl: './cb-widget-line-chart.component.html',
  styleUrls: ['./cb-widget-line-chart.component.css']
})
export class CbWidgetLineChartComponent implements OnInit {
  @Language() lang: string;
  @Input() widget: any;

  public data = [];
  public lineChart = true;
  public view: any[] = [485, 280];

  public showXAxis = true;
  public showYAxis = true;
  public gradient = false;
  public showLegend = true;
  public showXAxisLabel = false;
  public showYAxisLabel = false;
  public yAxisLabel = 'ETH - USDT';
  public animations = true;

  public colorScheme = {
    domain: ['#AAAAAA']
  };

  // line, area
  public autoScale = true;

  constructor(
    private translation: TranslationService,
    private locale: LocaleService,
    private ngxChart: NgxChartsModule,
    private browserAnimation: BrowserAnimationsModule,
    private browserModule: BrowserModule,
    private cbApiService: CbApiService
  ) {}

  ngOnInit() {
    this.colorScheme.domain = this.widget.colors;
    if ('view' in this.widget) {
      this.view = this.widget.view;
    } if ('key' in this.widget) {
      this.recoverData();
      this.loop();
    } else {
      this.data = [
        {
          name: this.widget.values[0],
          series: [
            {
              name: '08/12',
              value: 7
            },
            {
              name: '09/12',
              value: 10
            },
            {
              name: '10/12',
              value: 42
            },
            {
              name: '11/12',
              value: 19
            }
          ]
        },
        {
          name: this.widget.values[1],
          series: [
            {
              name: '08/12',
              value: 10
            },
            {
              name: '09/12',
              value: 11
            },
            {
              name: '10/12',
              value: 13
            },
            {
              name: '11/12',
              value: 24
            }
          ]
        },
        {
          name: this.widget.values[2],
          series: [
            {
              name: '08/12',
              value: 5
            },
            {
              name: '09/12',
              value: 3
            },
            {
              name: '10/12',
              value: 6
            },
            {
              name: '11/12',
              value: 19
            }
          ]
        },
      ];
    }
  }

  loop() {
    setTimeout(() => {
      this.recoverData();
      this.loop();
    }, 4000);
  }

  onSelect(event) {
    console.log(event);
  }

  yFormat = (e) => {
    // where e - value of tick by default
    // console.log(this);
    // now you have access to your component variables
    return e + '$';
  }

  recoverData() {
    /*
    this.cbApiService.trades(this.widget.key, 100).subscribe(result => {
      const tmp = [{
        name: this.widget.value,
        series: []
      }];
      result.forEach((obj) => {
        tmp[0].series.push({
          name: obj.id,
          value: obj.price
        });
      });
      this.data = tmp;
      this.animations = false;
    }, error => {
      console.log(error);
    });*/
  }
}
