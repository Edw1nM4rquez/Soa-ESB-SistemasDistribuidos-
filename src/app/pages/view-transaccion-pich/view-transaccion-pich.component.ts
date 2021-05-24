import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-view-transaccion-pich',
  templateUrl: './view-transaccion-pich.component.html',
  styleUrls: ['./view-transaccion-pich.component.css']
})
export class ViewTransaccionPichComponent implements OnInit {
  public subscribes: Subscription[] = [];
  public groupTransacciones: any[];
  constructor(private accountService: AccountService ) { }

  ngOnInit(): void {
    this.loadData();
  }
  ngOnDestroy(): void {
    this.subscribes.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }
  
  async loadData(){
  
    let cuenta = await this.accountService.getTransaccionPich().subscribe(res=>{
 
      this.groupTransacciones = res.map((item:any)=>{return{id:item.transaccion.id,monto:item.transaccion.monto,tipo:item.transaccion.tipo}});
      console.log("Compermiso",res)
    });
  
    this.subscribes.push(
      cuenta
    );
  }

}
