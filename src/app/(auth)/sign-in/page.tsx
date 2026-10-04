'use client'

import { signIn } from "@/lib/auth-client";
import {Button, Description, FieldError, Form, Input, InputGroup, Label, TextField} from "@heroui/react";
import {Check, Eye, EyeSlash} from "@gravity-ui/icons";
import { useState } from "react";
import Link from "next/link";



const SignInPage = () => {


  const [isVisible, setIsVisible] = useState(false);

    const onSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: Record<string, FormDataEntryValue> = Object.fromEntries(formData.entries());
    // Convert FormData to plain object
   
    // console.log("data from the form", data)

    const {data : resData, error} = await signIn.email({
        email : data.email as string ,
        password : data.password as string,
        rememberMe : true,
        callbackURL : '/'
        
    })

    console.log(resData,error)
}



const HandleGoogleSignIn = async () => {

  const resData = await signIn.social({
    provider : "google"
  })

  console.log("after login resData" ,resData)
}

    return (
        <div>
            <h1>Sign in page</h1>


            <Form className="flex w-96 flex-col gap-4" onSubmit={onSubmit}>


          <TextField
            isRequired
            name="name"
            validate={(value) => {
              if (value.length < 3) {
                return "Name must be at least 3 characters";
              }
              return null;
            }}
          >
            <Label>Name</Label>
            <Input placeholder="Your name" />
            <FieldError />
          </TextField>
      <TextField
        isRequired
        name="email"
        type="email"
        validate={(value) => {
          if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
            return "Please enter a valid email address";
          }
          return null;
        }}
      >
        <Label>Email</Label>
        <Input placeholder="Your email" />
        <FieldError />
      </TextField>

{/*  */}



 <TextField className="w-full max-w-70" 
           name="password"
            validate={(value) => {
          if (value.length < 8) {
            return "Password must be at least 8 characters";
          }
          if (!/[A-Z]/.test(value)) {
            return "Password must contain at least one uppercase letter";
          }
          if (!/[0-9]/.test(value)) {
            return "Password must contain at least one number";
          }
          return null;
        }}
           >
            
        
       
      <Label>Password</Label>
      <InputGroup>
        <InputGroup.Input
          className="w-full max-w-70"
          type={isVisible ? "text" : "password"}
          placeholder="Input password"
        
         
         
        />
        <InputGroup.Suffix className="pe-0">
          <Button
            isIconOnly
            aria-label={isVisible ? "Hide password" : "Show password"}
            size="sm"
            variant="ghost"
            onPress={() => setIsVisible(!isVisible)}
            
          >
            {isVisible ? <Eye className="size-4" /> : <EyeSlash className="size-4" />}
          </Button>
        </InputGroup.Suffix>
      </InputGroup>
      <Description>Must be at least 8 characters with 1 uppercase and 1 number</Description>
        <FieldError />
    </TextField>




{/*  */}

    
      <div className="flex gap-2">
        <Button type="submit">
          <Check />
          Submit
        </Button>
        <Button type="reset" variant="secondary">
          Reset
        </Button>
      </div>
    </Form>

    <p>Forgot Password ? <Link className="text-blue-700 underline" href= '/forgot-password'>Click here</Link></p>


    <p>or</p>
    <Button onClick={HandleGoogleSignIn}>Sign in with Google</Button>
            
        </div>
    );
};

export default SignInPage;