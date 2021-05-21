import { Component, Input } from "@angular/core";
import { Produto } from "../Models/produto";


@Component({
    selector: 'produto-card-detalhe',
    templateUrl: './produto-card-detalhe.component.html'
})
export class ProdutoDetalheComponent { 

    //esse decorator produto avisa que o componente pai vai enviar estes dados de fora
    @Input()
    produto: Produto;

}