import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CbCryptobo4rdComponent } from './cb-cryptobo4rd/cb-cryptobo4rd.component';
import { CbDashboardComponent } from './cb-dashboard/cb-dashboard.component';
import { CbConnectionComponent } from './cb-connection/cb-connection.component';
import { CbCryptobotComponent } from './cb-cryptobot/cb-cryptobot.component';
import { CbSettingsComponent } from './cb-settings/cb-settings.component';
import { CbAuthgardService } from './cb-services/cb-authgard.service';
import { CbAccountComponent } from './cb-account/cb-account.component';

const routes: Routes = [
  { path: '', component: CbConnectionComponent, canActivate: [CbAuthgardService]},
  {
    path: 'cryptobo4rd', canActivate: [CbAuthgardService], canActivateChild: [CbAuthgardService],
    component: CbCryptobo4rdComponent, data: { page: 'cryptobo4rd' },
    children: [
      { path: 'dashboard', component: CbDashboardComponent, data: { page: 'dashboard' }},
      { path: 'cryptobot', component: CbCryptobotComponent, data: { page: 'cryptobot' }},
      { path: 'settings', component: CbSettingsComponent, data: { page: 'settings' }},
      { path: 'account', component: CbAccountComponent, data: { page: 'account' }},
      { path: '**', redirectTo: 'dashboard', pathMatch: 'full'},
    ]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
