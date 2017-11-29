import {Editorial} from '../../editorial-list/model/editorial.model';
import {Autor} from '../../autor-list/model/autor.model';
import {Genero} from '../../genero-list/model/genero.model'

export class Libro{
	id: number;
	titulo: string;
	ano: string;
	genero: Genero;
	precio: number;
	cantidad: string;
	descripcion: string;
	imagen: string;
	editorial: Editorial;
	autor:Autor;
}