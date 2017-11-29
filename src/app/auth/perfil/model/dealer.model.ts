import {Direccion} from './direccion.model';
import {Libro} from '../../../common/book-list/models/book.model';
export class Dealer{
	id: number;
	nombre: string;
	fono: string;
	correo: string;
	contrasena: string;
	direccion: Direccion;
}