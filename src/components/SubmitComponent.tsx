/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import FormComponent, { Field } from "./FormComponent";
import { FormProvider, useForm } from "react-hook-form";

interface SubmitComponentProps {
  title?: string;
  fields: (Field | Field[])[];
  error: string | null;
  btn?: string;
  onSubmit: (data: any) => void;
}

const SubmitComponent: React.FC<SubmitComponentProps> = ({title, fields, error, btn, onSubmit}) => {
  const methods = useForm(); // Initialize react-hook-form
  const { handleSubmit } = methods;

  // Form submission handler
  const submit = (data: any) => {
    // console.log('Form Data:', data);
    onSubmit(data);
  };

  return (
    <div className="col-12">
      {error && <p className="text-danger">{error}</p>}
      
      <FormProvider {...methods}> {/* Provide form context */}
        <form onSubmit={handleSubmit(submit)} className="col-12">

          {title ? <h3 className="text-center">{title}</h3> : false}

          <FormComponent fields={fields as (Field | Field[])[]} />

          <button type="submit" className="btn btn-primary">{btn}</button>
        </form>
      </FormProvider>
    </div>
  );
};

export default SubmitComponent;