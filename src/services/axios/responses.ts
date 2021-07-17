// post /login
export interface UserDataResponse extends Record<string, string | null> {
  name: string;
  email: string;
  cpf: string;
  avatar: string | null;
}

// get /appointments
export type AppointmentsDataResponse = [
  Record<string, string> & {
    id: string;
    time: string;
    final_price: string;

    doctor_id: string;
    doctor: {
      avatar: string;
      document: string;
      name: string;

      spec_id: string;
      specialty: {
        display_name: string;
      };

      unit_id: string;
      unit: {
        name: string;
        cep: string;
        complements: string;
      };
    };
  },
];

// get https://viacep.com.br/ws/20740010/json/
export type ViaCep = Record<string, string> & {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
};
