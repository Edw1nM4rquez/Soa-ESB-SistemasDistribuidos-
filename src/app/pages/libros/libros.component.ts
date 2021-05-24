import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrls: ['./libros.component.css']
})
export class LibrosComponent implements OnInit {

  public subscribes: Subscription[] = [];
  public groupLibros: any[];
  public auxFlag: boolean;
  public angForm: FormGroup;


  constructor(
    private accountService: AccountService,
    private fb: FormBuilder,
  ) {
    this.createForm();
   }

  ngOnDestroy(): void {
    this.subscribes.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }


  createForm() {
    this.angForm = this.fb.group({
      tipo: ['Transferencia', Validators.required],
      bandest: [null, Validators.required],
      banorigen: [null, Validators.required],
      monto: ['5', Validators.required], disabled: true,
    });
  }

  ngOnInit(): void {
    this.loadData();
  }

  async loadData(){
    let libros = await this.accountService.getLibros().subscribe(res=>{
 
      this.groupLibros = res.map((item:any)=>{return{autor: item.user.autor,id: item.user.id,title: item.user.title,image: item.user.imagen,descripcion: item.user.description  }});
    console.log("Libros", this.groupLibros)
        // console.log("Libros",res.map((item:any)=>{return{autor: item.user.autor,id: item.user.id,title: item.user.title,image: item.user.imagen,descripcion: item.user.description  }}));
    });
  
    this.subscribes.push(
      libros
    );
  }
  async senDepositop(){
    let sendTrans = await this.accountService.sendTransferencia(this.angForm.value).subscribe(res => {
      console.log("por", res);
    },
      error => { console.log("err", error) });
    this.subscribes.push(sendTrans);
 }

 get tipo() {
  return this.angForm.get('tipo').value;
}

 resetForms(){
   this.angForm.reset();
 }
}
