import { ServiceCard } from "./ServiceCard";
import type { ServiceOrder } from "../types";


interface ServiceOrderListProps {

  orders: ServiceOrder[];

  isLoading: boolean;

  onDelete: (id: number) => void;

}



export const ServiceOrderList = ({

  orders,

  isLoading,

  onDelete,

}: ServiceOrderListProps) => {



  if (isLoading) {

    return (

      <p className="text-slate-400">

        Loading orders...

      </p>

    );

  }



  if (orders.length === 0) {

    return (

      <p className="text-slate-500 text-center py-8">

        No service orders registered.

      </p>

    );

  }



  return (

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">


      {orders.map((os) => (

        <ServiceCard

          key={os.id}

          os={os}

          onDelete={onDelete}

        />

      ))}


    </div>

  );

};