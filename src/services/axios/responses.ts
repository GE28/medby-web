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

// get /appointments
export type UnitsDataResponse = [
  Record<string, string> & {
    id: string;
    name: string;
    cep: string;
    complements: string;
  },
];

export type SpecsDataResponse = [
  Record<string, string> & {
    id: string;
    name: string;
    display_name: string;
    base_price: string;
  },
];

type AvailableTime = Record<string, string> & {
  _id: string;
  doctor_id: string;
  date: string;
  spec_id: string;
  unit_id: string;
};

export type AvailableTimesDataResponse = {
  data: AvailableTime[];
  config: {
    maxAllowedDaysInFuture: number;
  };
};

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
