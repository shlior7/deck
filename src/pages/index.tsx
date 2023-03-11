import React from 'react'
import { useRouter } from 'next/router'
import { FieldValues, useForm, Resolver } from "react-hook-form";
import { useChannel } from 'src/components/AblyReactEffect';
import { CreateDeckForm } from 'src/components/Forms/createDeckForm';
import { JoinDeckForm, JoinDeckFormValues } from 'src/components/Forms/joinDeckForm';

type CreateFormValues = {
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

export default () => {
  const router = useRouter()

  const onCreateSubmit = (data: CreateFormValues) => {
    const deckCode = (Math.random() + 1).toString(36).substring(3);
    router.push(`/deck/${deckCode}?name=${data.name}`)
  };

  const onJoinSubmit = (data: JoinDeckFormValues) => {
    router.push(`/deck/${data.code}?name=${data.name}`)
  };

  return (
    <div>
      <div>
        <CreateDeckForm onCreateSubmit={onCreateSubmit}/>
        <JoinDeckForm onJoinSubmit={onJoinSubmit}/>
      </div>
      <style jsx>
        {`
            h2 {
              color: red;
              font-size: 48px;
              text-align: center;
            }
            a, a:visited {
              color: white;
            }
            button {
              background-color: white;
              border-radius: 2px;
              color: black;
              padding: 15px 32px;
              text-align: center;
              text-decoration: none;
              display: inline-block;
              font-size: 16px;
              width: 150px;
              margin: 10px;
              cursor: pointer;
            }
            button:focus {
              outline:0;
            }
            
            button:active {
              outline: 0;
            }
          `}
      </style>
    </div>
  )
}
