import { NgModule } from "@angular/core";
import { CommonModule, registerLocaleData } from "@angular/common";
import localePt from '@angular/common/locales/pt'
registerLocaleData(localePt);

import { ProdutoDashboardComponent } from "./produto-dashboard/produto-dashboard.component";
import { ProdutoDetalheComponent } from "./componentes/produto-card-detalhe.component";
import { ProdutoRoutingModule } from "./produto.routes";
import { ProdutoCountComponent } from "./componentes/produto-count.component";

@NgModule({
    //coloco a colecacao de componentes
    declarations: [
        ProdutoDashboardComponent,
        ProdutoDetalheComponent,
        ProdutoCountComponent
    ],
    //colecao de modulos
    imports: [
        CommonModule,
        ProdutoRoutingModule
    ],
    //alguma coisa que eu queira exportar para fora
    exports: []
})
export class ProdutoModule { }