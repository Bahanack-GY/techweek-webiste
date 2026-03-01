export interface School {
  name: string;
  location: string;
  bgColor: string;
  textColor: string;
}

export const schoolsList: School[] = [
  { name: "Polytechnique Yaoundé", location: "Yaoundé", bgColor: "bg-[#FF0000]", textColor: "text-white" },
  { name: "Polytechnique Maroua", location: "Maroua", bgColor: "bg-[#196aab]", textColor: "text-white" },
  { name: "Polytechnique Douala", location: "Douala", bgColor: "bg-[#f29323]", textColor: "text-black" },
  { name: "Polytech Bamenda", location: "Bamenda", bgColor: "bg-white", textColor: "text-black" },
  { name: "Faculty of Eng. & Tech", location: "Buea", bgColor: "bg-[#FFFF00]", textColor: "text-black" },
  { name: "IUC", location: "Douala", bgColor: "bg-black", textColor: "text-white" },
  { name: "UCAC-ICAM", location: "Douala", bgColor: "bg-[#FF0000]", textColor: "text-white" },
  { name: "Institut ST Jean", location: "Yaoundé", bgColor: "bg-[#196aab]", textColor: "text-white" },
  { name: "Institut Siantou", location: "Yaoundé", bgColor: "bg-[#f29323]", textColor: "text-black" },
  { name: "IAI Cameroun", location: "Yaoundé", bgColor: "bg-white", textColor: "text-black" },
  { name: "UPAC", location: "Yaoundé", bgColor: "bg-[#FFFF00]", textColor: "text-black" },
  { name: "sup'tic", location: "Yaoundé", bgColor: "bg-black", textColor: "text-white" },
  { name: "Faculté de Sciences de l'Université de Yaoundé 1", location: "Yaoundé", bgColor: "bg-[#FF0000]", textColor: "text-white" },
  { name: "ICT University", location: "Yaoundé", bgColor: "bg-[#196aab]", textColor: "text-white" },
  { name: "Keyce", location: "Douala / Yaoundé", bgColor: "bg-[#f29323]", textColor: "text-black" },
  { name: "IUT Douala", location: "Douala", bgColor: "bg-white", textColor: "text-black" },
];

export const schoolNames = schoolsList.map((s) => s.name);
