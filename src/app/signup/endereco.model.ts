/* eslint-disable @typescript-eslint/no-inferrable-types */
export class Endereco {
  cep: string = '';
	state: string = '';
	city: string = '';
	neighborhood: string = '';
	street: string = '';
  service: string = '';
	location: {
		type: '';
		coordinates: {
			longitude: '';
			latitude: '';
		}
	}
}
