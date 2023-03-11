import React from 'react'
import {  useForm, Resolver, SubmitHandler } from "react-hook-form";

export type CreateFormValues = {
  name: string;
};

const resolver: Resolver<CreateFormValues> = async (values) => {
  return {
    values: values.name ? values : {},
    errors: !values.name
      ? {
        name: {
          type: 'required',
          message: 'This is required.',
        },
      }
      : {},
  };
};
type CreateDeckFormProps = {onCreateSubmit:SubmitHandler<CreateFormValues>}

export const CreateDeckForm:React.FC<CreateDeckFormProps> = (props) => {
  const { register, handleSubmit, formState: { errors } } = useForm<CreateFormValues>({ resolver });


  // const onCreateSubmit = (data: FieldValues) => {
  //   const deckCode = (Math.random() + 1).toString(36).substring(3);

  //   router.push(`/deck/${deckCode}?name=${data.name}`)
  // };

  return (
    <div>
    <h1>Create Deck</h1>
    <form onSubmit={handleSubmit(props.onCreateSubmit)}>
      <input {...register("name")} placeholder="Nickname" />
      {errors?.name && <p>{errors.name.message}</p>}
      <button type="submit">Create Deck</button>
    </form>
  </div>
  )
}
