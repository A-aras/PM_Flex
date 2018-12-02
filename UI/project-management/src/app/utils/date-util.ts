import { FormControl } from "@angular/forms";
import { AbstractControl } from "@angular/forms/src/model";
import { Validators } from "@angular/forms";
import { ValidatorFn } from "@angular/forms";
import { ValidationErrors, AsyncValidatorFn } from "@angular/forms/src/directives/validators";
import { Observable } from "rxjs/internal/Observable";
import { of } from "rxjs";
import { promise } from "selenium-webdriver";

export function getCurrentDate(): Date   {
    return new Date();
}

export function getTomorrowDate(): Date   {
    let currentDate=getCurrentDate();
    currentDate.setDate(currentDate.getDate()+1);
    return currentDate;
    
    //return new Date(currentDate.getFullYear(),currentDate.getMonth(),cur);
}