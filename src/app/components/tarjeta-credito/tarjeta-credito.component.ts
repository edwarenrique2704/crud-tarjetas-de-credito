import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tarjeta-credito',
  templateUrl: './tarjeta-credito.component.html',
  styleUrls: ['./tarjeta-credito.component.css']
})
export class TarjetaCreditoComponent implements OnInit {

  listTarjetas:any[] = [
    {titular:"pedrito", numeroTarjeta:"45678901234",fechaExpiracion:"7/7", cvv:"345"},
    {titular:"pablito", numeroTarjeta:"67890123456",fechaExpiracion:"8/8", cvv:"567"}
  ];

  form: FormGroup;

  constructor(private fb:FormBuilder,
    private toastr: ToastrService) { 
    this.form = this.fb.group({
      titular:["",Validators.required],
      numeroTarjeta:["",[Validators.required,Validators.maxLength(16),Validators.minLength(16)]],
      fechaExpiracion:["",[Validators.required,Validators.maxLength(5),Validators.minLength(5)]],
      cvv:["",[Validators.required,Validators.maxLength(3),Validators.minLength(3)]]
    })
  }

  ngOnInit(): void {
  }

  agregarTarjeta(){
    //console.log(this.form)
    const tarjeta:any = {
      titular:this.form.get("titular")?.value,
      numeroTarjeta:this.form.get("numeroTarjeta")?.value,
      fechaExpiracion:this.form.get("fechaExpiracion")?.value,
      cvv:this.form.get("cvv")?.value,
    }
    this.listTarjetas.push(tarjeta);
    this.toastr.success('tarjeta registrada con exito', 'Tarjeta registrada');
    this.form.reset();
  }
  eliminarTarjeta(index:number){
    this.listTarjetas.splice(index, 1);
    this.toastr.error('tarjeta eliminada con exito', 'Tarjeta eliminada');
  }
}
