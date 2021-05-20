import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProdutoDashboardComponent } from "./produto-dashboard/produto-dashboard.component";


const produtoRouterConfig: Routes = [
    { path: '', component: ProdutoDashboardComponent }
];

@NgModule({
    imports: [
        //Aqui eh um roteamento filho, por isso .forChild, diferente do app.routes.ts
        RouterModule.forChild(produtoRouterConfig)
    ],
    exports: [RouterModule]
})
export class ProdutoRoutingModule {}