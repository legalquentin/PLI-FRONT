import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import {
  L10nConfig,
  L10nLoader,
  LocalizationModule,
  StorageStrategy,
  ProviderType
} from 'angular-l10n';

// APP
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppMaterialModule } from './app-material.module';
// SERVICES

// COMPONENTS
import { CbCryptobo4rdComponent } from './cb-cryptobo4rd/cb-cryptobo4rd.component';
import { CbDashboardComponent } from './cb-dashboard/cb-dashboard.component';
import { CbMenuLeftComponent } from './cb-menu-left/cb-menu-left.component';
import { CbMenuTopComponent } from './cb-menu-top/cb-menu-top.component';
import { CbConnectionComponent } from './cb-connection/cb-connection.component';
import { CbWidget1Component } from './cb-dashboard/cb-widgets/cb-widget-1/cb-widget-1.component';
import { CbKpi1Component } from './cb-dashboard/cb-kpis/cb-kpi-1/cb-kpi-1.component';
import { CbCryptobotComponent } from './cb-cryptobot/cb-cryptobot.component';
import { CbSettingsComponent } from './cb-settings/cb-settings.component';

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
    CbWidget1Component,
    CbKpi1Component,
    CbCryptobotComponent,
    CbSettingsComponent
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
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initL10n,
      deps: [L10nLoader],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
