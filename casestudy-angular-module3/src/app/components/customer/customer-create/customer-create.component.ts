import { CustomerService } from './../../../services/customer.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { validationPhoneNumber } from '../../../validation/validation-phone-number';
import { validationIdCard } from '../../../validation/validation-id-card';
import { validationEmail } from '../../../validation/validation-email';
import { Customer } from './../../../models/customer/Customer.model';
import { CustomerType } from './../../../models/customer/CustomerType.model';

@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.css']
})
export class CustomerCreateComponent implements OnInit {

  customerRegisterForm: FormGroup;
  customer: Customer;
  customerTypes: CustomerType[];

  constructor(private fb: FormBuilder, private customerService: CustomerService) { }

  ngOnInit(): void {
    this.customerTypes = this.customerService.getAllCustomerType();

    this.customerRegisterForm = this.fb.group({
      customerId: '',
      customerCode: ['', [Validators.pattern('^KH-[0-9]{4}$')]],
      customerTypeId: '',
      customerName: '',
      birthday: '',
      idCard: ['', [validationIdCard]],
      phoneNumber: ['', [validationPhoneNumber]],
      email: ['', [validationEmail]],
      address: '',
      gender: ''
    });
  }

  get getCustomerCode(): AbstractControl {
    return this.customerRegisterForm.get('customerCode');
  }

  get getPhoneNumber(): AbstractControl {
    return this.customerRegisterForm.get('phoneNumber');
  }

  get getEmail(): AbstractControl {
    return this.customerRegisterForm.get('email');
  }

  get getIdCard(): AbstractControl {
    return this.customerRegisterForm.get('idCard');
  }

  onSubmit(): void {
    this.customer = this.customerRegisterForm.value;
    this.customerService.createCustomer(this.customer);
  }

  validationCustomerCode(): boolean {
    return this.getCustomerCode.hasError('pattern') && this.getCustomerCode.touched;
  }

  validationPhoneNumber(): boolean {
    return this.getPhoneNumber.hasError('wrongPhoneNumberPattern') && this.getPhoneNumber.touched;
  }

  validationIdCard(): boolean {
    return this.getIdCard.hasError('wrongIdCardPattern') && this.getIdCard.touched;
  }

  validationEmail(): boolean {
    return this.getEmail.hasError('wrongEmailPattern') && this.getEmail.touched;
  }
}
