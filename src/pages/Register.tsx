import React, {useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Profile, Duration, DurationErrors, GenderEnum, ProfileErrors } from "../models/Model";
import profileService from "../services/ProfileService";
import { AxiosError } from 'axios';

export const Registration = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [formValues, setFormValues] = useState<Profile>({
    name: "",
    gender: GenderEnum.Default,
    durations: [
      { sleepTimeDuration: -1, date: "" }
    ]
  });
  
  const [formErrors, setFormErrors] = useState<ProfileErrors>({
    name: "",
    gender: "",
    durations: [
      { sleepTimeDuration: "", date: "", index: -1 }
    ]
  });

  const handleInput = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormValues((prev: Profile) => ({
      ...prev, [event.target.name]: event.target.value.trim()
    }));
    resetFormError();
  }
  
  
  const add = () => {
    setFormValues((prev: Profile) => ({
      ...prev, durations: [...prev.durations, { sleepTimeDuration: -1, date: "" }]
    }))
  }
  
  const remove = (index: number) => {
    const durations = [...formValues.durations ];
    durations.splice(index, 1);
                        
    setFormValues((prev: Profile) => {
      prev.durations.splice(index, 1);
      return {...prev, durations}
    });
  }
  
  const handleDurationInput = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { name, value } = event.target;
    setFormValues((prev: Profile) => ({
      ...prev, 
      durations: prev.durations.map((duration: Duration, i: number) =>
        i === index ? { ...duration, [name]: value } : duration
      )
    }));
    resetFormError();
  }
  
  const resetFormError = () => {
    setError('')
    setFormErrors((prev: any) => ({ ...prev, ...{
      name: "",
      gender: "",
      durations: [
        { sleepTimeDuration: "", date: "", index: -1 }
      ]
    }}))
  }
  
  const hasDurationError = (index: number, field: string) => {
    const duration = formErrors.durations.find((item: DurationErrors) => item.index === index ) as any;
    if(duration) {
      return duration[field] ? true : false;
    }
    return false;
  }
  
  const validateForm = () => {
    const errors = {} as ProfileErrors;
    errors['durations'] = [];
    let hasErrors = false;

    if(!formValues.name || formValues.name.length < 2) {
      errors['name'] = "Name is required with minimum legth of 2";
      hasErrors = true;
    }
    
    if(!formValues.gender) {
      errors['gender'] = "Gender is required";
      hasErrors = true;
    }
    
    const durationSet = new Set();
    
    formValues.durations.forEach((duration: Duration, index: number) => {
      durationSet.add(new Date(duration.date).toDateString());
      const dError = {} as any;
      if(duration.sleepTimeDuration <1 || duration.sleepTimeDuration > 24){
        dError['sleepTimeDuration'] = "Invalid field";
        dError['index'] = index;
        hasErrors = true;
      }
      if(!duration.date){
        dError['date'] = "Date is required and multiple same date entry is not allowed";
        dError['index'] = index;
        hasErrors = true;
      }
      if(dError && Object.keys(dError).length !== 0) {
        errors['durations'].push(dError);
        hasErrors = true;
      }
      
      if(durationSet.size && durationSet.size !== formValues.durations.length) {
        setError('The same multiple sleep date is not allowed');
      }
    })

    if(hasErrors) {
      setFormErrors((prev: any) => ({...prev, ...errors}));
    }
    return !hasErrors;
  }
  
  const submitForm = () => {
    if(!validateForm()) {
      return false;
    }
    profileService.register(formValues).then(value => {
      navigate('/preview');
    }).catch(error => {
      if(error instanceof AxiosError) {
        return setError(error.response?.data)
      }
      if(error instanceof Error) {
        return setError(error.message)
      }
      return setError(error)
    });
    
  }

  return (
    <div className="container mx-auto">
      <div className="columns-1 py-5">
        <button className="border px-3 py-2 text-sm font-semibold leading-6 text-gray-900" onClick={() => navigate(-1)}>Go back</button>
        
        <form>
          <div className="space-y-6">
            <div className="mt-10 border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">Register</h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">Please fill the form below</p>
            </div>
            {!!error.length && <div className="error">{error}</div>}
            
            <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Name: </label>
                <div className="mt-2">
                  <input id="name" type="text" value={formValues.name} data-testid="name"
                    onChange={handleInput} name="name" placeholder="Enter your fullname"
                    className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${formErrors.name ? 'errors' : ''}`}
                  />
                </div>
              </div>

              <div className="sm:col-span-6">
                <label htmlFor="gender" className="block text-sm font-medium leading-6 text-gray-900">Gender</label>
                <div className="mt-2">
                  <select id="gender" name="gender" onChange={handleInput} data-testid="gender"
                    className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6  ${formErrors.gender ? 'errors' : ''}`}>
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
              </div>
              
              {
              formValues.durations.map((duration: Duration, index: number) => (
                <React.Fragment key={index}>
                  <div className="sm:col-span-2">
                    <label htmlFor="{'sleepTimeDuration'+index}" className="block text-sm font-medium leading-6 text-gray-900">Sleep Time Duration (max 24 hours): </label>
                    <div className="mt-2">
                      <input id="{'sleepTimeDuration'+index}" type="number" 
                        value={duration.sleepTimeDuration === -1 ? '' : duration.sleepTimeDuration} 
                        data-testid="sleepTimeDuration"
                        onChange={(e)=> handleDurationInput(e, index)} 
                        name="sleepTimeDuration" placeholder="Enter your sleep time duration"
                        className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6  ${hasDurationError(index, 'sleepTimeDuration') ? 'errors': ''}`}
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="date" className="block text-sm font-medium leading-6 text-gray-900">Date: </label>
                    <div className="mt-2">
                      <input id="date" type="date" 
                      value={duration.date} 
                        data-testid="date"
                        onChange={(e)=> handleDurationInput(e, index)}
                        name="date" placeholder="Enter your sleep time duration"
                        className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6  ${hasDurationError(index, 'date') ? 'errors': ''}`}
                      />
                    </div>
                  </div>
                  
                  <div className="sm:col-span-2">
                    {index  !== 0  &&
                    <button onClick={() => remove(index)}
                       type="button" className="mt-custom1 border px-3 py-2 text-sm font-semibold leading-6 text-gray-900">Delete</button>
                    }
                  </div>
                </React.Fragment>
              ))
              }
              
              {formValues.durations.length < 5 &&
              <div className="sm:col-span-6">
                <button onClick={add}
                  type="button" className="border px-3 py-2 text-sm font-semibold leading-6 text-gray-900">Add</button>
              </div>
              }
              
            </div>
            

          </div>
          
          <div className="mt-20 flex items-center justify-end gap-x-6">
            <button 
              onClick={() => navigate(-1)}
              type="button" className="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
            <button type="button" onClick={submitForm}
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
          </div>

        </form>
      </div>
    </div>
  );
}