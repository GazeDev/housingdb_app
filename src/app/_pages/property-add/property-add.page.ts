import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '_services/api.service';

@Component({
  selector: 'app-property-add',
  templateUrl: './property-add.page.html',
  styleUrls: ['./property-add.page.scss'],
})
export class PropertyAddPage implements OnInit {

  form: FormGroup;
  submitAttempt: boolean;
  currentlySubmitting: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
  ) {
    this.submitAttempt = false;
    this.currentlySubmitting = false;
    this.form = this.formBuilder.group({
      address: ['', Validators.compose([Validators.required])],
      // landlord: [''],
      name: [''],
      // iOwn: [''],
      body: [''],
    });
  }

  ngOnInit() {

  }

  submit() {
    this.currentlySubmitting = true;
    this.submitAttempt = true;

    if (!this.form.valid) {
      console.log('form invalid!');
      return;
    }
    console.log(this.form.get('address').value);
    console.log(this.form.get('name').value);
    console.log(this.form.get('body').value);
    this.apiService.addProperty(this.form.value).subscribe(response => {
      console.log(response);
    });
  }

}
