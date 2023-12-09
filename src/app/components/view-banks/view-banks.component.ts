import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BankService } from 'src/app/shared/bank.service';

@Component({
  selector: 'app-view-banks',
  templateUrl: './view-banks.component.html',
  styleUrls: ['./view-banks.component.css']
})
export class ViewBanksComponent implements OnInit {

  isUpdate: boolean = false;
  selectedId !: string;
  registerForm !: FormGroup;
  submitted = false;
  banks: any[] = [];

  get f() {
    return this.registerForm.controls
  }

  constructor(
    private formBuilder: FormBuilder,
    private bankService: BankService
  ) { }

  ngOnInit(): void {
    this.getBanks();

    this.registerForm = this.formBuilder.group({
      bankName: [''],
      status: [''],
      code: ['']
    });
  }

  onUpdate(bank: any, id: string): void {
    this.isUpdate = true;
    this.selectedId = id;
    this.registerForm.patchValue({
      bankName: bank.bankName,
      status: bank.status,
      code: bank.code
    })
  }

  getBanks(): void {
    this.bankService.getAllBanks().subscribe(res => {
      this.banks = res;
      console.log(res);
    })
  }

  onSubmit(): void {
    if (this.isUpdate) {
      this.bankService.updateBank(this.registerForm.value, this.selectedId).subscribe(res => {
        console.log("success " + res);
      })
    }else{
      console.log(this.registerForm.value);
      this.bankService.addBank(this.registerForm.value).subscribe(res =>{
        console.log("Add Success");
      })
    }
  }

  deleteBank(id : string): void{
    let isConfirm: boolean = confirm('Are you sure want to delete this record');
    if (isConfirm) {
      this.bankService.deleteBank(id)
    }
  }

}
