import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-view-transaccion-ban',
  templateUrl: './view-transaccion-ban.component.html',
  styleUrls: ['./view-transaccion-ban.component.css']
})
export class ViewTransaccionBanComponent implements OnInit {
  public subscribes: Subscription[] = [];
  public groupTransacciones: any[];
  constructor(
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
    this.loadData();
  }
  ngOnDestroy(): void {
    this.subscribes.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }
  
  async loadData(){
  
    let cuenta = await this.accountService.getTransaccionBan().subscribe(res=>{
      console.log("Compermiso",res)
      this.groupTransacciones = res.map((item:any)=>{return{id:item.transaccion.id,monto:item.transaccion.monto,tipo:item.transaccion.tipo}});
 
    });
  
    this.subscribes.push(
      cuenta
    );
  }


}
