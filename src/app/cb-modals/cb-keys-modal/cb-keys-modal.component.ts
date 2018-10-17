import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Language, TranslationService } from 'angular-l10n';

export interface KeyDialogData {
  username: string;
}

@Component({
  selector: 'app-cb-keys-modal',
  templateUrl: './cb-keys-modal.component.html',
  styleUrls: ['./cb-keys-modal.component.css']
})
export class CbKeysModalComponent implements OnInit {
  @Language() lang: string;

  public publicKey: string;
  public privateKey: string;

  constructor(
    private translationService: TranslationService,
    public dialogRef: MatDialogRef<CbKeysModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: KeyDialogData
  ) {}

  ngOnInit(): void {}

  onCancel(event: Event): void {
    event.preventDefault();
    this.dialogRef.close(false);
  }

  close() {
    this.dialogRef.close(false);
  }

  save() {
    this.dialogRef.close({
      pub: this.publicKey,
      priv: this.privateKey
    });
  }
}
