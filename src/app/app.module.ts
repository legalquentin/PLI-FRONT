import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import {
  L10nConfig,
  L10nLoader,
  LocalizationModule,
  StorageStrategy,
  ProviderType
} from 'angular-l10n';
// import CryptowatchEmbed from 'cryptowatch-embed';
// APP
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppMaterialModule } from './app-material.module';
import { CbCryptobo4rdComponent } from './cb-cryptobo4rd/cb-cryptobo4rd.component';
import { CbDashboardComponent } from './cb-dashboard/cb-dashboard.component';
import { CbMenuLeftComponent } from './cb-menu-left/cb-menu-left.component';
import { CbMenuTopComponent } from './cb-menu-top/cb-menu-top.component';
import { CbConnectionComponent } from './cb-connection/cb-connection.component';
import { CbCryptobotComponent } from './cb-cryptobot/cb-cryptobot.component';
import { CbSettingsComponent } from './cb-settings/cb-settings.component';
import { CbKpi1Component } from './cb-shared/cb-kpis/cb-kpi-1/cb-kpi-1.component';
import { CbWidgetContainerComponent } from './cb-shared/cb-widgets/cb-widget-container/cb-widget-container.component';
import { CbWidgetLineChartComponent } from './cb-shared/cb-widgets/cb-widget-line-chart/cb-widget-line-chart.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CbAuthgardService } from './cb-services/cb-authgard.service';
import { CbAccountComponent } from './cb-account/cb-account.component';
import { CbDataTableComponent } from './cb-data-table/cb-data-table.component';
import { CbCryptowatchComponent } from './cb-shared/cb-cryptowatch/cb-cryptowatch.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CbFundsComponent } from './cb-funds/cb-funds.component';
import { CbTransactionComponent } from './cb-transaction/cb-transaction.component';
import { CbMessageTemplateComponent } from './cb-message-template/cb-message-template.component';
import { CbSafeHtml } from './cb-shared/cb-pipes/cb-safehtml.pipe';
import { CbExchangeAccountsComponent } from './cb-exchange-accounts/cb-exchange-accounts.component';
import { CbKeysModalComponent } from './cb-modals/cb-keys-modal/cb-keys-modal.component';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material';
import { CbConfirmModalComponent } from './cb-modals/cb-confirm-modal/cb-confirm-modal.component';
import { CbSocialComponent } from './cb-social/cb-social.component';
import { CbDashboardPieComponent } from './cb-shared/cb-dashboard-pie/cb-dashboard-pie.component';
import { CbDashboardGraphComponent } from './cb-shared/cb-dashboard-graph/cb-dashboard-graph.component';

const l10nConfig: L10nConfig = {
  locale: {
        languages: [
            { code: 'en', dir: 'ltr' },
            { code: 'fr', dir: 'ltr' }
        ],
        language: 'en',
        storage: StorageStrategy.Local,
        cookieExpiration: 30
    },
    translation: {
        providers: [
            { type: ProviderType.Static, prefix: './assets/locale-' }
        ],
        caching: true,
        missingValue: 'No key'
    }
};

// Advanced initialization.
export function initL10n(l10nLoader: L10nLoader): Function {
  return () => l10nLoader.load();
}

@NgModule({
  declarations: [
    AppComponent,
    CbCryptobo4rdComponent,
    CbDashboardComponent,
    CbMenuLeftComponent,
    CbMenuTopComponent,
    CbConnectionComponent,
    CbKpi1Component,
    CbCryptobotComponent,
    CbSettingsComponent,
    CbWidgetContainerComponent,
    CbWidgetLineChartComponent,
    CbAccountComponent,
    CbDataTableComponent,
    CbCryptowatchComponent,
    CbFundsComponent,
    CbTransactionComponent,
    CbMessageTemplateComponent,
    CbSafeHtml,
    CbExchangeAccountsComponent,
    CbKeysModalComponent,
    CbConfirmModalComponent,
    CbSocialComponent,
    CbDashboardPieComponent,
    CbDashboardGraphComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    LocalizationModule.forRoot(l10nConfig),
    BrowserAnimationsModule,
    NgxChartsModule,
    FlexLayoutModule,
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initL10n,
      deps: [L10nLoader],
      multi: true
    },
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: {hasBackdrop: true}
    },
    CbAuthgardService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    CbKeysModalComponent,
    CbConfirmModalComponent
  ]
})
export class AppModule { }
