// 'use client';

// import { useRouter } from 'next/navigation';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// export default function DashboardSelectDiseaseWrapper() {
//   const router = useRouter();

//   const handleSelect = (disease: string) => {
//     if (disease === 'kesehatan-mental') {
//       window.location.href = 'https://kesehatanmental.vercel.app';
//     } else {
//       router.push('/dashboard/maps');
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center">
//       <h1 className="text-2xl md:text-3xl mb-10 text-center font-paytone">
//         Mau periksa apa hari ini?
//       </h1>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
//         {[
//           { name: 'Diabetes Melitus', value: 'diabetes-melitus' },
//           { name: 'Hipertensi', value: 'hipertensi' },
//           { name: 'Kesehatan Mental', value: 'kesehatan-mental' },
//         ].map((item) => (
//           <Card key={item.value} className="rounded-2xl shadow-md">
//             <CardHeader>
//               <CardTitle>{item.name}</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <Button
//                 className="mt-2 w-full"
//                 onClick={() => handleSelect(item.value)}
//               >
//                 Pilih
//               </Button>
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// }
