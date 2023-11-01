import { addHours } from "date-fns";
import { useActividadesStore } from "../../../../hooks/useActividadesStore";
import { useUiActividades } from "../../../../hooks/useUiActividades";

export const FabAddNewActividad = () => {
  const { openDateModal } = useUiActividades();
  const { setActiveEvent } = useActividadesStore();


  const idColaborador = localStorage.getItem("idColaborador");
  const idAdministrador = localStorage.getItem("idAdministrador");

  const agregarActividad = () => {
    setActiveEvent({
      title: "", //ob
      descripcion: "",
      lugar: "",
      start: new Date(), //ob
      end: addHours(new Date(), 2), //ob
      colaborador:
          idColaborador !== undefined ? Number(idColaborador) : null,
      administrador:
          idAdministrador !== undefined ? Number(idAdministrador) : null,
    });
    openDateModal();
  };

  return (
    <button>
      <img
        src="../src/assets/boton-agregar.png"
        className="rounded-full p-6 fixed right-6 bottom-4 h-[100px] w-[100px] object-contain cursor-pointer"
        onClick={agregarActividad}
      />
    </button>
  );
};
