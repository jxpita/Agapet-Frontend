
import { useDispatch, useSelector } from 'react-redux'
import { onCloseDateModal, onOpenDateModal } from '../store/ui-actividades/uiActividadesSlice';

export const useUiActividades = () => {

    const { isActividadModalOpen } = useSelector((state) => state.uiActividades);
    const dispatch=useDispatch();

    const openDateModal=()=>{
        dispatch(onOpenDateModal());
    }

    const closeDateModal=()=>{
        dispatch(onCloseDateModal());
    }

    return {
       isActividadModalOpen,
       openDateModal,
       closeDateModal
      };
}
