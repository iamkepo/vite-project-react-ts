/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { useThemeStore } from '../stores/themeStore';
import { Controller, useFormContext } from 'react-hook-form';

export type Field = {
  type: 'section' | 'text' | 'email' | 'tel' | 'number'| 'textarea' | 'file' | 'date' | 'checkbox' | 'select' | 'radio' | 'password' ;
  id: string;
  label?: string;
  placeholder?: string;  
  colSize: string;
  options?: { label: string; value: string }[];  
  isChecked?: boolean;  
  multiple?: boolean;  
  readOnly?: boolean;  
  required?: boolean;  
  value?: any
};

type FormComponentProps = {
  fields: (Field | Field[])[];
};

const FormComponent: React.FC<FormComponentProps> = ({ fields }) => {
  const { control } = useFormContext(); // Access the form context
  const [showEye, setShowEye] = useState<boolean>(false);
  const { theme } = useThemeStore();
  
  const renderField = (field: Field, index: number) => {
    switch (field.type) {
      case 'section':
        return (
          field.label ? <div key={index} className={`${field.colSize} text-bg-${theme} mb-3`}>
            <h5>{field.label}</h5>
          </div> : false
        );

      case 'text':
      case 'email':
      case 'tel':
      case 'number':
        return (
          <div key={index} className={`${field.colSize} mb-3`}>
            {field.label ? <label htmlFor={field.id} className='form-label' aria-label={field.label}>
              {field.label}
            </label> : false}
            <Controller
              name={field.id}
              control={control}
              defaultValue={field.value || ''}
              render={({ field: { onChange, value } }) => (
                <input
                  type={field.type}
                  id={field.id}
                  className={`form-control text-bg-${theme}`}
                  placeholder={field.placeholder || ''}
                  readOnly={field.readOnly}
                  required={field.required}
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          </div>
        );

      case 'password':
        return (
          <div key={index} className={`${field.colSize} mb-3`}>
            {field.label ? <label htmlFor={field.id} className='form-label' aria-label={field.label}>
              {field.label}
            </label> : false}
            <Controller
              name={field.id}
              control={control}
              defaultValue={field.value || ''}
              render={({ field: { onChange, value } }) => (
                <div className='col-12 position-relative'>
                  <input
                    type={showEye ? 'text' : field.type} 
                    id={field.id}
                    className={`form-control text-bg-${theme}`}
                    placeholder={field.placeholder || ''}
                    readOnly={field.readOnly}
                    required={field.required}
                    value={value}
                    onChange={onChange}
                  />
                  <i className={`bi bi-eye${showEye ? '' : '-slash'} position-absolute top-0 end-0 p-2`} onClick={()=> setShowEye(!showEye)}></i>
                </div>
              )}
            />
          </div>
        );

      case 'textarea':
        return (
          <div key={index} className={`${field.colSize} mb-3`}>
            {field.label ? <label htmlFor={field.id} className='form-label' aria-label={field.label}>
              {field.label}
            </label> : false}
            <Controller
              name={field.id}
              control={control}
              defaultValue={field.value || ''}
              render={({ field: { onChange, value } }) => (
                <textarea
                  id={field.id}
                  className={`form-control text-bg-${theme}`}
                  rows={5}
                  placeholder={field.placeholder || ''}
                  readOnly={field.readOnly}
                  required={field.required}
                  value={value}
                  onChange={onChange}
                ></textarea>
              )}
            />
          </div>
        );

      case 'select':
        return (
          <div key={index} className={`${field.colSize} mb-3`}>
            {field.label ? <label htmlFor={field.id} className='form-label'>{field.label}</label> : false}
            <Controller
              name={field.id}
              control={control}
              defaultValue={field.value || ''}
              render={({ field: { onChange, value } }) => (
                <select
                  id={field.id}
                  className={`form-select text-bg-${theme}`}
                  value={value}
                  onChange={onChange}
                >
                  <option>Select</option>
                  {field.options?.map((option, idx) => (
                    <option key={idx} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              )}
            />
          </div>
        );

      case 'file':
        return (
          <div key={index} className={`${field.colSize} mb-3`}>
            <label htmlFor={field.id} className={`${field.colSize} form-label d-flex align-items-lg-center border border-1 rounded-3 p-2`}>
              {field.label ? <p className="text-muted small mb-0">{field.label}</p> : false}
              <Controller
                name={field.id}
                control={control}
                defaultValue={null}
                render={({ field: { onChange } }) => (
                  <input
                    type="file"
                    id={field.id}
                    className="d-none"
                    accept="image/jpeg,image/jpg,image/png"
                    onChange={(e) => onChange(e.target.files?.[0] || null)}
                  />
                )}
              />
            </label>
          </div>
        );

      case 'date':
        return (
          <div key={index} className={`${field.colSize} mb-3`}>
            {field.label ? <label htmlFor={field.id} className='form-label'>{field.label}</label> : false}
            <Controller
              name={field.id}
              control={control}
              defaultValue={field.value || ''}
              render={({ field: { onChange, value } }) => (
                <input
                  type="date"
                  id={field.id}
                  className={`form-control text-bg-${theme}`}
                  readOnly={field.readOnly}
                  required={field.required}
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          </div>
        );

      case 'checkbox':
        return (
          <div key={index} className={`${field.colSize} mb-3 form-check`}>
            <Controller
              name={field.id}
              control={control}
              defaultValue={field.isChecked || false}
              render={({ field: { onChange, value } }) => (
                <input
                  type="checkbox"
                  id={field.id}
                  className="form-check-input"
                  checked={value}
                  onChange={(e) => onChange(e.target.checked)}
                />
              )}
            />
            {field.label ? <label htmlFor={field.id} className="form-check-label">
              {field.label}
            </label> : false}
          </div>
        );

      case 'radio':
        return (
          <div key={index} className={`${field.colSize} mb-3`}>
            {field.label ? <label className='form-label'>{field.label}</label> : false}
            <div>
              {field.options?.map((option, idx) => (
                <div key={idx} className="form-check">
                  <Controller
                    name={field.id}
                    control={control}
                    defaultValue={field.value || ''}
                    render={({ field: { onChange, value } }) => (
                      <input
                        type="radio"
                        id={`${field.id}-${option.value}`}
                        name={field.id}
                        value={option.value}
                        className="form-check-input"
                        checked={value === option.value}
                        onChange={(e) => onChange(e.target.value)}
                      />
                    )}
                  />
                  <label className="form-check-label" htmlFor={`${field.id}-${option.value}`}>
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="row row-cols-4 g-3">
      {fields.map((fieldGroup, index) => {
        if (Array.isArray(fieldGroup)) {
          return (
            <div key={index} className={`col card text-bg-${theme} p-3 mb-3`}>
              {fieldGroup.map((field, i) => renderField(field, i))}
            </div>
          );
        }
        return renderField(fieldGroup as Field, index);
      })}
    </div>
  );
};

export default FormComponent;