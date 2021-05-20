import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProdutoDashboardComponent } from "./produto-dashboard/produto-dashboard.component";
import { ProdutoRoutingModule } from "./produto.routes";

@NgModule({
    //coloco a colecacao de componentes
    declarations: [ 
        ProdutoDashboardComponent
    ],
    //colecao de modulos
    imports: [
        CommonModule,
        ProdutoRoutingModule
    ],
    //alguma coisa que eu queira exportar para fora
    exports: []
})
export class ProdutoModule{}