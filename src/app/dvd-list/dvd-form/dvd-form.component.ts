import { DvdsService } from './../../services/dvds.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Dvd } from '../../models/dvd.model';

@Component({
  selector: 'app-dvd-form',
  templateUrl: './dvd-form.component.html',
  styleUrls: ['./dvd-form.component.css']
})
export class DvdFormComponent implements OnInit {

  dvdForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private dvdsService: DvdsService,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm(): void {
    this.dvdForm = this.formBuilder.group({
      title: ['', Validators.required],
      genre: ['', Validators.required],
      synopsis: ''
    });
  }

  onSaveDvd() {
    const title = this.dvdForm.get('title').value;
    const genre = this.dvdForm.get('genre').value;
    const synopsis = this.dvdForm.get('synopsis').value;
    const newDvd = new Dvd(title, genre);
    newDvd.synopsis = synopsis;
    this.dvdsService.createNewDvd(newDvd);
    this.router.navigate(['/dvd']);
  }

}
