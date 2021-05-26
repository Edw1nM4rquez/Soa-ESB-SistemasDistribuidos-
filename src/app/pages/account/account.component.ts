import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  public subscribes: Subscription[] = [];
  public groupCuenta: any[];
  public groupCuentaPich: any[];
  public groupCuentaBan: any[];
  public auxFlag: boolean;
  public angForm: FormGroup;

  constructor(
    private accountService: AccountService,
    private fb: FormBuilder,
  ) {
    //inicializamos el metodo para el formulario reactivo
    this.createForm();
  }

  //este metodo destruye las sesiones creadas por las subscripciones
  ngOnDestroy(): void {
    this.subscribes.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }


  ngOnInit(): void {
    this.loadData();
  }
  async loadData() {
  }

  createForm() {
    //Creamos el formulario reactivo, con sus elemtos y validadores
    this.angForm = this.fb.group({
      tipo: ['Transferencia', Validators.required],
      bandest: [null, Validators.required],
      banorigen: [null, Validators.required],
      monto: [null, Validators.required]
    });
  }


  async CargarDatos() {
    //Obtenemos los datos del Usuario banco del Pacifico 
    let cuenta = await this.accountService.getAccount().subscribe(res => {

      this.groupCuenta = res.map((item: any) => { return { id: item.cuenta.id, titular: item.cuenta.titular, ci: item.cuenta.ci, banco: item.cuenta.banco, monto: item.cuenta.monto } });

    });
   //Obtenemos los datos del Usuario banco de Pichincha
    let cuentaPich = await this.accountService.getAccountPich().subscribe(res => {
     
      this.groupCuentaPich = res.map((item: any) => { return { id: item.cuenta.id, titular: item.cuenta.titular, ci: item.cuenta.ci, banco: item.cuenta.banco, monto: item.cuenta.monto } });
  
    });

    let cuentaBan = await this.accountService.getAccountBan().subscribe(res => {
     
      this.groupCuentaBan = res.map((item: any) => { return { id: item.cuenta.id, titular: item.cuenta.titular, ci: item.cuenta.ci, banco: item.cuenta.banco, monto: item.cuenta.monto } });
  
    });

    this.subscribes.push(
      cuenta,
      cuentaPich,
      cuentaBan
    );
  }

  senActivacion(bol: boolean) {
    this.auxFlag = bol;
    return this.auxFlag;
  }

  async senDepositop() {
    let sendTrans = await this.accountService.sendTransferencia(this.angForm.value).subscribe(res => {
      console.log("por", res);
    },
      error => { console.log("err", error) });
    this.subscribes.push(sendTrans);
  }

  get tipo() {
    return this.angForm.get('tipo').value;
  }

  

}
