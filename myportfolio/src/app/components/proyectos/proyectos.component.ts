import { Component, OnInit } from '@angular/core';
import { Confirm } from 'src/app/model/Confirm';
import { Proyectos } from 'src/app/model/proyectos';
import { ProyectosService } from 'src/app/service/proyectos.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {
  proyec : Proyectos[] = [];
  constructor(public sProyectos: ProyectosService, private tokenService:TokenService) { }
  isLogged = false;

  ngOnInit(): void {
    this.cargarProyec()
   if(this.tokenService.getToken()){
    this.isLogged = true;
   }
   else{
    this.isLogged = false;
   }
  }
  cargarProyec():void{
    this.sProyectos.lista().subscribe(data =>{this.proyec = data;})
}
@Confirm("¿Estas seguro que quieres eliminar este Proyecto?")
delete(id?:number){
  if(id !=undefined){
    this.sProyectos.delete(id).subscribe(data =>{
      this.cargarProyec();
    },err=>{alert("No se pudo eliminar la experiencia");})
  }
}

}
