export default interface Appointment {
  id: string;
  cep: string;
  complements: string;
  unit: string;
  day: string;
  time: string;
  price: string;
  doctorSpec: string;
  doctorDocument: string;
  doctorAvatar: string | null;
  doctorName: string;
}
