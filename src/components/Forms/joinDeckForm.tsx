import React from 'react'
import { useForm, Resolver, SubmitHandler } from "react-hook-form";

export type JoinDeckFormValues = {
  name: string;
  code: string;
};

const resolver: Resolver<JoinDeckFormValues> = async (values) => {
  return {
    values: values.name ? values : {},
    errors: !values.name
      ? {
        name: {
          type: 'required',
          message: 'This is required.',
        },
        code:{
          type: 'required',
          message: 'This is required.',
        },
      }
      : {},
  };
};
type JoinDeckFormProps = {onJoinSubmit:SubmitHandler<JoinDeckFormValues>}

export const JoinDeckForm:React.FC<JoinDeckFormProps> = (props) => {
  const { register, handleSubmit, formState: { errors } } = useForm<JoinDeckFormValues>({ resolver });

  return (
    <div>
    <h1>Join Deck</h1>
    <form onSubmit={handleSubmit(props.onJoinSubmit)}>
        <input {...register("name")} placeholder="Nickname" />
        {errors?.name && <p>{errors.name.message}</p>}
        <input {...register("code")} placeholder="Deck Code" />
        {errors?.code && <p>{errors.code.message}</p>}
        <button type="submit">Join Deck</button>
    </form>
  </div>

  )
}
