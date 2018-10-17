import { Component, OnInit, Inject } from '@angular/core';
import { Language, TranslationService } from 'angular-l10n';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

interface ConfirmDialogData {
  title: string;
  message: string;
}

@Component({
  selector: 'app-cb-confirm-modal',
  templateUrl: './cb-confirm-modal.component.html',
  styleUrls: ['./cb-confirm-modal.component.css']
})
export class CbConfirmModalComponent implements OnInit {

  @Language() lang: string;

  public publicKey: string;
  public privateKey: string;

  constructor(
    private translationService: TranslationService,
    public dialogRef: MatDialogRef<CbConfirmModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData
  ) {}

  ngOnInit(): void {}

  onCancel(event: Event): void {
    event.preventDefault();
    this.dialogRef.close(false);
  }

  cancel() {
    this.dialogRef.close(false);
  }

  confirm() {
    this.dialogRef.close(true);
  }
}
