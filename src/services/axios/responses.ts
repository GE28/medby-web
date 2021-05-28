// post /login
export type UserData = Record<string, string> & {
  name: string;
  email: string;
  cpf: string;
  avatar: string;
};

// get /appointments
export type AppointmentData = [
  Record<string, string> & {
    id: string;
    time: string;
    final_price: string;

    doctor_id: string;
    doctor: {
      avatar: string;
      name: string;

      spec_id: string;
      specialty: {
        display_name: string;
      };

      unit_id: string;
      unit: {
        name: string;
      };
    };
  },
];
