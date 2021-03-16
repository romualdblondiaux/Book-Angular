import { Cd } from './../../models/cd.model';
import { Router } from '@angular/router';
import { CdsService } from './../../services/cds.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cd-form',
  templateUrl: './cd-form.component.html',
  styleUrls: ['./cd-form.component.css']
})
export class CdFormComponent implements OnInit {

  cdForm: FormGroup;
  fileIsUploading = false;
  fileUrl: string;
  fileUploaded = false;

  constructor(private formBuilder: FormBuilder, private cdsService: CdsService,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm(): void {
    this.cdForm = this.formBuilder.group({
      title: ['', Validators.required],
      artiste: ['', Validators.required],
      synopsis: ''
    });
  }

  onSaveCd() {
    const title = this.cdForm.get('title').value;
    const artiste = this.cdForm.get('artiste').value;
    const synopsis = this.cdForm.get('synopsis').value;
    const newCd = new Cd(title, artiste);
    newCd.synopsis = synopsis;
    if (this.fileUrl && this.fileUrl !== '') {
      newCd.photo = this.fileUrl;
    }
    this.cdsService.createNewCd(newCd);
    this.cdsService.saveCdsToServer();
    this.router.navigate(['/books']);
  }

  onUploadFile(file: File): void {
    this.fileIsUploading = true;
    this.cdsService.uploadFile(file).then(
      (url: string) => {
        this.fileUrl = url;
        this.fileIsUploading = false;
        this.fileUploaded = true;
      }
    );
  }

  detectFiles(event): void {
    this.onUploadFile(event.target.files[0]);
  }
}
