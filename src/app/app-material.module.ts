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
  MatBadgeModule,
  MatProgressBarModule,
  MatCardModule,
  MatExpansionModule
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
    MatBadgeModule,
    MatProgressBarModule,
    MatCardModule,
    MatExpansionModule
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
    MatBadgeModule,
    MatProgressBarModule,
    MatCardModule,
    MatExpansionModule
  ]
})
export class AppMaterialModule {}
