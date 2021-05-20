import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DatabindingComponent } from "./demos/databinding/databinding.component";
import { CadastroComponent } from "./demos/reactiveForms/cadastro/cadastro.component";
import { ContatoComponent } from "./institucional/contato/contato.component";
import { SobreComponent } from "./institucional/sobre/sobre.component";
import { HomeComponent } from "./navegacao/home/home.component";

const rootRouterConfig: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'contato', component: ContatoComponent},
    {path: 'sobre', component: SobreComponent},
    {path: 'feature-data-binding', component: DatabindingComponent},
    {path: 'cadastro', component: CadastroComponent},
    {path: 'produtos', 
        loadChildren: () => import('./demos/arquitetura-componentes/produto.module')
        .then( _module => _module.ProdutoModule)
    }
];

@NgModule({
    imports: [
        //esse aqui eh o nosso modulo de roteamento para o modulo principal, por isso temos que 
        //colocar o .forRoot
        RouterModule.forRoot(rootRouterConfig, { useHash: false })
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule{}