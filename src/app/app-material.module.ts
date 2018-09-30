import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatToolbarModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatFormFieldModule,
  MatInputModule,
  MatTableModule,
  MatButtonToggleModule,
  MatPaginatorModule,
  MatSelectModule,
  MatTooltipModule,
  MatMenuModule,
  MatBadgeModule
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatButtonToggleModule,
    MatPaginatorModule,
    MatSelectModule,
    MatTooltipModule,
    MatMenuModule,
    MatBadgeModule
  ],
  exports: [
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatButtonToggleModule,
    MatPaginatorModule,
    MatSelectModule,
    MatTooltipModule,
    MatMenuModule,
    MatBadgeModule
  ]
})
export class AppMaterialModule {}
