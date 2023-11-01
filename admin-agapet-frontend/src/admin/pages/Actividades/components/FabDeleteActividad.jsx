import { useActividadesStore } from "../../../../hooks/useActividadesStore";

export const FabDeleteActividad = () => {


  const { startDeletingEvent, hasEventSelected } = useActividadesStore();

  const eliminarActividad = () => {
    startDeletingEvent();
  };

  return (
    <button onClick={eliminarActividad}>
      <img
        src="../src/assets/bin.png"
        className=" p-6 fixed left-96 bottom-4 h-[100px] w-[100px] object-contain cursor-pointer"
        
        style={{
            display: hasEventSelected?'':'none'
        }}
      />
    </button>
  );
};
