import { Component, OnInit } from '@angular/core';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { CommandesService } from '../services/commandes.service';
import { ActivatedRoute } from '@angular/router';
import { Commande } from '../Model/commande';

@Component({
  selector: 'app-achat',
  templateUrl: './achat.component.html',
  styleUrls: ['./achat.component.css']
})
export class AchatComponent implements OnInit {

  payPalConfig?: IPayPalConfig;
  id: number;
  commande: Commande;

  constructor(private route: ActivatedRoute,
              private commandeService: CommandesService) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.params.id;
    this.commandeService.findCommande(this.id).subscribe(commande => {
      this.commande = commande;
      this.initConfig();
    });
  }

  private initConfig(): void {
    const prixAchatTotal = '' + this.commande.total.toFixed(2); // arrondi à deux chiffres aprés la virgule et convertion en string.
      this.payPalConfig = {
          currency: 'EUR',
          clientId: 'sb',
          createOrderOnClient: (data) => < ICreateOrderRequest > {
              intent: 'CAPTURE',
              purchase_units: [{
                  amount: {
                      currency_code: 'EUR',
                      value: prixAchatTotal,
                      breakdown: {
                          item_total: {
                              currency_code: 'EUR',
                              value: prixAchatTotal
                          }
                      }
                  },
                  items: [{
                      name: 'Enterprise Subscription',
                      quantity: '1',
                      category: 'DIGITAL_GOODS',
                      unit_amount: {
                          currency_code: 'EUR',
                          value: prixAchatTotal,
                      },
                  }]
              }]
          },
          advanced: {
              updateOrderDetails: {
                  commit: true
              }
          },
          style: {
              label: 'paypal',
              layout: 'vertical'
          },
          onApprove: (data, actions) => {
              console.log('onApprove - transaction was approved, but not authorized', data, actions);
              actions.order.get().then(details => {
                  console.log('onApprove - you can get full order details inside onApprove: ', details);
              });

          },
          onClientAuthorization: (data) => {
              console.log('onClientAuthorization', data);
          },
          onCancel: (data, actions) => {
              console.log('OnCancel', data, actions);

          },
          onError: err => {
              console.log('OnError', err);
          },
          onClick: () => {
              console.log('onClick');
          },
      };
  }
}
