import { useEffect, useMemo, useState } from 'react';

export const useForm = ( initialForm = {}, formValidations = {}) => {
  
    const [ formState, setFormState ] = useState( initialForm );

    const [ formValidation, setFormValidation ] = useState({});

    
     useEffect(() => {
        createValidators();
    }, [ formState ])
   
/* useEffect(() => {
        setFormState( initialForm );
    }, [ initialForm ])
*/ 
    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [ name ]: value
        });
    }


    const onResetForm = () => {
        setFormState( initialForm );
    }


    const createValidators =()=>{

        const formCheckedValues={};

        for (const formfield of Object.keys(formValidations)) {
            
            const[fn,errorMessage]= formValidations[formfield];

            formCheckedValues[`${formfield}Valid`]=fn(formState[formfield]) ? null: errorMessage;

        }
        setFormValidation(formCheckedValues);
       
    }
   

    const isFormValid=useMemo(()=>{

        for (const formValue of Object.keys(formValidation)) {
                if(formValidation[formValue]!==null) return false;
        }


        return true;
    },[formValidation])



    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,
       
        ...formValidation,
        isFormValid
    }
}