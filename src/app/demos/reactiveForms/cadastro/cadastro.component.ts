import { AfterViewInit,  Component,  ElementRef,  OnInit,  ViewChildren,} from "@angular/core";
import { FormBuilder,  FormControl,  FormControlName,  FormGroup,  Validators,} from "@angular/forms";
import { NgBrazilValidators } from "ng-brazil";
import { Usuario } from "./models/usuario";
import { utilsBr } from "js-brasil";
import { CustomValidators } from "ng2-validation";
import { DisplayMessage,  GenericValidator,  ValidationMessages,} from "./generic-form-validation";
import { fromEvent, merge, Observable } from "rxjs";

@Component({
  selector: "app-cadastro",
  templateUrl: "./cadastro.component.html",
})
export class CadastroComponent implements OnInit, AfterViewInit {
  @ViewChildren(FormControlName, { read: ElementRef })
  formInputElements: ElementRef[];
  
  cadastroForm: FormGroup;
  usuario: Usuario;
  formResult: string = "";
  MASKS = utilsBr.MASKS;

  //serve para fazer mensagens de ero dinamicas
  validationMessages: ValidationMessages;
  genericValidator: GenericValidator;
  displayMessage: DisplayMessage = {};

  constructor(private fb: FormBuilder) {
    //as chaves sao definidas com base no validator: required, minlength, maxlength ...
    this.validationMessages = {
      nome: {
        required: "O nome e requerido",
        minlength: "O nome precisa ter no minimo 2 caracteres",
        maxlength: "O nome precisa ter no maximo 150 caracteres",
      },
      cpf: {
        required: "Informe o CPF",
        cpf: "CPF em formato invalido",
      },
      email: {
        required: "Informe o e-mail",
        email: "E-mail invalido",
      },
      senha: {
        required: "Informe a senha",
        rangeLength: "A senha deve possuir entre 6 e 15 caracteres",
      },
      senhaConfirmacao: {
        required: "Informe a senha novamente",
        rangeLength: "A senha deve possuir entre 6 e 15 caracteres",
        equalTo: "As senhas nao conferem",
      },
    };

    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  // ngOnInit(): void {
  //   this.cadastroForm = new FormGroup({
  //     nome: new FormControl(''),
  //     cpf: new FormControl(''),
  //     email: new FormControl(''),
  //     senha: new FormControl(''),
  //     senhaConfirmacao: new FormControl('')
  //   })
  // }

  ngOnInit(): void {
    let senha = new FormControl("", [
      Validators.required,
      CustomValidators.rangeLength([6, 15]),
    ]);
    let senhaConfirmacao = new FormControl("", [
      Validators.required,
      CustomValidators.rangeLength([6, 15]),
      CustomValidators.equalTo(senha),
    ]);

    this.cadastroForm = this.fb.group({
      nome: [
        "",
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(150),
        ],
      ],
      cpf: ["", [Validators.required, NgBrazilValidators.cpf]],
      email: ["", [Validators.required, Validators.email]],
      senha: senha,
      senhaConfirmacao: senhaConfirmacao,
    });
  }

  ngAfterViewInit(): void {
    //o codigo ta adicionando para cada elemento blur um Observable
    let controlBlurs: Observable<any>[] = this.formInputElements.map(
      (formControl: ElementRef) => fromEvent(formControl.nativeElement, "blur")
    );

    //aqui estou juntando todos os Observables e usando o spread do Js ...
    //e faco apenas um subscribe para todos os observables
    merge(...controlBlurs).subscribe(() => {
      this.displayMessage = this.genericValidator.processarMensagens(this.cadastroForm);
    });
  }
  adicionarUsuario() {
    //preciso ter o dirty pq ele tem q ter colocado algum valor
    if (this.cadastroForm.dirty && this.cadastroForm.valid) {
      this.usuario = Object.assign({}, this.usuario, this.cadastroForm.value);
      this.formResult = JSON.stringify(this.cadastroForm.value);
    } else {
      this.formResult = "Nao Submeteu";
    }
  }
}
